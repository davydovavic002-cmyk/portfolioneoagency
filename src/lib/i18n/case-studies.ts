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
    "aura-hair": {
      challenge:
        "A premium salon needed a digital presence that matches in-chair experience — not a generic booking widget.",
      solution:
        "Single-page editorial experience with multi-step booking, stylist profiles, service menu, and hair diagnostics — on the Aesthetic Web package.",
      metrics: [
        { value: "10–14d", label: "Package timeline" },
        { value: "4", label: "Booking steps" },
        { value: "Dark mode", label: "Theme support" },
      ],
    },
    "petcare-ai": {
      challenge:
        "Vet clinics needed a demo-ready AI product without rebuilding their entire stack.",
      solution:
        "Scoped an MVP with diagnostic AI, feed analysis, and a clinic-facing dashboard — on the AI Core MVP package.",
      metrics: [
        { value: "14–21d", label: "Package timeline" },
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
        { value: "14–18d", label: "Package timeline" },
        { value: "Stripe", label: "Live payments" },
        { value: "CMS", label: "Catalog" },
      ],
    },
    "neuro-academy": {
      challenge:
        "Turn a complex education offer into a clear landing page that generates inbound leads.",
      solution:
        "Editorial layout, structured offer blocks, and conversion-focused UX with trilingual support.",
      metrics: [
        { value: "7–10d", label: "Package timeline" },
        { value: "3", label: "Languages" },
        { value: "Landing", label: "Package tier" },
      ],
    },
    "neuro-shpora": {
      challenge:
        "Students needed exam prep that works inside Telegram — fast, contextual, and always available.",
      solution:
        "Agentic bot with subject flows, SOS kits, and streaming AI tutor — on the Telegram AI Bot package.",
      metrics: [
        { value: "10–14d", label: "Package timeline" },
        { value: "12+", label: "Exam subjects" },
        { value: "Telegram", label: "Native UX" },
      ],
    },
    "blessed-angel": {
      challenge:
        "Premium accessories brand needed an interactive experience, not a static catalog.",
      solution:
        "3D-inspired configurator with Framer Motion, brand-led visuals, and checkout-ready flows.",
      metrics: [
        { value: "10–14d", label: "Package timeline" },
        { value: "3D", label: "Configurator UX" },
        { value: "Aesthetic", label: "Package tier" },
      ],
    },
  },
};

const ru: CaseStudiesCopy = {
  challengeLabel: "Задача",
  solutionLabel: "Решение",
  resultsLabel: "Результат",
  byProject: {
    "aura-hair": {
      challenge:
        "Премиальному салону нужен цифровой опыт уровня кресла — не типовой виджет записи.",
      solution:
        "Одностраничный editorial-сайт с многошаговым бронированием, профилями стилистов, меню услуг и диагностикой ухода — пакет «Aesthetic Web».",
      metrics: [
        { value: "10–14д", label: "Срок пакета" },
        { value: "4", label: "Шага записи" },
        { value: "Dark mode", label: "Темы" },
      ],
    },
    "petcare-ai": {
      challenge:
        "Ветклиникам нужен был AI-продукт для демо партнёрам без перестройки всего стека.",
      solution:
        "MVP с диагностическим AI, анализом кормов и клиническим дашбордом — пакет AI Core MVP.",
      metrics: [
        { value: "14–21д", label: "Срок пакета" },
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
        { value: "14–18д", label: "Срок пакета" },
        { value: "Stripe", label: "Оплата в проде" },
        { value: "CMS", label: "Каталог" },
      ],
    },
    "neuro-academy": {
      challenge:
        "Превратить сложный образовательный оффер в понятный лендинг с входящими заявками.",
      solution:
        "Редакционная вёрстка, структура оффера и UX на конверсию с поддержкой трёх языков.",
      metrics: [
        { value: "7–10д", label: "Срок пакета" },
        { value: "3", label: "Языка" },
        { value: "Landing", label: "Пакет" },
      ],
    },
    "neuro-shpora": {
      challenge:
        "Студентам нужна подготовка к экзаменам прямо в Telegram — быстро и с контекстом.",
      solution:
        "Агентный бот с предметами, SOS-наборами, streaming AI-репетитором и памятью сессий в Redis.",
      metrics: [
        { value: "10–14д", label: "Срок пакета" },
        { value: "12+", label: "Предметов ЕГЭ" },
        { value: "Telegram", label: "Нативный UX" },
      ],
    },
    "blessed-angel": {
      challenge:
        "Премиальному бренду аксессуаров нужен интерактив, а не статичный каталог.",
      solution:
        "Конфигуратор с 3D-эстетикой, Framer Motion, визуалом бренда и готовностью к checkout.",
      metrics: [
        { value: "10–14д", label: "Срок пакета" },
        { value: "3D", label: "Конфигуратор" },
        { value: "Aesthetic", label: "Пакет" },
      ],
    },
  },
};

