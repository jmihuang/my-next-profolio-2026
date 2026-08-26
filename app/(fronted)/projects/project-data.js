export const PROJECTS = [
  {
    slug: "momo-shopping-cart",
    title: "momo Shopping Cart",
    eyebrow: "Product & Commerce",
    categories: ["Product & Commerce"],
    role: "Frontend Engineer · Product / UX collaboration",
    summary: "大型 B2C 購物車體驗與前端開發。",
    cardTechnologyLine: "React · TypeScript · Tailwind · RWD · API Integration",
    technologies: ["React", "TypeScript", "Tailwind", "RWD", "API Integration"],
    notes: ["Shopping cart flow", "Payment states", "Delivery options"],
    image: "/projects/momo-shopping-cart-flow.png",
    gallery: [
      { src: "/projects/momo-shopping-cart-flow.png", alt: "momo Shopping Cart flow chart" },
    ],
  },
  {
    slug: "momoui-design-system",
    title: "momoUI",
    eyebrow: "Design Systems",
    categories: ["Design Systems"],
    role: "Frontend Engineer · UI Components",
    summary: "可重複使用的電商 UI Component Library。",
    cardTechnologyLine: "React · TypeScript · SCSS · Storybook · Atomic Design",
    technologies: ["React", "TypeScript", "SCSS", "Storybook", "Atomic Design"],
    notes: ["Component library", "Design tokens", "Documentation"],
    image: "/projects/momoui-styleguide-colors.png",
    gallery: [
      { src: "/projects/momoui-styleguide-shapes.png", alt: "momoUI shape tokens" },
      { src: "/projects/momoui-styleguide-colors.png", alt: "momoUI color tokens" },
    ],
  },
  {
    slug: "annluya-ecommerce",
    title: "安綠雅",
    eyebrow: "Product & Commerce · Branding Web",
    categories: ["Product & Commerce", "Branding Web"],
    role: "UX/UI · E-commerce Website",
    summary: "保養品牌電商網站改版與 RWD 導覽規劃。",
    cardTechnologyLine: "UX/UI · E-commerce · Information Architecture · Responsive Design",
    technologies: ["UX/UI", "E-commerce", "Information Architecture", "Responsive Design"],
    notes: ["Desktop & mobile navigation", "Product categories", "Campaign modules"],
    image: "/projects/annluya-overview.png",
    gallery: [
      { src: "/projects/annluya-overview.png", alt: "Annluya desktop and mobile website design" },
    ],
  },
  {
    slug: "eornet-brand-platform",
    title: "丞元資訊",
    eyebrow: "Branding Web",
    categories: ["Branding Web"],
    role: "Brand Identity · Website Design",
    summary: "雲端服務企業的品牌識別與資訊型網站。",
    cardTechnologyLine: "Brand · Web Design · Responsive Design · Product Planning",
    technologies: ["Brand", "Web Design", "Information Design", "Responsive Design", "Product Planning"],
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
    cardTechnologyLine: "UX/UI · Web Design · Content Architecture · Responsive Design",
    technologies: ["UX/UI", "Web Design", "Content Architecture", "Responsive Design"],
    notes: ["Project showcase", "Workflow", "Editorial content"],
    image: "/projects/putien-home.png",
    gallery: [
      { src: "/projects/putien-home.png", alt: "Putien Interior Design homepage" },
      { src: "/projects/putien-projects.png", alt: "Putien Interior Design projects page" },
      { src: "/projects/putien-workflow.png", alt: "Putien Interior Design workflow page" },
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
