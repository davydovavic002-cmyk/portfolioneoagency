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
    "Transparent packages — from a quick launch to a full product build. Fixed scope, fixed price.",
  bookCall: "Message on Telegram",
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
          id: "aesthetic-micro",
          name: "Aesthetic Micro-Site / Landing Page",
          price: "$1,600",
          timeline: "6 days",
          audience:
            "Founders and creators who need a launch-ready full-page site — product teaser, waitlist, or landing presence. One scrollable page only.",
          description:
            "Full-page delivery — a fully coded, ultra-modern 1-page landing, teaser layout, or product intro. Hero, supporting sections, and footer in one scrollable page. Glassmorphism aesthetics, responsive layouts, and smooth interactive animations.",
          deliverables: [
            "Full-page layout (hero + sections + footer)",
            "Framer Motion interactions",
            "Next.js / React build & deploy",
            "Basic SEO",
          ],
        },
        {
          id: "hero",
          name: "Hero Section",
          price: "$1,200",
          timeline: "3–5 days",
          description:
            "One above-the-fold block only — design, code, and motion. Expand the site later if needed.",
          deliverables: [
            "One hero section (above the fold)",
            "Next.js + Tailwind implementation",
            "Motion & responsive layout",
          ],
        },
      ],
    },
    {
      id: "packages",
      level: "Level 2",
      title: "Productized Services",
      subtitle:
        "Websites, stores, bots, and AI products — fixed scope, fixed price, clear timelines.",
      items: [
        {
          id: "landing-page",
          name: "Essential Site · up to 3 pages",
          price: "$2,500",
          timeline: "8–12 days",
          audience:
            "Founders and brands that need a small site with navigation — when one scroll is not enough for pricing, FAQ, schedule, or contact.",
          description:
            "A compact site with navigation — up to 3 linked pages and shared layout. Clear structure, forms, fast load, and deploy included. Built for clarity and flow, not a single long scroll.",
          deliverables: [
            "UX structure & design (up to 3 pages)",
            "Shared navigation and page templates",
            "Next.js + Tailwind implementation",
            "Contact form or CTA on key pages",
            "Responsive layout, basic SEO & deploy",
          ],
        },
        {
          id: "aesthetic-web",
          name: "Aesthetic Web",
          price: "$3,500",
          timeline: "10–14 days",
          featured: true,
          audience:
            "Startups preparing for launch — strong visual identity and motion.",
          description: "Brand-first site with custom design and micro-interactions — up to 5 pages.",
          deliverables: [
            "Custom design & layout (up to 5 pages)",
            "Next.js / Tailwind frontend",
            "Framer Motion micro-interactions",
            "Responsive layout, basic SEO & deploy",
          ],
        },
        {
          id: "multi-page-site",
          name: "Multi-page Website",
          price: "$4,200",
          timeline: "12–16 days",
          audience:
            "Businesses that need a full company site — services, about, contacts, and room to grow.",
          description:
            "Structured company website with navigation, content sections, and blog structure.",
          deliverables: [
            "Site map & design (up to 10 pages)",
            "Next.js frontend with shared layout",
            "Blog or news section",
            "Contact forms, SEO basics, deploy",
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
          id: "web-app",
          name: "Web App / Dashboard",
          price: "$5,200",
          timeline: "14–18 days",
          audience:
            "Teams launching a SaaS tool, client portal, or internal dashboard — without heavy AI scope.",
          description:
            "Authenticated web application with backend, database, and a functional product UI.",
          deliverables: [
            "UX flows & dashboard/product UI design",
            "Auth (email, OAuth, or magic link)",
            "Supabase / PostgreSQL backend",
            "Core features & admin views",
            "Production deploy & handoff",
          ],
        },
        {
          id: "ecommerce-store",
          name: "E-commerce Store",
          price: "$5,800",
          timeline: "14–18 days",
          featured: true,
          audience:
            "Brands selling physical or digital products — boutique feel with real checkout.",
          description:
            "Online store with catalog, cart, and Stripe payments — custom UI, not a template theme.",
          deliverables: [
            "Storefront design & product pages",
            "Cart, checkout & Stripe integration",
            "CMS or admin for products & categories",
            "Order flow, responsive polish, deploy",
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
            "Scope & UX architecture",
            "Custom design (20+ screens)",
            "Fullstack Next.js + Supabase + AI workflows",
            "Production deploy & 1 month post-launch support",
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
    "Прозрачные пакеты — от быстрого запуска до полноценного продукта. Фиксированный scope и цена.",
  bookCall: "Написать в Telegram",
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
          id: "aesthetic-micro",
          name: "Aesthetic Micro-Site / Landing Page",
          price: "$1,600",
          timeline: "6 дней",
          audience:
            "Фаундерам и создателям, которым нужен готовый к запуску full-page сайт — тизер, waitlist или landing. Только одна прокручиваемая страница.",
          description:
            "Full-page — полностью свёрстанный ультрасовременный landing, teaser-layout или intro продукта. Hero, блоки и footer в одной прокручиваемой странице. Glassmorphism, адаптив и плавные интерактивные анимации.",
          deliverables: [
            "Layout одной страницы (hero + блоки + footer)",
            "Framer Motion анимации",
            "Next.js / React сборка и деплой",
            "Базовая SEO",
          ],
        },
        {
          id: "hero",
          name: "Hero-блок",
          price: "$1,200",
          timeline: "3–5 дней",
          description:
            "Только above-the-fold — дизайн, код и motion. Сайт можно расширить позже.",
          deliverables: [
            "Одна hero-секция",
            "Next.js + Tailwind",
            "Анимации и адаптив",
          ],
        },
      ],
    },
    {
      id: "packages",
      level: "Уровень 2",
      title: "Пакетные решения",
      subtitle:
        "Сайты, магазины, боты и AI-продукты — фиксированный объём, цена и срок.",
      items: [
        {
          id: "landing-page",
          name: "Essential Site · до 3 страниц",
          price: "$2,500",
          timeline: "8–12 дней",
          audience:
            "Фаундерам и брендам, которым нужен небольшой сайт с навигацией — когда одного scroll мало для pricing, FAQ, расписания или контактов.",
          description:
            "Компактный сайт с навигацией — до 3 связанных страниц и общий layout. Понятная структура, формы, быстрая загрузка и деплой. Для ясной подачи, а не одного длинного scroll.",
          deliverables: [
            "UX-структура и дизайн (до 3 страниц)",
            "Общая навигация и шаблоны страниц",
            "Реализация на Next.js + Tailwind",
            "Форма связи или CTA на ключевых страницах",
            "Адаптив, базовая SEO и деплой",
          ],
        },
        {
          id: "aesthetic-web",
          name: "Эстетичный веб",
          price: "$3,500",
          timeline: "10–14 дней",
          featured: true,
          audience:
            "Стартапы перед запуском — сильная визуальная идентичность и motion.",
          description: "Brand-first сайт с кастомным дизайном и micro-interactions — до 5 страниц.",
          deliverables: [
            "Кастомный дизайн и layout (до 5 страниц)",
            "Фронтенд на Next.js / Tailwind",
            "Framer Motion анимации",
            "Адаптив, базовая SEO и деплой",
          ],
        },
        {
          id: "multi-page-site",
          name: "Многостраничный сайт",
          price: "$4,200",
          timeline: "12–16 дней",
          audience:
            "Бизнесу нужен полноценный сайт компании — услуги, о нас, контакты и задел на рост.",
          description:
            "Структурированный корпоративный сайт с навигацией, контентными блоками и разделом блога.",
          deliverables: [
            "Карта сайта и дизайн (до 10 страниц)",
            "Next.js с общей layout-системой",
            "Раздел блога или новостей",
            "Формы, SEO-база, деплой",
          ],
        },
        {
          id: "telegram-bot",
          name: "Telegram AI-бот",
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
          id: "web-app",
          name: "Веб-приложение / Дашборд",
          price: "$5,200",
          timeline: "14–18 дней",
          audience:
            "SaaS, клиентский портал или внутренний дашборд — без тяжёлого AI-scope.",
          description:
            "Веб-приложение с авторизацией, бэкендом, БД и рабочим продуктовым интерфейсом.",
          deliverables: [
            "UX-сценарии и дизайн dashboard/product UI",
            "Auth (email, OAuth или magic link)",
            "Бэкенд на Supabase / PostgreSQL",
            "Ключевые фичи и admin-виды",
            "Production-деплой и передача",
          ],
        },
        {
          id: "ecommerce-store",
          name: "Интернет-магазин",
          price: "$5,800",
          timeline: "14–18 дней",
          featured: true,
          audience:
            "Бренды с физическими или цифровыми товарами — бутик-ощущение и реальный checkout.",
          description:
            "Магазин с каталогом, корзиной и Stripe — кастомный UI, не шаблонная тема.",
          deliverables: [
            "Дизайн витрины и карточек товаров",
            "Корзина, checkout и интеграция Stripe",
            "CMS или админка для товаров и категорий",
            "Флоу заказа, адаптив, деплой",
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
          description:
            "Фулстек-продукт с AI-модулями, авторизацией и платежами.",
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
            "Scope и UX-архитектура",
            "Кастомный дизайн (20+ экранов)",
            "Fullstack Next.js + Supabase + AI-воркфлоу",
            "Production-деплой и 1 месяц поддержки",
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
    "Թափանցիկ փաթեթներ՝ արագ գործարկումից մինչև ամբողջական արտադրանք։",
  bookCall: "Գրել Telegram-ում",
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
          id: "aesthetic-micro",
          name: "Aesthetic Micro-Site / Landing Page",
          price: "$1,600",
          timeline: "6 օր",
          audience:
            "Հիմնադիրներին և creator-ներին, ովքերին պետք է գործարկման պատրաստ full-page կայք՝ teaser, waitlist կամ landing։ Միայն մեկ scrollable էջ։",
          description:
            "Full-page — լիովին կոդավորված ultra-modern landing, teaser layout կամ product intro։ Hero, բլոկներ և footer մեկ scrollable էջում։ Glassmorphism, ադապտիվ և smooth ինտերակտիվ անիմացիաներ։",
          deliverables: [
            "Մի էջի layout (hero + բլոկներ + footer)",
            "Framer Motion անիմացիաներ",
            "Next.js / React build և deploy",
            "SEO հիմունք",
          ],
        },
        {
          id: "hero",
          name: "Hero Section",
          price: "$1,200",
          timeline: "3–5 օր",
          description:
            "Միայն above-the-fold — դիզայն, կոդ և motion։ Կայքը կարելի է ընդլայնել հետո։",
          deliverables: [
            "Մեկ hero section",
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
      subtitle:
        "Կայքեր, խանութներ, բոտեր և AI արտադրանք — ֆիքսված շրջանակ, գին և ժամկետ։",
      items: [
        {
          id: "landing-page",
          name: "Essential Site · մինչև 3 էջ",
          price: "$2,500",
          timeline: "8–12 օր",
          audience:
            "Հիմնադիրներին և բրենդներին, ովքերին պետք է փոքր կայք նավիգացիայով — երբ մեկ scroll-ը բավարար չէ pricing, FAQ, schedule կամ contact-ի համար։",
          description:
            "Կոմպակտ կայք նավիգացիայով — մինչև 3 կապված էջ և ընդհանուր layout։ Պարզ կառուցվածք, ձևեր, արագ բեռնում և deploy։ Մեկ երկար scroll-ի փոխարեն — հստակ հոսք։",
          deliverables: [
            "UX կառուցվածք և դիզայն (մինչև 3 էջ)",
            "Ընդհանուր նավիգացիա և page templates",
            "Next.js + Tailwind իրականացում",
            "Կապի ձև կամ CTA հիմնական էջերում",
            "Ադապտիվ, SEO հիմունք և deploy",
          ],
        },
        {
          id: "aesthetic-web",
          name: "Էսթետիկ վեբ",
          price: "$3,500",
          timeline: "10–14 օր",
          featured: true,
          audience: "Ստարտափներ գործարկումից առաջ — ուժեղ վիզուալ և motion։",
          description: "Brand-first կայք custom դիզայնով և micro-interactions — մինչև 5 էջ։",
          deliverables: [
            "Custom դիզայն և layout (մինչև 5 էջ)",
            "Next.js / Tailwind frontend",
            "Framer Motion անիմացիաներ",
            "Ադապտիվ, SEO և deploy",
          ],
        },
        {
          id: "multi-page-site",
          name: "Բազմաէջ կայք",
          price: "$4,200",
          timeline: "12–16 օր",
          audience:
            "Բիզնեսին պետք է ամբողջական կորպորատիվ կայք — ծառայություններ, մեր մասին, կապ և աճի հիմք։",
          description:
            "Կառուցվածքային կորպորատիվ կայք նավիգացիայով, բովանդակային բլոկներով և blog բաժնով։",
          deliverables: [
            "Կայքի քարտեզ և դիզայն (մինչև 10 էջ)",
            "Next.js frontend ընդհանուր layout-ով",
            "Blog կամ նորությունների բաժին",
            "Ձևեր, SEO, deploy",
          ],
        },
        {
          id: "telegram-bot",
          name: "Telegram AI բոտ",
          price: "$4,500",
          timeline: "10–14 օր",
          audience:
            "EdTech, աջակցություն և SaaS — AI ագենտ այնտեղ, որտեղ օգտատերերն արդեն կան՝ Telegram-ում։",
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
          id: "web-app",
          name: "Վեբ հավելված / Dashboard",
          price: "$5,200",
          timeline: "14–18 օր",
          audience:
            "SaaS, հաճախորդի պորտալ կամ ներքին dashboard — առանց ծանր AI շրջանակի։",
          description:
            "Ավտորիզացիայով վեբ հավելված backend-ով, DB-ով և աշխատող product UI-ով։",
          deliverables: [
            "UX հոսքեր և dashboard/product դիզայն",
            "Auth (email, OAuth կամ magic link)",
            "Supabase / PostgreSQL backend",
            "Հիմնական ֆիչեր և admin տեսքեր",
            "Production deploy",
          ],
        },
        {
          id: "ecommerce-store",
          name: "Ինտերնետ խանութ",
          price: "$5,800",
          timeline: "14–18 օր",
          featured: true,
          audience:
            "Բրենդներ ֆիզիկական կամ թվային ապրանքներով — բուտիկի զգացողություն և իրական checkout։",
          description:
            "Առցանց խանութ կատալոգով, զամբյուղով և Stripe-ով — custom UI, ոչ թե թեմա։",
          deliverables: [
            "Խանութի և ապրանքների էջերի դիզայն",
            "Զամբյուղ, checkout և Stripe",
            "CMS կամ ադմին ապրանքների համար",
            "Պատվերի հոսք, ադապտիվ, deploy",
          ],
        },
        {
          id: "ai-core-mvp",
          name: "AI Core MVP",
          price: "$6,000",
          timeline: "14–21 օր",
          featured: true,
          audience:
            "Թիմեր, որոնց պետք է աշխատող AI արտադրանք՝ ոչ միայն լենդինգ։",
          description:
            "Լիաէջ արտադրանք AI մոդուլներով, ավտորիզացիայով և վճարումներով։",
          deliverables: [
            "Supabase / FastAPI / PostgreSQL backend",
            "AI գործիքներ API-ով (մեդիա, LLM ագենտներ, չատ)",
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
