import type { Language, ProjectId } from "@/lib/types";

export interface CaseMetric {
  value: string;
  label: string;
}

export interface CaseStudy {
  challenge: string;
  solution: string;
  metrics: CaseMetric[];
}

export interface CaseStudiesCopy {
  challengeLabel: string;
  solutionLabel: string;
  resultsLabel: string;
  byProject: Record<ProjectId, CaseStudy>;
}

const en: CaseStudiesCopy = {
  challengeLabel: "Challenge",
  solutionLabel: "Solution",
  resultsLabel: "Results",
  byProject: {
    "petcare-ai": {
      challenge:
        "Vet clinics needed a demo-ready AI product without rebuilding their entire stack.",
      solution:
        "Scoped an MVP with diagnostic AI, feed analysis, and a clinic-facing dashboard — shipped in fixed sprints.",
      metrics: [
        { value: "10 wks", label: "MVP delivered" },
        { value: "3", label: "Clinic workflows" },
        { value: "1", label: "Quarter to partner demo" },
      ],
    },
    "jewelry-store": {
      challenge:
        "Launch a luxury storefront that feels bespoke — not a template — with reliable checkout.",
      solution:
        "Custom Next.js boutique with Stripe, CMS-driven catalog, and motion-led product storytelling.",
      metrics: [
        { value: "6 wks", label: "Launch timeline" },
        { value: "Stripe", label: "Live payments" },
        { value: "100%", label: "Custom UI" },
      ],
    },
    "neuro-academy": {
      challenge:
        "Turn a complex education offer into a clear landing page that generates inbound leads.",
      solution:
        "Editorial layout, structured offer blocks, and conversion-focused UX with trilingual support.",
      metrics: [
        { value: "2 wks", label: "From brief to live" },
        { value: "3", label: "Languages" },
        { value: "↑", label: "Lead flow from week 1" },
      ],
    },
    "neuro-shpora": {
      challenge:
        "Students needed exam prep that works inside Telegram — fast, contextual, and always available.",
      solution:
        "Agentic bot with subject flows, SOS kits, streaming AI tutor, and Redis-backed session memory.",
      metrics: [
        { value: "12+", label: "Exam subjects" },
        { value: "24/7", label: "AI tutor" },
        { value: "<2s", label: "First response" },
      ],
    },
    "blessed-angel": {
      challenge:
        "Premium accessories brand needed an interactive experience, not a static catalog.",
      solution:
        "3D-inspired configurator with Framer Motion, brand-led visuals, and checkout-ready flows.",
      metrics: [
        { value: "3D", label: "Configurator UX" },
        { value: "8 wks", label: "Concept to launch" },
        { value: "↑", label: "Engagement vs catalog" },
      ],
    },
  },
};

const ru: CaseStudiesCopy = {
  challengeLabel: "Задача",
  solutionLabel: "Решение",
  resultsLabel: "Результат",
  byProject: {
    "petcare-ai": {
      challenge:
        "Ветклиникам нужен был AI-продукт для демо партнёрам без перестройки всего стека.",
      solution:
        "MVP с диагностическим AI, анализом кормов и клиническим дашбордом — фиксированные спринты.",
      metrics: [
        { value: "10 нед", label: "MVP в продакшн" },
        { value: "3", label: "Workflow клиники" },
        { value: "1", label: "Квартал до демо" },
      ],
    },
    "jewelry-store": {
      challenge:
        "Запустить luxury-магазин с ощущением бутика, а не шаблона, с надёжной оплатой.",
      solution:
        "Кастомный Next.js бутик со Stripe, CMS-каталогом и motion-историями вокруг продуктов.",
      metrics: [
        { value: "6 нед", label: "Срок запуска" },
        { value: "Stripe", label: "Оплата в проде" },
        { value: "100%", label: "Кастомный UI" },
      ],
    },
    "neuro-academy": {
      challenge:
        "Превратить сложный образовательный оффер в понятный лендинг с входящими заявками.",
      solution:
        "Редакционная вёрстка, структура оффера и UX на конверсию с поддержкой трёх языков.",
      metrics: [
        { value: "2 нед", label: "От брифа до релиза" },
        { value: "3", label: "Языка" },
        { value: "↑", label: "Заявки с 1-й недели" },
      ],
    },
    "neuro-shpora": {
      challenge:
        "Студентам нужна подготовка к экзаменам прямо в Telegram — быстро и с контекстом.",
      solution:
        "Агентный бот с предметами, SOS-наборами, streaming AI-репетитором и памятью сессий в Redis.",
      metrics: [
        { value: "12+", label: "Предметов ЕГЭ" },
        { value: "24/7", label: "AI-репетитор" },
        { value: "<2с", label: "Первый ответ" },
      ],
    },
    "blessed-angel": {
      challenge:
        "Премиальному бренду аксессуаров нужен интерактив, а не статичный каталог.",
      solution:
        "Конфигуратор с 3D-эстетикой, Framer Motion, визуалом бренда и готовностью к checkout.",
      metrics: [
        { value: "3D", label: "Конфигуратор" },
        { value: "8 нед", label: "От концепта" },
        { value: "↑", label: "Вовлечённость" },
      ],
    },
  },
};

