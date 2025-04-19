import { signIn } from "@/auth";
import { Button } from "./ui/button";

export default function SignInbutton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/auth/callback/redirect" });
      }}
    >
      <Button className="cursor-pointer" variant="default">
        Get Started
      </Button>
    </form>
  );
}
