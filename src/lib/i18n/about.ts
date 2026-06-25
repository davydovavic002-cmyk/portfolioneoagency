import type { Language } from "@/lib/types";

export type AboutSectionId = "studio" | "process" | "reviews" | "contact";

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
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
    reviews: "Reviews",
    contact: "Contact",
  },
  sectionMeta: {
    process: "5 steps",
    reviews: "5 reviews",
  },
  studio: {
    title: "Neo Studio",
    paragraphs: [
      "We build digital products for founders and teams who care about craft — not cookie-cutter templates. Full-stack development, AI integration, and product design in one workflow.",
      "We work with startups, SMBs, and education brands across CIS, Europe, and the US. Remote-first, async-friendly, with clear scope and fixed pricing on every package.",
      "Every project in our portfolio is a live product — platforms, bots, and storefronts you can open and test right now.",
    ],
    stats: [
      { value: "20", label: "Shipped products" },
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
    title: "What clients say",
    subtitle: "Feedback from founders and product leads we've worked with.",
    items: [
      {
        id: "r1",
        quote:
          "We needed a landing that actually converts — not just looks good. They shipped in under two weeks: sharp visuals, clear offer flow, and leads coming in from week one.",
        author: "Emily",
        role: "Product Lead · Neuro-Engineering Academy",
        highlight: "Live in 12 days",
      },
      {
        id: "r2",
        quote:
          "Our store had to feel like a real boutique. They delivered a custom build with Stripe live in twelve days — no template vibes, no checkout surprises.",
        author: "Sophie",
        role: "Founder · Jellybead",
        highlight: "12-day launch",
      },
      {
        id: "r3",
        quote:
          "We went from scattered ideas to a demo-ready AI product in eighteen days. The clinic workflow mapping alone was worth it — partners saw the MVP the same month.",
        author: "Marcus",
        role: "Operations Lead · PetCare AI",
        highlight: "MVP in 18 days",
      },
      {
        id: "r4",
        quote:
          "Our students live in Telegram — the bot had to feel native there. Subject flows, SOS kits, streaming tutor replies — all shipped in twelve days and used daily.",
        author: "Daniel",
        role: "Founder · NeuroShpora",
        highlight: "Bot live in 12 days",
      },
      {
        id: "r5",
        quote:
          "We wanted an experience, not a catalog. The configurator launched in two weeks — customers explore variants instead of bouncing, and the brand finally feels premium.",
        author: "Laura",
        role: "Brand Director · Blessed Angel",
        highlight: "Live in 14 days",
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
    cta: "Go to booking",
  },
};

const ru: AboutCopy = {
  heroTitle: "О нас",
  heroSubtitle:
    "Продуктовая студия на стыке инженерии, AI и дизайна интерфейсов — от первого аудита до продакшн-запуска.",
  sections: {
    studio: "Студия",
    process: "Процесс",
    reviews: "Отзывы",
    contact: "Контакты",
  },
  sectionMeta: {
    process: "5 этапов",
    reviews: "5 отзывов",
  },
  studio: {
    title: "Neo Studio",
    paragraphs: [
      "Создаём цифровые продукты для фаундеров и команд, которым важен уровень исполнения — не шаблонные решения. Full-stack, AI-интеграция и продуктовый дизайн в одном процессе.",
      "Работаем со стартапами, SMB и образовательными брендами в СНГ, Европе и США. Удалённо, с понятным скоупом и фиксированной ценой в каждом пакете.",
      "Каждый проект в портфолио — живой продукт: платформы, боты и магазины, которые можно открыть и протестировать прямо сейчас.",
    ],
    stats: [
      { value: "20", label: "Запущенных продуктов" },
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
    title: "Отзывы клиентов",
    subtitle: "Обратная связь от фаундеров и продакт-лидов, с которыми мы работали.",
    items: [
      {
        id: "r1",
        quote:
          "Нужен был лендинг, который реально конвертит — не просто красивый. Отгрузили за две недели: сильный визуал, понятный оффер, заявки пошли с первой недели.",
        author: "Emily",
        role: "Product Lead · Академия Нейро-Инжиниринга",
        highlight: "12 дней до релиза",
      },
      {
        id: "r2",
        quote:
          "Магазин должен был ощущаться как бутик. Кастомная сборка со Stripe в проде за двенадцать дней — без ощущения шаблона и без сюрпризов на чекауте.",
        author: "Sophie",
        role: "Founder · Jellybead",
        highlight: "Запуск за 12 дней",
      },
      {
        id: "r3",
        quote:
          "За восемнадцать дней — от идей к demo-ready AI-продукту. Карта workflow клиники уже окупилась: партнёрам показали MVP в том же месяце.",
        author: "Marcus",
        role: "Operations Lead · PetCare AI",
        highlight: "MVP за 18 дней",
      },
      {
        id: "r4",
        quote:
          "Студенты живут в Telegram — бот должен был быть нативным. Предметы, SOS-наборы, streaming-репетитор — всё за двенадцать дней, пользуются каждый день.",
        author: "Daniel",
        role: "Founder · NeuroShpora",
        highlight: "Бот за 12 дней",
      },
      {
        id: "r5",
        quote:
          "Нужен был опыт, а не каталог. Конфигуратор в проде за две недели — клиенты крутят варианты вместо отскока, бренд наконец ощущается премиальным.",
        author: "Laura",
        role: "Brand Director · Blessed Angel",
        highlight: "14 дней до запуска",
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
    cta: "Перейти к бронированию",
  },
};

const am: AboutCopy = {
  heroTitle: "Մեր մասին",
  heroSubtitle:
    "Պրոդուկտային ստուդիա՝ ինժեներիայի, AI-ի և ինտերֆեյսի դիզայնի հատման կետում — առաջին աուդիտից մինչև արտադրական գործարկում։",
  sections: {
    studio: "Ստուդիա",
    process: "Գործընթաց",
    reviews: "Կարծիքներ",
    contact: "Կապ",
  },
  sectionMeta: {
    process: "5 քայլ",
    reviews: "5 կարծիք",
  },
  studio: {
    title: "Neo Studio",
    paragraphs: [
      "Ստեղծում ենք թվային արտադրանքներ հիմնադիրների և թիմերի համար, ովքեր արժեք են տալիս որակին՝ ոչ թե կաղապարներին։ Full-stack, AI ինտեգրացիա և product design մեկ workflow-ում։",
      "Աշխատում ենք ստարտափների, SMB-ների և կրթական բրենդների հետ՝ ՍՊԾ, Եվրոպա և ԱՄՆ։ Հեռակա, հստակ scope-ով և ֆիքսված գնով յուրաքանչյուր փաթեթում։",
      "Պորտֆոլիոյի յուրաքանչյուր նախագիծը կենդանի արտադրանք է՝ հարթակներ, բոտեր և խանութներ, որոնք կարող եք բացել և փորձարկել հենց հիմա։",
    ],
    stats: [
      { value: "20", label: "Գործարկված արտադրանք" },
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
        title: "Discovery",
        description:
          "Համաձայնեցնում ենք նպատակները, լսարանը և սահմանափակումները։ Մեծ նախագծերի համար՝ աուդիտ կամ ճանապարհային քարտեզ մինչև մշակումը։",
      },
      {
        id: "design",
        title: "Դիզայն և ճարտարապետություն",
        description:
          "UX հոսքեր, համակարգի ճարտարապետություն և տեխնոլոգիական stack։ Պլանը տեսանելի է մինչև production կոդը։",
      },
      {
        id: "build",
        title: "Մշակում",
        description:
          "Իտերատիվ sprint-եր, դեմո և թարմացումներ։ Frontend, backend, AI մոդուլներ՝ մեկ թիմ, մեկ timeline։",
      },
      {
        id: "launch",
        title: "Գործարկում",
        description:
          "Deploy, փաստաթղթավորում և հանձնում։ Կոդը, ինֆրաստրուկտուրան և մուտքերը՝ ձեր մոտ։",
      },
      {
        id: "support",
        title: "Աջակցություն",
        description:
          "Ընտրովի retainer՝ թարմացումներ, մոնիտորինգ և նոր ֆիչեր գործարկումից հետո։",
      },
    ],
  },
  reviews: {
    title: "Ինչ են ասում հաճախորդները",
    subtitle: "Հետադարձ կապ հիմնադիրներից և product lead-երից, ում հետ ենք աշխատել։",
    items: [
      {
        id: "r1",
        quote:
          "Պետք էր լենդինգ, որը իրականում կոնվերտի է — ոչ միայն գեղեցիկ։ Տասներկու օրում live՝ ուժեղ վիզուալ, պարզ առաջարկ, դիմումներ առաջին շաբաթից։",
        author: "Անի",
        role: "Product Lead · Նեյրո-ինժեներիայի ակադեմիա",
        highlight: "12 օր մինչև live",
      },
      {
        id: "r2",
        quote:
          "Խանութը պետք է զգացվեր որպես բուտիկ։ Պատվերով build Stripe-ով՝ տասներկու օրում, առանց կաղապարի և checkout-ի սյուրպրիզների։",
        author: "Սոֆի",
        role: "Founder · Jellybead",
        highlight: "12 օրյա գործարկում",
      },
      {
        id: "r3",
        quote:
          "Տասնութ օրում՝ գաղափարներից demo-ready AI արտադրանք։ Կլինիկայի workflow-ի քարտեզը արդեն իսկ արժե էր — MVP-ն գործընկերներին ցույց տվեցին նույն ամսում։",
        author: "Արմեն",
        role: "Operations Lead · PetCare AI",
        highlight: "MVP 18 օրում",
      },
      {
        id: "r4",
        quote:
          "Ուսանողները ապրում են Telegram-ում — բոտը պետք է բնական լիներ։ Առարկաներ, SOS հավաքածուներ, streaming դասատու — տասներկու օրում, օգտագործում են ամեն օր։",
        author: "Դավիթ",
        role: "Founder · NeuroShpora",
        highlight: "Բոտ 12 օրում",
      },
      {
        id: "r5",
        quote:
          "Պետք էր փորձ, ոչ թե կատալոգ։ Կոնֆիգուրատորը live՝ երկու շաբաթում — հաճախորդները ուսումնասիրում են տարբերակները, բրենդը վերջապես պրեմիում է զգացվում։",
        author: "Լիլիթ",
        role: "Brand Director · Blessed Angel",
        highlight: "14 օր մինչև launch",
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
    cta: "Անցնել ամրագրման",
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
