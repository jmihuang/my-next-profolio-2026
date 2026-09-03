import Link from "next/link";
import { profile } from "@/lib/profile";

const EXPERIENCES = [
  {
    period: "2017/05 — Present",
    company: "Freelance / Self-employed",
    role: "Senior Product Designer · UX/UI & Frontend",
    description:
      "長期承接產品、網站與數位服務專案，從需求訪談、問題釐清、功能規劃到 UX/UI 與前端開發，完整推進 0→1 專案流程。",
    highlights: [
      "Camping Daddy APP · Product discovery, UX/UI, Vue 2 & API integration",
      "Node 人脈管理 APP · Functional map, UI flow & UX/UI design",
      "清潔公司排班管理後台後台管理系統 · 針對既有後台管理系統進行 UI/UX 重新規劃",
      "蒲田室內設計、華南銀行 · Website planning, interaction design & RWD implementation",
    ],
  },
  {
    period: "2022/06 — 2024/03",
    company: "momo.com Inc.",
    role: "Frontend Engineer",
    description:
      "參與大型 B2C 電商核心產品與 UI 組件建置，將產品操作邏輯、RWD 規劃與 React 前端實作整合於日常協作中。",
    highlights: [
      "Shopping Cart · React, TypeScript, Tailwind；梳理購物車功能與 RWD 操作邏輯",
      "momoUI · React, TypeScript, SCSS, Storybook；參與可重複使用的 UI components 建置",
      "Search · Next.js, TypeScript, Tailwind 前端開發與既有系統維護",
    ],
  },
  {
    period: "2020/09 — 2022/02",
    company: "Stanley Black & Decker",
    role: "Senior Digital Designer",
    description:
      "與 Asia Branding Team 跨團隊合作，參與亞洲區數位行銷專案、活動網站與 EDM 製作，同時協助團隊建立數位設計與 UX 思維。",
    highlights: [
      "Cross-regional digital campaigns & branded web experiences",
      "帶領平面設計師轉型數位設計，進行 Web Design 與 UX Thinking 內部培訓",
    ],
  },
  {
    period: "2014/03 — 2017/05",
    company: "Microprogram",
    role: "Frontend Web Developer",
    description:
      "與 PM、後端工程師及設計師協作，讓設計調整符合前端結構與實際開發需求，累積系統型產品的前端與 API 串接經驗。",
    highlights: [
      "YouBike 官網與維護系統 · RWD、跨瀏覽器相容性、UI 互動與 API 串接",
      "LoRa 停車場管理系統 · Vue.js、UI 互動與前端功能開發",
    ],
  },
];

export const metadata = {
  title: "Experience | Jamie Huang",
  description: "Jamie Huang's product design and frontend experience.",
};

export default function ExperiencePage() {
  return (
    <div className="portfolio-page bg-[#F7F6F2] text-[#111111] min-h-screen overflow-hidden relative">
      <div className="fixed inset-0 opacity-[0.035] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #111 1px, transparent 1px),
              linear-gradient(to bottom, #111 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <section className="relative pt-[220px] pb-28 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-end mb-24">
            <div>
              <div className="mb-8 flex items-center gap-4 text-sm tracking-[0.25em] uppercase text-black/35">
                <div className="w-16 h-px bg-[#5FA391]" />
                Career Journey
              </div>

              <h1 className="text-[72px] md:text-[140px] leading-[0.9] tracking-[-0.07em] font-light">
                Experience
              </h1>
            </div>

            <p className="max-w-xl lg:ml-auto text-black/55 text-lg leading-[2]">
              18+ 年數位設計與前端開發經驗，橫跨大型 B2C 電商、品牌數位體驗、
              管理系統與 0→1 產品。專注將產品思考、UX/UI
              與技術實作整合為能落地的成果。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 border-y border-black/10 py-8 mb-24 text-sm tracking-[0.15em] uppercase text-black/45">
            <div>18+ Years Experience</div>
            <div>Product Design × Frontend</div>
            <div>Remote & Async Collaboration</div>
          </div>

          <div className="border-t border-black/10">
            {EXPERIENCES.map((experience, index) => (
              <article
                key={experience.company}
                className="grid lg:grid-cols-[180px_minmax(0,1fr)] gap-8 lg:gap-16 py-14 border-b border-black/10"
              >
                <div className="text-sm tracking-[0.16em] uppercase text-[#5FA391]">
                  {experience.period}
                </div>

                <div className="grid xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 xl:gap-20">
                  <div>
                    <div className="text-black/40 text-sm tracking-[0.16em] uppercase mb-4">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h2 className="text-3xl md:text-5xl tracking-[-0.04em] leading-tight font-light mb-4">
                      {experience.company}
                    </h2>
                    <p className="text-lg text-black/60 leading-relaxed">
                      {experience.role}
                    </p>
                  </div>

                  <div>
                    <p className="text-black/65 text-lg leading-[2] mb-8">
                      {experience.description}
                    </p>
                    <ul className="space-y-4 border-l border-black/10 pl-6 text-black/55 leading-relaxed">
                      {experience.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6 md:px-12 bg-[#111111] text-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-sm tracking-[0.25em] uppercase text-white/40 mb-8">
            Let&apos;s Work Together
          </div>
          <h2 className="text-5xl md:text-7xl tracking-[-0.05em] leading-[1.05] font-light mb-10">
            Build something
            <br />
            that works.
          </h2>
          <p className="max-w-2xl mx-auto text-white/60 text-lg leading-[2] mb-12">
            如果你正在打造產品、服務或新的數位體驗，我很樂意一起釐清問題、規劃並實現。
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <a
              href={`mailto:${profile.email}`}
              className="inline-block px-10 py-5 rounded-full bg-white text-[#111111] tracking-[0.18em] text-sm uppercase hover:bg-[#5FA391] hover:text-white transition-all duration-500"
            >
              Email Me
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-10 py-5 rounded-full border border-white/30 text-white tracking-[0.18em] text-sm uppercase hover:border-[#5FA391] hover:bg-[#5FA391] transition-all duration-500"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
