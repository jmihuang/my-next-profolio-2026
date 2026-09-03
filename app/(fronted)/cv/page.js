import Link from "next/link";
import { profile } from "@/lib/profile";

const strengths = [
  ["01", "Product Discovery", "需求訪談、問題釐清、功能架構與 User Flow"],
  ["02", "UX/UI & Design Systems", "Wireframe、UI Flow、元件思維與一致的產品體驗"],
  ["03", "Frontend Execution", "React、TypeScript、Vue、Tailwind、RWD 與 API 串接"],
  ["04", "Product Collaboration", "與客戶、PM、設計與工程團隊共同推進可落地的方案"],
];

const experiences = [
  {
    period: "2017/05 — Present",
    company: "Freelance / Self-employed",
    role: "Senior Product Designer · UX/UI & Frontend",
    summary:
      "長期承接產品、網站與數位服務專案，從需求訪談、問題釐清、功能規劃到 UX/UI 與前端開發，完整推進 0→1 專案流程。",
    highlights: [
      "Camping Daddy APP · Product discovery、UX/UI、Vue 2 與後台 API 串接",
      "Node 人脈管理 APP · 需求分析、Functional Map、UI Flow 與 UX/UI 設計",
      "minequo 米奈可、華南銀行 · 網站企劃、互動設計與 RWD 前端實作",
    ],
  },
  {
    period: "2022/06 — 2024/03",
    company: "momo.com Inc.",
    role: "Frontend Engineer",
    summary:
      "參與大型 B2C 電商核心產品與 UI 組件建置，整合購物流程、RWD 規劃與 React 前端實作。",
    highlights: [
      "Shopping Cart · React、TypeScript、Tailwind；梳理複雜功能與操作邏輯",
      "momoUI · React、TypeScript、SCSS、Storybook；參與可重複使用的 UI Components 建置",
      "Search · Next.js、TypeScript、Tailwind 前端開發與既有系統維護",
    ],
  },
  {
    period: "2020/09 — 2022/02",
    company: "Stanley Black & Decker",
    role: "Senior Digital Designer",
    summary:
      "與 Asia Branding Team 跨團隊合作，參與亞洲區數位行銷專案、活動網站與 EDM 製作。",
    highlights: [
      "帶領平面設計師轉型數位設計，進行 Web Design 與 UX Thinking 內部培訓",
      "協作完成亞洲區品牌數位體驗與行銷專案",
    ],
  },
  {
    period: "2014/03 — 2017/05",
    company: "Microprogram",
    role: "Frontend Web Developer",
    summary:
      "與 PM、後端工程師及設計師協作，讓設計調整符合前端結構與實際開發需求。",
    highlights: [
      "YouBike 官網與維護系統 · RWD、跨瀏覽器相容性、UI 互動與 API 串接",
      "LoRa 停車場管理系統 · Vue.js、UI 互動與前端功能開發",
    ],
  },
];

const selectedWork = [
  ["momo Shopping Cart", "Product / UX / Frontend", "重新整理大型 B2C 購物車功能與操作邏輯，提出 RWD 整合方案，並參與 React 前端開發。"],
  ["momoUI Design System", "Design System / Frontend", "以可重複使用的 UI Components 支援產品開發，兼顧元件結構、維護成本與使用情境。"],
  ["Node 人脈管理 APP", "Product Discovery / UX/UI", "從需求訪談與分析出發，以 Functional Map、UI Flow 建立產品資訊架構與操作邏輯。"],
  ["Camping Daddy APP", "Product Discovery / UX/UI / Frontend", "完成初版產品設計，並參與後台 API 資料串接與 Vue 2 前端開發。"],
];

const community = [
  "UX/UI 台中聚 · 召集人／核心策劃；策劃 23+ 場 UX/UI 工作坊與講座",
  "台中前端社群 · 核心策劃；參與 40+ 場技術講座",
  "GDG Speaker · Material UI Components",
  "Stanley Black & Decker Taiwan GCX Department · Design Thinking Training Coach",
];

export const metadata = {
  title: "CV | Jamie Huang",
  description: "Senior Product Designer · UX/UI × Product Design × Frontend.",
};

