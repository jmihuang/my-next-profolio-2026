import ImageSlideshow from "@/components/slides/image-slideshow";
import Image from "next/image";
import Link from "next/link";
import personalImg from "/app/assets/image/personal.jpg";

export default function Home() {
  return (
    <div className="flex gap-10 mt-6">
      <section className="flex-1 section daily">
        <div className="bg-[#F7F6F2] text-[#111111] min-h-screen overflow-x-hidden font-sans">
          {/* Background Grid */}
          <div className="fixed inset-0 opacity-[0.04] pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
              linear-gradient(to right, #111 1px, transparent 1px),
              linear-gradient(to bottom, #111 1px, transparent 1px)
            `,
                backgroundSize: "80px 80px",
              }}
            />
          </div>

          {/* Hero */}
          <section className="relative min-h-screen flex items-center px-6 md:px-12">
            <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-center">
              {/* Left */}
              <div>
                <div className="mb-8 flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-black/40">
                  <div className="w-16 h-px bg-[#5FA391]" />
                  Digital Experience Designer
                </div>

                <h2 className="text-[56px] md:text-[88px] leading-[0.95] tracking-[-0.04em] font-light mb-8">
                  Build
                  <br />
                  meaningful
                  <br />
                  digital
                  <br />
                  experiences.
                </h2>

                <p className="max-w-xl text-black/60 text-lg leading-relaxed mb-12">
                  結合 UI/UX、前端開發與 AI Workflow，
                  將抽象想法轉化為真正可執行、可理解、可上線的產品體驗。
                </p>

                <div className="flex flex-wrap gap-5">
                  <button className="group border border-black/10 px-8 py-4 rounded-full bg-[#111111] text-white hover:bg-[#5FA391] transition-all duration-500">
                    <span className="tracking-[0.15em] text-sm uppercase">
                      View Projects
                    </span>
                  </button>

                  <button className="group border border-black/10 px-8 py-4 rounded-full hover:border-[#5FA391] transition-all duration-500">
                    <span className="tracking-[0.15em] text-sm uppercase group-hover:text-[#5FA391]">
                      Let&apos;s Work Together
                    </span>
                  </button>
                </div>
              </div>

              {/* Right */}
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-[#5FA391]/10 blur-3xl" />

                <div className="relative border border-black/10 rounded-[40px] overflow-hidden bg-white shadow-[0_40px_100px_rgba(0,0,0,0.05)]">
                  <Image
                    src={personalImg}
                    alt="personal photos"
                    className="w-full h-[720px] object-cover"
                    width={1086}
                    height={1448}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <div className="absolute bottom-0 left-0 p-10 text-white">
                    <div className="text-sm tracking-[0.2em] uppercase mb-3 text-white/70">
                      UI/UX ・ Front-end ・ AI
                    </div>

                    <div className="text-3xl font-light leading-snug">
                      Design with strategy.
                      <br />
                      Execute with precision.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-10 left-0 w-full px-6 md:px-12">
              <div className="max-w-7xl mx-auto border-t border-black/10 pt-6 flex flex-wrap gap-10 text-sm text-black/50 tracking-wide">
                <div>10+ Years Experience</div>
                <div>UI/UX & Front-end</div>
                <div>Design System</div>
                <div>AI Assisted Workflow</div>
              </div>
            </div>
          </section>

          {/* About Preview */}
          <section className="py-32 px-6 md:px-12 border-t border-black/5">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
              <div>
                <div className="text-sm tracking-[0.2em] uppercase text-black/40 mb-6">
                  About
                </div>

                <h3 className="text-5xl md:text-7xl leading-[1.05] tracking-[-0.04em] font-light mb-10">
                  More than
                  <br />
                  just visual
                  <br />
                  design.
                </h3>
              </div>

              <div>
                <p className="text-black/65 text-lg leading-[2] mb-10">
                  我擁有 UI/UX 與前端整合背景，曾參與電商、金融、品牌活動網站、
                  後台系統與跨國協作專案。 擅長將設計、策略與技術整合，並透過 AI
                  工具提升產品開發效率與內容產出。
                </p>

                <div className="grid grid-cols-2 gap-10 border-t border-black/10 pt-10">
                  <div>
                    <div className="text-5xl font-extralight mb-3">20+</div>
                    <div className="text-sm uppercase tracking-[0.15em] text-black/45">
                      Projects
                    </div>
                  </div>

                  <div>
                    <div className="text-5xl font-extralight mb-3">4+</div>
                    <div className="text-sm uppercase tracking-[0.15em] text-black/45">
                      Industries
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Strengths */}
          <section className="py-32 px-6 md:px-12 bg-white border-y border-black/5">
            <div className="max-w-7xl mx-auto">
              <div className="mb-24">
                <div className="text-sm tracking-[0.2em] uppercase text-black/40 mb-6">
                  Core Strengths
                </div>

                <h3 className="text-5xl md:text-7xl tracking-[-0.04em] leading-[1.05] font-light max-w-4xl">
                  Combining design thinking, development, and AI workflow.
                </h3>
              </div>

              <div className="space-y-0 border-t border-black/10">
                {[
                  {
                    no: "01",
                    title: "Design + Development",
                    desc: "同時理解設計與前端實作，降低設計與工程之間的溝通成本。",
                  },
                  {
                    no: "02",
                    title: "Strategy Thinking",
                    desc: "不只是畫面執行，而是從產品與使用者角度思考問題。",
                  },
                  {
                    no: "03",
                    title: "AI Assisted Workflow",
                    desc: "善於運用 AI 提升研究、設計、內容與開發效率。",
                  },
                  {
                    no: "04",
                    title: "From Concept to Launch",
                    desc: "能從規劃、設計到實作，完整推進專案。",
                  },
                ].map((item) => (
                  <div
                    key={item.no}
                    className="grid md:grid-cols-[160px_1fr_1fr] gap-10 py-12 border-b border-black/10 hover:bg-[#F7F6F2] transition-all duration-500"
                  >
                    <div className="text-4xl font-extralight text-black/30">
                      {item.no}
                    </div>

                    <div>
                      <h4 className="text-3xl font-light tracking-[-0.03em]">
                        {item.title}
                      </h4>
                    </div>

                    <div className="text-black/55 leading-loose text-lg">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Project */}
          <section className="py-32 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
              <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
                <div>
                  <div className="text-sm tracking-[0.2em] uppercase text-black/40 mb-6">
                    Featured Project
                  </div>

                  <h3 className="text-5xl md:text-7xl tracking-[-0.04em] leading-[1.05] font-light">
                    Selected
                    <br />
                    works.
                  </h3>
                </div>

                <p className="max-w-lg text-black/55 leading-loose text-lg">
                  從品牌活動網站、Design System 到 Next.js 專案，
                  每個作品都強調策略、體驗與實作整合。
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-10">
                <div className="group cursor-pointer">
                  <div className="overflow-hidden rounded-[32px] border border-black/10 mb-6 bg-white">
                    <img
                      src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop"
                      className="w-full h-[520px] object-cover group-hover:scale-105 transition-all duration-700"
                    />
                  </div>

                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="text-sm uppercase tracking-[0.15em] text-black/40 mb-3">
                        UI System / React
                      </div>

                      <h4 className="text-3xl font-light tracking-[-0.03em] mb-4">
                        E-commerce Design System
                      </h4>

                      <p className="text-black/55 leading-loose">
                        建立可擴展的 UI Components 與 Design System，
                        提升團隊協作與產品一致性。
                      </p>
                    </div>

                    <div className="text-[#5FA391] text-xl">↗</div>
                  </div>
                </div>

                <div className="group cursor-pointer mt-20">
                  <div className="overflow-hidden rounded-[32px] border border-black/10 mb-6 bg-white">
                    <img
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                      className="w-full h-[520px] object-cover group-hover:scale-105 transition-all duration-700"
                    />
                  </div>

                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="text-sm uppercase tracking-[0.15em] text-black/40 mb-3">
                        AI Workflow / UX
                      </div>

                      <h4 className="text-3xl font-light tracking-[-0.03em] mb-4">
                        AI Assisted Product Flow
                      </h4>

                      <p className="text-black/55 leading-loose">
                        透過 AI 工具加速產品研究、內容生成與 UX 規劃流程。
                      </p>
                    </div>

                    <div className="text-[#5FA391] text-xl">↗</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Philosophy */}
          <section className="py-40 px-6 md:px-12 bg-[#111111] text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                linear-gradient(to right, #fff 1px, transparent 1px),
                linear-gradient(to bottom, #fff 1px, transparent 1px)
              `,
                  backgroundSize: "80px 80px",
                }}
              />
            </div>

            <div className="relative max-w-6xl mx-auto text-center">
              <div className="text-sm tracking-[0.2em] uppercase text-white/40 mb-10">
                Philosophy
              </div>

              <h3 className="text-5xl md:text-8xl tracking-[-0.05em] leading-[1.1] font-extralight mb-14">
                Design should
                <br />
                solve problems,
                <br />
                not just look good.
              </h3>

              <p className="max-w-3xl mx-auto text-white/60 text-xl leading-loose">
                我相信好的產品，不只是漂亮， 而是能被理解、被使用、被信任。
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="py-32 px-6 md:px-12">
            <div className="max-w-5xl mx-auto text-center">
              <div className="text-sm tracking-[0.2em] uppercase text-black/40 mb-8">
                Contact
              </div>

              <h3 className="text-5xl md:text-7xl tracking-[-0.05em] leading-[1.05] font-light mb-10">
                Let&apos;s build
                <br />
                something meaningful.
              </h3>

              <p className="text-black/55 text-lg leading-loose mb-14 max-w-2xl mx-auto">
                如果你正在打造有價值的產品、品牌或體驗， 我很樂意參與其中。
              </p>

              <div className="flex flex-wrap justify-center gap-5">
                <button className="px-8 py-4 rounded-full bg-[#111111] text-white tracking-[0.15em] text-sm uppercase hover:bg-[#5FA391] transition-all duration-500">
                  Email
                </button>

                <button className="px-8 py-4 rounded-full border border-black/10 tracking-[0.15em] text-sm uppercase hover:border-[#5FA391] hover:text-[#5FA391] transition-all duration-500">
                  LinkedIn
                </button>

                <button className="px-8 py-4 rounded-full border border-black/10 tracking-[0.15em] text-sm uppercase hover:border-[#5FA391] hover:text-[#5FA391] transition-all duration-500">
                  Medium
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
