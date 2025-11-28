import { ReservationRepository } from "../repositories/reservation.repo";
import { ReservationDTO, ReservationStatusEnum } from "../dto/reservation.schema";

function convertToUTCPlus7(date: Date | string): Date {
  const d = new Date(date);
  // add 7 hours to UTC
  const utc7 = new Date(d.getTime() + 7 * 60 * 60 * 1000);
  return utc7;
}

export const ReservationService = {
	async getReservationDetail(userId: string, reservationId: string){
		const res = await ReservationRepository.findReservationDetail(userId, reservationId);

		  if (res && res.date) {
      	res.date = convertToUTCPlus7(res.date);
    	}

		return res;
	},

	async getAllReservationByUserId(userId: string) {
		const resList = await ReservationRepository.findAllReservationByUserId(userId);
    return resList.map(res => {
      if (res.date) {
        res.date = convertToUTCPlus7(res.date);
      }
      return res;
    });
	},

}