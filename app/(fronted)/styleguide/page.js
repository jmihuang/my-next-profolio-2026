import Link from "next/link";

const COLORS = [
  { name: "Canvas", value: "#F7F6F2", className: "bg-[#F7F6F2]" },
  { name: "Ink", value: "#111111", className: "bg-[#111111]" },
  { name: "Accent", value: "#5FA391", className: "bg-[#5FA391]" },
  { name: "Surface", value: "#FFFFFF", className: "bg-white" },
];

export const metadata = {
  title: "Style Guide | Jamie Huang",
  description: "Portfolio visual foundations and reusable interface patterns.",
};

export default function StyleGuidePage() {
  return (
    <div className="portfolio-page min-h-screen bg-[#F7F6F2] text-[#111111]">
      <div className="fixed inset-0 pointer-events-none opacity-[0.035]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(to right, #111 1px, transparent 1px), linear-gradient(to bottom, #111 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <section className="relative px-6 pb-24 pt-[180px] md:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-20 grid gap-12 border-b border-black/10 pb-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="mb-7 flex items-center gap-4 font-sans text-sm uppercase tracking-[0.24em] text-black/40">
                <span className="h-px w-16 bg-[#5FA391]" />
                Portfolio foundations
              </div>
              <h1 className="font-serif text-[68px] font-light leading-[0.88] tracking-[-0.065em] md:text-[132px]">
                Style
                <br />
                Guide.
              </h1>
            </div>
            <p className="font-sans max-w-xl text-lg leading-[2] text-black/60 lg:ml-auto">
              一套用於作品集的閱讀節奏：內文保持清晰、標題保留編輯感，讓產品案例與設計思考成為主角。
            </p>
          </div>

          <section className="mb-24 grid gap-10 border-b border-black/10 pb-20 lg:grid-cols-[280px_1fr]">
            <div>
              <p className="font-sans text-sm uppercase tracking-[0.2em] text-[#5FA391]">01 / Typography</p>
              <h2 className="mt-4 text-4xl font-light tracking-[-0.04em]">Typography</h2>
            </div>
            <div className="grid gap-10">
              <div className="rounded-[28px] border border-black/10 bg-white p-8 md:p-12">
                <p className="font-sans mb-6 text-xs uppercase tracking-[0.2em] text-black/40">Display / font-serif</p>
                <p className="font-serif text-5xl font-light leading-[1.02] tracking-[-0.05em] md:text-7xl">Thoughtful products,<br />made tangible.</p>
                <p className="font-sans mt-7 text-sm leading-relaxed text-black/50">Times New Roman · Georgia · Garamond · Noto Serif TC</p>
              </div>
              <div className="rounded-[28px] border border-black/10 bg-white p-8 md:p-12">
                <p className="font-sans mb-5 text-xs uppercase tracking-[0.2em] text-black/40">Body / font-sans</p>
                <p className="font-sans max-w-3xl text-lg leading-[2] text-black/65">用清楚、平衡的無襯線字體承載專案脈絡、流程說明與成果細節，讓中英文內容都維持穩定的可讀性。</p>
                <p className="font-sans mt-7 text-sm leading-relaxed text-black/50">Arial · Noto Sans TC · PingFang TC · Microsoft JhengHei</p>
              </div>
            </div>
          </section>

          <section className="mb-24 grid gap-10 border-b border-black/10 pb-20 lg:grid-cols-[280px_1fr]">
            <div>
              <p className="font-sans text-sm uppercase tracking-[0.2em] text-[#5FA391]">02 / Color</p>
              <h2 className="mt-4 text-4xl font-light tracking-[-0.04em]">Color</h2>
            </div>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
              {COLORS.map((color) => (
                <div key={color.name} className="rounded-[24px] border border-black/10 bg-white p-4">
                  <div className={`mb-5 aspect-square rounded-[18px] border border-black/5 ${color.className}`} />
                  <p className="font-sans text-sm font-medium">{color.name}</p>
                  <p className="font-sans mt-1 text-xs tracking-[0.12em] text-black/45">{color.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-24 grid gap-10 border-b border-black/10 pb-20 lg:grid-cols-[280px_1fr]">
            <div>
              <p className="font-sans text-sm uppercase tracking-[0.2em] text-[#5FA391]">03 / Components</p>
              <h2 className="mt-4 text-4xl font-light tracking-[-0.04em]">Actions & surfaces</h2>
            </div>
            <div className="rounded-[28px] border border-black/10 bg-white p-8 md:p-12">
              <div className="mb-12 flex flex-wrap gap-4">
                <Link href="/projects" className="portfolio-cta portfolio-cta-primary">View Projects</Link>
                <a href="mailto:jmispace@gmail.com" className="portfolio-cta portfolio-cta-secondary">Start a conversation</a>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <article className="rounded-[24px] border border-black/10 bg-[#F7F6F2] p-7">
                  <p className="font-sans text-xs uppercase tracking-[0.18em] text-black/40">Card / Surface</p>
                  <h3 className="mt-5 text-3xl font-light tracking-[-0.04em]">Quiet structure.</h3>
                  <p className="font-sans mt-4 leading-relaxed text-black/60">白色與米灰底色、細邊框及大圓角，讓內容有明確分組而不顯厚重。</p>
                </article>
                <article className="rounded-[24px] bg-[#111111] p-7 text-white">
                  <p className="font-sans text-xs uppercase tracking-[0.18em] text-white/45">Section / Contrast</p>
                  <h3 className="mt-5 text-3xl font-light tracking-[-0.04em]">Make it tangible.</h3>
                  <p className="font-sans mt-4 leading-relaxed text-white/60">深色區塊用於收尾與行動呼籲；綠色只作為連結、互動與導引焦點。</p>
                </article>
              </div>
            </div>
          </section>

          <div className="flex flex-wrap items-center justify-between gap-6">
            <p className="font-sans text-sm tracking-wide text-black/45">Jamie Huang · Portfolio visual system</p>
            <Link href="/" className="font-sans text-sm uppercase tracking-[0.18em] text-[#5FA391] hover:text-[#111111]">Back to home ↗</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
