"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ChevronLeft,
  MoreVertical,
  Paperclip,
  Search,
  Send,
  Smile,
} from "lucide-react";
import type { Language } from "@/lib/types";
import {
  actionToSubject,
  getNextKeyboard,
  getResponseKey,
  getShporaText,
  getSubjectHeaderLabel,
  INTERACTIVE_MESSAGE_KEYS,
  neuroShporaChat,
  type ExpressTestQuestion,
  type KeyboardScreen,
  type ShporaAction,
  type ShporaMessageKey,
  type SubjectId,
} from "@/lib/i18n/neuro-shpora-chat";
import {
  DEFAULT_SUBJECT,
  getSubjectContent,
  resolveSubjectBotText,
} from "@/lib/i18n/neuro-shpora-subjects";
import { TelegramMessageText } from "./TelegramMessageText";
import {
  ExpressTestCard,
  GeneratingCard,
  ProgressCard,
} from "./TelegramInteractiveCards";

const TYPING_DELAY_MS = 1000;

interface ChatMessage {
  id: string;
  type: "bot" | "user" | "typing";
  key?: ShporaMessageKey;
  action?: ShporaAction;
  text?: string;
}

interface NeuroShporaSimProps {
  language: Language;
}

function createWelcomeMessage(): ChatMessage {
  return { id: "welcome", type: "bot", key: "welcome" };
}

