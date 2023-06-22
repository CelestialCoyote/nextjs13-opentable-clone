"use client";

import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import useReservation from "../../hooks/useReservation";


export default function ReservationForm({
	slug,
	date,
	partySize,
}: {
	slug: string,
	date: string,
	partySize: string,
}) {
	const [inputs, setInputs] = useState({
		bookerFirstName: "",
		bookerLasttName: "",
		bookerPhone: "",
		bookerEmail: "",
		bookerOccasion: "",
		bookerRequest: "",
	});

	const [day, time] = date.split("T");
	const [disabled, setDisabled] = useState(true);
	const [didBook, setDidBook] = useState(false);
	const { loading, error, createReservation } = useReservation();

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value
		});
	};

	const handleClick = async () => {
		const booking = await createReservation({
			slug,
			day,
			time,
			partySize,
			bookerFirstName: inputs.bookerFirstName,
			bookerLasttName: inputs.bookerLasttName,
			bookerPhone: inputs.bookerPhone,
			bookerEmail: inputs.bookerEmail,
			bookerOccasion: inputs.bookerOccasion,
			bookerRequest: inputs.bookerRequest,
			setDidBook
		});
	};

	useEffect(() => {
		if (
			inputs.bookerFirstName &&
			inputs.bookerLasttName &&
			inputs.bookerPhone &&
			inputs.bookerEmail
		) {
			return setDisabled(false);
		} else {
			return setDisabled(true);
		}
	}, [inputs]);

	return (
		<div className="mt-10 flex flex-wrap justify-between w-[660px]">
			{didBook ? (
				<div>
					<h1>Reservation Commplete</h1>
				</div>
			) : (
				<div>
					<input
						type="text"
						className="border rounded p-3 w-80 mb-4"
						placeholder="First name"
						value={inputs.bookerFirstName}
						name="bookerFirstName"
						onChange={handleChangeInput}
					/>
					<input
						type="text"
						className="border rounded p-3 w-80 mb-4"
						placeholder="Last name"
						value={inputs.bookerLasttName}
						name="bookerFirstName"
						onChange={handleChangeInput}
					/>
					<input
						type="text"
						className="border rounded p-3 w-80 mb-4"
						placeholder="Phone number"
						value={inputs.bookerPhone}
						name="bookerLastName"
						onChange={handleChangeInput}
					/>
					<input
						type="text"
						className="border rounded p-3 w-80 mb-4"
						placeholder="Email"
						value={inputs.bookerEmail}
						name="bookerEmail"
						onChange={handleChangeInput}
					/>
					<input
						type="text"
						className="border rounded p-3 w-80 mb-4"
						placeholder="Occasion (optional)"
						value={inputs.bookerOccasion}
						name="bookerOccasion"
						onChange={handleChangeInput}
					/>
					<input
						type="text"
						className="border rounded p-3 w-80 mb-4"
						placeholder="Requests (optional)"
						value={inputs.bookerRequest}
						name="bookerRequest"
						onChange={handleChangeInput}
					/>
					<button
						className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
						disabled={disabled || loading}
						onClick={handleClick}
					>
						{loading ? <CircularProgress color="inherit" /> : "Complete reservation"}
					</button>
					<p className="mt-4 text-sm">
						By clicking “Complete reservation” you agree to the OpenTable Terms
						of Use and Privacy Policy. Standard text message rates may apply.
						You may opt out of receiving text messages at any time.
					</p>
				</div>
			)}
		</div>
	)
}