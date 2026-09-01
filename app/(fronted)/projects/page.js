import Link from "next/link";
import ProjectGallery from "./project-gallery";
import { getAllProducts, getProductCategories } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const [projects, categories] = await Promise.all([
    getAllProducts(),
    getProductCategories(),
  ]);
  return (
    <div className="bg-[#F7F6F2] text-[#111111] min-h-screen overflow-hidden relative">
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
                Selected Works
              </div>

              <h1 className="text-[72px] md:text-[140px] leading-[0.9] tracking-[-0.07em] font-light">
                Projects
              </h1>
            </div>
          </div>

          <ProjectGallery projects={projects} categories={categories} />
        </div>
      </section>

      <section className="relative py-40 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-sm tracking-[0.25em] uppercase text-black/35 mb-8">
            Let&apos;s Build Something
          </div>

          <h2 className="text-[52px] md:text-[96px] leading-[1] tracking-[-0.06em] font-light mb-10">
            Meaningful
            <br />
            digital experiences.
          </h2>

          <p className="max-w-2xl mx-auto text-black/55 text-lg leading-[2] mb-14">
            如果你正在打造品牌、產品或新的數位體驗，
            我很樂意一起參與規劃與實現。
          </p>

          <Link
            href="/contacts"
            className="inline-block group px-10 py-5 rounded-full bg-[#111111] text-white hover:bg-[#5FA391] transition-all duration-500"
          >
            <span className="tracking-[0.2em] uppercase text-sm group-hover:tracking-[0.24em] transition-all duration-500">
              Contact Me
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
