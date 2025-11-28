import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { History } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your badminton reservations dashboard.",
};

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom_right,var(--color-midnight-900),var(--color-midnight-900),var(--color-midnight-700))]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,var(--color-mint-glow),transparent_60%)]" />

      <div className="flex w-full max-w-4xl flex-col gap-6">
        <Card className="w-full rounded-2xl bg-transparent bg-(--color-midnight-950)/70 p-6 shadow-none border border-white/5">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Hello, Wilson!</CardTitle>
            <CardDescription className="text-white">
              Your badminton reservations dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Card className="p-4 bg-white/10 border border-white/10 rounded-xl">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <History className="h-5 w-5" /> Reservation History
              </CardTitle>
              <CardDescription className="text-white/70 text-sm">
                {/* TODO: Replace the hardcoded number below with fetched history count */}
                You have {/* insert fetched history count here */} past reservations.
              </CardDescription>
            </Card>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Link href="/order">
              <Button className="bg-neutral-200 text-neutral-950 hover:bg-neutral-500">Make a Reservation</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