const am: CaseStudiesCopy = {
  challengeLabel: "Խնդիր",
  solutionLabel: "Լուծում",
  resultsLabel: "Արդյունք",
  byProject: {
    "petcare-ai": {
      challenge:
        "Վետկլինիկաներին պետք էր AI արտադրանք գործընկերներին ցույց տալու համար՝ առանց ամբողջ stack-ը փոխելու։",
      solution:
        "MVP ախտորոշական AI-ով, կերերի վերլուծությամբ և կլինիկական dashboard-ով՝ ֆիքսված sprint-երով։",
      metrics: [
        { value: "10 շ", label: "MVP գործարկում" },
        { value: "3", label: "Workflow" },
        { value: "1", label: "Եռամսյակ դեմո" },
      ],
    },
    "jewelry-store": {
      challenge:
        "Գործարկել luxury խանութ բուտիկի զգացողությամբ, ոչ թե կաղապար, հուսալի checkout-ով։",
      solution:
        "Պատվերով Next.js բուտիկ Stripe-ով, CMS կատալոգով և motion-պատմություններով։",
      metrics: [
        { value: "6 շ", label: "Գործարկման ժամկետ" },
        { value: "Stripe", label: "Վճարումներ" },
        { value: "100%", label: "Custom UI" },
      ],
    },
    "neuro-academy": {
      challenge:
        "Բարդ կրթական առաջարկը դարձնել պարզ լենդինգ՝ մուտքային դիմումներ ստանալու համար։",
      solution:
        "Խմբագրական դիզայն, առաջարկի կառուցվածք և կոնվերսիային UX երեք լեզվով։",
      metrics: [
        { value: "2 շ", label: "Բրիֆից մինչև live" },
        { value: "3", label: "Լեզու" },
        { value: "↑", label: "Դիմումներ 1-ին շաբաթ" },
      ],
    },
    "neuro-shpora": {
      challenge:
        "Աբիտուրիենտներին պետք էր քննության նախապատրաստություն Telegram-ում՝ արագ և համատեքստային։",
      solution:
        "Ագենտային բոտ առարկաներով, SOS հավաքածուներով, streaming AI դասատուով և Redis հիշողությամբ։",
      metrics: [
        { value: "12+", label: "Առարկա" },
        { value: "24/7", label: "AI դասատու" },
        { value: "<2վ", label: "Առաջին պատասխան" },
      ],
    },
    "blessed-angel": {
      challenge:
        "Պրեմիում աքսեսուարների բրենդին պետք էր ինտերակտիվ փորձ, ոչ թե ստատիկ կատալոգ։",
      solution:
        "3D-գունավոր կոնֆիգուրատոր Framer Motion-ով, բրենդային վիզուալ և checkout-ready հոսքեր։",
      metrics: [
        { value: "3D", label: "Կոնֆիգուրատոր" },
        { value: "8 շ", label: "Կոնցեպտից" },
        { value: "↑", label: "Ներգրավվածություն" },
      ],
    },
  },
};

export const caseStudiesByLanguage: Record<Language, CaseStudiesCopy> = {
  en,
  ru,
  am,
};
