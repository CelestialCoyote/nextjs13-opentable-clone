import { PrismaClient } from "@prisma/client";
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
	slug: string
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
			slug: true
		}
	});

	if (!restaurant)
		throw new Error();

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
				<RestaurantRating />
				<RestaurantDescription description={restaurant.description} />
				<RestaurantImages images={restaurant.images} />
				<RestaurantReviews />
			</div >
			<div className="w-[27%] relative text-reg">
				<RestaurantReservationCard />
			</div>
		</>
	)
}