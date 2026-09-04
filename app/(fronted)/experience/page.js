import CareerProfile from "../cv/page";

export const metadata = {
  title: "Experience | Jamie Huang",
  description: "Senior Product Designer · UX/UI × Product Design × Frontend.",
};

export const dynamic = "force-dynamic";

export default function ExperiencePage() {
  return <CareerProfile showExperienceTitle />;
}
