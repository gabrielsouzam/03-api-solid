
import { CheckIn } from "@prisma/client";
import { ICheckInRepository } from "@/repositories/check-in-repository";

interface FetchUserCheckInsHistoryUseCaseRequest {
    userId: string;
    page: number
}

interface FetchUserCheckInsHistoryUseCaseResponse{
    checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase{
	constructor(
		private checkInRepository: ICheckInRepository) {}

	async execute({
		userId,
		page
	}: FetchUserCheckInsHistoryUseCaseRequest) : Promise <FetchUserCheckInsHistoryUseCaseResponse>{
		const checkIns = await this.checkInRepository.findManyByUserId(userId, page);


		return{
			checkIns,
		};
	}


}