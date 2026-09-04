import Link from "next/link";
import ProjectGallery from "./project-gallery";
import { getAllProducts, getProductCategories } from "@/lib/products";
import ContactCta from "@/components/contact-cta";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const [projects, categories] = await Promise.all([
    getAllProducts(),
    getProductCategories(),
  ]);
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
                Selected Works
              </div>

              <h1 className="text-[72px] md:text-[140px] leading-[0.9] tracking-[-0.07em] font-light">
                Projects
              </h1>
            </div>
          </div>

          <ProjectGallery projects={projects} categories={categories} />
          <div className="mt-20 flex justify-center">
            <Link
              href="/projects-all"
              className="portfolio-cta portfolio-cta-secondary"
            >
              View More Work →
            </Link>
          </div>
        </div>
      </section>

      <ContactCta />
    </div>
  );
}
