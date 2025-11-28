import { ReservationRepository } from "../repositories/reservation.repo";

export const ReservationService = {
	async getReservationDetail(userId: string, reservationId: string){
		const res = await ReservationRepository.findReservationDetail(userId, reservationId);
		return res
	},

}