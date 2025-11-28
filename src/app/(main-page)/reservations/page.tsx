"use client";

import { useEffect, useState } from "react";
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
import type { CourtData } from "@/lib/types/reservation";

export default function ReservationPage() {
  const [courts, setCourts] = useState<CourtData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourts() {
      try {
        const res = await fetch("/api/court");
        if (!res.ok) throw new Error("Failed to fetch courts");
        const json = await res.json();
        setCourts(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCourts();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom_right,var(--color-midnight-900),var(--color-midnight-900),var(--color-midnight-700))]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,var(--color-mint-glow),transparent_60%)]" />

      <div className="flex w-full max-w-2xl flex-col gap-6">
        <Card className="w-full rounded-2xl bg-transparent bg-(--color-midnight-950)/70 p-6 shadow-none border border-white/5">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Make a Reservation</CardTitle>
            <CardDescription className="text-white">
              Select a court to start your reservation
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {loading ? (
              <p className="text-white/70">Loading courts...</p>
            ) : courts.length === 0 ? (
              <p className="text-white/70">No courts available</p>
            ) : (
              <div className="grid gap-2">
                {courts.map((court) => (
                  <Card
                    key={court.id}
                    className="p-3 bg-white/10 border border-white/10 rounded-xl transition"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white font-semibold">{court.name}</p>
                        <p className="text-white/70 text-sm">{court.location}</p>
                      </div>
                      <Link href={`/order/${court.id}`}>
                        <Button className="bg-neutral-200 text-neutral-950 hover:bg-neutral-500 text-sm px-3 py-1">
                          Select
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
