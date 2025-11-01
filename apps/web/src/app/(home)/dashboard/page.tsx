import { redirect } from "next/navigation";
import { getSessionAction } from "@/app/actions/session/session.action";

export default async function DashboardPage() {
  const session = await getSessionAction();
  if (!session) {
    // Not logged in -> send to auth
    redirect("/auth");
  }

  // Empty placeholder page for now
  return <div />;
}
