import type { Language } from "@/lib/types";

export type AboutSectionId = "studio" | "process" | "reviews" | "contact";

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  /** Factual delivery summary — not a client quote */
  quote: string;
  /** Project / product name */
  author: string;
  /** Package or deliverable line */
  role: string;
  /** Timeline aligned with Services packages */
  highlight: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface AboutCopy {
  heroTitle: string;
  heroSubtitle: string;
  sections: {
    studio: string;
    process: string;
    reviews: string;
    contact: string;
  };
  sectionMeta: {
    process: string;
    reviews: string;
  };
  studio: {
    title: string;
    paragraphs: string[];
    stats: Stat[];
  };
  process: {
    title: string;
    subtitle: string;
    steps: ProcessStep[];
  };
  reviews: {
    title: string;
    subtitle: string;
    items: Testimonial[];
  };
  contact: {
    title: string;
    subtitle: string;
    telegramLabel: string;
    responseTime: string;
    timezone: string;
    cta: string;
  };
}

const en: AboutCopy = {
  heroTitle: "About",
  heroSubtitle:
    "Product studio at the intersection of engineering, AI, and interface design — from first audit to production launch.",
  sections: {
    studio: "Studio",
    process: "Process",
    reviews: "Deliveries",
    contact: "Contact",
  },
  sectionMeta: {
    process: "5 steps",
    reviews: "6 shipped cases",
  },
  studio: {
    title: "Neo Studio",
    paragraphs: [
      "We build digital products for founders and teams who care about craft — not cookie-cutter templates. Full-stack development, AI integration, and product design in one workflow.",
      "We work with startups, SMBs, and education brands across CIS, Europe, and the US. Remote-first, async-friendly, with clear scope and fixed pricing on every package.",
      "Every project in our portfolio is a live product — platforms, bots, and storefronts you can open and test right now.",
    ],
    stats: [
      { value: "6", label: "Live case studies" },
      { value: "3", label: "Languages" },
      { value: "2021", label: "Since" },
    ],
  },
  process: {
    title: "How we work",
    subtitle: "A transparent path from first message to production — no black boxes.",
    steps: [
      {
        id: "discovery",
        title: "Discovery",
        description:
          "We align on goals, audience, and constraints. For larger projects — a brief audit or roadmap before development starts.",
      },
      {
        id: "design",
        title: "Design & Architecture",
        description:
          "UX flows, system architecture, and tech stack. You see the plan before we write production code.",
      },
      {
        id: "build",
        title: "Build",
        description:
          "Iterative sprints with demos and async updates. Frontend, backend, AI modules — one team, one timeline.",
      },
      {
        id: "launch",
        title: "Launch",
        description:
          "Deploy, documentation, and handoff. You own the code, the infra, and the keys.",
      },
      {
        id: "support",
        title: "Support",
        description:
          "Optional retainer for iterations, monitoring, and new features after launch.",
      },
    ],
  },
  reviews: {
    title: "What we delivered",
    subtitle:
      "Scope and timelines from cases in this portfolio — open each project in Work to try the live product.",
    items: [
      {
        id: "aura-hair",
        quote:
          "Premium salon site: stylist discovery, service menu, hair-care guide, and multi-step booking in a luxury editorial layout.",
        author: "AURA Hair Space",
        role: "Multi-page Website · Beauty",
        highlight: "12–16 days",
      },
      {
        id: "jewelry-store",
        quote:
          "Custom luxury boutique with Stripe checkout, CMS-driven catalog, and motion-led product storytelling.",
        author: "Jellybead",
        role: "E-commerce Store · Luxury",
        highlight: "14–18 days",
      },
      {
        id: "petcare-ai",
        quote:
          "Clinic-facing MVP with diagnostic AI module, feed analysis, and dashboard workflows for partner demos.",
        author: "PetCare AI",
        role: "AI Core MVP · HealthTech",
        highlight: "14–21 days",
      },
      {
        id: "neuro-academy",
        quote:
          "Conversion-focused education landing with editorial layout, structured offer blocks, and trilingual support.",
        author: "Neuro-Engineering Academy",
        role: "Landing Page · EdTech",
        highlight: "7–10 days",
      },
      {
        id: "neuro-shpora",
        quote:
          "Telegram study bot with subject flows, SOS kits, streaming AI tutor, and session memory.",
        author: "NeuroShpora",
        role: "Telegram AI Bot · EdTech",
        highlight: "10–14 days",
      },
      {
        id: "blessed-angel",
        quote:
          "Interactive accessory configurator with brand-led visuals, variant exploration, and checkout-ready flows.",
        author: "Blessed Angel",
        role: "Aesthetic Web · E-commerce",
        highlight: "10–14 days",
      },
    ],
  },
  contact: {
    title: "Let's talk",
    subtitle:
      "Tell us about your product, timeline, and budget — we'll reply with a clear next step within 24 hours.",
    telegramLabel: "Telegram",
    responseTime: "Typical reply: within 24h",
    timezone: "UTC+4 · Yerevan",
    cta: "Message on Telegram",
  },
};

