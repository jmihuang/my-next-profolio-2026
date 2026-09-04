import Link from "next/link";
import { getExperiences } from "@/lib/experiences";
import ExperienceListTable from "../components/experience-list-table";

export const dynamic = "force-dynamic";

export default async function AdminExperiencePage() {
  const experiences = await getExperiences({ includeDrafts: true });
  return <div><div className="mb-6 flex items-center justify-between"><h1 className="text-2xl font-semibold">工作經歷管理</h1><Link className="rounded bg-blue-600 px-4 py-2 text-white" href="/admin/experience/create">新增工作經歷</Link></div><ExperienceListTable data={experiences} /></div>;
}
