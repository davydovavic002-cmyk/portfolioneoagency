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
    "Transparent packages — from a focused audit to a full product launch. Fixed scope, fixed price.",
  bookCall: "Go to booking",
  forWhom: "For whom",
  includes: "What's included",
  timeline: "Timeline",
  tiers: [
    {
      id: "hooks",
      level: "Level 1",
      title: "Discovery & Quick Wins",
      subtitle: "Focused entry points with clear deliverables — a practical way to start working together.",
      items: [
        {
          id: "audit",
          name: "AI Automation Audit & Consulting",
          price: "$450",
          description:
            "A 90-minute strategy session plus an interactive roadmap in Miro or Notion. We review your product or workflow and outline architecture: which AI models fit, how to connect frontend to Supabase, and what to automate first.",
          deliverables: [
            "90-minute strategy session",
            "Process map in Miro / Notion",
            "AI stack & automation recommendations",
            "Written summary with next-step options",
          ],
        },
        {
          id: "hero",
          name: "High-Converting Web3/AI Hero Section",
          price: "$1,200",
          timeline: "3–5 days",
          description:
            "Design and fullstack development of your landing hero — interactive 3D or AI element, glass UI, premium typography, production-ready code.",
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
      subtitle: "Fixed-scope packages for launches, pitches, and growth-stage products.",
      items: [
        {
          id: "aesthetic-web",
          name: "Aesthetic Web",
          price: "$3,500",
          timeline: "10–14 days",
          featured: true,
          audience:
            "Startups preparing for launch, crypto and AI SaaS teams building a polished, investor-ready presence.",
          description: "Premium design and frontend — brand-first, performance-driven.",
          deliverables: [
            "Unique Figma concept (up to 5 pages)",
            "Next.js / Tailwind frontend",
            "Framer Motion micro-interactions",
            "Desktop & mobile responsive, basic SEO",
          ],
        },
        {
          id: "telegram-bot",
          name: "Telegram AI Bot",
          price: "$4,500",
          timeline: "10–14 days",
          audience:
            "EdTech, support, and SaaS teams that need an AI agent where users already are — Telegram.",
          description:
            "Production-ready Telegram bot with LLM agents, dialog flows, and session memory.",
          deliverables: [
            "Conversation design & bot architecture",
            "Python (aiogram) or Node.js implementation",
            "OpenAI / LLM integration with streaming",
            "Redis or database session memory",
            "Deploy, docs & handoff",
          ],
        },
        {
          id: "ai-core-mvp",
          name: "AI Core MVP",
          price: "$6,000",
          timeline: "14–21 days",
          featured: true,
          audience:
            "Teams that need a working product with real AI inside — not just a marketing site.",
          description: "Fullstack build with AI integration, auth, and payments.",
          deliverables: [
            "Database & backend on Supabase / FastAPI / PostgreSQL",
            "Custom AI tools via API (media gen, LLM agents, smart chat)",
            "Auth & Stripe payments",
            "Functional dashboard UI/UX",
          ],
        },
      ],
    },
    {
      id: "flagship",
      level: "Level 3",
      title: "Flagship Package",
      subtitle: "End-to-end delivery for complex products — from research to production deploy.",
      items: [
        {
          id: "neo-venture",
          name: "Neo Venture",
          price: "$12,000 – $15,000+",
          timeline: "30–45 days",
          featured: true,
          audience:
            "EdTech platforms, B2B SaaS, and teams launching a multi-module product from scratch.",
          description: "Full product build — strategy, design, engineering, and launch.",
          deliverables: [
            "Market research & UX architecture",
            "Premium custom design (20+ screens/states)",
            "Fullstack Next.js + Supabase + advanced AI workflows",
            "QA and production deployment",
            "1 month of post-launch technical support",
          ],
        },
      ],
    },
    {
      id: "retainer",
      level: "Level 4",
      title: "Ongoing Partnership",
      subtitle: "Dedicated capacity for iteration, new features, and long-term product growth.",
      items: [
        {
          id: "neo-dedicated",
          name: "Neo Dedicated",
          price: "$4,500 / month",
          featured: true,
          description:
            "A reserved block of fullstack and design hours each month. You add tasks to Notion — features, redesigns, API work — and we ship them in priority order.",
          deliverables: [
            "Dedicated development & design capacity",
            "One active task at a time",
            "Small tasks delivered within 24–48 hours",
            "Shared Notion task board",
          ],
        },
      ],
    },
  ],
};

const ru: ServicesCopy = {
  heroTitle: "Услуги и прайс",
  heroSubtitle:
    "Прозрачные пакеты — от аудита до полноценного запуска продукта. Фиксированный scope и цена.",
  bookCall: "Перейти к бронированию",
  forWhom: "Для кого",
  includes: "Что входит",
  timeline: "Срок",
  tiers: [
    {
      id: "hooks",
      level: "Уровень 1",
      title: "Старт и быстрые результаты",
      subtitle: "Точечные услуги с понятным результатом — удобный формат для первого проекта.",
      items: [
        {
          id: "audit",
          name: "AI Automation Audit & Consulting",
          price: "$450",
          description:
            "Полуторачасовая сессия + интерактивная карта в Miro/Notion. Разбираем продукт или процесс и описываем архитектуру: какие AI-модели подойдут, как связать фронтенд с Supabase и что автоматизировать в первую очередь.",
          deliverables: [
            "90-минутная стратегическая сессия",
            "Карта процессов в Miro / Notion",
            "Рекомендации по AI-стеку и автоматизации",
            "Письменное резюме и варианты следующих шагов",
          ],
        },
        {
          id: "hero",
          name: "High-Converting Web3/AI Hero Section",
          price: "$1,200",
          timeline: "3–5 дней",
          description:
            "Дизайн и fullstack главного экрана — интерактивный 3D/AI-элемент, glass UI, типографика, готовый production-код.",
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
      subtitle: "Фиксированные пакеты для запусков, питчей и продуктов на стадии роста.",
      items: [
        {
          id: "aesthetic-web",
          name: "Aesthetic Web",
          price: "$3,500",
          timeline: "10–14 дней",
          featured: true,
          audience:
            "Стартапы перед запуском, crypto и AI SaaS — сильный визуал и аккуратный фронтенд для презентации продукта.",
          description: "Premium design и frontend — бренд, скорость, детали.",
          deliverables: [
            "Уникальный концепт в Figma (до 5 страниц)",
            "Фронтенд на Next.js / Tailwind CSS",
            "Микро-анимации на Framer Motion",
            "Адаптив, базовая SEO-оптимизация",
          ],
        },
        {
          id: "telegram-bot",
          name: "Telegram AI Bot",
          price: "$4,500",
          timeline: "10–14 дней",
          audience:
            "EdTech, поддержка и SaaS — AI-агент там, где пользователи уже есть: в Telegram.",
          description:
            "Telegram-бот в продакшн: LLM-агенты, сценарии диалогов и память сессий.",
          deliverables: [
            "Проектирование диалогов и архитектура бота",
            "Реализация на Python (aiogram) или Node.js",
            "Интеграция OpenAI / LLM со streaming",
            "Память сессий в Redis или БД",
            "Деплой, документация и передача",
          ],
        },
        {
          id: "ai-core-mvp",
          name: "AI Core MVP",
          price: "$6,000",
          timeline: "14–21 день",
          featured: true,
          audience:
            "Команды, которым нужен рабочий продукт с AI внутри — не только лендинг.",
          description: "Fullstack + AI, авторизация и платежи.",
          deliverables: [
            "Бэкенд и БД на Supabase / FastAPI / PostgreSQL",
            "AI-инструменты через API (медиа, LLM-агенты, чат)",
            "Auth и Stripe",
            "UI/UX дашборда",
          ],
        },
      ],
    },
    {
      id: "flagship",
      level: "Уровень 3",
      title: "Флагманский пакет",
      subtitle: "Полный цикл для сложных продуктов — от исследования до деплоя.",
      items: [
        {
          id: "neo-venture",
          name: "Neo Venture",
          price: "$12,000 – $15,000+",
          timeline: "30–45 дней",
          featured: true,
          audience:
            "EdTech, B2B SaaS и команды, которые запускают многосоставной продукт с нуля.",
          description: "Продукт под ключ — стратегия, дизайн, разработка, запуск.",
          deliverables: [
            "Исследование и UX-архитектура",
            "Кастомный дизайн (20+ экранов)",
            "Fullstack Next.js + Supabase + AI-воркфлоу",
            "Тестирование и production-деплой",
            "1 месяц техподдержки после релиза",
          ],
        },
      ],
    },
    {
      id: "retainer",
      level: "Уровень 4",
      title: "Постоянное сопровождение",
      subtitle: "Выделенная ёмкость для развития продукта, новых фич и долгосрочной поддержки.",
      items: [
        {
          id: "neo-dedicated",
          name: "Neo Dedicated",
          price: "$4,500 / месяц",
          featured: true,
          description:
            "Зарезервированный объём часов fullstack и дизайна каждый месяц. Задачи в Notion — фичи, редизайн, API — выполняем по приоритету.",
          deliverables: [
            "Выделенная ёмкость разработки и дизайна",
            "Одна активная задача в моменте",
            "Небольшие задачи за 24–48 часов",
            "Общая доска задач в Notion",
          ],
        },
      ],
    },
  ],
};

const am: ServicesCopy = {
  heroTitle: "Ծառայություններ և գներ",
  heroSubtitle:
    "Թափանցիկ փաթեթներ՝ աուդիտից մինչև ամբողջական արտադրանքի գործարկում։",
  bookCall: "Անցնել ամրագրման",
  forWhom: "Ում համար",
  includes: "Ինչ է ներառված",
  timeline: "Ժամկետ",
  tiers: [
    {
      id: "hooks",
      level: "Մակարդակ 1",
      title: "Սկիզբ և արագ արդյունք",
      subtitle: "Կենտրոնացված առաջարկներ հստակ արդյունքով։",
      items: [
        {
          id: "audit",
          name: "AI Automation Audit & Consulting",
          price: "$450",
          description:
            "90 րոպե ռազմավարական սեսիա + ինտերակտիվ քարտեզ Miro/Notion-ում։ Վերլուծում ենք արտադրանքը և AI արխիտեկտուրան։",
          deliverables: [
            "90 րոպե ռազմավարական սեսիա",
            "Miro / Notion քարտեզ",
            "AI stack խորհուրդներ",
            "Գրավոր ամփոփում և հաջորդ քայլեր",
          ],
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
      subtitle: "Ֆիքսված scope-ով փաթեթներ գործարկման և աճի համար։",
      items: [
        {
          id: "aesthetic-web",
          name: "Aesthetic Web",
          price: "$3,500",
          timeline: "10–14 օր",
          featured: true,
          audience: "Ստարտափներ, crypto և AI SaaS — պրեմիում ներկայացում։",
          description: "Premium design և frontend։",
          deliverables: [
            "Figma կոնցեպտ (մինչև 5 էջ)",
            "Next.js / Tailwind frontend",
            "Framer Motion անիմացիաներ",
            "Ադապտիվ և SEO",
          ],
        },
        {
          id: "telegram-bot",
          name: "Telegram AI Bot",
          price: "$4,500",
          timeline: "10–14 օր",
          audience:
            "EdTech, support և SaaS — AI ագենտ այնտեղ, որտեղ օգտատերերն արդեն կան՝ Telegram-ում։",
          description:
            "Production-ready Telegram բոտ LLM ագենտներով, դիալոգային հոսքերով և session memory-ով։",
          deliverables: [
            "Զրույցի դիզայն և բոտի ճարտարապետություն",
            "Python (aiogram) կամ Node.js իրականացում",
            "OpenAI / LLM ինտեգրացիա streaming-ով",
            "Redis կամ DB session memory",
            "Deploy, փաստաթղթավորում",
          ],
        },
        {
          id: "ai-core-mvp",
          name: "AI Core MVP",
          price: "$6,000",
          timeline: "14–21 օր",
          featured: true,
          audience: "Թիմեր, որոնց պետք է աշխատող AI արտադրանք։",
          description: "Fullstack + AI ինտեգրացիա։",
          deliverables: [
            "Supabase / FastAPI / PostgreSQL backend",
            "Custom AI API",
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
      subtitle: "Ամբողջական առաքում բարդ արտադրանքների համար։",
      items: [
        {
          id: "neo-venture",
          name: "Neo Venture",
          price: "$12,000 – $15,000+",
          timeline: "30–45 օր",
          featured: true,
          audience: "EdTech, B2B SaaS — բարդ արտադրանք զրոյից։",
          description: "Արտադրանք ամբողջությամբ՝ սկզբից մինչև գործարկում։",
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
      title: "Մշտական համագործակցություն",
      subtitle: "Նվիրված հզորություն արտադրանքի զարգացման և աջակցության համար։",
      items: [
        {
          id: "neo-dedicated",
          name: "Neo Dedicated",
          price: "$4,500 / ամիս",
          featured: true,
          description:
            "Ամսական fullstack և դիզայն ժամեր։ Առաջադրանքները Notion-ում — կատարում ենք հերթականությամբ։",
          deliverables: [
            "Նվիրված զարգացման հզորություն",
            "Մեկ ակտիվ առաջադրանք",
            "Փոքր թասկեր 24–48 ժամում",
            "Notion task board",
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
