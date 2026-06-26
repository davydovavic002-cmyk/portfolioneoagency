import type { Language } from "@/lib/types";

export type ShporaAction =
  | "subjectRussian"
  | "subjectMath"
  | "subjectChemistry"
  | "subjectPhysics"
  | "askAiTutor"
  | "part2"
  | "constructor"
  | "emergency"
  | "progress"
  | "premium"
  | "topTopics"
  | "sosPlan"
  | "expressTest"
  | "aiTutor"
  | "task27"
  | "task28"
  | "blockRules"
  | "blockTasks"
  | "backToSubjects"
  | "backToHub"
  | "mainMenu";

export type ShporaMessageKey =
  | "welcome"
  | "subjects"
  | "subjectRussian"
  | "subjectMath"
  | "subjectChemistry"
  | "subjectPhysics"
  | "part2"
  | "constructor"
  | "emergency"
  | "progress"
  | "premium"
  | "topTopics"
  | "sosPlan"
  | "expressTest"
  | "aiTutor"
  | "askAiTutor"
  | "task27"
  | "task28"
  | "blockRules"
  | "blockTasks"
  | "blockRulesReady"
  | "blockTasksReady"
  | "hubMenu"
  | "mainMenu"
  | "testCorrect"
  | "testWrong"
  | "testComplete"
  | "aiTutorFreeReply"
  | "genericInputReply";

export type KeyboardScreen =
  | "subjects"
  | "hub"
  | "emergency"
  | "part2"
  | "constructor"
  | "aiTutor";

export type SubjectId = "russian" | "math" | "chemistry" | "physics";

export interface ButtonCell {
  action: ShporaAction;
  span?: "full";
}

export interface ExpressTestQuestion {
  text: string;
  optionA: string;
  optionB: string;
  correct: "a" | "b";
}

export interface ShporaInteractiveStrings {
  inputPlaceholder: string;
  generating: { label: string; done: string };
  expressTest: {
    progress: string;
    questions: ExpressTestQuestion[];
    correct: string;
    wrong: string;
    complete: string;
  };
  progressChart: {
    grammar: string;
    punctuation: string;
    essay: string;
  };
}

export interface ShporaChatStrings {
  botName: string;
  botStatus: string;
  aiTutorModeLabel: string;
  aiInputPrefix: string;
  typing: string;
  typingHeader: string;
  buttons: Record<ShporaAction, string>;
  responses: Record<ShporaMessageKey, string>;
  keyboards: Record<KeyboardScreen, ButtonCell[][]>;
  interactive: ShporaInteractiveStrings;
}

export type ShporaChatDictionary = Record<Language, ShporaChatStrings>;

