import type { Language } from "@/lib/types";

export type ServiceTierId = "hooks" | "packages" | "flagship" | "retainer";

export interface ServiceItem {
  id: string;
  name: string;
  price: string;
  timeline?: string;
  audience?: string;
  description: string;
  deliverables: string[];
  note?: string;
  featured?: boolean;
}

export interface ServiceTier {
  id: ServiceTierId;
  level: string;
  title: string;
  subtitle: string;
  items: ServiceItem[];
}

export interface ServicesCopy {
  heroTitle: string;
  heroSubtitle: string;
  bookCall: string;
  forWhom: string;
  includes: string;
  timeline: string;
  tiers: ServiceTier[];
}

const en: ServicesCopy = {
  heroTitle: "Services & Pricing",
  heroSubtitle:
    "Transparent B2B packages — from a quick audit to a full AI product launch. Fixed scope, fixed price.",
  bookCall: "Book an Intro Call",
  forWhom: "For whom",
  includes: "What's included",
  timeline: "Timeline",
  tiers: [
    {
      id: "hooks",
      level: "Level 1",
      title: "Entry B2B Products",
      subtitle: "The Hooks — fixed-price offers to prove quality and move clients to larger engagements.",
      items: [
        {
          id: "audit",
          name: "AI Automation Audit & Consulting",
          price: "$450",
          description:
            "A 90-minute call plus an interactive B2B roadmap in Miro/Notion. We map your process (or site) and outline architecture: which AI models to deploy, how to connect frontend to Supabase, and what to automate.",
          deliverables: [
            "90-min strategy call",
            "Interactive process map in Miro/Notion",
            "AI stack & automation recommendations",
          ],
          note: "~50% of audits convert into a full build with us.",
        },
        {
          id: "hero",
          name: "High-Converting Web3/AI Hero Section",
          price: "$1,200",
          timeline: "3–5 days",
          description:
            "Design and fullstack development of your site's hero in Neo Studio style — interactive 3D/AI element, glass forms, premium typography.",
          deliverables: [
            "Hero concept & visual design",
            "Next.js + Tailwind implementation",
            "Motion & responsive polish",
          ],
        },
      ],
    },
    {
      id: "packages",
      level: "Level 2",
      title: "Productized Services",
      subtitle: "Core tier grid — clearly scoped packages for Western B2B buyers.",
      items: [
        {
          id: "aesthetic-web",
          name: "Aesthetic Web",
          price: "$3,500",
          timeline: "10–14 days",
          featured: true,
          audience:
            "Pre-seed startups, crypto projects, AI SaaS — teams that need to look like a million dollars before investors.",
          description: "Premium design & frontend package.",
          deliverables: [
            "Unique Figma concept (up to 5 pages)",
            "Blazing-fast Next.js / Tailwind frontend",
            "Framer Motion micro-interactions",
            "Desktop & mobile responsive, basic SEO",
          ],
        },
        {
          id: "ai-core-mvp",
          name: "AI Core MVP",
          price: "$6,000",
          timeline: "14–21 days",
          featured: true,
          audience:
            "Companies that need a working B2B product with AI inside — not just a landing page.",
          description: "Fullstack + AI integration package.",
          deliverables: [
            "Database & backend on Supabase / FastAPI / PostgreSQL",
            "Custom AI tools via API (ComfyUI/RunPod media, LLM agents, smart chat)",
            "Auth & Stripe payments integrated",
            "Clean functional dashboard UI/UX",
          ],
        },
      ],
    },
    {
      id: "flagship",
      level: "Level 3",
      title: "Flagship Package",
      subtitle: "Full-cycle B2B production for complex product launches.",
      items: [
        {
          id: "neo-venture",
          name: "Neo Venture",
          price: "$12,000 – $15,000+",
          timeline: "30–45 days",
          featured: true,
          audience:
            "International startups, EdTech platforms, B2B SaaS launching a complex product from zero.",
          description: "Product from scratch — research to deploy.",
          deliverables: [
            "Market research & UX architecture",
            "Premium custom design (20+ screens/states)",
            "Fullstack Next.js + Supabase + heavy AI workflows (video gen, advanced bots)",
            "QA, deploy on custom infrastructure",
            "Bonus: 1 month post-launch technical support",
          ],
        },
      ],
    },
    {
      id: "retainer",
      level: "Level 4",
      title: "Recurring Revenue",
      subtitle: "In-house team on demand — for ongoing product iteration.",
      items: [
        {
          id: "neo-dedicated",
          name: "Neo Dedicated",
          price: "$4,500 / month",
          featured: true,
          description:
            "Dedicated pool of fullstack & design hours. Tasks go into Notion — new features, page redesigns, AI API endpoints — executed in priority order.",
          deliverables: [
            "Dedicated development & design capacity",
            "One active task at a time",
            "Small tasks delivered in 24–48 hours",
            "Notion-based task queue",
          ],
        },
      ],
    },
  ],
};

