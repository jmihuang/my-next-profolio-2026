import Link from "next/link";
import { getContactCta } from "@/lib/contact-cta";

function ActionLink({ href, children, primary = false, download = false }) {
  const className = `portfolio-cta ${primary ? "portfolio-cta-primary" : "portfolio-cta-secondary"}`;
  if (download) return <a href={href} className={className} download>{children}</a>;
  if (href.startsWith("/")) return <Link href={href} className={className}>{children}</Link>;
  return <a href={href} className={className} target={href.startsWith("https://") ? "_blank" : undefined} rel={href.startsWith("https://") ? "noreferrer" : undefined}>{children}</a>;
}

export default async function ContactCta({ id }) {
  const cta = await getContactCta();
  return <section id={id} className="relative bg-white px-6 py-28 md:px-12">
    <div className="mx-auto max-w-5xl text-center">
      <div className="mb-7 text-sm uppercase tracking-[0.22em] text-black/40">{cta.eyebrow}</div>
      <h2 className="text-5xl font-light leading-[1.02] tracking-[-0.06em] md:text-7xl">{cta.title}</h2>
      <p className="mx-auto mt-9 max-w-2xl text-lg leading-[2] text-black/55">{cta.description}</p>
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <ActionLink href={`mailto:${cta.email_address}`} primary>{cta.email_label}</ActionLink>
        <ActionLink href={cta.linkedin_url}>{cta.linkedin_label}</ActionLink>
        <ActionLink href={cta.projects_url}>{cta.projects_label}</ActionLink>
        <ActionLink href={cta.cv_url} download>{cta.cv_label}</ActionLink>
      </div>
    </div>
  </section>;
}
