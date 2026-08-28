import Image from "next/image";

function SectionLabel({ index, children }) {
  return <div className="flex items-center gap-4 text-sm tracking-[0.2em] uppercase text-[#5FA391]"><span>{String(index).padStart(2, "0")}</span><span className="h-px w-10 bg-[#5FA391]/60" />{children}</div>;
}

export function ProductImageSection({ product }) {
  return <div className="relative overflow-hidden rounded-[32px] border border-black/10 bg-white"><Image src={product.image} alt={`${product.title} project cover`} width={1800} height={1200} className="w-full h-auto" priority /></div>;
}

export default function ProductDetailSections({ sections }) {
  return sections.map((section, index) => (
    <section key={section.id} className={`py-28 ${index < sections.length - 1 ? "border-b border-black/10" : ""}`}>
      <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-14 lg:gap-24">
        <div><SectionLabel index={index + 1}>{section.section_leading_title}</SectionLabel></div>
        <div>
          {section.section_title ? <h2 className="text-4xl md:text-6xl tracking-[-0.055em] leading-[1.03] font-light max-w-4xl">{section.section_title}</h2> : null}
          {section.content ? <div className="mt-7 max-w-3xl text-lg leading-[1.9] text-black/60 [&_a]:text-[#3f8f79] [&_a]:underline [&_code]:rounded [&_code]:bg-black/5 [&_code]:px-1.5 [&_code]:py-0.5 [&_li]:mt-2 [&_ol]:my-7 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mt-5 [&_p:first-child]:mt-0 [&_pre]:my-9 [&_pre]:overflow-x-auto [&_pre]:rounded-[20px] [&_pre]:bg-[#182721] [&_pre]:p-6 [&_pre]:text-sm [&_pre]:leading-[1.8] [&_pre]:text-[#e8f1ec] [&_strong]:font-medium [&_ul]:my-7 [&_ul]:list-disc [&_ul]:pl-6" dangerouslySetInnerHTML={{ __html: section.content }} /> : null}
          {section.images?.length ? <div className={`mt-12 grid gap-6 ${section.images.length > 1 ? "md:grid-cols-2" : ""}`}>{section.images.map((image) => <article key={image.id} className="overflow-hidden rounded-[28px] border border-black/10 bg-white"><div className="relative aspect-[16/10] bg-[#f2f1ed]">{image.src ? <Image src={image.src} alt={image.alt} fill className="object-cover object-top" /> : null}</div>{image.title || image.description ? <div className="p-6 md:p-8"><h3 className="text-2xl tracking-[-0.04em] font-light">{image.title}</h3>{image.description ? <p className="mt-3 leading-[1.8] text-black/55">{image.description}</p> : null}</div> : null}</article>)}</div> : null}
        </div>
      </div>
    </section>
  ));
}
