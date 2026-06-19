import type { Language } from "@/lib/types";
import type { ExpressTestQuestion, SubjectId } from "./neuro-shpora-chat";

export interface SubjectProgressChart {
  topics: { label: string; value: number }[];
}

export interface SubjectContent {
  emergency: string;
  topTopics: string;
  sosPlan: string;
  expressTest: string;
  part2: string;
  task27: string;
  task28: string;
  blockRulesReady: string;
  blockTasksReady: string;
  testCorrect: string;
  testWrong: string;
  testComplete: string;
  aiTutorFreeReply: string;
  expressTestQuestions: ExpressTestQuestion[];
  progressChart: SubjectProgressChart;
}

type SubjectContentMap = Record<SubjectId, SubjectContent>;

const ruSubjects: SubjectContentMap = {
  russian: {
    emergency:
      "🎯 **Хаб: 🇷🇺 Русский язык**\n\n🚨 Аптечка: ТОП-темы · SOS-план · экспресс-тест.\nОшибся? 🤖 *Объяснить с ИИ*.",
    topTopics:
      "🔥 **ТОП-темы:**\n1. Запятые при деепричастиях\n2. Синтаксический разбор\n3. Сочинение №27",
    sosPlan:
      "📅 **SOS-план (7 дней):**\nДень 1–2: орфография · 3–4: пунктуация · 5–6: сочинение · 7: повторение слабых тем",
    expressTest: "⚡ **Экспресс-тест по русскому.**\n3 вопроса — ответь кнопками ниже:",
    part2: "📐 **Вторая часть (русский).**\nВыбери задание:",
    task27: "📝 **Задание 27** — сочинение.\nКритерии К1–К12, план из 3 абзацев.",
    task28: "📝 **Задание 28** — стилистический анализ.\nСтиль → средства → вывод.",
    blockRulesReady: "✅ **Шпора готова** — орфография и пунктуация, 1 стр. А4.",
    blockTasksReady: "✅ **Шпора готова** — алгоритмы заданий №1–26.",
    testCorrect: "✅ **Верно!** Запятая нужна после обстоятельства в начале предложения.",
    testWrong: "❌ **Не совсем.** Пересмотри правило о сложном предложении.",
    testComplete: "🏁 **Итог:** 2/3 · 67%.\nСлабое место: сложные предложения. День 3 SOS-плана.",
    aiTutorFreeReply:
      "🤖 **Разбор:**\nЗапятая при деепричастном обороте **обязательна**, если оборот стоит **после** слова.\n\n*Пример:* «Учась усердно**,** я сдал экзамен.»",
    expressTestQuestions: [
      {
        text: "Где запятая?\n«Когда (А) солнце село (Б) мы пошли домой»",
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
        text: "Придаточное в «Я знаю, что он придёт»:",
        optionA: "Изъяснительное",
        optionB: "Определительное",
        correct: "a",
      },
    ],
    progressChart: {
      topics: [
        { label: "Орфография", value: 82 },
        { label: "Пунктуация", value: 68 },
        { label: "Сочинение", value: 74 },
      ],
    },
  },
  math: {
    emergency:
      "🎯 **Хаб: 📐 Математика**\n\n🚨 Аптечка: профиль · производные · параметры.\nЗастрял? 🤖 *Разбор с ИИ*.",
    topTopics:
      "🔥 **ТОП-темы:**\n1. Производная и исследование функций\n2. Стереометрия\n3. Задачи с параметром",
    sosPlan:
      "📅 **SOS-план (7 дней):**\nДень 1–2: алгебра · 3–4: геометрия · 5–6: параметры · 7: пробные №1–19",
    expressTest: "⚡ **Экспресс-тест по математике.**\n3 задачи — выбери ответ:",
    part2: "📐 **Вторая часть (математика).**\nВыбери номер:",
    task27: "📝 **Задание 13** — уравнение с параметром.\nМетод: анализ ДУ и граничные случаи.",
    task28: "📝 **Задание 14** — геометрическая задача.\nПлан: чертёж → свойства → вычисление.",
    blockRulesReady: "✅ **Шпора готова** — формулы алгебры и тригонометрии.",
    blockTasksReady: "✅ **Шпора готова** — алгоритмы №1–12 (первая часть).",
    testCorrect: "✅ **Верно!** Производная x² = 2x.",
    testWrong: "❌ **Ошибка.** Проверь правило дифференцирования степенной функции.",
    testComplete: "🏁 **Итог:** 2/3 · 67%.\nПовтори тему «Производная» — день 1 SOS.",
    aiTutorFreeReply:
      "🤖 **Разбор:**\nДля нахождения экстремума: 1) найди f'(x), 2) приравняй к 0, 3) проверь знак производной.\n\n*Пример:* f(x)=x²−4x → f'(x)=2x−4=0 → x=2.",
    expressTestQuestions: [
      {
        text: "Производная f(x) = x³:",
        optionA: "3x²",
        optionB: "x²",
        correct: "a",
      },
      {
        text: "log₂(8) =",
        optionA: "3",
        optionB: "4",
        correct: "a",
      },
      {
        text: "Синус 90° =",
        optionA: "1",
        optionB: "0",
        correct: "a",
      },
    ],
    progressChart: {
      topics: [
        { label: "Алгебра", value: 76 },
        { label: "Геометрия", value: 62 },
        { label: "Вероятность", value: 81 },
      ],
    },
  },
  chemistry: {
    emergency:
      "🎯 **Хаб: 🧪 Химия**\n\n🚨 Аптечка: органика · неорганика · расчёты.\nОшибка? 🤖 *Объяснить с ИИ*.",
    topTopics:
      "🔥 **ТОП-темы:**\n1. Органическая химия (алканы, алкены)\n2. ОВР и электролиз\n3. Задачи на массовую долю",
    sosPlan:
      "📅 **SOS-план (7 дней):**\nДень 1–2: неорганика · 3–4: органика · 5–6: расчёты · 7: КИМ-задачи №23–34",
    expressTest: "⚡ **Экспресс-тест по химии.**\n3 вопроса:",
    part2: "📐 **Вторая часть (химия).**\nВыбери тип задачи:",
    task27: "📝 **Задача 33** — цепочка превращений.\nСхема: реагенты → продукты → уравнения.",
    task28: "📝 **Задача 34** — расчёт по уравнению.\nАлгоритм: уравнить → моли → масса.",
    blockRulesReady: "✅ **Шпора готова** — таблица растворимости и валентности.",
    blockTasksReady: "✅ **Шпора готова** — типовые цепочки органики.",
    testCorrect: "✅ **Верно!** Валентность углерода в органике — IV.",
    testWrong: "❌ **Неверно.** Пересмотри строение молекулы метана CH₄.",
    testComplete: "🏁 **Итог:** 2/3 · 67%.\nПовтори органику — день 3 SOS.",
    aiTutorFreeReply:
      "🤖 **Разбор:**\nПри ОВР: 1) расставь степени окисления, 2) найди окислитель и восстановитель, 3) составь электронный баланс.\n\n*Пример:* Fe + CuSO₄ → FeSO₄ + Cu.",
    expressTestQuestions: [
      {
        text: "Валентность C в CH₄:",
        optionA: "IV",
        optionB: "II",
        correct: "a",
      },
      {
        text: "Формула серной кислоты:",
        optionA: "H₂SO₄",
        optionB: "H₂SO₃",
        correct: "a",
      },
      {
        text: "pH нейтральной среды:",
        optionA: "7",
        optionB: "0",
        correct: "a",
      },
    ],
    progressChart: {
      topics: [
        { label: "Неорганика", value: 71 },
        { label: "Органика", value: 58 },
        { label: "Расчёты", value: 65 },
      ],
    },
  },
  physics: {
    emergency:
      "🎯 **Хаб: ⚛️ Физика**\n\n🚨 Аптечка: механика · электричество · оптика.\nЗастрял? 🤖 *Разбор с ИИ*.",
    topTopics:
      "🔥 **ТОП-темы:**\n1. Законы Ньютона и динамика\n2. Закон Ома и цепи\n3. Линзы и преломление",
    sosPlan:
      "📅 **SOS-план (7 дней):**\nДень 1–2: механика · 3–4: МКТ и термодинамика · 5–6: электричество · 7: задачи №1–26",
    expressTest: "⚡ **Экспресс-тест по физике.**\n3 вопроса:",
    part2: "📐 **Вторая часть (физика).**\nВыбери задание:",
    task27: "📝 **Задание 25** — качественная задача.\nМетод: явление → закон → объяснение.",
    task28: "📝 **Задание 26** — расчётная задача.\nСхема: дано → СИ → формула → ответ.",
    blockRulesReady: "✅ **Шпора готова** — формулы механики и электричества.",
    blockTasksReady: "✅ **Шпора готова** — алгоритмы задач №1–24.",
    testCorrect: "✅ **Верно!** F = ma — второй закон Ньютона.",
    testWrong: "❌ **Неверно.** Пересмотри связь силы, массы и ускорения.",
    testComplete: "🏁 **Итог:** 2/3 · 67%.\nПовтори механику — день 1 SOS.",
    aiTutorFreeReply:
      "🤖 **Разбор:**\nДля задачи на движение: 1) выбери систему отсчёта, 2) запиши законы сохранения, 3) реши систему уравнений.\n\n*Пример:* v = s/t при равномерном движении.",
    expressTestQuestions: [
      {
        text: "Единица силы в СИ:",
        optionA: "Ньютон (Н)",
        optionB: "Джоуль (Дж)",
        correct: "a",
      },
      {
        text: "Закон Ома: U =",
        optionA: "I · R",
        optionB: "I / R",
        correct: "a",
      },
      {
        text: "Ускорение свободного падения g ≈",
        optionA: "10 м/с²",
        optionB: "5 м/с²",
        correct: "a",
      },
    ],
    progressChart: {
      topics: [
        { label: "Механика", value: 79 },
        { label: "Электричество", value: 64 },
        { label: "Оптика", value: 70 },
      ],
    },
  },
};

