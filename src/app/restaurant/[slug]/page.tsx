import NavBar from "@/app/components/NavBar";
import RestaurantDescription from "@/app/components/RestaurantDescription";
import RestaurantHeader from "@/app/components/RestaurantHeader";
import RestaurantImages from "@/app/components/RestaurantImages";
import RestaurantNavBar from "@/app/components/RestaurantNavBar";
import RestaurantRating from "@/app/components/RestaurantRating";
import RestaurantReservationCard from "@/app/components/RestaurantReservationCard";
import RestaurantReviews from "@/app/components/RestaurantReviews";
import RestaurantTitle from "@/app/components/RestaurantTitle";


export default function RestaurantDetails() {
	return (
		<main className="bg-gray-100 min-h-screen w-screen">
			<main className="max-w-screen-2xl m-auto bg-white">
				<NavBar />
				<RestaurantHeader />
				<div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
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
				</div>
			</main>
		</main>
	)
}