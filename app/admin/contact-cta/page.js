import { getContactCta } from "@/lib/contact-cta";
import ContactCtaForm from "./contact-cta-form";

export const dynamic = "force-dynamic";

export default async function ContactCtaPage() {
  const initialValue = await getContactCta();
  return <div><h1 className="mb-2 text-2xl font-semibold">聯絡 CTA 管理</h1><p className="mb-6 text-gray-500">首頁、Projects、CV 與 Experience 頁底部會共用這組內容與四個按鈕。</p><ContactCtaForm initialValue={initialValue} /></div>;
}