const enSubjects: SubjectContentMap = {
  russian: {
    emergency:
      "🎯 **Hub: 🇷🇺 Russian**\n\n🚨 Kit: TOP topics · SOS-plan · express test.\nMistake? 🤖 *Explain with AI*.",
    topTopics: "🔥 **TOP:**\n1. Commas with participles\n2. Syntax analysis\n3. Essay №27",
    sosPlan:
      "📅 **7-day SOS:**\nDay 1–2: spelling · 3–4: punctuation · 5–6: essay · 7: weak topics review",
    expressTest: "⚡ **Russian express test.**\n3 questions:",
    part2: "📐 **Part 2 (Russian).**\nPick a task:",
    task27: "📝 **Task 27** — essay. Criteria K1–K12.",
    task28: "📝 **Task 28** — stylistic analysis.",
    blockRulesReady: "✅ **Sheet ready** — spelling & punctuation.",
    blockTasksReady: "✅ **Sheet ready** — tasks №1–26 algorithms.",
    testCorrect: "✅ **Correct!** Comma after the adverbial phrase.",
    testWrong: "❌ **Not quite.** Review compound sentence rules.",
    testComplete: "🏁 **Result:** 2/3 · 67%. Weak: compound sentences.",
    aiTutorFreeReply:
      "🤖 **Review:**\nComma with participial phrase is **required** when it follows the modified word.",
    expressTestQuestions: [
      {
        text: "Where is the comma?\n«When (A) the sun set (B) we went home»",
        optionA: "(A) — after «set»",
        optionB: "(B) — not needed",
        correct: "a",
      },
      {
        text: "Spelling «beauti__ful»:",
        optionA: "beautiful",
        optionB: "beautifull",
        correct: "a",
      },
      {
        text: "Clause in «I know that he will come»:",
        optionA: "Object clause",
        optionB: "Relative clause",
        correct: "a",
      },
    ],
    progressChart: {
      topics: [
        { label: "Spelling", value: 82 },
        { label: "Punctuation", value: 68 },
        { label: "Essay", value: 74 },
      ],
    },
  },
  math: {
    emergency: "🎯 **Hub: 📐 Math**\n\n🚨 Kit: calculus · geometry · parameters.",
    topTopics: "🔥 **TOP:**\n1. Derivatives\n2. Solid geometry\n3. Parameters",
    sosPlan: "📅 **7-day SOS:**\nDay 1–2: algebra · 3–4: geometry · 5–6: parameters · 7: tasks №1–19",
    expressTest: "⚡ **Math express test.**\n3 questions:",
    part2: "📐 **Part 2 (Math).**",
    task27: "📝 **Task 13** — equation with parameter.",
    task28: "📝 **Task 14** — geometry proof.",
    blockRulesReady: "✅ **Sheet ready** — algebra & trig formulas.",
    blockTasksReady: "✅ **Sheet ready** — Part 1 algorithms.",
    testCorrect: "✅ **Correct!** Derivative of x² is 2x.",
    testWrong: "❌ **Wrong.** Check power rule differentiation.",
    testComplete: "🏁 **Result:** 2/3 · 67%. Review derivatives.",
    aiTutorFreeReply: "🤖 **Review:**\nFor extrema: find f'(x), set to 0, check sign change.",
    expressTestQuestions: [
      { text: "Derivative of x³:", optionA: "3x²", optionB: "x²", correct: "a" },
      { text: "log₂(8) =", optionA: "3", optionB: "4", correct: "a" },
      { text: "sin 90° =", optionA: "1", optionB: "0", correct: "a" },
    ],
    progressChart: {
      topics: [
        { label: "Algebra", value: 76 },
        { label: "Geometry", value: 62 },
        { label: "Probability", value: 81 },
      ],
    },
  },
  chemistry: {
    emergency: "🎯 **Hub: 🧪 Chemistry**\n\n🚨 Kit: organic · inorganic · calculations.",
    topTopics: "🔥 **TOP:**\n1. Organic chemistry\n2. Redox reactions\n3. Mass fraction problems",
    sosPlan: "📅 **7-day SOS:**\nDay 1–2: inorganic · 3–4: organic · 5–6: calculations · 7: tasks №23–34",
    expressTest: "⚡ **Chemistry express test.**",
    part2: "📐 **Part 2 (Chemistry).**",
    task27: "📝 **Task 33** — transformation chain.",
    task28: "📝 **Task 34** — stoichiometry calculation.",
    blockRulesReady: "✅ **Sheet ready** — solubility table & valency.",
    blockTasksReady: "✅ **Sheet ready** — organic reaction chains.",
    testCorrect: "✅ **Correct!** Carbon valency is IV.",
    testWrong: "❌ **Wrong.** Review methane CH₄ structure.",
    testComplete: "🏁 **Result:** 2/3 · 67%. Review organic chemistry.",
    aiTutorFreeReply: "🤖 **Review:**\nFor redox: assign oxidation states, balance electrons.",
    expressTestQuestions: [
      { text: "Valency of C in CH₄:", optionA: "IV", optionB: "II", correct: "a" },
      { text: "Sulfuric acid formula:", optionA: "H₂SO₄", optionB: "H₂SO₃", correct: "a" },
      { text: "Neutral pH:", optionA: "7", optionB: "0", correct: "a" },
    ],
    progressChart: {
      topics: [
        { label: "Inorganic", value: 71 },
        { label: "Organic", value: 58 },
        { label: "Calculations", value: 65 },
      ],
    },
  },
  physics: {
    emergency: "🎯 **Hub: ⚛️ Physics**\n\n🚨 Kit: mechanics · electricity · optics.",
    topTopics: "🔥 **TOP:**\n1. Newton's laws\n2. Ohm's law\n3. Lenses & refraction",
    sosPlan: "📅 **7-day SOS:**\nDay 1–2: mechanics · 3–4: thermodynamics · 5–6: electricity · 7: tasks №1–26",
    expressTest: "⚡ **Physics express test.**",
    part2: "📐 **Part 2 (Physics).**",
    task27: "📝 **Task 25** — qualitative problem.",
    task28: "📝 **Task 26** — calculation problem.",
    blockRulesReady: "✅ **Sheet ready** — mechanics & electricity formulas.",
    blockTasksReady: "✅ **Sheet ready** — tasks №1–24 algorithms.",
    testCorrect: "✅ **Correct!** F = ma.",
    testWrong: "❌ **Wrong.** Review Newton's second law.",
    testComplete: "🏁 **Result:** 2/3 · 67%. Review mechanics.",
    aiTutorFreeReply: "🤖 **Review:**\nFor motion: choose reference frame, write conservation laws.",
    expressTestQuestions: [
      { text: "SI unit of force:", optionA: "Newton (N)", optionB: "Joule (J)", correct: "a" },
      { text: "Ohm's law: U =", optionA: "I · R", optionB: "I / R", correct: "a" },
      { text: "g ≈", optionA: "10 m/s²", optionB: "5 m/s²", correct: "a" },
    ],
    progressChart: {
      topics: [
        { label: "Mechanics", value: 79 },
        { label: "Electricity", value: 64 },
        { label: "Optics", value: 70 },
      ],
    },
  },
};