const am: CaseStudiesCopy = {
  challengeLabel: "Խնդիր",
  solutionLabel: "Լուծում",
  resultsLabel: "Արդյունք",
  byProject: {
    "aura-hair": {
      challenge:
        "Պրեմիում սրահին պետք էր թվային փորձ, որը համապատասխանում է աթոռի մակարդակին՝ ոչ թե ստանդարտ ամրագրման վիդջետ։",
      solution:
        "Միաէջ editorial փորձ բազմաստիճան ամրագրման, ստայլիստների պրոֆիլներով, ծառայությունների մենյուով և խնամքի ախտորոշմամբ — Aesthetic Web փաթեթ։",
      metrics: [
        { value: "10–14օ", label: "Փաթեթի ժամկետ" },
        { value: "4", label: "Ամրագրման քայլ" },
        { value: "Dark mode", label: "Թեմաներ" },
      ],
    },
    "petcare-ai": {
      challenge:
        "Վետկլինիկաներին պետք էր AI արտադրանք գործընկերներին ցույց տալու համար՝ առանց ամբողջ stack-ը փոխելու։",
      solution:
        "MVP ախտորոշական AI-ով, կերերի վերլուծությամբ և կլինիկական dashboard-ով՝ AI Core MVP փաթեթով։",
      metrics: [
        { value: "14–21օ", label: "Փաթեթի ժամկետ" },
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
        { value: "14–18օ", label: "Փաթեթի ժամկետ" },
        { value: "Stripe", label: "Վճարումներ" },
        { value: "CMS", label: "Կատալոգ" },
      ],
    },
    "neuro-academy": {
      challenge:
        "Բարդ կրթական առաջարկը դարձնել պարզ լենդինգ՝ մուտքային դիմումներ ստանալու համար։",
      solution:
        "Խմբագրական դիզայն, առաջարկի կառուցվածք և կոնվերսիային UX երեք լեզվով։",
      metrics: [
        { value: "7–10օ", label: "Փաթեթի ժամկետ" },
        { value: "3", label: "Լեզու" },
        { value: "Landing", label: "Փաթեթ" },
      ],
    },
    "neuro-shpora": {
      challenge:
        "Աբիտուրիենտներին պետք էր քննության նախապատրաստություն Telegram-ում՝ արագ և համատեքստային։",
      solution:
        "Ագենտային բոտ առարկաներով, SOS հավաքածուներով, streaming AI դասատուով և Redis հիշողությամբ։",
      metrics: [
        { value: "10–14օ", label: "Փաթեթի ժամկետ" },
        { value: "12+", label: "Առարկա" },
        { value: "Telegram", label: "Native UX" },
      ],
    },
    "blessed-angel": {
      challenge:
        "Պրեմիում աքսեսուարների բրենդին պետք էր ինտերակտիվ փորձ, ոչ թե ստատիկ կատալոգ։",
      solution:
        "3D-գունավոր կոնֆիգուրատոր Framer Motion-ով, բրենդային վիզուալ և checkout-ready հոսքեր։",
      metrics: [
        { value: "10–14օ", label: "Փաթեթի ժամկետ" },
        { value: "3D", label: "Կոնֆիգուրատոր" },
        { value: "Aesthetic", label: "Փաթեթ" },
      ],
    },
  },
};

export const caseStudiesByLanguage: Record<Language, CaseStudiesCopy> = {
  en,
  ru,
  am,
};