const ru: AboutCopy = {
  heroTitle: "О нас",
  heroSubtitle:
    "Продуктовая студия на стыке инженерии, AI и дизайна интерфейсов — от первого аудита до продакшн-запуска.",
  sections: {
    studio: "Студия",
    process: "Процесс",
    reviews: "Кейсы",
    contact: "Контакты",
  },
  sectionMeta: {
    process: "5 этапов",
    reviews: "6 кейсов",
  },
  studio: {
    title: "Neo Studio",
    paragraphs: [
      "Создаём цифровые продукты для фаундеров и команд, которым важен уровень исполнения — не шаблонные решения. Фулстек-разработка, AI-интеграция и продуктовый дизайн в одном процессе.",
      "Работаем со стартапами, SMB и образовательными брендами в СНГ, Европе и США. Удалённо, с понятным скоупом и фиксированной ценой в каждом пакете.",
      "Каждый проект в портфолио — живой продукт: платформы, боты и магазины, которые можно открыть и протестировать прямо сейчас.",
    ],
    stats: [
      { value: "6", label: "Живых кейсов" },
      { value: "3", label: "Языка" },
      { value: "2021", label: "С года" },
    ],
  },
  process: {
    title: "Как мы работаем",
    subtitle: "Прозрачный путь от первого сообщения до продакшна — без чёрных ящиков.",
    steps: [
      {
        id: "discovery",
        title: "Дискавери",
        description:
          "Согласуем цели, аудиторию и ограничения. Для крупных проектов — аудит или роадмап до старта разработки.",
      },
      {
        id: "design",
        title: "Дизайн и архитектура",
        description:
          "UX-сценарии, системная архитектура и стек. План виден до написания продакшн-кода.",
      },
      {
        id: "build",
        title: "Разработка",
        description:
          "Итерации со спринтами, демо и апдейтами. Frontend, backend, AI-модули — одна команда, один таймлайн.",
      },
      {
        id: "launch",
        title: "Запуск",
        description:
          "Деплой, документация и передача. Код, инфраструктура и доступы — у вас.",
      },
      {
        id: "support",
        title: "Поддержка",
        description:
          "Опциональный ретейнер: доработки, мониторинг и новые фичи после релиза.",
      },
    ],
  },
  reviews: {
    title: "Что сделали",
    subtitle:
      "Скоуп и сроки по кейсам из портфолио — откройте любой проект во вкладке «Работы» и протестируйте live.",
    items: [
      {
        id: "aura-hair",
        quote:
          "Премиальный сайт салона: выбор стилиста, меню услуг, гид по уходу и многошаговое бронирование в luxury-эстетике.",
        author: "AURA Hair Space",
        role: "Многостраничный сайт · Beauty",
        highlight: "12–16 дней",
      },
      {
        id: "jewelry-store",
        quote:
          "Кастомный luxury-бутик со Stripe, CMS-каталогом и motion-историями вокруг продуктов.",
        author: "Jellybead",
        role: "E-commerce · Luxury",
        highlight: "14–18 дней",
      },
      {
        id: "petcare-ai",
        quote:
          "MVP для клиник: диагностический AI, анализ кормов и дашборд рабочих процессов для демо партнёрам.",
        author: "PetCare AI",
        role: "AI Core MVP · HealthTech",
        highlight: "14–21 день",
      },
      {
        id: "neuro-academy",
        quote:
          "Продающий лендинг с редакционной вёрсткой, структурой оффера и поддержкой трёх языков.",
        author: "Академия Нейро-Инжиниринга",
        role: "Landing Page · EdTech",
        highlight: "7–10 дней",
      },
      {
        id: "neuro-shpora",
        quote:
          "Telegram-бот для подготовки к экзаменам: предметы, SOS-наборы, streaming AI-репетитор и память сессий.",
        author: "NeuroShpora",
        role: "Telegram AI Bot · EdTech",
        highlight: "10–14 дней",
      },
      {
        id: "blessed-angel",
        quote:
          "Интерактивный конфигуратор аксессуаров с визуалом бренда, вариантами и готовностью к checkout.",
        author: "Blessed Angel",
        role: "Aesthetic Web · E-commerce",
        highlight: "10–14 дней",
      },
    ],
  },
  contact: {
    title: "Свяжитесь с нами",
    subtitle:
      "Расскажите о продукте, сроках и бюджете — ответим с понятным следующим шагом в течение 24 часов.",
    telegramLabel: "Telegram",
    responseTime: "Обычно отвечаем за 24ч",
    timezone: "UTC+4 · Ереван",
    cta: "Написать в Telegram",
  },
};