const ru: ServicesCopy = {
  heroTitle: "Услуги и прайс",
  heroSubtitle:
    "Прозрачные B2B-пакеты — от быстрого аудита до полноценного AI-продукта. Фиксированный scope и цена.",
  bookCall: "Записаться на созвон",
  forWhom: "Для кого",
  includes: "Что входит",
  timeline: "Срок",
  tiers: [
    {
      id: "hooks",
      level: "Уровень 1",
      title: "Входные B2B-продукты",
      subtitle:
        "The Hooks — продукты с фиксированной ценой, чтобы клиент легко расстался с первыми деньгами и пошёл на большой чек.",
      items: [
        {
          id: "audit",
          name: "AI Automation Audit & Consulting",
          price: "$450",
          description:
            "Полуторачасовой созвон + интерактивная B2B-карта в Miro/Notion. Анализируем процесс (или сайт) и расписываем архитектуру: какие AI-модели внедрить, как связать фронтенд с Supabase и автоматизировать рутину.",
          deliverables: [
            "90-минутный стратегический созвон",
            "Интерактивная карта процессов в Miro/Notion",
            "Рекомендации по AI-стеку и автоматизации",
          ],
          note: "~50% аудитов конвертируются в заказ на разработку у нас.",
        },
        {
          id: "hero",
          name: "High-Converting Web3/AI Hero Section",
          price: "$1,200",
          timeline: "3–5 дней",
          description:
            "Дизайн и fullstack-разработка главного экрана в фирменном стиле Neo Studio — интерактивный 3D/AI-элемент, стеклянные формы, идеальная типографика.",
          deliverables: [
            "Концепт и визуальный дизайн hero",
            "Реализация на Next.js + Tailwind",
            "Анимации и адаптив",
          ],
        },
      ],
    },
    {
      id: "packages",
      level: "Уровень 2",
      title: "Пакетные решения",
      subtitle: "Основная сетка тарифов для западного B2B-рынка.",
      items: [
        {
          id: "aesthetic-web",
          name: "Aesthetic Web",
          price: "$3,500",
          timeline: "10–14 дней",
          featured: true,
          audience:
            "Стартапы на стадии презентации, крипто-проекты, AI-SaaS — нужно выглядеть на миллион перед инвесторами.",
          description: "Premium Design & Frontend.",
          deliverables: [
            "Уникальный концепт в Figma (до 5 страниц)",
            "Сверхбыстрый фронтенд на Next.js / Tailwind CSS",
            "Сложные B2B-анимации (Framer Motion)",
            "Адаптив, базовая SEO-оптимизация",
          ],
        },
        {
          id: "ai-core-mvp",
          name: "AI Core MVP",
          price: "$6,000",
          timeline: "14–21 день",
          featured: true,
          audience:
            "Компании, которым нужен работающий B2B-продукт с искусственным интеллектом внутри.",
          description: "Fullstack + AI Integration.",
          deliverables: [
            "Архитектура БД и бэкенда на Supabase / FastAPI / PostgreSQL",
            "Кастомные AI-инструменты через API (ComfyUI/RunPod, LLM-агенты, чаты)",
            "Auth и Stripe",
            "Чистый UI/UX дашборда",
          ],
        },
      ],
    },
    {
      id: "flagship",
      level: "Уровень 3",
      title: "Флагманский пакет",
      subtitle: "Full-cycle B2B-продакшн для сложных запусков.",
      items: [
        {
          id: "neo-venture",
          name: "Neo Venture",
          price: "$12,000 – $15,000+",
          timeline: "30–45 дней",
          featured: true,
          audience:
            "Крупные зарубежные стартапы, EdTech, B2B-SaaS — сложный продукт с нуля под ключ.",
          description: "Product from Scratch.",
          deliverables: [
            "Исследование рынка и UX-архитектура",
            "Премиальный дизайн платформы (20+ экранов)",
            "Fullstack Next.js + Supabase + тяжёлые AI-воркфлоу",
            "Тестирование и деплой",
            "Бонус: 1 месяц техподдержки после релиза",
          ],
        },
      ],
    },
    {
      id: "retainer",
      level: "Уровень 4",
      title: "Модель удержания",
      subtitle: "In-house команда на аутсорсе для постоянной работы.",
      items: [
        {
          id: "neo-dedicated",
          name: "Neo Dedicated",
          price: "$4,500 / месяц",
          featured: true,
          description:
            "Выделенный пул часов fullstack и дизайна. Задачи в Notion — фичи, страницы, API для AI-бота — выполняем по очереди.",
          deliverables: [
            "Выделенная ёмкость разработки и дизайна",
            "Одна активная задача в моменте",
            "Мелкие таски за 24–48 часов",
            "Очередь задач в Notion",
          ],
        },
      ],
    },
  ],
};

