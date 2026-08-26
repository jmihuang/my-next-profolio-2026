import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "@/components/loading-spinner";
import { getProducts } from "@/lib/catalogue";

const FILTER_ITEMS = [
  "All",
  "UI/UX",
  "Frontend",
  "AI Workflow",
  "Brand Experience",
];

function formatDesc(desc) {
  if (!desc) return "";
  return desc.replace(/\n/g, " ").trim();
}

async function ProjectGrid() {
  const projects = await getProducts();

  return (
    <div className="grid lg:grid-cols-2 gap-x-10 gap-y-24">
      {projects.map((project, index) => {
        const desc = formatDesc(project.desc);
        const href = `/projects/${project.slug}`;

        return (
          <article
            key={project.slug}
            className={`group ${index % 2 === 1 ? "lg:translate-y-24" : ""}`}
          >
            <Link href={href} className="block">
              <div className="relative overflow-hidden rounded-[32px] border border-black/10 bg-white mb-8">
                <div className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full border border-white/30 backdrop-blur-md flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition-all duration-500">
                  ↗
                </div>

                <div className="relative w-full h-[520px]">
                  <Image
                    src={project.image}
                    alt={project.alt || project.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-[1.04] transition-all duration-[1600ms] ease-out"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
              </div>

              <div className="flex items-start justify-between gap-10 mb-6">
                <div>
                  <div className="text-sm uppercase tracking-[0.18em] text-[#5FA391] mb-4">
                    {project.engName}
                  </div>

                  <h2 className="text-3xl md:text-4xl tracking-[-0.04em] leading-tight font-light mb-5 group-hover:translate-x-1 transition-all duration-500">
                    {project.name}
                  </h2>

                  <p className="text-black/55 leading-[2] text-lg max-w-xl line-clamp-3">
                    {desc}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {project.capacity ? (
                  <div className="px-4 py-2 rounded-full border border-black/10 text-xs tracking-[0.18em] uppercase text-black/50 bg-white/70 backdrop-blur-md">
                    {project.capacity}
                  </div>
                ) : null}
                {project.price ? (
                  <div className="px-4 py-2 rounded-full border border-black/10 text-xs tracking-[0.18em] uppercase text-black/50 bg-white/70 backdrop-blur-md">
                    NTD {project.price}
                  </div>
                ) : null}
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}

export default function ProductsPage() {
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

            <div className="max-w-xl lg:ml-auto">
              <p className="text-black/55 text-lg leading-[2]">
                Every project reflects a balance between strategy, design
                thinking, user experience, and technical execution.
                <br />
                <br />
                我專注於打造真正能被理解、被使用、並帶來價值的產品體驗。
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 md:gap-10 border-b border-black/10 pb-8 mb-16">
            {FILTER_ITEMS.map((item, index) => (
              <button
                key={item}
                type="button"
                className={`relative text-lg transition-all duration-300 hover:text-[#5FA391] ${
                  index === 0 ? "text-black" : "text-black/35"
                }`}
              >
                <span className="relative after:absolute after:left-0 after:-bottom-2 after:h-px after:bg-[#5FA391] after:transition-all after:duration-300 hover:after:w-full after:w-0">
                  {item}
                </span>
              </button>
            ))}
          </div>

          <Suspense fallback={<LoadingSpinner />}>
            <ProjectGrid />
          </Suspense>
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