const ruResponses: Record<ShporaMessageKey, string> = {
  welcome:
    "⚡️ **НейроШпора** — тренажёр к ЕГЭ без воды.\n1️⃣ Выбери предмет\n2️⃣ 🚨 Экстренная аптечка — ТОП-темы и SOS-план\n3️⃣ Ошибся? 🤖 ИИ-репетитор разберёт.\n\nКакой экзамен штурмуем?",
  subjects: "📚 **Выбери предмет** для подготовки к ЕГЭ/ОГЭ:",
  subjectRussian: "✅ **Русский язык** — предмет выбран. Меню разделов ниже.",
  subjectMath: "✅ **Математика** — предмет выбран. Меню разделов ниже.",
  subjectChemistry: "✅ **Химия** — предмет выбран. Меню разделов ниже.",
  subjectPhysics: "✅ **Физика** — предмет выбран. Меню разделов ниже.",
  askAiTutor:
    "🤖 **ИИ-репетитор на связи.**\nНапиши вопрос в поле внизу — разберу правило, дам пример и похожее задание.",
  part2: "📐 **Вторая часть.**\nВыбери номер задания — покажу критерии и образец.",
  constructor: "📦 **Конструктор Шпор.**\nВыбери блок — ИИ соберёт шпору.",
  emergency:
    "🎯 **Хаб: 🇷🇺 Русский язык**\n\n🚨 **Аптечка**: ТОП-темы · SOS-план · экспресс-тест.\nОшибся? 🤖 *Объяснить с ИИ*.",
  progress: "📊 **Твой прогресс** — смотри диаграмму ниже:",
  premium: "💎 **Premium** — безлимитный ИИ, конструктор шпор, все предметы.",
  topTopics:
    "🔥 **ТОП-темы:**\n1. Запятые при деепричастиях\n2. Синтаксический разбор\n3. Сочинение №27",
  sosPlan:
    "📅 **SOS-план на 7 дней:**\nДень 1–2: орфография · 3–4: пунктуация · 5–6: сочинение · 7: повторение слабых тем",
  expressTest: "⚡ **Экспресс-тест запущен.**\nОтветь на вопросы ниже — 2 минуты, 3 задания:",
  aiTutor:
    "🤖 **ИИ-репетитор:**\nНапиши вопрос или вставь свой ответ — разберу по шагам.",
  task27: "📝 **Задание 27** — сочинение.\nКритерии К1–К12 и план из 3 абзацев.",
  task28: "📝 **Задание 28** — стилистический анализ.\nШаблон: стиль → средства → вывод.",
  blockRules: "📋 **Генерация шпоры по правилам...**",
  blockTasks: "📋 **Генерация шпоры по заданиям...**",
  blockRulesReady: "✅ **Шпора готова** — 1 стр. А4, орфография и пунктуация. Сохранить в PDF?",
  blockTasksReady: "✅ **Шпора готова** — алгоритмы заданий №1–26. Сохранить в PDF?",
  hubMenu: "📂 **Меню разделов** — выбери инструмент:",
  mainMenu:
    "⚡️ **НейроШпора** — тренажёр к ЕГЭ без воды.\n1️⃣ Выбери предмет\n2️⃣ 🚨 Аптечка — ТОП-темы\n3️⃣ 🤖 ИИ-репетитор\n\nКакой экзамен штурмуем?",
  testCorrect: "✅ **Верно!** Запятая ставится при однородных обстоятельствах в начале предложения.",
  testWrong:
    "❌ **Не совсем.** Правило: запятая между частями сложного предложения. Попробуй ещё раз!",
  testComplete: "🏁 **Тест завершён:** 2/3 верно · 67%.\nСлабое место: сложные предложения. Рекомендую SOS-план, день 3.",
  aiTutorFreeReply:
    "🤖 **Разбор:**\nТы спрашиваешь про запятую при деепричастном обороте — она **всегда выделяется**, если оборот стоит **после** определяемого слова.\n\n*Пример:* «Учась усердно**,** я сдал экзамен на 90 баллов.»",
  genericInputReply:
    "💬 Получил сообщение! Для быстрых действий — кнопки меню. Для разбора темы жми 🤖 **Задать вопрос ИИ**.",
};

