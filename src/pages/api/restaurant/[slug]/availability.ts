import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { times } from "@/data"; 


const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const {slug, day, time, partySize} = req.query as {
		slug: string,
		day: string,
		time: string,
		partySize: string
	};

	if (!day || !time || !partySize) {
		return res.status(400).json({
			errorMessage: "Invalid data provided."
		});
	};

	const searchTimes = times.find(t => {
		return t.time === time;
	})?.searchTimes;

	if (!searchTimes) {
		return res.status(400).json({
			errorMessage: "Invalid data provided."
		});
	};

	const bookings = await prisma.booking.findMany({
		where: {
			booking_time: {
				gte: new Date(`${day}T${searchTimes[0]}`),
				lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`) 
			}
		},
		select: {
			number_of_people: true,
			booking_time: true,
			tables: true
		}
	});

	return res.json({ searchTimes, bookings });
};


// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?day=2023-01-01&time=20:00:00.000Z&partySize=4
// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?day=2023-02-03&time=14:00:00.000Z&partySize=4