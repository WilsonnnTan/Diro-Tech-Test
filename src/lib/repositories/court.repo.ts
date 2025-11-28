import { prisma } from "../db/prisma-client";
import type { Court } from "@/generated/prisma";

export const CourtRepository = {
	async findAllCourt(): Promise<Court[]>{
		return prisma.court.findMany();
	}
};