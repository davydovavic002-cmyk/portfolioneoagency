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
        "Scoped an MVP with diagnostic AI, feed analysis, and a clinic-facing dashboard — shipped in 18 days on the AI Core MVP package.",
      metrics: [
        { value: "18 days", label: "MVP delivered" },
        { value: "3", label: "Clinic workflows" },
        { value: "AI Core", label: "Package tier" },
      ],
    },
    "jewelry-store": {
      challenge:
        "Launch a luxury storefront that feels bespoke — not a template — with reliable checkout.",
      solution:
        "Custom Next.js boutique with Stripe, CMS-driven catalog, and motion-led product storytelling.",
      metrics: [
        { value: "12 days", label: "Launch timeline" },
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
        { value: "12 days", label: "From brief to live" },
        { value: "3", label: "Languages" },
        { value: "↑", label: "Leads from week 1" },
      ],
    },
    "neuro-shpora": {
      challenge:
        "Students needed exam prep that works inside Telegram — fast, contextual, and always available.",
      solution:
        "Agentic bot with subject flows, SOS kits, streaming AI tutor — delivered in 12 days on the Telegram AI Bot package.",
      metrics: [
        { value: "12 days", label: "Bot delivered" },
        { value: "12+", label: "Exam subjects" },
        { value: "<2s", label: "First response" },
      ],
    },
    "blessed-angel": {
      challenge:
        "Premium accessories brand needed an interactive experience, not a static catalog.",
      solution:
        "3D-inspired configurator with Framer Motion, brand-led visuals, and checkout-ready flows.",
      metrics: [
        { value: "14 days", label: "Concept to launch" },
        { value: "3D", label: "Configurator UX" },
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
        { value: "18 дн", label: "MVP в продакшн" },
        { value: "3", label: "Workflow клиники" },
        { value: "AI Core", label: "Пакет" },
      ],
    },
    "jewelry-store": {
      challenge:
        "Запустить luxury-магазин с ощущением бутика, а не шаблона, с надёжной оплатой.",
      solution:
        "Кастомный Next.js бутик со Stripe, CMS-каталогом и motion-историями вокруг продуктов.",
      metrics: [
        { value: "12 дн", label: "Срок запуска" },
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
        { value: "12 дн", label: "От брифа до релиза" },
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
        { value: "12 дн", label: "Бот в проде" },
        { value: "12+", label: "Предметов ЕГЭ" },
        { value: "<2с", label: "Первый ответ" },
      ],
    },
    "blessed-angel": {
      challenge:
        "Премиальному бренду аксессуаров нужен интерактив, а не статичный каталог.",
      solution:
        "Конфигуратор с 3D-эстетикой, Framer Motion, визуалом бренда и готовностью к checkout.",
      metrics: [
        { value: "14 дн", label: "От концепта" },
        { value: "3D", label: "Конфигуратор" },
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
        { value: "18 օր", label: "MVP գործարկում" },
        { value: "3", label: "Workflow" },
        { value: "AI Core", label: "Փաթեթ" },
      ],
    },
    "jewelry-store": {
      challenge:
        "Գործարկել luxury խանութ բուտիկի զգացողությամբ, ոչ թե կաղապար, հուսալի checkout-ով։",
      solution:
        "Պատվերով Next.js բուտիկ Stripe-ով, CMS կատալոգով և motion-պատմություններով։",
      metrics: [
        { value: "12 օր", label: "Գործարկման ժամկետ" },
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
        { value: "12 օր", label: "Բրիֆից մինչև live" },
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
        { value: "12 օր", label: "Բոտի գործարկում" },
        { value: "12+", label: "Առարկա" },
        { value: "<2վ", label: "Առաջին պատասխան" },
      ],
    },
    "blessed-angel": {
      challenge:
        "Պրեմիում աքսեսուարների բրենդին պետք էր ինտերակտիվ փորձ, ոչ թե ստատիկ կատալոգ։",
      solution:
        "3D-գունավոր կոնֆիգուրատոր Framer Motion-ով, բրենդային վիզուալ և checkout-ready հոսքեր։",
      metrics: [
        { value: "14 օր", label: "Կոնցեպտից" },
        { value: "3D", label: "Կոնֆիգուրատոր" },
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
