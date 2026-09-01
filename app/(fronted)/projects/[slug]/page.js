import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import CleaningDoctorCaseStudy from "../../../../components/cleaning-doctor/cleaning-doctor-case-study-v2";
import ProductDetailSections, { ProductImageSection } from "@/components/products/product-detail-sections";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const project = await getProductBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} | Jamie Huang`,
    description: project.summary,
  };
}

function CaseLabel({ index, children }) {
  return <div className="flex items-center gap-4 text-sm tracking-[0.2em] uppercase text-[#5FA391]"><span>{String(index).padStart(2, "0")}</span><span className="h-px w-10 bg-[#5FA391]/60" />{children}</div>;
}

function CaseImage({ src, alt, className = "" }) {
  return <div className={`relative overflow-hidden rounded-[28px] border border-black/10 bg-white ${className}`}><Image src={src} alt={alt} width={2400} height={1400} className="w-full h-auto" /></div>;
}

function MomoCaseStudy() {
  const scenarios = [
    { src: "/projects/momo-rwd-product-detail.png", alt: "Product detail responsive comparison", title: "Product configurations", text: "將商品組合與規格選擇收斂為跨裝置可延續的商品邏輯。" },
    { src: "/projects/momo-rwd-add-on.png", alt: "Add-on purchase responsive comparison", title: "Add-on purchase", text: "把加購流程與商品資訊整合至同一套響應式版型。" },
    { src: "/projects/momo-rwd-settlement.png", alt: "Settlement responsive comparison", title: "Payment & recipient", text: "釐清紅利、momo 幣、收件資訊與結帳金額的關聯狀態。" },
    { src: "/projects/momo-rwd-coupon.png", alt: "Coupon responsive comparison", title: "Coupon selection", text: "整理優惠券適用條件、選擇行為與結帳回饋。" },
    { src: "/projects/momo-rwd-tracked-items.png", alt: "Tracked items responsive comparison", title: "Saved & tracked items", text: "讓追蹤清單、最近購買與回購操作維持一致的任務流程。" },
  ];

  return <>
    <section className="py-28 border-b border-black/10">
      <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-14 lg:gap-24">
        <div><CaseLabel index={1}>The challenge</CaseLabel></div>
        <div>
          <h2 className="text-4xl md:text-6xl tracking-[-0.055em] leading-[1.03] font-light max-w-3xl">One shopping system,<br />not two separate experiences.</h2>
          <p className="mt-9 max-w-3xl text-lg leading-[1.9] text-black/60">既有購物車以 jQuery 架構運作，桌機與手機功能各自演進，造成操作情境與維護成本不一致。我的工作從功能盤點開始，將分散的頁面、元件和狀態整理成可共用的產品邏輯，作為 React 前後端分離與 RWD 設計的共同基礎。</p>
        </div>
      </div>
    </section>

    <section className="py-28 border-b border-black/10">
      <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-14 lg:gap-24">
        <div><CaseLabel index={2}>Functional map</CaseLabel></div>
        <div>
          <h2 className="text-4xl md:text-6xl tracking-[-0.055em] leading-[1.03] font-light">Make every feature visible.</h2>
          <p className="mt-7 mb-12 max-w-3xl text-lg leading-[1.9] text-black/60">以 Functional Map 拆解購物車清單、商品明細、追蹤清單、結帳步驟與各項元件；逐一對照桌機與手機是否具備相同功能、資料與例外狀態。這讓 RWD 不是單純縮放畫面，而是維護同一套系統規則。</p>
          <CaseImage src="/projects/momo-functional-map.png" alt="momo shopping cart functional map" />
        </div>
      </div>
    </section>

    <section className="py-28 border-b border-black/10">
      <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-14 lg:gap-24">
        <div><CaseLabel index={3}>Flow & states</CaseLabel></div>
        <div>
          <h2 className="text-4xl md:text-6xl tracking-[-0.055em] leading-[1.03] font-light">Untangle checkout decisions.</h2>
          <p className="mt-7 mb-12 max-w-3xl text-lg leading-[1.9] text-black/60">面對超商取件、付款、優惠折抵、商品組合與庫存等互相影響的情境，我以 Flow Chart 將條件、分支和系統回應可視化。團隊可據此確認每個狀態在桌機與手機上的呈現與後續行為。</p>
          <CaseImage src="/projects/momo-cart-flow-chart.png" alt="momo shopping cart checkout flow chart" />
        </div>
      </div>
    </section>

    <section className="py-28">
      <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-14 lg:gap-24 mb-14">
        <div><CaseLabel index={4}>Responsive system</CaseLabel></div>
        <div><h2 className="text-4xl md:text-6xl tracking-[-0.055em] leading-[1.03] font-light">A shared system across devices.</h2><p className="mt-7 max-w-3xl text-lg leading-[1.9] text-black/60">將優先級、元件行為與資訊結構落實在桌機、RWD 與手機版本；以下是代表性的功能情境，而非兩套獨立產品。</p></div>
      </div>
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-14">{scenarios.map((scenario, index) => <article key={scenario.src} className={index === 0 ? "md:col-span-2" : ""}><CaseImage src={scenario.src} alt={scenario.alt} /><div className="mt-5 flex gap-5"><span className="text-[#5FA391] text-sm pt-1">0{index + 1}</span><div><h3 className="text-2xl tracking-[-0.035em] font-light">{scenario.title}</h3><p className="mt-2 text-black/55 leading-relaxed">{scenario.text}</p></div></div></article>)}</div>
      <div className="mt-16"><CaseImage src="/projects/momo-screen-inventory.png" alt="momo shopping cart design screen inventory" /><div className="mt-5 max-w-2xl"><div className="text-sm tracking-[0.18em] uppercase text-black/35">Design coverage</div><p className="mt-3 text-lg text-black/60 leading-relaxed">以完整畫面清單檢視設計覆蓋範圍，確保功能整合能延續到每一個相關情境。</p></div></div>
    </section>
  </>;
}

function DesignSystemCaseStudy() {
  const layers = [
    { number: "01", title: "Foundations", text: "先定義色彩、字級、間距、圓角與互動狀態，讓每一層使用同一套語言。" },
    { number: "02", title: "Atoms", text: "將 Button、Icon、Label、Input 等不可再拆的單位建立為穩定的 CSS 基底。" },
    { number: "03", title: "Molecules", text: "以多個 Atom 組成欄位、搜尋列、價格資訊等小型任務單元，保留清楚責任。" },
    { number: "04", title: "Organisms", text: "將 Molecules 巢狀組合為可放入頁面的功能區塊，而非重新複製一套樣式。" },
  ];

  return <>
    <section className="py-28 border-b border-black/10">
      <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-14 lg:gap-24">
        <div><CaseLabel index={1}>The problem</CaseLabel></div>
        <div>
          <h2 className="text-4xl md:text-6xl tracking-[-0.055em] leading-[1.03] font-light max-w-4xl">Consistency cannot depend on individual decisions.</h2>
          <p className="mt-9 max-w-3xl text-lg leading-[1.9] text-black/60">過去的購物流程中，相似元件常有不同樣式與數值；CSS 也容易在新需求下被覆寫、疊加。當交接者沒有規則可依循，畫面一致性與後續維護便高度依賴個人經驗。</p>
        </div>
      </div>
    </section>

    <section className="py-28 border-b border-black/10">
      <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-14 lg:gap-24">
        <div><CaseLabel index={2}>System architecture</CaseLabel></div>
        <div>
          <h2 className="text-4xl md:text-6xl tracking-[-0.055em] leading-[1.03] font-light">Nested by purpose,<br />not by page.</h2>
          <p className="mt-7 max-w-3xl text-lg leading-[1.9] text-black/60">以 Atomic Design 的分層思維建立 Style Guide：最小元件先有穩定規則，再逐層巢狀組合成較完整的任務區塊。頁面只負責組合，不應再各自覆寫內層元件的 CSS；核心樣式由 CSS 基底維護，Tailwind 則只處理少量、明確的版面調整。</p>
          <div className="mt-12 grid sm:grid-cols-2 gap-px overflow-hidden rounded-[28px] border border-black/10 bg-black/10">{layers.map((layer) => <div key={layer.title} className="bg-[#F7F6F2] p-7 md:p-9"><div className="text-[#5FA391] text-sm tracking-[0.16em]">{layer.number}</div><h3 className="mt-7 text-2xl tracking-[-0.04em] font-light">{layer.title}</h3><p className="mt-3 text-black/55 leading-[1.8]">{layer.text}</p></div>)}</div>
          <div className="mt-10 rounded-[28px] border border-black/10 bg-white p-7 md:p-10"><div className="text-sm tracking-[0.18em] uppercase text-black/35">Nested component example</div><pre className="mt-7 overflow-x-auto font-mono text-sm md:text-base leading-[1.85] text-black/70">{`<SearchModule>\n  <SearchField>\n    <TextInput />\n    <IconButton icon="search" />\n  </SearchField>\n  <ActionButton tone="primary" />\n</SearchModule>`}</pre><p className="mt-7 max-w-3xl text-black/55 leading-[1.8]">例如 Search Module 不直接定義輸入框或按鈕的樣式，而是組合既有的 Search Field、Text Input、Icon Button 與 Action Button；每個元件只維護自己的結構與狀態，外層則透過 Props 傳遞必要的變化。</p></div>
        </div>
      </div>
    </section>

    <section className="py-28 border-b border-black/10">
      <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-14 lg:gap-24">
        <div><CaseLabel index={3}>Component model</CaseLabel></div>
        <div>
          <h2 className="text-4xl md:text-6xl tracking-[-0.055em] leading-[1.03] font-light">Change the parameters,<br />not the component.</h2>
          <p className="mt-7 max-w-3xl text-lg leading-[1.9] text-black/60">將按鈕、輸入框與狀態等既有結構收斂到元件 CSS；使用者只需要透過 Props 或預設的 Utility 傳入尺寸、間距、圓角與排列方式。這保留了使用彈性，也避免為了單一情境去改寫或破壞原本元件。</p>
          <div className="mt-12 overflow-hidden rounded-[28px] bg-[#182721] p-7 md:p-12 text-[#e8f1ec] shadow-2xl shadow-[#182721]/10"><div className="mb-10 text-xs tracking-[0.18em] uppercase text-[#8fc9b8]">Composable interface</div><code className="block overflow-x-auto font-mono text-base md:text-xl leading-[2] whitespace-pre">{`<Button\n  variant="contained"\n  tone="primary"\n  size="lg"\n  spacing="m-10"\n  radius="xl"\n/>`}</code><div className="mt-10 grid md:grid-cols-2 gap-5 border-t border-white/15 pt-7 text-sm leading-relaxed text-white/65"><p><span className="text-[#8fc9b8]">Component CSS</span><br />處理元件結構、狀態與共用視覺規則。</p><p><span className="text-[#8fc9b8]">Props / Utility</span><br />處理大小、間距與版面等可預期的調整項目。</p></div></div>
        </div>
      </div>
    </section>

    <section className="py-28">
      <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-14 lg:gap-24">
        <div><CaseLabel index={4}>Shared documentation</CaseLabel></div>
        <div>
          <h2 className="text-4xl md:text-6xl tracking-[-0.055em] leading-[1.03] font-light">A source of truth for the team.</h2>
          <p className="mt-7 mb-12 max-w-3xl text-lg leading-[1.9] text-black/60">以 Storybook 將元件種類、狀態、可調整欄位與原始碼集中呈現。設計、前端與接手成員不只知道元件「長什麼樣子」，也能理解何時使用、如何調整，並直接複製程式碼投入開發。</p>
          <CaseImage src="/projects/design-system-storybook-docs.png" alt="Component documentation in Storybook" />
          <div className="mt-14 grid md:grid-cols-3 gap-5">{["降低元件被任意覆寫的風險", "讓新需求在既定規則下快速組合", "提供跨角色可共同使用的文件與程式碼"].map((text, index) => <div key={text} className="border-t border-black/10 pt-5"><div className="text-[#5FA391] text-sm mb-3">0{index + 1}</div><p className="text-lg leading-relaxed">{text}</p></div>)}</div>
        </div>
      </div>
    </section>
  </>;
}

export default async function ProjectDetailPage({ params }) {
  const project = await getProductBySlug(params.slug);
  if (!project) notFound();

  return (
    <div className="bg-[#F7F6F2] text-[#111111] min-h-screen overflow-hidden relative">
      <div className="fixed inset-0 opacity-[0.035] pointer-events-none"><div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to right, #111 1px, transparent 1px), linear-gradient(to bottom, #111 1px, transparent 1px)", backgroundSize: "72px 72px" }} /></div>
      <section className="relative pt-[180px] pb-28 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <Link href="/projects" className="inline-flex items-center gap-3 text-sm tracking-[0.16em] uppercase text-black/45 hover:text-[#5FA391] transition-colors mb-16">← All Projects</Link>
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-24 items-end mb-20">
            <div>
              <div className="text-sm tracking-[0.22em] uppercase text-[#5FA391] mb-6">{project.eyebrow}</div>
              <h1 className="text-5xl md:text-8xl tracking-[-0.06em] leading-[0.95] font-light mb-8">{project.title}</h1>
              <p className="text-xl leading-[1.8] text-black/60">{project.summary}</p>
            </div>
            <div className="border-t border-black/10 pt-7">
              <div className="text-sm tracking-[0.18em] uppercase text-black/35 mb-3">Role</div>
              <p className="text-2xl font-light leading-relaxed">{project.role}</p>
            </div>
          </div>

          <ProductImageSection product={project} />

          {project.sections.length ? <ProductDetailSections sections={project.sections} productSlug={project.slug} /> : project.case_study_key === "momo-shopping-cart" ? <MomoCaseStudy /> : project.case_study_key === "cleaning-doctor" ? <CleaningDoctorCaseStudy /> : project.case_study_key === "commerce-design-system" ? <DesignSystemCaseStudy /> : <><div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-14 lg:gap-24 py-28 border-b border-black/10">
            <div><div className="text-sm tracking-[0.22em] uppercase text-black/35">Tools & Focus</div></div>
            <div>
              <div className="flex flex-wrap gap-3 mb-12">{project.technologies.map((technology) => <span key={technology} className="px-4 py-2.5 rounded-full border border-black/10 text-sm tracking-[0.08em] text-black/60">{technology}</span>)}</div>
              <div className="grid md:grid-cols-3 gap-5">{project.notes.map((note, index) => <div key={note} className="border-t border-black/10 pt-5"><div className="text-[#5FA391] text-sm mb-3">0{index + 1}</div><p className="text-lg leading-relaxed">{note}</p></div>)}</div>
            </div>
          </div>

          {project.gallery.length ? <section className="py-28"><div className="mb-14"><div className="text-sm tracking-[0.22em] uppercase text-black/35 mb-5">Gallery</div><h2 className="text-4xl md:text-6xl tracking-[-0.05em] font-light">Selected screens.</h2></div><div className="grid md:grid-cols-2 gap-8">{project.gallery.map((image, index) => <div key={image.src} className={`relative overflow-hidden rounded-[28px] border border-black/10 bg-white ${index === 0 && project.gallery.length > 1 ? "md:col-span-2" : ""}`}><Image src={image.src} alt={image.alt} width={1800} height={1200} className="w-full h-auto" /></div>)}</div></section> : <section className="py-28"><div className="rounded-[28px] border border-black/10 bg-white p-10 md:p-16"><div className="text-sm tracking-[0.22em] uppercase text-black/35 mb-5">Gallery</div><h2 className="text-4xl md:text-5xl tracking-[-0.05em] font-light mb-5">Confidential product interface.</h2><p className="max-w-2xl text-black/55 text-lg leading-[1.9]">基於專案保密考量，此案例先以流程與技術摘要呈現；後續可視公開範圍補上裁切或模糊化畫面。</p></div></section>}</>}
        </div>
      </section>
    </div>
  );
}