const enResponses: Record<ShporaMessageKey, string> = {
  welcome:
    "⚡️ **NeuroShpora** — no-fluff exam prep.\n1️⃣ Choose a subject\n2️⃣ 🚨 Emergency Kit — TOP topics & SOS\n3️⃣ 🤖 AI Tutor for review.\n\nWhich exam?",
  subjects: "📚 **Choose a subject:**",
  subjectRussian: "✅ **Russian Language** selected. Menu below.",
  subjectMath: "✅ **Mathematics** selected. Menu below.",
  subjectChemistry: "✅ **Chemistry** selected. Menu below.",
  subjectPhysics: "✅ **Physics** selected. Menu below.",
  askAiTutor:
    "🤖 **AI Tutor is online.**\nType your question below — I'll explain the rule with an example.",
  part2: "📐 **Part 2.**\nPick a task number for criteria and a sample.",
  constructor: "📦 **Cheat Sheet Builder.**\nPick a block — AI builds your sheet.",
  emergency:
    "🎯 **Hub: 🇷🇺 Russian**\n\n🚨 **Kit**: TOP topics · SOS-plan · express test.\nMistake? 🤖 *Explain with AI*.",
  progress: "📊 **Your progress** — see chart below:",
  premium: "💎 **Premium** — unlimited AI, cheat sheets, all subjects.",
  topTopics: "🔥 **TOP topics:**\n1. Commas with participles\n2. Syntax\n3. Essay №27",
  sosPlan:
    "📅 **7-day SOS:**\nDay 1–2: spelling · 3–4: punctuation · 5–6: essay · 7: review weak topics",
  expressTest: "⚡ **Express test started.**\nAnswer below — 2 min, 3 questions:",
  aiTutor: "🤖 **AI Tutor:**\nType your question or paste your answer for a step-by-step review.",
  task27: "📝 **Task 27** — essay. Criteria K1–K12 and 3-paragraph plan.",
  task28: "📝 **Task 28** — stylistic analysis. Style → devices → conclusion.",
  blockRules: "📋 **Generating rules cheat sheet...**",
  blockTasks: "📋 **Generating tasks cheat sheet...**",
  blockRulesReady: "✅ **Sheet ready** — 1 page, spelling & punctuation. Save as PDF?",
  blockTasksReady: "✅ **Sheet ready** — task algorithms №1–26. Save as PDF?",
  hubMenu: "📂 **Section menu** — pick a tool:",
  mainMenu:
    "⚡️ **NeuroShpora** — no-fluff exam prep.\n1️⃣ Choose subject\n2️⃣ 🚨 Emergency Kit\n3️⃣ 🤖 AI Tutor\n\nWhich exam?",
  testCorrect: "✅ **Correct!** The comma goes after the adverbial phrase at the start.",
  testWrong: "❌ **Not quite.** Rule: comma in compound sentences. Try again!",
  testComplete: "🏁 **Done:** 2/3 correct · 67%.\nWeak spot: compound sentences. Try SOS day 3.",
  aiTutorFreeReply:
    "🤖 **Review:**\nYou asked about participial phrases — the comma is **required** when the phrase comes **after** the word it modifies.\n\n*Example:* «Studying hard**,** I scored 90 on the exam.»",
  genericInputReply:
    "💬 Got it! Use menu buttons for quick actions. For deep help tap 🤖 **Ask AI Tutor**.",
};

