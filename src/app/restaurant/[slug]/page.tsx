import { notFound } from "next/navigation";
import { PrismaClient, Review } from "@prisma/client";
import RestaurantDescription from "@/app/components/RestaurantDescription";
import RestaurantImages from "@/app/components/RestaurantImages";
import RestaurantNavBar from "@/app/components/RestaurantNavBar";
import RestaurantRating from "@/app/components/RestaurantRating";
import RestaurantReservationCard from "@/app/components/RestaurantReservationCard";
import RestaurantReviews from "@/app/components/RestaurantReviews";
import RestaurantTitle from "@/app/components/RestaurantTitle";


const prisma = new PrismaClient();

interface Restaurant {
	id: number,
	name: string,
	images: string[],
	description: string,
	open_time: string,
	close_time: string,
	slug: string,
	reviews: Review[]
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
	const restaurant = await prisma.restaurant.findUnique({
		where: {
			slug
		},
		select: {
			id: true,
			name: true,
			images: true,
			description: true,
			open_time: true,
			close_time: true,
			slug: true,
			reviews: true,
		}
	});

	if (!restaurant)
		notFound();
		//throw new Error("Cannot find restaurant.");

	return restaurant;
}

export default async function RestaurantDetails({
	params,
}: {
	params: { slug: string }
}) {
	const restaurant = await fetchRestaurantBySlug(params.slug);

	return (
		<>
			<div className="bg-white w-[70%] rounded p-3 shadow">
				<RestaurantNavBar slug={restaurant.slug} />
				<RestaurantTitle name={restaurant.name} />
				<RestaurantRating reviews={restaurant.reviews} />
				<RestaurantDescription description={restaurant.description} />
				<RestaurantImages images={restaurant.images} />
				<RestaurantReviews reviews={restaurant.reviews} />
			</div >
			<div className="w-[27%] relative text-reg">
				<RestaurantReservationCard
					openTime={restaurant.open_time}
					closeTime={restaurant.close_time}
				/>
			</div>
		</>
	)
}