import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, PROJECTS } from "../project-data";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }) {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} | Jamie Huang`,
    description: project.summary,
  };
}

function CartMockup() {
  return (
    <div className="aspect-[16/10] rounded-[28px] bg-[#f3f5fa] p-8 md:p-14 text-[#202945]">
      <div className="max-w-4xl mx-auto h-full rounded-2xl border border-[#202945]/10 bg-white p-6 md:p-9 shadow-2xl shadow-[#202945]/10">
        <div className="flex justify-between border-b border-[#202945]/10 pb-5 text-xs font-medium"><span>momo</span><span>Shopping Cart</span></div>
        <div className="grid grid-cols-[1.5fr_0.7fr] gap-5 pt-7 h-[calc(100%-40px)]">
          <div className="space-y-3">{[1, 2, 3].map((item) => <div key={item} className="h-[28%] rounded-xl border border-[#202945]/10 p-4 flex gap-4"><div className="w-14 rounded-lg bg-[#dce4f4]" /><div className="flex-1 pt-2 space-y-3"><div className="h-2 w-3/4 rounded bg-[#202945]/20" /><div className="h-2 w-1/3 rounded bg-[#202945]/10" /></div></div>)}</div>
          <div className="rounded-xl bg-[#202945] p-5"><div className="h-2 w-2/3 rounded bg-white/40" /><div className="mt-9 h-2 w-full rounded bg-white/15" /><div className="mt-3 h-2 w-4/5 rounded bg-white/15" /><div className="mt-10 rounded-lg bg-[#ff5a73] py-3 text-center text-[10px] tracking-[0.16em] text-white">CHECKOUT</div></div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectDetailPage({ params }) {
  const project = getProject(params.slug);
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

          {project.mockup === "cart" ? <CartMockup /> : <div className="relative overflow-hidden rounded-[32px] border border-black/10 bg-white"><Image src={project.image} alt={`${project.title} project cover`} width={1800} height={1200} className="w-full h-auto" priority /></div>}

          <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-14 lg:gap-24 py-28 border-b border-black/10">
            <div><div className="text-sm tracking-[0.22em] uppercase text-black/35">Tools & Focus</div></div>
            <div>
              <div className="flex flex-wrap gap-3 mb-12">{project.technologies.map((technology) => <span key={technology} className="px-4 py-2.5 rounded-full border border-black/10 text-sm tracking-[0.08em] text-black/60">{technology}</span>)}</div>
              <div className="grid md:grid-cols-3 gap-5">{project.notes.map((note, index) => <div key={note} className="border-t border-black/10 pt-5"><div className="text-[#5FA391] text-sm mb-3">0{index + 1}</div><p className="text-lg leading-relaxed">{note}</p></div>)}</div>
            </div>
          </div>

          {project.gallery.length ? <section className="py-28"><div className="mb-14"><div className="text-sm tracking-[0.22em] uppercase text-black/35 mb-5">Gallery</div><h2 className="text-4xl md:text-6xl tracking-[-0.05em] font-light">Selected screens.</h2></div><div className="grid md:grid-cols-2 gap-8">{project.gallery.map((image, index) => <div key={image.src} className={`relative overflow-hidden rounded-[28px] border border-black/10 bg-white ${index === 0 && project.gallery.length > 1 ? "md:col-span-2" : ""}`}><Image src={image.src} alt={image.alt} width={1800} height={1200} className="w-full h-auto" /></div>)}</div></section> : <section className="py-28"><div className="rounded-[28px] border border-black/10 bg-white p-10 md:p-16"><div className="text-sm tracking-[0.22em] uppercase text-black/35 mb-5">Gallery</div><h2 className="text-4xl md:text-5xl tracking-[-0.05em] font-light mb-5">Confidential product interface.</h2><p className="max-w-2xl text-black/55 text-lg leading-[1.9]">基於專案保密考量，此案例先以流程與技術摘要呈現；後續可視公開範圍補上裁切或模糊化畫面。</p></div></section>}
        </div>
      </section>
    </div>
  );
}
