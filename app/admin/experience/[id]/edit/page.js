import { notFound } from "next/navigation";
import { getExperienceById } from "@/lib/experiences";
import ExperienceForm from "../../../components/experience-form";

export const dynamic = "force-dynamic";
export default async function EditExperiencePage({ params }) {
  const experience = await getExperienceById(params.id);
  if (!experience) notFound();
  return <><h1 className="mb-6 text-2xl font-semibold">編輯工作經歷</h1><ExperienceForm experience={experience} /></>;
}