export default function CareerProfile({ showExperienceTitle = false }) {
  return (
    <div className="portfolio-page font-sans min-h-screen overflow-hidden bg-[#F7F6F2] text-[#111111]">
      <div className="fixed inset-0 pointer-events-none opacity-[0.035]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, #111 1px, transparent 1px), linear-gradient(to bottom, #111 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <section className="relative px-6 pb-28 pt-[190px] md:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid items-end gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
            <div>
              <div className="mb-8 flex items-center gap-4 text-sm uppercase tracking-[0.25em] text-black/35">
                <span className="h-px w-16 bg-[#5FA391]" />
                {showExperienceTitle ? "Career overview" : "Curriculum Vitae"}
              </div>
              <h1 className="text-[68px] font-light leading-[0.88] tracking-[-0.075em] md:text-[140px]">
                {showExperienceTitle ? (
                  "Experience."
                ) : (
                  <>
                    Jamie
                    <br />
                    Huang.
                  </>
                )}
              </h1>
            </div>

            <div className="border-l border-black/10 pl-6 md:pl-10">
              <p className="mb-7 text-sm uppercase tracking-[0.2em] text-[#5FA391]">
                Senior Product Designer
              </p>
              <p className="text-2xl font-light leading-[1.35] tracking-[-0.035em] text-black/80 md:text-4xl">
                UX/UI × Product Design × Frontend
              </p>
              <p className="mt-8 max-w-xl text-lg leading-[2] text-black/55">
                從設計出發，串起需求、產品體驗與前端實作；擅長將模糊問題整理為能被理解、被協作、也能落地的產品方案。
              </p>
            </div>
          </div>

          <div className="mt-24 grid gap-8 border-y border-black/10 py-8 text-sm uppercase tracking-[0.15em] text-black/45 md:grid-cols-3">
            <div>18+ Years in Digital</div>
            <div>100+ Digital Projects</div>
            <div>Product Design × Frontend</div>
          </div>
        </div>
      </section>

      <section className="relative border-y border-black/5 bg-white px-6 py-28 md:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 max-w-4xl">
            <div className="mb-6 text-sm uppercase tracking-[0.22em] text-black/40">Core capabilities</div>
            <h2 className="text-5xl font-light leading-[1.02] tracking-[-0.055em] md:text-7xl">From discovery to working interfaces.</h2>
          </div>
          <div className="border-t border-black/10">
            {strengths.map(([number, title, description]) => (
              <div key={number} className="grid gap-5 border-b border-black/10 py-8 md:grid-cols-[100px_minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-10">
                <span className="text-sm tracking-[0.18em] text-[#5FA391]">{number}</span>
                <h3 className="text-2xl font-light tracking-[-0.035em] md:text-3xl">{title}</h3>
                <p className="leading-[1.9] text-black/55">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-28 md:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-20 grid gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <div className="mb-6 flex items-center gap-4 text-sm uppercase tracking-[0.22em] text-black/40"><span className="h-px w-12 bg-[#5FA391]" />Career journey</div>
              <h2 className="text-5xl font-light leading-[0.94] tracking-[-0.065em] md:text-8xl">Experience.</h2>
            </div>
            <p className="max-w-xl text-lg leading-[2] text-black/55 lg:ml-auto">橫跨大型 B2C 電商、品牌數位體驗、系統型產品與 0→1 專案，持續把產品思考、UX/UI 與技術實作整合為可落地的成果。</p>
          </div>

          <div className="border-t border-black/10">
            {experiences.map((experience) => (
              <article key={experience.company} className="grid gap-8 border-b border-black/10 py-12 lg:grid-cols-[180px_minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
                <p className="text-sm uppercase tracking-[0.16em] text-[#5FA391]">{experience.period}</p>
                <div>
                  <h3 className="text-3xl font-light leading-tight tracking-[-0.045em] md:text-4xl">{experience.company}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-black/55">{experience.role}</p>
                </div>
                <div>
                  <p className="text-lg leading-[1.9] text-black/65">{experience.summary}</p>
                  <ul className="mt-7 space-y-3 border-l border-black/10 pl-5 leading-relaxed text-black/55">
                    {experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#111111] px-6 py-28 text-white md:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <div className="mb-6 text-sm uppercase tracking-[0.22em] text-white/40">Selected work</div>
              <h2 className="text-5xl font-light leading-[0.95] tracking-[-0.06em] md:text-7xl">Product evidence.</h2>
            </div>
            <Link href="/projects" className="text-sm uppercase tracking-[0.18em] text-white/65 transition-colors hover:text-[#79b5a5]">View all projects ↗</Link>
          </div>
          <div className="grid gap-px bg-white/15 md:grid-cols-2">
            {selectedWork.map(([title, type, description]) => (
              <article key={title} className="bg-[#111111] p-8 md:p-10">
                <p className="mb-8 text-xs uppercase tracking-[0.2em] text-[#79b5a5]">{type}</p>
                <h3 className="text-3xl font-light tracking-[-0.045em] md:text-4xl">{title}</h3>
                <p className="mt-6 max-w-xl leading-[1.9] text-white/60">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-28 md:px-12">
        <div className="mx-auto grid max-w-[1600px] gap-20 lg:grid-cols-2">
          <div>
            <div className="mb-6 text-sm uppercase tracking-[0.22em] text-black/40">Community & leadership</div>
            <h2 className="mb-10 text-5xl font-light leading-[1.02] tracking-[-0.055em] md:text-6xl">Share what works.</h2>
            <ul className="space-y-5 border-t border-black/10 pt-7 leading-[1.85] text-black/60">
              {community.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="border-t border-black/10 pt-7 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
            <div className="mb-6 text-sm uppercase tracking-[0.22em] text-black/40">Education & languages</div>
            <div className="space-y-9 text-black/60">
              <div><h3 className="text-2xl font-light tracking-[-0.035em] text-black">國立臺中科技大學</h3><p className="mt-2 leading-relaxed">商業設計系 · 2002/09 — 2006/06</p></div>
              <div><h3 className="text-2xl font-light tracking-[-0.035em] text-black">彰化高商</h3><p className="mt-2 leading-relaxed">廣告設計系 · 1999/09 — 2001/06</p></div>
              <div className="grid gap-4 border-t border-black/10 pt-7 sm:grid-cols-2"><p><span className="block text-sm uppercase tracking-[0.16em] text-[#5FA391]">Chinese</span><span className="mt-2 block">Native</span></p><p><span className="block text-sm uppercase tracking-[0.16em] text-[#5FA391]">English</span><span className="mt-2 block">Working proficiency</span></p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white px-6 py-28 md:px-12">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-7 text-sm uppercase tracking-[0.22em] text-black/40">Let&apos;s work together</div>
          <h2 className="text-5xl font-light leading-[1.02] tracking-[-0.06em] md:text-7xl">Let&apos;s build something<br />that works.</h2>
          <p className="mx-auto mt-9 max-w-2xl text-lg leading-[2] text-black/55">如果你正在打造產品、服務或新的數位體驗，我很樂意一起釐清問題、規劃並實現。</p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a href={`mailto:${profile.email}`} className="rounded-full bg-[#111111] px-8 py-4 text-sm uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#5FA391]">Email Me</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-black/10 px-8 py-4 text-sm uppercase tracking-[0.16em] transition-colors hover:border-[#5FA391] hover:text-[#5FA391]">LinkedIn ↗</a>
            <Link href="/projects" className="rounded-full border border-black/10 px-8 py-4 text-sm uppercase tracking-[0.16em] transition-colors hover:border-[#5FA391] hover:text-[#5FA391]">Projects ↗</Link>
            <a href="/downloads/Jamie_Huang_Senior_Product_Designer_CV_CN.pdf" download className="rounded-full border border-black/10 px-8 py-4 text-sm uppercase tracking-[0.16em] transition-colors hover:border-[#5FA391] hover:text-[#5FA391]">Download CV PDF</a>
          </div>
        </div>
      </section>
    </div>
  );
}