const amResponses: Record<ShporaMessageKey, string> = {
  welcome:
    "⚡️ **NeuroShpora** — քննությունների պատրաստում:\n1️⃣ Ընտրիր առարկան\n2️⃣ 🚨 Շտապ օգնություն\n3️⃣ 🤖 AI-ռեպետիտոր\n\nՈ՞ր քննություն:",
  subjects: "📚 **Ընտրիր առարկան:**",
  subjectRussian: "✅ **Ռուսերեն** — ընտրված է:",
  subjectMath: "✅ **Մաթեմատիկա** — ընտրված է:",
  subjectChemistry: "✅ **Քիմիա** — ընտրված է:",
  subjectPhysics: "✅ **Ֆիզիկա** — ընտրված է:",
  askAiTutor:
    "🤖 **AI-ռեպետիտորը ակտիվ է:**\nԳրիր հարցը ստորևի դաշտում — կբացատրեմ կանոնը օրինակով:",
  part2: "📐 **Երկրորդ մաս:**\nԸնտրիր առաջադրանքի համարը:",
  constructor: "📦 **Շպարգալկաների կոնստրուկտոր:**\nԸնտրիր բլոկը:",
  emergency:
    "🎯 **Հաբ: 🇷🇺 Ռուսերեն**\n\n🚨 TOP թեմաներ · SOS-պլան · էքսպրես թեստ:\nՍխալվե՞լ ես: 🤖 *Բացատրել AI-ով*:",
  progress: "📊 **Քո առաջընթացը** — տես գծապատկերը ստորև:",
  premium: "💎 **Premium** — անսահմանափակ AI և բոլոր առարկաները:",
  topTopics: "🔥 **TOP թեմաներ:**\n1. Ստորակետներ\n2. Շարահյուսություն\n3. Կոմպոզիցիա №27",
  sosPlan:
    "📅 **SOS 7 օր:**\nՕր 1–2: ուղղագրություն · 3–4: կետադրություն · 5–6: կոմպոզիցիա · 7: թույլ թեմաների կրկնում",
  expressTest: "⚡ **Էքսպրես թեստը մեկնարկեց:**\nՊատասխանիր ստորև — 3 հարց:",
  aiTutor: "🤖 **AI-ռեպետիտոր:**\nԳրիր հարցը կամ պատասխանը:",
  task27: "📝 **Առաջադրանք 27** — կոմպոզիցիա:",
  task28: "📝 **Առաջադրանք 28** — ոճային վերլուծություն:",
  blockRules: "📋 **Շպարգալկայի գեներացիա...**",
  blockTasks: "📋 **Առաջադրանքների շպարգալկա...**",
  blockRulesReady: "✅ **Պատրաստ է** — 1 էջ A4: Ուղղագրություն և կետադրություն:",
  blockTasksReady: "✅ **Պատրաստ է** — №1–26 առաջադրանքների ալգորիթմներ:",
  hubMenu: "📂 **Բաժինների մենյու:**",
  mainMenu:
    "⚡️ **NeuroShpora** — քննությունների պատրաստում:\n1️⃣ Ընտրիր առարկան\n2️⃣ 🚨 Շտապ օգնություն\n3️⃣ 🤖 AI-ռեպետիտոր",
  testCorrect: "✅ **Ճիշտ է:** Ստորակետը դրվում է նախադասության սկզբում:",
  testWrong: "❌ **Ոչ ամբողջությամբ:** Կանոնը՝ բարդ նախադասություններում ստորակետ:",
  testComplete: "🏁 **Ավարտված:** 2/3 ճիշտ · 67%:",
  aiTutorFreeReply:
    "🤖 **Բացատրություն:**\nՄասնակիցային շրջանակից հետո միշտ դրվում է ստորակետ:\n\n*Օրինակ:* «Շատ սովորելով**,** ես հանձնեցի քննությունը:*»",
  genericInputReply:
    "💬 Ստացա! Արագ գործողությունների համար՝ մենյուի կոճակները: 🤖 **Հարցիր AI-ին**:",
};

const hubKeyboard: ButtonCell[][] = [
  [{ action: "askAiTutor", span: "full" }],
  [{ action: "part2" }, { action: "constructor" }],
  [{ action: "emergency" }, { action: "progress" }],
  [{ action: "premium", span: "full" }],
  [{ action: "backToSubjects" }, { action: "mainMenu" }],
];

const subjectsKeyboard: ButtonCell[][] = [
  [{ action: "subjectRussian" }, { action: "subjectMath" }],
  [{ action: "subjectChemistry" }, { action: "subjectPhysics" }],
  [{ action: "premium", span: "full" }],
];

const emergencyKeyboard: ButtonCell[][] = [
  [{ action: "topTopics" }, { action: "sosPlan" }],
  [{ action: "expressTest" }, { action: "aiTutor" }],
  [{ action: "backToHub", span: "full" }],
];

const part2Keyboard: ButtonCell[][] = [
  [{ action: "task27" }, { action: "task28" }],
  [{ action: "backToHub", span: "full" }],
];

const constructorKeyboard: ButtonCell[][] = [
  [{ action: "blockRules" }, { action: "blockTasks" }],
  [{ action: "backToHub", span: "full" }],
];

const aiTutorKeyboard: ButtonCell[][] = [
  [{ action: "backToHub", span: "full" }],
];

