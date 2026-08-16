import { permanentRedirect } from "next/navigation";
import { getInsight } from "@/data/insights";
export default async function BlogPostRedirect({params}){ const {slug}=await params; const target=getInsight(slug); permanentRedirect(target?`/insights/${slug}`:"/insights"); }