const amSubjects: SubjectContentMap = {
  russian: {
    ...ruSubjects.russian,
    emergency: "🎯 **Հաբ: 🇷🇺 Ռուսերեն**\n\n🚨 TOP թեմաներ · SOS-պլան · էքսպրես թեստ:",
    topTopics: "🔥 **TOP:**\n1. Ստորակետներ\n2. Շարահյուսություն\n3. Կոմպոզիցիա №27",
    sosPlan: "📅 **SOS 7 օր:**\nՕր 1–2: ուղղագրություն · 3–4: կետադրություն · 5–6: կոմպոզիցիա · 7: կրկնում",
    expressTest: "⚡ **Ռուսերենի էքսպրես թեստ:**",
    progressChart: {
      topics: [
        { label: "Ուղղագրություն", value: 82 },
        { label: "Կետադրություն", value: 68 },
        { label: "Կոմպոզիցիա", value: 74 },
      ],
    },
  },
  math: {
    ...ruSubjects.math,
    emergency: "🎯 **Հաբ: 📐 Մաթեմատիկա**\n\n🚨 Ալգեբրա · երկրաչափություն · պարամետրեր:",
    topTopics: "🔥 **TOP:**\n1. Ածանցներ\n2. Ստերեոմետրիա\n3. Պարամետրեր",
    sosPlan: "📅 **SOS 7 օր:**\nՕր 1–2: ալգեբրա · 3–4: երկրաչափություն · 5–6: պարամետրեր",
    expressTest: "⚡ **Մաթեմատիկայի էքսպրես թեստ:**",
    progressChart: {
      topics: [
        { label: "Ալգեբրա", value: 76 },
        { label: "Երկրաչափություն", value: 62 },
        { label: "Հավանականություն", value: 81 },
      ],
    },
  },
  chemistry: {
    ...ruSubjects.chemistry,
    emergency: "🎯 **Հաբ: 🧪 Քիմիա**\n\n🚨 Օրգանիկա · անօրգանիկ · հաշվարկներ:",
    topTopics: "🔥 **TOP:**\n1. Օրգանական քիմիա\n2. ՕՎՀ\n3. Զանգվածային բաժին",
    sosPlan: "📅 **SOS 7 օր:**\nՕր 1–2: անօրգանիկ · 3–4: օրգանիկ · 5–6: հաշվարկներ",
    expressTest: "⚡ **Քիմիայի էքսպրես թեստ:**",
    progressChart: {
      topics: [
        { label: "Անօրգանիկ", value: 71 },
        { label: "Օրգանիկ", value: 58 },
        { label: "Հաշվարկներ", value: 65 },
      ],
    },
  },
  physics: {
    ...ruSubjects.physics,
    emergency: "🎯 **Հաբ: ⚛️ Ֆիզիկա**\n\n🚨 Մեխանիկա · էլեկտրականություն · օպտիկա:",
    topTopics: "🔥 **TOP:**\n1. Նյուտոնի օրենքներ\n2. Օհմի օրենք\n3. Ոսպնյանք",
    sosPlan: "📅 **SOS 7 օր:**\nՕր 1–2: մեխանիկա · 3–4: էլեկտրականություն · 5–6: օպտիկա",
    expressTest: "⚡ **Ֆիզիկայի էքսպրես թեստ:**",
    progressChart: {
      topics: [
        { label: "Մեխանիկա", value: 79 },
        { label: "Էլեկտրականություն", value: 64 },
        { label: "Օպտիկա", value: 70 },
      ],
    },
  },
};