const ruButtons: Record<ShporaAction, string> = {
  subjectRussian: "🇷🇺 Русский язык",
  subjectMath: "📐 Математика",
  subjectChemistry: "🧪 Химия",
  subjectPhysics: "⚛️ Физика",
  askAiTutor: "🤖 Задать вопрос ИИ-репетитору",
  part2: "📐 Вторая часть",
  constructor: "📦 Конструктор Шпор",
  emergency: "🚨 Экстренная аптечка",
  progress: "📊 Мой прогресс",
  premium: "💎 Купить Premium",
  topTopics: "🔥 ТОП-темы",
  sosPlan: "📅 SOS-план",
  expressTest: "⚡ Экспресс-тест",
  aiTutor: "🤖 ИИ-репетитор",
  task27: "📝 Задание 27",
  task28: "📝 Задание 28",
  blockRules: "📋 Правила",
  blockTasks: "📋 Задания",
  backToSubjects: "⬅️ К предметам",
  backToHub: "⬅️ Назад в меню",
  mainMenu: "🏠 Главное меню",
};

const enButtons: Record<ShporaAction, string> = {
  subjectRussian: "🇷🇺 Russian",
  subjectMath: "📐 Math",
  subjectChemistry: "🧪 Chemistry",
  subjectPhysics: "⚛️ Physics",
  askAiTutor: "🤖 Ask AI Tutor",
  part2: "📐 Part 2",
  constructor: "📦 Cheat Sheet Builder",
  emergency: "🚨 Emergency Kit",
  progress: "📊 My Progress",
  premium: "💎 Get Premium",
  topTopics: "🔥 TOP Topics",
  sosPlan: "📅 SOS Plan",
  expressTest: "⚡ Express Test",
  aiTutor: "🤖 AI Tutor",
  task27: "📝 Task 27",
  task28: "📝 Task 28",
  blockRules: "📋 Rules",
  blockTasks: "📋 Tasks",
  backToSubjects: "⬅️ Subjects",
  backToHub: "⬅️ Back to Menu",
  mainMenu: "🏠 Main Menu",
};

const amButtons: Record<ShporaAction, string> = {
  subjectRussian: "🇷🇺 Ռուսերեն",
  subjectMath: "📐 Մաթեմատիկա",
  subjectChemistry: "🧪 Քիմիա",
  subjectPhysics: "⚛️ Ֆիզիկա",
  askAiTutor: "🤖 Հարցնել AI-ռեպետիտորին",
  part2: "📐 Երկրորդ մաս",
  constructor: "📦 Շպարգալկաների կոնստրուկտոր",
  emergency: "🚨 Շտապ օգնություն",
  progress: "📊 Իմ առաջընթացը",
  premium: "💎 Գնել Premium",
  topTopics: "🔥 TOP թեմաներ",
  sosPlan: "📅 SOS-պլան",
  expressTest: "⚡ Էքսպրես թեստ",
  aiTutor: "🤖 AI-ռեպետիտոր",
  task27: "📝 Առաջադրանք 27",
  task28: "📝 Առաջադրանք 28",
  blockRules: "📋 Կանոններ",
  blockTasks: "📋 Առաջադրանքներ",
  backToSubjects: "⬅️ Առարկաներ",
  backToHub: "⬅️ Վերադառնալ",
  mainMenu: "🏠 Գլխավոր մենյու",
};

const ruInteractive: ShporaInteractiveStrings = {
  inputPlaceholder: "Сообщение...",
  generating: { label: "ИИ генерирует шпору...", done: "✓ Готово к скачиванию" },
  expressTest: {
    progress: "Вопрос {n}/3",
    questions: [
      {
        text: "Где нужна запятая?\n«Когда (А) солнце село (Б) мы пошли домой»",
        optionA: "(А) — после «село»",
        optionB: "(Б) — не нужна",
        correct: "a",
      },
      {
        text: "НН в слове «прекра__ный»:",
        optionA: "прекрасный (1 Н)",
        optionB: "прекранный (2 НН)",
        correct: "a",
      },
      {
        text: "Тип придаточного в «Я знаю, что он придёт»:",
        optionA: "Изъяснительное",
        optionB: "Определительное",
        correct: "a",
      },
    ],
    correct: "✅ Верно!",
    wrong: "❌ Неверно",
    complete: "🏁 Тест завершён",
  },
  progressChart: {
    grammar: "Орфография",
    punctuation: "Пунктуация",
    essay: "Сочинение",
  },
};

