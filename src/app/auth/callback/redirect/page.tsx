import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/signin");
    // return
  }
  redirect("/t/boards/" + session.user.id);
  //   return JSON.stringify(session.user);
}
