"use client";


import { useState } from "react";
import Link from "next/link";
import DatePicker from "react-datepicker";
import { partySize as partySizes, times } from "@/data";
import useAvailabilites from "@/hooks/useAvailabilities";
import { CircularProgress } from "@mui/material";
import { convertToDisplayTime, Time } from "@/utilities/convertToDisplayTime";


export default function RestaurantReservationCard({
	openTime,
	closeTime,
	slug
}: {
	openTime: string,
	closeTime: string,
	slug: string
}) {
	const { loading, error, data, fetchAvailabilites } = useAvailabilites();
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
	const [day, setDay] = useState(new Date().toISOString().split("T")[0]);
	const [time, setTime] = useState(openTime);
	const [partySize, setPartySize] = useState("2");

	const handeChangeDate = (date: Date | null) => {
		if (date) {
			setDay(date.toISOString().split("T")[0]);

			return setSelectedDate(date);
		}

		return setSelectedDate(null);
	};

	const handleClick = () => {
		fetchAvailabilites({
			slug,
			day,
			time,
			partySize
		});
	};

	const filterTimesByRestaurantOpenWindow = () => {
		const timesWithinWindow: typeof times = [];

		let isWithinWindow = false;

		times.forEach(time => {
			if (time.time === openTime) {
				isWithinWindow = true;
			};
			if (isWithinWindow) {
				timesWithinWindow.push(time);
			};
			if (time.time === closeTime) {
				isWithinWindow = false;
			};
		});

		return timesWithinWindow;
	};

	return (
		<div className="fixed w-[25%] bg-white rounded px-3 pb-24 shadow">
			<div className="text-center border-b pb-2 font-bold">
				<h4 className="mr-7 text-lg">Make a Reservation</h4>
			</div>
			<div className="my-3 flex flex-col">
				<label htmlFor="">Party size</label>
				<select
					id=""
					name=""
					className="py-3 border-b font-light"
					value={partySize}
					onChange={(e) => setPartySize(e.target.value)}
				>
					{partySizes.map(size => (
						<option value={size.value}>{size.label}</option>
					))}
				</select>
			</div>
			<div className="flex justify-between">
				<div className="flex flex-col w-[48%]">
					<label htmlFor="">Date</label>
					<DatePicker
						className="py-3 border-b font-light text-reg w-24"
						selected={selectedDate}
						dateFormat="MMMM d"
						wrapperClassName="w-[48%]"
						onChange={handeChangeDate}
					/>
				</div>
				<div className="flex flex-col w-[48%]">
					<label htmlFor="">Time</label>
					<select
						name=""
						id=""
						className="py-3 border-b font-light"
						value={time}
						onChange={(e) => setTime(e.target.value)}
					>
						{filterTimesByRestaurantOpenWindow().map(time => (
							<option value={time.time}>{time.displayTime}</option>
						))}
					</select>
				</div>
			</div>
			<div className="mt-5">
				<button
					className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
					onClick={handleClick}
					disabled={loading}
				>
					{loading ? <CircularProgress color="inherit" /> : "Find a Time"}
				</button>
			</div>
			{data && data.length ? (
				<div className="mt-4">
					<p className="text-reg">Select a Time</p>
					<div className="flex flex-wrap mt-2">
						{data.map(time => {
							return time.available ? (
								<Link
									href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}
									className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3"
								>
									<p className="text-sm font-bold">
										{convertToDisplayTime(time.time as Time)}
									</p>
								</Link>
							) : (
								<p className="bg-gray-300 p-2 w-24 mb-3 rounded mr-3"></p>
							)
						})}
					</div>
				</div>
			) : null}
		</div>
	)
}