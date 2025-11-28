import { CourtRepository } from "../repositories/court.repo";

export const CourtService = {
	async getAllCourt(){
		const res = await CourtRepository.findAllCourt();
		return res
	},

}