import ReservationForm from "@/app/components/ReservationForm";
import ReservationHeader from "@/app/components/ReservationHeader";


export default function Reserve() {
	return (
		<div className="border-t h-screen">
			<div className="py-9 w-3/5 m-auto">
				<ReservationHeader />
				<ReservationForm />
			</div>
		</div>
	)
}