import { useState } from "react";
import axios from "axios";


export default function useReservation() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const createReservation = async ({
		slug,
		day,
		time,
		partySize,
		bookerFirstName,
		bookerLasttName,
		bookerPhone,
		bookerEmail,
		bookerOccasion,
		bookerRequest,
	}: {
		slug: string,
		day: string,
		time: string,
		partySize: string,
		bookerFirstName: string,
		bookerLasttName: string,
		bookerPhone: string,
		bookerEmail: string,
		bookerOccasion: string,
		bookerRequest: string,
	}) => {
		setLoading(true);

		try {
			const response = await axios
				.post(`http://localhost:3000/api/restaurant/${slug}/reserve`,
				{
					bookerFirstName,
					bookerLasttName,
					bookerPhone,
					bookerEmail,
					bookerOccasion,
					bookerRequest,
				}, {
					params: {
						day,
						time,
						partySize
					}
				});
			setLoading(false);
			return response.data;
		} catch (error: any) {
			setLoading(false);
			setError(error.response.data.errorMessage);
		};
	};

	return { loading, error, createReservation }
};
