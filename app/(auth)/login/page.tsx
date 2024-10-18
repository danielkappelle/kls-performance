import { auth } from "@/auth";
import LoginForm from "@/components/auth/login-form";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/admin");
  }

  return <LoginForm />;
}