export const subjectContentByLanguage: Record<Language, SubjectContentMap> = {
  ru: ruSubjects,
  en: enSubjects,
  am: amSubjects,
};

/** Keys resolved from per-subject content when a subject is selected */
export const SUBJECT_SCOPED_KEYS = new Set<keyof SubjectContent>([
  "emergency",
  "topTopics",
  "sosPlan",
  "expressTest",
  "part2",
  "task27",
  "task28",
  "blockRulesReady",
  "blockTasksReady",
  "testCorrect",
  "testWrong",
  "testComplete",
  "aiTutorFreeReply",
]);

const KEY_TO_SUBJECT_FIELD: Partial<Record<string, keyof SubjectContent>> = {
  emergency: "emergency",
  topTopics: "topTopics",
  sosPlan: "sosPlan",
  expressTest: "expressTest",
  part2: "part2",
  task27: "task27",
  task28: "task28",
  blockRulesReady: "blockRulesReady",
  blockTasksReady: "blockTasksReady",
  testCorrect: "testCorrect",
  testWrong: "testWrong",
  testComplete: "testComplete",
  aiTutorFreeReply: "aiTutorFreeReply",
};

export function getSubjectContent(
  language: Language,
  subject: SubjectId
): SubjectContent {
  return subjectContentByLanguage[language][subject];
}

export function resolveSubjectBotText(
  language: Language,
  subject: SubjectId | null,
  key: string,
  fallback: string
): string {
  if (!subject) return fallback;
  const field = KEY_TO_SUBJECT_FIELD[key];
  if (!field) return fallback;
  return subjectContentByLanguage[language][subject][field];
}

export const DEFAULT_SUBJECT: SubjectId = "russian";
