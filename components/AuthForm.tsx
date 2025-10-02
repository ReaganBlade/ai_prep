"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ID } from "appwrite";
import { useEffect } from "react";

import { account } from "@/appwrite/client";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { signIn, signUp } from "@/lib/actions/auth.action";
import { clearAllSessions } from "@/lib/session-utils";
import FormField from "./FormField";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Clear any existing sessions when component mounts
  useEffect(() => {
    const clearSessions = async () => {
      try {
        await clearAllSessions();
      } catch (error) {
        console.log("No sessions to clear");
      }
    };

    clearSessions();
  }, []);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-up") {
        const { name, email, password } = data;

        // Create user account with Appwrite
        const userAccount = await account.create(
          ID.unique(),
          email,
          password,
          name
        );

        const result = await signUp({
          uid: userAccount.$id,
          name: name!,
          email,
          password,
        });

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      } else {
        const { email, password } = data;

        // Create new session (existing sessions should already be cleared)
        const session = await account.createEmailPasswordSession(
          email,
          password
        );

        if (!session) {
          toast.error("Sign in Failed. Please try again.");
          return;
        }

        console.log("Session object:", {
          $id: session.$id,
          userId: session.userId,
          secret: session.secret ? "exists" : "missing",
          sessionKeys: Object.keys(session),
        });

        await signIn({
          email,
          session:
            session.secret ||
            JSON.stringify({
              userId: session.userId,
              sessionId: session.$id,
            }), // Fallback to custom JSON if secret is not available
        });

        toast.success("Signed in successfully.");
        router.push("/");
      }
    } catch (error: any) {
      console.error("Authentication error:", error);

      // Handle Appwrite specific errors
      if (error.code === 409) {
        toast.error("User already exists. Please sign in.");
      } else if (error.code === 401) {
        toast.error("Invalid email or password.");
      } else if (
        error.message?.includes("session is active") ||
        error.message?.includes("session is prohibited")
      ) {
        toast.error("Session conflict detected. Clearing sessions...");
        // Clear all sessions and prompt user to try again
        try {
          await clearAllSessions();
          toast.info("Sessions cleared. Please try signing in again.");
        } catch (clearError) {
          console.log("Error clearing sessions:", clearError);
        }
      } else {
        toast.error(`Authentication failed: ${error.message}`);
      }
    }
  };

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>

        <h3>Practice job interviews with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
