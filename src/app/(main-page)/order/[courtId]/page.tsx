"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TimeSlotData } from "@/lib/types/reservation";
import { Calendar22 } from "@/components/calendar22";
import { useRouter } from "next/navigation";

export default function CourtOrderPage() {
	const router = useRouter();
  const params = useParams();
  const courtId = params.courtId;

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [timeSlots, setTimeSlots] = useState<TimeSlotData[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch available time slots whenever date changes
  useEffect(() => {
    if (!selectedDate) return;

    async function fetchTimeSlots() {
      setLoading(true);
      try {
        const res = await fetch(`/api/timeslots/${courtId}/${selectedDate}`);
        if (!res.ok) throw new Error("Failed to fetch time slots");
        const json = await res.json();
        setTimeSlots(json.data);
      } catch (err) {
        console.error(err);
        setTimeSlots([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTimeSlots();
  }, [selectedDate, courtId]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom_right,var(--color-midnight-900),var(--color-midnight-900),var(--color-midnight-700))]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,var(--color-mint-glow),transparent_60%)]" />

      <div className="flex w-full max-w-2xl flex-col gap-6">
        <Card className="w-full rounded-2xl bg-transparent bg-(--color-midnight-950)/70 p-6 shadow-none border border-white/5">
          <CardHeader>
            <CardTitle className="text-2xl text-white">
              Reserve Court {courtId}
            </CardTitle>
            <CardDescription className="text-white">
              Select a date and pick an available time slot
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* Calendar selector */}
            <Calendar22
              onSelectDate={(date?: Date) => {
                if (date) {
                  const yyyy = date.getFullYear();
                  const mm = String(date.getMonth() + 1).padStart(2, "0");
                  const dd = String(date.getDate()).padStart(2, "0");
                  setSelectedDate(`${yyyy}-${mm}-${dd}`);
                }
              }}
            />

            {loading ? (
              <p className="text-white/70">Loading time slots...</p>
            ) : timeSlots.length === 0 ? (
              selectedDate && (
                <p className="text-white/70">
                  No available time slots for this date.
                </p>
              )
            ) : (
              // Scrollable container
              <div className="grid gap-2 max-h-60 overflow-y-auto pr-2">
                {timeSlots.map((slot) => (
                  <Card
                    key={slot.id}
                    className="p-2 bg-white/10 border border-white/10 rounded-lg flex justify-between items-center"
                  >
                    <span className="text-white">
                      {slot.startTime} - {slot.endTime}
                    </span>
                    <Button
                      className="bg-neutral-200 text-neutral-950 hover:bg-neutral-500 text-sm px-3 py-1"
                      onClick={async () => {
                        if (!selectedDate) return;

                        try {
                          const [hours, minutes] = slot.startTime
                            .split(":")
                            .map(Number);
                          const dateObj = new Date(selectedDate);
                          dateObj.setHours(hours, minutes, 0, 0);
                          const isoDate = dateObj.toISOString();

                          const res = await fetch("/api/reservations", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              courtId: Number(courtId),
                              timeSlotId: slot.id,
                              date: isoDate, // send combined ISO string
                            }),
                          });

                          const data = await res.json();

                          if (!res.ok)
                            throw new Error(
                              data.message || "Failed to create reservation"
                            );

                          alert("Reservation successful!");
                          setTimeSlots((prev) =>
                            prev.filter((s) => s.id !== slot.id)
                          );
													router.push("/dashboard");
                        } catch (err: any) {
                          console.error(err);
                          alert(err.message || "Something went wrong");
                        }
                      }}
                    >
                      Select
                    </Button>
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
