import { CircleUser } from "lucide-react";
import { TimeSlotRepository } from "../repositories/timeslot.repo";

export const TimeSlotService = {
	async getAvailableTimeSlots(date: string, courtId: number) {
		const res = await TimeSlotRepository.findAvailableTimeSlots(date, courtId);
		return res;
	}
}