const enInteractive: ShporaInteractiveStrings = {
  inputPlaceholder: "Message...",
  generating: { label: "AI generating sheet...", done: "✓ Ready to download" },
  expressTest: {
    progress: "Question {n}/3",
    questions: [
      {
        text: "Where does the comma go?\n«When (A) the sun set (B) we went home»",
        optionA: "(A) — after «set»",
        optionB: "(B) — none needed",
        correct: "a",
      },
      {
        text: "Spelling «beauti__ful»:",
        optionA: "beautiful (correct)",
        optionB: "beautifull (wrong)",
        correct: "a",
      },
      {
        text: "Clause type in «I know that he will come»:",
        optionA: "Object clause",
        optionB: "Relative clause",
        correct: "a",
      },
    ],
    correct: "✅ Correct!",
    wrong: "❌ Wrong",
    complete: "🏁 Test complete",
  },
  progressChart: {
    grammar: "Spelling",
    punctuation: "Punctuation",
    essay: "Essay",
  },
};

const amInteractive: ShporaInteractiveStrings = {
  inputPlaceholder: "Հաղորդագրություն...",
  generating: { label: "AI-ն ստեղծում է շպարգալկան...", done: "✓ Պատրաստ է" },
  expressTest: {
    progress: "Հարց {n}/3",
    questions: [
      {
        text: "Որտե՞ղ է ստորակետը:\n«Երբ (Ա) արևը մայրամուտ եղավ (Բ) մենք գնացինք տուն»",
        optionA: "(Ա) — «մայրամուտ եղավ»-ից հետո",
        optionB: "(Բ) — պետք չէ",
        correct: "a",
      },
      {
        text: "«գեղեցի__» բառի ուղղագրություն:",
        optionA: "գեղեցիկ (1)",
        optionB: "գեղեցիք (2)",
        correct: "a",
      },
      {
        text: "«Ես գիտեմ, որ նա կգա» — մասնակցի տեսակ:",
        optionA: "Մակուցային",
        optionB: "Որոշողական",
        correct: "a",
      },
    ],
    correct: "✅ Ճիշտ!",
    wrong: "❌ Սխալ",
    complete: "🏁 Ավարտված",
  },
  progressChart: {
    grammar: "Ուղղագրություն",
    punctuation: "Կետադրություն",
    essay: "Կոմպոզիցիա",
  },
};

export const neuroShporaChat: ShporaChatDictionary = {
  ru: {
    botName: "NeuroShpora",
    botStatus: "в сети",
    aiTutorModeLabel: "🤖 ИИ-репетитор",
    aiInputPrefix: "ИИ: ",
    typing: "Бот печатает...",
    typingHeader: "Бот печатает...",
    buttons: ruButtons,
    responses: ruResponses,
    keyboards: {
      subjects: subjectsKeyboard,
      hub: hubKeyboard,
      emergency: emergencyKeyboard,
      part2: part2Keyboard,
      constructor: constructorKeyboard,
      aiTutor: aiTutorKeyboard,
    },
    interactive: ruInteractive,
  },
  en: {
    botName: "NeuroShpora",
    botStatus: "online",
    aiTutorModeLabel: "🤖 AI tutor",
    aiInputPrefix: "AI: ",
    typing: "Bot is typing...",
    typingHeader: "Bot is typing...",
    buttons: enButtons,
    responses: enResponses,
    keyboards: {
      subjects: subjectsKeyboard,
      hub: hubKeyboard,
      emergency: emergencyKeyboard,
      part2: part2Keyboard,
      constructor: constructorKeyboard,
      aiTutor: aiTutorKeyboard,
    },
    interactive: enInteractive,
  },
  am: {
    botName: "NeuroShpora",
    botStatus: "առցանց",
    aiTutorModeLabel: "🤖 AI դասատու",
    aiInputPrefix: "AI: ",
    typing: "Բոտը գրում է...",
    typingHeader: "Բոտը գրում է...",
    buttons: amButtons,
    responses: amResponses,
    keyboards: {
      subjects: subjectsKeyboard,
      hub: hubKeyboard,
      emergency: emergencyKeyboard,
      part2: part2Keyboard,
      constructor: constructorKeyboard,
      aiTutor: aiTutorKeyboard,
    },
    interactive: amInteractive,
  },
};

