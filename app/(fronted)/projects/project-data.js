export const PROJECTS = [
  {
    slug: "cleaning-doctor",
    title: "清潔公司排班管理後台",
    eyebrow: "Operations CRM · UX/UI Redesign",
    categories: ["Product & Commerce"],
    role: "UI/UX",
    summary:
      "清潔人員請假、換班與替補排程：將過往需逐一確認人員的作業，整理為可比較、可追溯的排班決策流程。",
    cardTechnologyLine:
      "Next.js · Material UI · Availability Matching · DataGrid · Dialog",
    technologies: [
      "Next.js",
      "Material UI",
      "DataGrid",
      "Dialog",
      "Form States",
    ],
    notes: [
      "56-screen functional inventory",
      "Leave & replacement scheduling",
      "Clear action hierarchy for operations",
    ],
    image: "/projects/cleaning-doctor/00-case-overview.png",
    gallery: [
      {
        src: "/projects/cleaning-doctor/01-authentication.png",
        alt: "Authentication screens",
      },
      {
        src: "/projects/cleaning-doctor/03-recurring-orders.png",
        alt: "Recurring order management screens",
      },
      {
        src: "/projects/cleaning-doctor/04-service-operations.png",
        alt: "Service operations screens",
      },
      {
        src: "/projects/cleaning-doctor/05-payroll-and-people.png",
        alt: "Payroll and people screens",
      },
      {
        src: "/projects/cleaning-doctor/06-customers-and-system.png",
        alt: "Customer and system screens",
      },
    ],
  },
  {
    slug: "momo-shopping-cart",
    title: "Shopping Cart Modernization",
    eyebrow: "RWD Refactoring · Frontend–Backend Decoupling",
    categories: ["Product & Commerce"],
    role: "UX/UI Design · RWD Design · Frontend Collaboration",
    summary:
      "將既有 jQuery 購物車重構為 React 前後端分離模式架構。透過統一的 RWD 系統整合桌機與手機功能，降低雙版本重複開發與維護成本。",
    cardTechnologyLine:
      "React · TypeScript · RWD · Frontend–Backend Decoupling · Flow Design",
    technologies: [
      "React",
      "TypeScript",
      "RWD",
      "Frontend–Backend Decoupling",
      "Functional Mapping",
      "Flow Design",
      "API Integration",
    ],
    notes: [
      "Cross-device system alignment",
      "Checkout state modeling",
      "Feature inventory & RWD design",
    ],
    image: "/projects/momo-shopping-cart-flow.png",
    gallery: [
      {
        src: "/projects/momo-shopping-cart-flow.png",
        alt: "momo Shopping Cart flow chart",
      },
    ],
  },
  {
    slug: "commerce-design-system",
    title: "Commerce Design System",
    eyebrow: "Design Systems",
    categories: ["Design Systems"],
    role: "Design System · UI Components · Frontend Collaboration",
    summary:
      "以 Atomic Design 與 Tailwind Utility 思維，建立可維護、可組合的電商元件系統。",
    cardTechnologyLine:
      "Atomic Design · Component CSS · Tailwind Utility · Storybook",
    technologies: [
      "Atomic Design",
      "Component CSS",
      "Tailwind Utility",
      "Storybook",
      "Frontend Collaboration",
    ],
    notes: [
      "Reusable component patterns",
      "Controlled customization",
      "Documented implementation",
    ],
    caseStudy: "design-system",
    image: "/projects/design-system-hero.jpeg",
    imageFit: "contain",
    coverBackground: "bg-[#eaf8f3]",
    gallery: [
      {
        src: "/projects/design-system-colors.png",
        alt: "Design system color tokens",
      },
      {
        src: "/projects/design-system-typography.png",
        alt: "Design system typography scale",
      },
      {
        src: "/projects/design-system-components.png",
        alt: "Design system component patterns",
      },
      {
        src: "/projects/design-system-checkbox.png",
        alt: "Design system checkbox states",
      },
      {
        src: "/projects/design-system-badges.png",
        alt: "Design system badge variants",
      },
      {
        src: "/projects/design-system-icons.png",
        alt: "Design system icon library",
      },
    ],
  },
  {
    slug: "annluya-ecommerce",
    title: "安綠雅",
    eyebrow: "Product & Commerce · Branding Web",
    categories: ["Product & Commerce", "Branding Web"],
    role: "UX/UI · E-commerce Website",
    summary: "保養品牌電商網站改版與 RWD 導覽規劃。",
    cardTechnologyLine:
      "UX/UI · E-commerce · Information Architecture · Responsive Design",
    technologies: [
      "UX/UI",
      "E-commerce",
      "Information Architecture",
      "Responsive Design",
    ],
    notes: [
      "Desktop & mobile navigation",
      "Product categories",
      "Campaign modules",
    ],
    image: "/projects/annluya-overview.png",
    gallery: [
      {
        src: "/projects/annluya-overview.png",
        alt: "Annluya desktop and mobile website design",
      },
    ],
  },
  {
    slug: "eornet-brand-platform",
    title: "丞元資訊",
    eyebrow: "Branding Web",
    categories: ["Branding Web"],
    role: "Brand Identity · Website Design",
    summary: "雲端服務企業的品牌識別與資訊型網站。",
    cardTechnologyLine:
      "Brand · Web Design · Responsive Design · Product Planning",
    technologies: [
      "Brand",
      "Web Design",
      "Information Design",
      "Responsive Design",
      "Product Planning",
    ],
    notes: ["Service architecture", "Enterprise website", "Visual system"],
    image: "/projects/eornet-home.jpg",
    gallery: [
      { src: "/projects/eornet-home.jpg", alt: "Eornet homepage" },
      { src: "/projects/eornet-product.jpg", alt: "Eornet product page" },
      { src: "/projects/eornet-about.jpg", alt: "Eornet about page" },
    ],
  },
  {
    slug: "putien-interior-design",
    title: "蒲田室內設計",
    eyebrow: "Branding Web",
    categories: ["Branding Web"],
    role: "Website Strategy · UX/UI · Responsive Design",
    summary: "室內設計品牌的作品、內容與服務流程平台。",
    cardTechnologyLine:
      "UX/UI · Web Design · Content Architecture · Responsive Design",
    technologies: [
      "UX/UI",
      "Web Design",
      "Content Architecture",
      "Responsive Design",
    ],
    notes: ["Project showcase", "Workflow", "Editorial content"],
    image: "/projects/putien-home.png",
    gallery: [
      {
        src: "/projects/putien-home.png",
        alt: "Putien Interior Design homepage",
      },
      {
        src: "/projects/putien-projects.png",
        alt: "Putien Interior Design projects page",
      },
      {
        src: "/projects/putien-workflow.png",
        alt: "Putien Interior Design workflow page",
      },
    ],
  },
];

export const PROJECT_CATEGORIES = [
  "All",
  "Product & Commerce",
  "Design Systems",
  "Branding Web",
];

export function getProject(slug) {
  return PROJECTS.find((project) => project.slug === slug);
}
