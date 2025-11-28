import { ReservationRepository } from "../repositories/reservation.repo";
import { ReservationDTO, ReservationStatusEnum } from "../dto/reservation.schema";

export const ReservationService = {
	async getReservationDetail(userId: string, reservationId: string){
		const res = await ReservationRepository.findReservationDetail(userId, reservationId);
		return res;
	},

	async getAllReservationByUserId(userId: string) {
		const res = await ReservationRepository.findAllReservationByUserId(userId);
		return res;
	},

}