import Link from "next/link";
import ProjectGallery from "../projects/project-gallery";
import { getConfidentialProducts } from "@/lib/products";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Confidential Portfolio | Jamie Huang",
  robots: { index: false, follow: false },
};

export default async function ConfidentialProjectsPage() {
  const projects = await getConfidentialProducts();
  const categories = ["All", ...new Set(projects.flatMap((project) => project.categories))];

  return (
    <div className="portfolio-page bg-[#F7F6F2] text-[#111111] min-h-screen overflow-hidden relative">
      <div className="fixed inset-0 opacity-[0.035] pointer-events-none"><div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to right, #111 1px, transparent 1px), linear-gradient(to bottom, #111 1px, transparent 1px)", backgroundSize: "72px 72px" }} /></div>
      <section className="relative pt-[220px] pb-28 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-end mb-24">
            <div>
              <div className="mb-8 flex items-center gap-4 text-sm tracking-[0.25em] uppercase text-black/35"><div className="w-16 h-px bg-[#5FA391]" />Interview review</div>
              <h1 className="text-[56px] md:text-[112px] leading-[0.9] tracking-[-0.07em] font-light">Confidential<br />Portfolio</h1>
            </div>
            <p className="max-w-lg text-lg leading-[1.9] text-black/55">公開作品與僅供面試檢視的案例。此頁面不會被搜尋引擎收錄。</p>
          </div>
          <ProjectGallery projects={projects} categories={categories} />
          <div className="mt-20"><Link href="/projects" className="text-sm tracking-[0.16em] uppercase text-black/45 hover:text-[#5FA391] transition-colors">← Public projects</Link></div>
        </div>
      </section>
    </div>
  );
}
