import { Metadata } from "next";
import Link from "next/link";
import { GoogleButton } from "@/components/google-button";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "Login",
    description: "Log in to your account.",
};

export default function Login() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom_right,var(--color-midnight-900),var(--color-midnight-900),var(--color-midnight-700))]" />
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,var(--color-mint-glow),transparent_60%)]" />

            <div className="flex w-full max-w-sm flex-col gap-4">
                <Card className="w-full max-w-md rounded-2xl bg-(--color-midnight-950)/70 p-10 shadow-2xl backdrop-blur-lg border border-white/5">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl font-semibold text-white">Create an account.</CardTitle>
                        <CardDescription className="text-white text-center">
                            We only support Google Account right now. More on the future.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid grid-cols-1 gap-6">
                            <GoogleButton />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <p className="w-full text-center text-sm text-muted-foreground text-white">
                            Don&apos;t have an account?{" "}
                            <Link href="/login" className="font-semibold underline-offset-4 hover:underline text-white">
                                Log in
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
}