export function NeuroShporaSim({ language }: NeuroShporaSimProps) {
  const strings = neuroShporaChat[language];
  const [messages, setMessages] = useState<ChatMessage[]>([createWelcomeMessage()]);
  const [keyboardScreen, setKeyboardScreen] = useState<KeyboardScreen>("subjects");
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [testStep, setTestStep] = useState(0);
  const [testScore, setTestScore] = useState(0);
  const [activeTest, setActiveTest] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isArmenian = language === "am";

  const keyboardRows = strings.keyboards[keyboardScreen];
  const isAiTutorMode = keyboardScreen === "aiTutor";
  const activeSubject: SubjectId = selectedSubject ?? DEFAULT_SUBJECT;
  const subjectContent = getSubjectContent(language, activeSubject);
  const expressQuestions: ExpressTestQuestion[] = subjectContent.expressTestQuestions;
  const expressProgressLabel = strings.interactive.expressTest.progress;

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, language, keyboardScreen, activeTest, scrollToBottom]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const pushBotReply = useCallback(
    (responseKey: ShporaMessageKey, nextKeyboard: KeyboardScreen) => {
      timeoutRef.current = setTimeout(() => {
        setMessages((prev) => {
          const withoutTyping = prev.filter((m) => m.type !== "typing");
          return [
            ...withoutTyping,
            { id: `bot-${Date.now()}`, type: "bot", key: responseKey },
          ];
        });
        setKeyboardScreen(nextKeyboard);
        setIsTyping(false);

        if (responseKey === "expressTest") {
          setActiveTest(true);
          setTestStep(0);
          setTestScore(0);
        }
      }, TYPING_DELAY_MS);
    },
    []
  );

  const handleAction = useCallback(
    (action: ShporaAction) => {
      if (isTyping) return;

      const subject = actionToSubject(action);
      const nextKeyboard = getNextKeyboard(action, keyboardScreen);
      const responseKey = getResponseKey(action);

      if (action === "blockRules" || action === "blockTasks") {
        setMessages((prev) => [
          ...prev,
          { id: `user-${Date.now()}`, type: "user", action },
          { id: `typing-${Date.now()}`, type: "typing" },
        ]);
        setIsTyping(true);
        const readyKey = action === "blockRules" ? "blockRulesReady" : "blockTasksReady";
        timeoutRef.current = setTimeout(() => {
          setMessages((prev) => {
            const withoutTyping = prev.filter((m) => m.type !== "typing");
            return [
              ...withoutTyping,
              { id: `bot-gen-${Date.now()}`, type: "bot", key: action },
            ];
          });
          setIsTyping(false);
          setKeyboardScreen(nextKeyboard);
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              { id: `bot-ready-${Date.now()}`, type: "bot", key: readyKey },
            ]);
          }, 1400);
        }, TYPING_DELAY_MS);
        return;
      }

      setMessages((prev) => [
        ...prev,
        { id: `user-${Date.now()}`, type: "user", action },
        { id: `typing-${Date.now()}`, type: "typing" },
      ]);
      setIsTyping(true);

      if (subject) setSelectedSubject(subject);
      if (action === "mainMenu" || action === "backToSubjects") {
        setSelectedSubject(null);
        setActiveTest(false);
      }

      pushBotReply(responseKey, nextKeyboard);
    },
    [isTyping, keyboardScreen, pushBotReply]
  );

  const handleTestAnswer = useCallback(
    (pick: "a" | "b") => {
      if (isTyping || !activeTest) return;

      const q = expressQuestions[testStep];
      const isCorrect = q.correct === pick;
      const newScore = testScore + (isCorrect ? 1 : 0);

      const pickLabel = pick === "a" ? q.optionA : q.optionB;
      setMessages((prev) => [
        ...prev,
        { id: `user-test-${Date.now()}`, type: "user", text: pickLabel },
        { id: `typing-${Date.now()}`, type: "typing" },
      ]);
      setIsTyping(true);

      const isLast = testStep >= expressQuestions.length - 1;
      const responseKey: ShporaMessageKey = isLast
        ? "testComplete"
        : isCorrect
          ? "testCorrect"
          : "testWrong";

      timeoutRef.current = setTimeout(() => {
        setMessages((prev) => {
          const withoutTyping = prev.filter((m) => m.type !== "typing");
          return [
            ...withoutTyping,
            { id: `bot-test-${Date.now()}`, type: "bot", key: responseKey },
          ];
        });
        setIsTyping(false);

        if (isLast) {
          setActiveTest(false);
          setTestStep(0);
          setTestScore(0);
        } else {
          setTestStep((s) => s + 1);
          setTestScore(newScore);
        }
      }, TYPING_DELAY_MS);
    },
    [activeTest, expressQuestions, isTyping, testScore, testStep]
  );

  const handleSendText = useCallback(() => {
    const text = inputValue.trim();
    if (!text || isTyping) return;

    setMessages((prev) => [
      ...prev,
      { id: `user-text-${Date.now()}`, type: "user", text },
      { id: `typing-${Date.now()}`, type: "typing" },
    ]);
    setInputValue("");
    setIsTyping(true);

    const responseKey: ShporaMessageKey = isAiTutorMode
      ? "aiTutorFreeReply"
      : "genericInputReply";

    timeoutRef.current = setTimeout(() => {
      setMessages((prev) => {
        const withoutTyping = prev.filter((m) => m.type !== "typing");
        return [
          ...withoutTyping,
          { id: `bot-text-${Date.now()}`, type: "bot", key: responseKey },
        ];
      });
      setIsTyping(false);
    }, TYPING_DELAY_MS);
  }, [inputValue, isTyping, isAiTutorMode]);

  const resolveText = (msg: ChatMessage): string => {
    if (msg.type === "typing") return getShporaText(strings, { type: "typing" });
    if (msg.text) return msg.text;
    if (msg.type === "user" && msg.action) {
      return getShporaText(strings, { type: "user", action: msg.action });
    }
    if (msg.type === "bot" && msg.key) {
      const fallback = getShporaText(strings, { type: "bot", key: msg.key });
      return resolveSubjectBotText(language, selectedSubject, msg.key, fallback);
    }
    return "";
  };

  const renderInteractive = (key: ShporaMessageKey, msgId: string) => {
    const kind = INTERACTIVE_MESSAGE_KEYS[key];
    if (!kind) return null;

    const isLastBot = messages.filter((m) => m.type === "bot").at(-1)?.id === msgId;

    if (kind === "expressTest" && activeTest && isLastBot) {
      return (
        <ExpressTestCard
          questions={expressQuestions}
          progressLabel={expressProgressLabel}
          questionIndex={testStep}
          onAnswer={handleTestAnswer}
          disabled={isTyping}
        />
      );
    }

    if (kind === "generating" && isLastBot) {
      return (
        <GeneratingCard
          label={strings.interactive.generating.label}
          doneLabel={strings.interactive.generating.done}
        />
      );
    }

    if (kind === "progress" && isLastBot) {
      return <ProgressCard topics={subjectContent.progressChart.topics} />;
    }

    return null;
  };

  return (
    <div className="flex h-full flex-col bg-[#0e1621]">
      {/* Header */}
      <div className="flex shrink-0 items-center gap-2 border-b border-[#1c2a3a] bg-[#17212b] px-2 py-2.5">
        <button type="button" className="p-1.5 text-[#6ab2f2]" aria-hidden>
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#5b8def] to-[#3a6fd8]">
          <BookOpen className="h-5 w-5 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <p
            className={`truncate text-[15px] font-medium text-white ${
              isArmenian ? "font-armenian" : ""
            }`}
          >
            {strings.botName}
          </p>
          <p
            className={`truncate text-[13px] text-[#6ab2f2] ${
              isArmenian ? "font-armenian" : ""
            }`}
          >
            {isTyping
              ? strings.typingHeader
              : isAiTutorMode
                ? strings.aiTutorModeLabel
                : selectedSubject
                  ? getSubjectHeaderLabel(strings, selectedSubject)
                  : strings.botStatus}
          </p>
        </div>
        <button type="button" className="p-1.5 text-[#6ab2f2]" aria-hidden>
          <Search className="h-5 w-5" />
        </button>
        <button type="button" className="p-1.5 text-[#6ab2f2]" aria-hidden>
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 py-3"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(42,171,238,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(106,178,242,0.03) 0%, transparent 45%)",
        }}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            const text = resolveText(msg);
            const isUser = msg.type === "user";
            const isTypingBubble = msg.type === "typing";

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className={`mb-2 flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[90%] px-3 py-2 text-[13px] leading-[1.5] shadow-sm ${
                    isUser
                      ? "rounded-2xl rounded-br-md bg-[#2b5278] text-white"
                      : isTypingBubble
                        ? "rounded-2xl rounded-bl-md bg-[#182533] text-[#8b9db3] italic"
                        : "rounded-2xl rounded-bl-md bg-[#182533] text-[#e8eef4]"
                  } ${isArmenian ? "font-armenian" : ""}`}
                >
                  {isTypingBubble ? (
                    <span className="flex items-center gap-2">
                      <TypingDots />
                      <motion.span key={language}>{text}</motion.span>
                    </span>
                  ) : isUser ? (
                    <motion.span key={`${msg.id}-${language}`}>{text}</motion.span>
                  ) : (
                    <motion.div key={`${msg.id}-${language}`}>
                      <TelegramMessageText text={text} />
                      {msg.key && renderInteractive(msg.key, msg.id)}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Message input — like real Telegram */}
      <div className="shrink-0 border-t border-[#0d1219] bg-[#17212b] px-2 py-2">
        <div
          className={`flex items-center gap-2 rounded-full px-3 py-1.5 ${
            isAiTutorMode
              ? "bg-[#242f3d] ring-1 ring-[#6ab2f2]/40"
              : "bg-[#242f3d]"
          }`}
        >
          <button type="button" className="shrink-0 text-[#6ab2f2]" aria-hidden>
            <Smile className="h-5 w-5" />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendText()}
            placeholder={
              isAiTutorMode
                ? `${strings.aiInputPrefix}${strings.interactive.inputPlaceholder}`
                : strings.interactive.inputPlaceholder
            }
            disabled={isTyping}
            className={`min-w-0 flex-1 bg-transparent text-[14px] text-white placeholder:text-zinc-500 outline-none disabled:opacity-50 ${
              isArmenian ? "font-armenian" : ""
            }`}
          />
          <button type="button" className="shrink-0 text-[#6ab2f2]" aria-hidden>
            <Paperclip className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={handleSendText}
            disabled={!inputValue.trim() || isTyping}
            className="shrink-0 rounded-full p-1 text-[#6ab2f2] transition-colors hover:text-white disabled:opacity-30"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Reply keyboard */}
      <div className="shrink-0 border-t border-[#0d1219] bg-[#17212b] px-1.5 pb-2.5 pt-1.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${keyboardScreen}-${language}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="space-y-1"
          >
            {keyboardRows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={
                  row.length === 1 && row[0].span === "full"
                    ? "grid grid-cols-1 gap-1"
                    : "grid grid-cols-2 gap-1"
                }
              >
                {row.map(({ action, span }) => (
                  <motion.button
                    key={action}
                    type="button"
                    onClick={() => handleAction(action)}
                    disabled={isTyping}
                    className={`rounded-md py-2 text-center text-[11px] font-medium leading-tight text-white transition-colors disabled:opacity-40 ${
                      action === "askAiTutor"
                        ? "bg-[#3a6fd8] hover:bg-[#4a7fe8]"
                        : "bg-[#2b5278]/95 hover:bg-[#3468a3]"
                    } ${span === "full" ? "col-span-1" : ""} ${
                      isArmenian ? "font-armenian" : ""
                    }`}
                    whileTap={{ scale: 0.97 }}
                  >
                    {strings.buttons[action]}
                  </motion.button>
                ))}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex gap-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-[#6ab2f2]"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}