const am: AboutCopy = {
  heroTitle: "Մեր մասին",
  heroSubtitle:
    "Պրոդուկտային ստուդիա՝ ինժեներիայի, AI-ի և ինտերֆեյսի դիզայնի հատման կետում — առաջին աուդիտից մինչև արտադրական գործարկում։",
  sections: {
    studio: "Ստուդիա",
    process: "Գործընթաց",
    reviews: "Կեյսեր",
    contact: "Կապ",
  },
  sectionMeta: {
    process: "5 քայլ",
    reviews: "6 նախագիծ",
  },
  studio: {
    title: "Neo Studio",
    paragraphs: [
      "Ստեղծում ենք թվային արտադրանքներ հիմնադիրների և թիմերի համար, ովքեր արժեք են տալիս որակին՝ ոչ թե կաղապարներին։ Լիաէջ զարգացում, AI ինտեգրացիա և արտադրանքի դիզայն՝ մեկ գործընթացով։",
      "Աշխատում ենք ստարտափների, փոքր և միջին բիզնեսների և կրթական բրենդների հետ՝ ՀՅՄ, Եվրոպա և ԱՄՆ։ Հեռակա, հստակ շրջանակներով և ֆիքսված գնով յուրաքանչյուր փաթեթում։",
      "Պորտֆոլիոյի յուրաքանչյուր նախագիծը կենդանի արտադրանք է՝ հարթակներ, բոտեր և խանութներ, որոնք կարող եք բացել և փորձարկել հենց հիմա։",
    ],
    stats: [
      { value: "6", label: "Կենդանի կեյս" },
      { value: "3", label: "Լեզու" },
      { value: "2021", label: "Սկսած" },
    ],
  },
  process: {
    title: "Ինչպես ենք աշխատում",
    subtitle: "Թափանցիկ ուղի առաջին հաղորդագրությունից մինչև արտադրություն՝ առանց սև արկղերի։",
    steps: [
      {
        id: "discovery",
        title: "Հետազոտում",
        description:
          "Համաձայնեցնում ենք նպատակները, լսարանը և սահմանափակումները։ Մեծ նախագծերի համար՝ աուդիտ կամ ճանապարհային քարտեզ մշակումից առաջ։",
      },
      {
        id: "design",
        title: "Դիզայն և ճարտարապետություն",
        description:
          "UX հոսքեր, համակարգի ճարտարապետություն և տեխնոլոգիական stack։ Պլանը տեսանելի է արտադրական կոդից առաջ։",
      },
      {
        id: "build",
        title: "Մշակում",
        description:
          "Իտերատիվ ցիկլեր, դեմո և թարմացումներ։ Frontend, backend և AI մոդուլներ՝ մեկ թիմ, մեկ ժամկետ։",
      },
      {
        id: "launch",
        title: "Գործարկում",
        description:
          "Գործարկում, փաստաթղթավորում և հանձնում։ Կոդը, ինֆրաստրուկտուրան և մուտքերը՝ ձեր մոտ։",
      },
      {
        id: "support",
        title: "Աջակցություն",
        description:
          "Ընտրովի պայմանագրային աջակցություն՝ թարմացումներ, մոնիտորինգ և նոր ֆունկցիաներ գործարկումից հետո։",
      },
    ],
  },
  reviews: {
    title: "Ինչ ենք արել",
    subtitle:
      "Շրջանակ և ժամկետներ պորտֆոլիոյի կեյսերից — բացեք ցանկացած նախագիծ «Աշխատանքներ» բաժնում և փորձարկեք կենդանի։",
    items: [
      {
        id: "aura-hair",
        quote:
          "Պրեմիում սրահի կայք՝ ստայլիստի ընտրություն, ծառայությունների մենյու, խնամքի ուղեցույց և բազմաստիճան ամրագրում։",
        author: "AURA Hair Space",
        role: "Բազմաէջ կայք · Beauty",
        highlight: "12–16 օր",
      },
      {
        id: "jewelry-store",
        quote:
          "Պատվերով luxury բուտիկ Stripe checkout-ով, CMS կատալոգով և motion-պատմություններով։",
        author: "Jellybead",
        role: "E-commerce · Luxury",
        highlight: "14–18 օր",
      },
      {
        id: "petcare-ai",
        quote:
          "Կլինիկաների MVP՝ ախտորոշական AI, կերերի վերլուծություն և աշխատանքային հոսքերի դաշտբորդ գործընկերների դեմոների համար։",
        author: "PetCare AI",
        role: "AI Core MVP · HealthTech",
        highlight: "14–21 օր",
      },
      {
        id: "neuro-academy",
        quote:
          "Կոնվերսիոն լենդինգ խմբագրական դիզայնով, առաջարկի կառուցվածքով և երեք լեզվի աջակցությամբ։",
        author: "Նեյրո-ինժեներիայի ակադեմիա",
        role: "Landing Page · EdTech",
        highlight: "7–10 օր",
      },
      {
        id: "neuro-shpora",
        quote:
          "Telegram ուսումնական բոտ՝ առարկաներ, SOS հավաքածուներ, հոսքային AI դասատու և սեսիայի հիշողություն։",
        author: "NeuroShpora",
        role: "Telegram AI Bot · EdTech",
        highlight: "10–14 օր",
      },
      {
        id: "blessed-angel",
        quote:
          "Ինտերակտիվ աքսեսուարների կոնֆիգուրատոր՝ բրենդային վիզուալ, տարբերակներ և վճարման պատրաստ հոսքեր։",
        author: "Blessed Angel",
        role: "Aesthetic Web · E-commerce",
        highlight: "10–14 օր",
      },
    ],
  },
  contact: {
    title: "Կապվեք մեզ հետ",
    subtitle:
      "Պատմեք ձեր արտադրանքի, ժամկետների և բյուջեի մասին — 24 ժամվա ընթացքում կպատասխանենք հստակ հաջորդ քայլով։",
    telegramLabel: "Telegram",
    responseTime: "Սովորաբար պատասխանում ենք 24ժ-ում",
    timezone: "UTC+4 · Երևան",
    cta: "Գրել Telegram-ում",
  },
};

export const aboutByLanguage: Record<Language, AboutCopy> = { en, ru, am };

export const ABOUT_SECTIONS: AboutSectionId[] = [
  "studio",
  "process",
  "reviews",
  "contact",
];

export const ABOUT_ACCENT = "#a78bfa";
