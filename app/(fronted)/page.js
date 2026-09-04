import Image from "next/image";
import Link from "next/link";
import personalImg from "/app/assets/image/personal.jpg";
import { profile } from "@/lib/profile";
import { getFeaturedProducts } from "@/lib/products";
import ContactCta from "@/components/contact-cta";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featuredProjects = await getFeaturedProducts();

  return (
    <div className="flex gap-10 mt-6">
      <section className="flex-1 section daily">
        <div className="portfolio-page bg-[#F7F6F2] text-[#111111] min-h-screen overflow-x-hidden font-sans">
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
                  {profile.name} · {profile.role}
                </div>

                <h1 className="text-[56px] md:text-[88px] leading-[0.95] tracking-[-0.04em] font-light mb-8">
                  Product
                  <br />
                  thinking.
                  <br />
                  UX/UI.
                  <br />
                  Frontend.
                </h1>

                <p className="max-w-xl text-black/60 text-lg leading-relaxed mb-12">
                  具備 18+ 年數位產品設計與前端開發經驗，將模糊需求轉化為清楚的功能架構、
                  使用者流程與可落地的產品體驗。
                </p>

                <div className="flex flex-wrap gap-5">
                  <Link
                    href="/projects"
                    className="portfolio-cta portfolio-cta-primary"
                  >
                    <span className="tracking-[0.15em] text-sm uppercase">
                      View Projects
                    </span>
                  </Link>

                  <a
                    href={`mailto:${profile.email}`}
                    className="portfolio-cta portfolio-cta-secondary"
                  >
                    <span>
                      Let&apos;s Work Together
                    </span>
                  </a>
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
                      UX/UI ・ Product Design ・ Frontend
                    </div>

                    <div className="text-3xl font-light leading-snug">
                      From product thinking
                      <br />
                      to working interfaces.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-10 left-0 w-full px-6 md:px-12">
              <div className="max-w-7xl mx-auto border-t border-black/10 pt-6 flex flex-wrap gap-10 text-sm text-black/50 tracking-wide">
                <div>18+ Years Experience</div>
                <div>100+ Digital Projects</div>
                <div>Product Discovery</div>
                <div>UX/UI & Frontend</div>
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
                  From ambiguous
                  <br />
                  requirements to
                  <br />
                  working products.
                </h3>
              </div>

              <div>
                <p className="text-black/65 text-lg leading-[2] mb-10">
                  我曾參與大型 B2C、管理後台、品牌網站與長期 0→1
                  產品專案，累積電商、APP 與數位服務經驗。從需求分析、
                  UX Flow、Wireframe、UI 設計到 React／Vue 前端實作，皆能與 PM、工程師及利害關係人共同推進。
                </p>

                <div className="grid grid-cols-2 gap-10 border-t border-black/10 pt-10">
                  <div>
                    <div className="text-5xl font-extralight mb-3">18+</div>
                    <div className="text-sm uppercase tracking-[0.15em] text-black/45">
                      Years in Digital Product
                    </div>
                  </div>

                  <div>
                    <div className="text-5xl font-extralight mb-3">100+</div>
                    <div className="text-sm uppercase tracking-[0.15em] text-black/45">
                      Website & Digital Projects
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
                  Product strategy, experience design, and frontend execution.
                </h3>
              </div>

              <div className="space-y-0 border-t border-black/10">
                {[
                  {
                    no: "01",
                    title: "Product Discovery",
                    desc: "從需求訪談、功能架構到 User Flow，將模糊問題轉化為可討論、可執行的產品方案。",
                  },
                  {
                    no: "02",
                    title: "UX/UI & Design Systems",
                    desc: "以 Wireframe、Prototype、UI Components 與 Design System 建立一致且可擴展的體驗。",
                  },
                  {
                    no: "03",
                    title: "Frontend Execution",
                    desc: "熟悉 React、TypeScript、Vue、Tailwind 與 API 串接，設計時同步考量技術可行性與落地成本。",
                  },
                  {
                    no: "04",
                    title: "Cross-functional Collaboration",
                    desc: "與 PM、RD 及利害關係人共同釐清需求、討論方案並推進專案，特別適合遠端與非同步協作。",
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

          {/* Selected experience */}
          <section className="py-32 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
              <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
                <div>
                  <div className="text-sm tracking-[0.2em] uppercase text-black/40 mb-6">
                    Selected Experience
                  </div>

                  <h3 className="text-5xl md:text-7xl tracking-[-0.04em] leading-[1.05] font-light">
                    Experience
                    <br />
                    highlights.
                  </h3>
                </div>

                <p className="max-w-lg text-black/55 leading-loose text-lg">
                  從大型 B2C 電商、設計系統到 0→1 APP，
                  持續把產品思考、使用者體驗與前端實作轉化為可落地的成果。
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-10">
                {featuredProjects.map((project, index) => (
                  <Link key={project.slug} href={`/projects/${project.slug}`} className={`group block ${index === 1 ? "lg:mt-20" : ""}`}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] border border-black/10 mb-6 bg-white">
                      <Image src={project.image} alt={`${project.title} project preview`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                    </div>

                    <div className="flex items-start justify-between gap-6 border-b border-black/10 pb-7 transition-colors duration-500 group-hover:border-[#5FA391]">
                      <div>
                        <div className="text-sm uppercase tracking-[0.15em] text-black/40 mb-3">0{index + 1} / {project.eyebrow}</div>
                        <h4 className="text-3xl md:text-4xl font-light tracking-[-0.04em] leading-tight mb-4 group-hover:text-[#5FA391] transition-colors duration-300">{project.title}</h4>
                        <p className="text-black/55 leading-loose">{project.summary}</p>
                      </div>
                      <div className="text-[#5FA391] text-xl">↗</div>
                    </div>
                  </Link>
                ))}
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
                我相信好的產品不只是漂亮，而是能被理解、被使用、也能在真實的技術與商業限制中落地。
              </p>
            </div>
          </section>

          <ContactCta id="contact" />
        </div>
      </section>
    </div>
  );
}
