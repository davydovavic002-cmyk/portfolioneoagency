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
          name: "Aesthetic Micro-Site / MVP",
          price: "$1,600",
          timeline: "6 days",
          audience:
            "Founders and creators who need a launch-ready full-page site — product teaser, waitlist, or MVP presence — without a multi-page build.",
          description:
            "Full-page delivery — a fully coded, ultra-modern 1-page micro-site, teaser layout, or product MVP. Hero, supporting sections, and footer in one scrollable page. Glassmorphism aesthetics, responsive layouts, and smooth interactive animations.",
          deliverables: [
            "Full 1-page layout (hero + 2–4 supporting sections)",
            "Glassmorphism UI & premium typography",
            "Framer Motion micro-interactions",
            "Next.js / React production build",
            "Deploy to your domain or Vercel",
            "Basic SEO & performance pass",
          ],
        },
        {
          id: "hero",
          name: "High-Converting AI Hero Section",
          price: "$1,200",
          timeline: "3–5 days",
          description:
            "One section only — design and fullstack development of a single above-the-fold hero block. Interactive 3D or AI element, glass UI, premium typography, production-ready code. Ideal when you only need the top fold or plan to expand later.",
          deliverables: [
            "One hero section only (above the fold)",
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
      subtitle:
        "Websites, stores, bots, and AI products — fixed scope, fixed price, clear timelines.",
      items: [
        {
          id: "landing-page",
          name: "Landing Page",
          price: "$2,500",
          timeline: "7–10 days",
          audience:
            "Founders and brands that need one strong page to sell, collect leads, or pitch an offer.",
          description:
            "Single-page site built for conversion — clear structure, fast load, mobile-ready.",
          deliverables: [
            "UX structure & visual design (1 page)",
            "Next.js + Tailwind implementation",
            "Lead form or CTA integration",
            "Responsive layout & basic SEO",
          ],
        },
        {
          id: "aesthetic-web",
          name: "Aesthetic Web",
          price: "$3,500",
          timeline: "10–14 days",
          featured: true,
          audience:
            "Startups preparing for launch — premium visual identity and motion-led storytelling.",
          description: "Design-forward web experience — brand-first, investor-ready polish.",
          deliverables: [
            "Unique Figma concept (up to 5 pages)",
            "Next.js / Tailwind frontend",
            "Framer Motion micro-interactions",
            "Desktop & mobile responsive, basic SEO",
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
            "Structured multi-page website with navigation, content sections, and CMS-ready setup.",
          deliverables: [
            "Site map & design (up to 10 pages)",
            "Next.js frontend with shared layout system",
            "Blog or news section structure",
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
          name: "Aesthetic Micro-Site / MVP",
          price: "$1,600",
          timeline: "6 дней",
          audience:
            "Фаундерам и создателям, которым нужен готовый к запуску full-page сайт — тизер продукта, waitlist или MVP без многостраничной сборки.",
          description:
            "Full-page — полностью свёрстанный ультрасовременный одностраничник, teaser-layout или product MVP. Hero, блоки и footer в одной прокручиваемой странице. Glassmorphism, адаптив и плавные интерактивные анимации.",
          deliverables: [
            "Полный layout одной страницы (hero + 2–4 блока)",
            "Glassmorphism UI и премиальная типографика",
            "Framer Motion микро-анимации",
            "Production-сборка на Next.js / React",
            "Деплой на ваш домен или Vercel",
            "Базовая SEO и оптимизация скорости",
          ],
        },
        {
          id: "hero",
          name: "Конверсионный hero-блок с AI",
          price: "$1,200",
          timeline: "3–5 дней",
          description:
            "Одна секция — дизайн и фулстек одного above-the-fold блока. Интерактивный 3D/AI-элемент, glass UI, типографика, продакшн-код. Подходит, если нужен только верх экрана или расширение позже.",
          deliverables: [
            "Одна hero-секция (только above the fold)",
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
      subtitle:
        "Сайты, магазины, боты и AI-продукты — фиксированный объём, цена и срок.",
      items: [
        {
          id: "landing-page",
          name: "Лендинг",
          price: "$2,500",
          timeline: "7–10 дней",
          audience:
            "Фаундерам и брендам, которым нужна одна сильная страница для продаж, заявок или оффера.",
          description:
            "Одностраничник под конверсию — понятная структура, быстрая загрузка, адаптив.",
          deliverables: [
            "UX-структура и дизайн (1 страница)",
            "Реализация на Next.js + Tailwind",
            "Форма заявки или CTA-интеграция",
            "Адаптив и базовая SEO",
          ],
        },
        {
          id: "aesthetic-web",
          name: "Эстетичный веб",
          price: "$3,500",
          timeline: "10–14 дней",
          featured: true,
          audience:
            "Стартапы перед запуском — премиальная визуальная идентичность и motion-история.",
          description: "Дизайн-ориентированный сайт — бренд, детали, готовность к питчу.",
          deliverables: [
            "Уникальный концепт в Figma (до 5 страниц)",
            "Фронтенд на Next.js / Tailwind CSS",
            "Микро-анимации на Framer Motion",
            "Адаптив, базовая SEO-оптимизация",
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
            "Структурированный многостраничник с навигацией, контентными блоками и CMS-ready основой.",
          deliverables: [
            "Карта сайта и дизайн (до 10 страниц)",
            "Next.js с общей layout-системой",
            "Структура блога или новостей",
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
          name: "Aesthetic Micro-Site / MVP",
          price: "$1,600",
          timeline: "6 օր",
          audience:
            "Հիմնադիրներին և creator-ներին, ովքերին պետք է գործարկման պատրաստ full-page կայք՝ product teaser, waitlist կամ MVP առանց բազմաէջ կայքի։",
          description:
            "Full-page — լիովին կոդավորված ultra-modern մի էջանոց, teaser layout կամ product MVP։ Hero, բլոկներ և footer մեկ scrollable էջում։ Glassmorphism, ադապտիվ և smooth ինտերակտիվ անիմացիաներ։",
          deliverables: [
            "Մի էջի ամբողջական layout (hero + 2–4 բլոկ)",
            "Glassmorphism UI և պրեմիում տիպոգրաֆիա",
            "Framer Motion micro-interactions",
            "Next.js / React production build",
            "Deploy ձեր domain-ում կամ Vercel-ում",
            "SEO և performance հիմունք",
          ],
        },
        {
          id: "hero",
          name: "Կոնվերսիոն AI hero բլոկ",
          price: "$1,200",
          timeline: "3–5 օր",
          description:
            "Մեկ section միայն — above-the-fold բլոկի դիզայն և fullstack՝ ինտերակտիվ 3D/AI, glass UI, պրեմիում տիպոգրաֆիա։ Եթե պետք է միայն hero բլոկը կամ հետագա ընդլայնում։",
          deliverables: [
            "Մեկ hero section (above the fold)",
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
          name: "Լենդինգ",
          price: "$2,500",
          timeline: "7–10 օր",
          audience:
            "Հիմնադիրներին և բրենդներին, ովքերին պետք է մեկ ուժեղ էջ վաճառքի, դիմումների կամ առաջարկի համար։",
          description:
            "Մի էջանոց կայք կոնվերսիայի համար — պարզ կառուցվածք, արագ բեռնում, ադապտիվ։",
          deliverables: [
            "UX կառուցվածք և դիզայն (1 էջ)",
            "Next.js + Tailwind իրականացում",
            "Դիմումի ձև կամ CTA ինտեգրացիա",
            "Ադապտիվ և SEO հիմունք",
          ],
        },
        {
          id: "aesthetic-web",
          name: "Էսթետիկ վեբ",
          price: "$3,500",
          timeline: "10–14 օր",
          featured: true,
          audience: "Ստարտափներ գործարկումից առաջ — պրեմիում վիզուալ և motion-պատմություն։",
          description: "Դիզայն-կենտրոնացված վեբ փորձ — բրենդ և pitch-ready լուք։",
          deliverables: [
            "Figma կոնցեպտ (մինչև 5 էջ)",
            "Next.js / Tailwind frontend",
            "Framer Motion անիմացիաներ",
            "Ադապտիվ և SEO",
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
            "Կառուցվածքային բազմաէջ կայք նավիգացիայով, բովանդակային բլոկներով և CMS-ready հիմքով։",
          deliverables: [
            "Կայքի քարտեզ և դիզայն (մինչև 10 էջ)",
            "Next.js frontend ընդհանուր layout-ով",
            "Բլոգի կամ նորությունների կառուցվածք",
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
