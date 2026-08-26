"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function CartMockup() {
  return (
    <div className="h-full bg-[#f3f5fa] p-7 md:p-10 text-[#202945]">
      <div className="flex items-center justify-between border-b border-[#202945]/10 pb-5 text-xs font-medium">
        <span>momo</span>
        <span>Shopping Cart</span>
      </div>
      <div className="grid grid-cols-[1.35fr_0.65fr] gap-4 pt-7 h-[calc(100%-42px)]">
        <div className="space-y-3">
          {["Cart items", "Delivery", "Payment"].map((label, index) => (
            <div
              key={label}
              className="rounded-xl border border-[#202945]/10 bg-white p-4"
            >
              <div className="flex gap-3">
                <div
                  className={`h-10 w-10 rounded-lg ${index === 1 ? "bg-[#ff5a73]" : "bg-[#dce4f4]"}`}
                />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-2 w-2/3 rounded bg-[#202945]/20" />
                  <div className="h-2 w-1/3 rounded bg-[#202945]/10" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-[#202945] p-4 text-white">
          <div className="h-2 w-2/3 rounded bg-white/40" />
          <div className="mt-8 h-2 w-full rounded bg-white/15" />
          <div className="mt-3 h-2 w-4/5 rounded bg-white/15" />
          <div className="mt-auto pt-12">
            <div className="rounded-lg bg-[#ff5a73] py-3 text-center text-[10px] tracking-[0.12em]">
              CHECKOUT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectVisual({ project }) {
  if (project.mockup === "cart") return <CartMockup />;

  return (
    <Image
      src={project.image}
      alt={`${project.title} project preview`}
      fill
      sizes="(max-width: 1024px) 100vw, 50vw"
      className="object-cover object-top transition-all duration-[1600ms] ease-out group-hover:scale-[1.035] group-hover:opacity-55"
    />
  );
}

export default function ProjectGallery({ projects, categories }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const visibleProjects = projects.filter(
    (project) =>
      activeCategory === "All" || project.categories.includes(activeCategory),
  );

  return (
    <>
      <div className="flex flex-wrap gap-x-7 gap-y-4 border-b border-black/10 pb-8 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`relative text-base md:text-lg transition-colors duration-300 ${
              activeCategory === category
                ? "text-black"
                : "text-black/35 hover:text-[#5FA391]"
            }`}
          >
            {category}
            {activeCategory === category ? (
              <span className="absolute left-0 -bottom-2 h-px w-full bg-[#5FA391]" />
            ) : null}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-20">
        {visibleProjects.map((project) => (
          <article key={project.slug} className="group">
            <Link
              href={`/projects/${project.slug}`}
              className="block"
              aria-label={`View ${project.title} project`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#ece9e4] mb-7">
                <ProjectVisual project={project} />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none bg-[#5FA391]/65 mix-blend-screen [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)] transition-[clip-path] duration-700 ease-[cubic-bezier(0.77,0,0.18,1)]"
                />
                <div className="absolute inset-0 pointer-events-none bg-[#f2fbf7]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-x-0 bottom-0 pointer-events-none flex items-end gap-4 overflow-hidden px-6 md:px-9">
                  <div className="min-w-0 flex-1 [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)] transition-[clip-path] duration-700 ease-[cubic-bezier(0.77,0,0.18,1)]">
                    <span className="block translate-y-[110%] group-hover:translate-y-[12%] font-serif text-[3.8rem] sm:text-[5.5rem] md:text-[clamp(5.5rem,8vw,11rem)] leading-[0.72] tracking-[-0.075em] text-transparent [-webkit-text-stroke:1.5px_#198f73] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      Detail
                    </span>
                  </div>
                  <svg
                    aria-hidden="true"
                    width="114"
                    height="31"
                    viewBox="0 0 114 31"
                    fill="none"
                    className="mb-1 h-auto w-[58px] md:mb-2 md:h-[31px] md:w-[114px] shrink-0 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-200 ease-out"
                  >
                    <line y1="29.8113" x2="112.801" y2="29.8113" stroke="#2CA37A" />
                    <path d="M113.168 30.0576L89.5 0.31128" stroke="#2CA37A" />
                  </svg>
                </div>
              </div>

              <div className="border-b border-black/10 pb-7 group-hover:border-[#5FA391] transition-colors duration-500">
                <div className="mb-3">
                  <h2 className="text-3xl md:text-4xl tracking-[-0.04em] leading-tight font-light group-hover:text-[#5FA391] transition-colors duration-300">
                    {project.title}
                  </h2>
                </div>
                <div className="text-sm uppercase tracking-[0.16em] text-[#5FA391] mb-4">
                  {project.eyebrow}
                </div>
                <p className="text-black/60 text-lg leading-[1.7] mb-5">
                  {project.summary}
                </p>
                <p className="text-sm tracking-[0.08em] leading-relaxed text-black/45">
                  {project.cardTechnologyLine}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
