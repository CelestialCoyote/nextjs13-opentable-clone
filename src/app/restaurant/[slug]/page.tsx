import RestaurantDescription from "@/app/components/RestaurantDescription";
import RestaurantImages from "@/app/components/RestaurantImages";
import RestaurantNavBar from "@/app/components/RestaurantNavBar";
import RestaurantRating from "@/app/components/RestaurantRating";
import RestaurantReservationCard from "@/app/components/RestaurantReservationCard";
import RestaurantReviews from "@/app/components/RestaurantReviews";
import RestaurantTitle from "@/app/components/RestaurantTitle";


export default function RestaurantDetails() {
	return (
		<>
			<div className="bg-white w-[70%] rounded p-3 shadow">
				<RestaurantNavBar />
				<RestaurantTitle />
				<RestaurantRating />
				<RestaurantDescription />
				<RestaurantImages />
				<RestaurantReviews />
			</div >
			<div className="w-[27%] relative text-reg">
				<RestaurantReservationCard />
			</div>
		</>
	)
}