const am: ServicesCopy = {
  heroTitle: "Ծառայություններ և գներ",
  heroSubtitle:
    "Թափանցիկ B2B փաթեթներ՝ արագ աուդիտից մինչև ամբողջական AI արտադրանք։",
  bookCall: "Պայմանավորվել զանգ",
  forWhom: "Ում համար",
  includes: "Ինչ է ներառված",
  timeline: "Ժամկետ",
  tiers: [
    {
      id: "hooks",
      level: "Մակարդակ 1",
      title: "Մուտքային B2B արտադրանքներ",
      subtitle: "The Hooks — ֆիքսված գնով առաջին քայլեր մեծ նախագծերի համար։",
      items: [
        {
          id: "audit",
          name: "AI Automation Audit & Consulting",
          price: "$450",
          description:
            "90 րոպե զանգ + ինտերակտիվ B2B քարտեզ Miro/Notion-ում։ Վերլուծում ենք գործընթացը և AI արխիտեկտուրան։",
          deliverables: [
            "90 րոպե ռազմավարական զանգ",
            "Miro/Notion քարտեզ",
            "AI stack խորհուրդներ",
          ],
          note: "~50% աուդիտներ դառնում են ամբողջական նախագիծ։",
        },
        {
          id: "hero",
          name: "High-Converting Web3/AI Hero Section",
          price: "$1,200",
          timeline: "3–5 օր",
          description:
            "Hero էկրանի դիզայն և fullstack՝ ինտերակտիվ 3D/AI, glass UI, պրեմիում տիպոգրաֆիա։",
          deliverables: [
            "Hero կոնցեպտ",
            "Next.js + Tailwind",
            "Անիմացիաներ և ադապտիվ",
          ],
        },
      ],
    },
    {
      id: "packages",
      level: "Մակարդակ 2",
      title: "Փաթեթային լուծումներ",
      subtitle: "Հիմնական B2B տարրային ցանց։",
      items: [
        {
          id: "aesthetic-web",
          name: "Aesthetic Web",
          price: "$3,500",
          timeline: "10–14 օր",
          featured: true,
          audience: "Ստարտափներ, crypto, AI SaaS — ներդրումներից առաջ պրեմիում տեսք։",
          description: "Premium Design & Frontend.",
          deliverables: [
            "Figma կոնցեպտ (մինչև 5 էջ)",
            "Next.js / Tailwind frontend",
            "Framer Motion անիմացիաներ",
            "Ադապտիվ և SEO",
          ],
        },
        {
          id: "ai-core-mvp",
          name: "AI Core MVP",
          price: "$6,000",
          timeline: "14–21 օր",
          featured: true,
          audience: "Ընկերություններ, որոնց պետք է աշխատող AI արտադրանք։",
          description: "Fullstack + AI Integration.",
          deliverables: [
            "Supabase / FastAPI / PostgreSQL backend",
            "Custom AI API ինտեգրացիա",
            "Auth և Stripe",
            "Dashboard UI/UX",
          ],
        },
      ],
    },
    {
      id: "flagship",
      level: "Մակարդակ 3",
      title: "Օռոգ փաթեթ",
      subtitle: "Full-cycle B2B արտադրություն։",
      items: [
        {
          id: "neo-venture",
          name: "Neo Venture",
          price: "$12,000 – $15,000+",
          timeline: "30–45 օր",
          featured: true,
          audience: "EdTech, B2B SaaS — բարդ արտադրանք զրոյից։",
          description: "Product from Scratch.",
          deliverables: [
            "Հետազոտություն և UX արխիտեկտուրա",
            "20+ էկրանների դիզայն",
            "Fullstack + AI workflows",
            "Deploy և 1 ամիս աջակցություն",
          ],
        },
      ],
    },
    {
      id: "retainer",
      level: "Մակարդակ 4",
      title: "Բաժանորդագրություն",
      subtitle: "In-house թիմ պահանջի հիման վրա։",
      items: [
        {
          id: "neo-dedicated",
          name: "Neo Dedicated",
          price: "$4,500 / ամիս",
          featured: true,
          description: "Նվիրված fullstack և դիզայն ժամեր Notion հերթով։",
          deliverables: [
            "Նվիրված զարգացման հզորություն",
            "Մեկ ակտիվ առաջադրանք",
            "Փոքր թասկեր 24–48 ժամում",
            "Notion հերթ",
          ],
        },
      ],
    },
  ],
};

export const servicesByLanguage: Record<Language, ServicesCopy> = { en, ru, am };

export const TIER_ACCENTS: Record<ServiceTierId, string> = {
  hooks: "#34d399",
  packages: "#60a5fa",
  flagship: "#a78bfa",
  retainer: "#fbbf24",
};
