"use client";
// could be better by seperating component that using use client
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
import { History } from "lucide-react";
import type { ReservationData } from "@/lib/types/reservation";

interface ReservationWithRelations extends ReservationData {
  court: {
    id: number;
    name: string;
    location: string;
  };
  timeSlot: {
    id: number;
    startTime: string;
    endTime: string;
  };
}

export default function Dashboard() {
  const [history, setHistory] = useState<ReservationWithRelations[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch("/api/reservations/history");
        if (!res.ok) throw new Error("Failed to fetch reservations");
        const json = await res.json();
        const data: ReservationWithRelations[] = json.data;
        setHistory(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom_right,var(--color-midnight-900),var(--color-midnight-900),var(--color-midnight-700))]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,var(--color-mint-glow),transparent_60%)]" />

      <div className="flex w-full max-w-4xl flex-col gap-6">
        <Card className="w-full rounded-2xl bg-transparent bg-(--color-midnight-950)/70 p-6 shadow-none border border-white/5">
          <CardHeader>
            <CardTitle className="text-2xl text-white">
              Hello, Wilson!
            </CardTitle>
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
                {loading
                  ? "Loading history..."
                  : history.length === 0
                  ? "You have no past reservations."
                  : `You have ${history.length} past reservations.`}
              </CardDescription>
              {/* history list */}
              <div className="mt-2 flex flex-col gap-2 max-h-60 overflow-y-auto">
                {history.map((res) => (
                  <Card
                    key={res.id}
                    className="p-2 bg-white/5 border border-white/10 rounded-lg"
                  >
                    <div className="flex justify-between text-white text-sm">
                      <span>
                        <strong>{res.court.name}</strong> -{" "}
                        {res.timeSlot.startTime} - {res.timeSlot.endTime}
                      </span>
                      <span>
                        {new Date(res.date).toLocaleDateString("en-GB")}
                      </span>
                    </div>
                    <div className="text-white/70 text-xs">{res.status}</div>
                  </Card>
                ))}
              </div>
            </Card>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Link href="/order">
              <Button className="bg-neutral-200 text-neutral-950 hover:bg-neutral-500">
                Make a Reservation
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