const SUBJECT_HEADER_LABEL: Record<SubjectId, ShporaAction> = {
  russian: "subjectRussian",
  math: "subjectMath",
  chemistry: "subjectChemistry",
  physics: "subjectPhysics",
};

const SUBJECT_ACTION_MAP: Record<string, ShporaMessageKey> = {
  subjectRussian: "subjectRussian",
  subjectMath: "subjectMath",
  subjectChemistry: "subjectChemistry",
  subjectPhysics: "subjectPhysics",
};

export function getSubjectHeaderLabel(
  strings: ShporaChatStrings,
  subject: SubjectId
): string {
  return strings.buttons[SUBJECT_HEADER_LABEL[subject]];
}

export function getResponseKey(action: ShporaAction): ShporaMessageKey {
  if (action in SUBJECT_ACTION_MAP) return SUBJECT_ACTION_MAP[action];
  if (action === "backToSubjects") return "subjects";
  if (action === "backToHub") return "hubMenu";
  if (action === "mainMenu") return "mainMenu";
  if (action === "askAiTutor") return "askAiTutor";
  return action as ShporaMessageKey;
}

export function getNextKeyboard(
  action: ShporaAction,
  current: KeyboardScreen
): KeyboardScreen {
  if (action === "mainMenu" || action === "backToSubjects") return "subjects";
  if (action.startsWith("subject")) return "hub";
  if (action === "backToHub") return "hub";
  if (action === "askAiTutor" || action === "aiTutor") return "aiTutor";
  if (action === "emergency") return "emergency";
  if (action === "part2") return "part2";
  if (action === "constructor") return "constructor";
  if (
    action === "topTopics" ||
    action === "sosPlan" ||
    action === "expressTest"
  ) {
    return "emergency";
  }
  if (action === "task27" || action === "task28") return "part2";
  if (action === "blockRules" || action === "blockTasks") return "constructor";
  if (action === "progress" || action === "premium") return current;
  return current;
}

export function getShporaText(
  strings: ShporaChatStrings,
  message:
    | { type: "bot"; key: ShporaMessageKey }
    | { type: "user"; action: ShporaAction }
    | { type: "userText"; text: string }
    | { type: "typing" }
): string {
  if (message.type === "typing") return strings.typing;
  if (message.type === "userText") return message.text;
  if (message.type === "user") return strings.buttons[message.action];
  return strings.responses[message.key];
}

export function actionToSubject(action: ShporaAction): SubjectId | null {
  switch (action) {
    case "subjectRussian":
      return "russian";
    case "subjectMath":
      return "math";
    case "subjectChemistry":
      return "chemistry";
    case "subjectPhysics":
      return "physics";
    default:
      return null;
  }
}

/** Bot message keys that render interactive UI below the bubble */
export const INTERACTIVE_MESSAGE_KEYS = {
  expressTest: "expressTest",
  blockRules: "generating",
  blockTasks: "generating",
  progress: "progress",
} as Partial<Record<ShporaMessageKey, "expressTest" | "generating" | "progress">>;
