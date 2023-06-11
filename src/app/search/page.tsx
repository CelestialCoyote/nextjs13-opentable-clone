import { PrismaClient } from "@prisma/client";
import SearchHeader from "../components/SearchHeader";
import SearchRestaurantCard from "../components/SearchRestaurantCard";
import SearchSideBar from "../components/SearchSideBar";


const prisma = new PrismaClient();

const fetchRestaurantsByCity = async (city: string | undefined) => {
	const select = {
		id: true,
		name: true,
		main_image: true,
		price: true,
		cuisine: true,
		location: true,
		slug: true
	};

	if (!city)
		return prisma.restaurant.findMany({ select });

	return prisma.restaurant.findMany({
		where: {
			location: {
				name: {
					equals: city.toLowerCase()
				}
			}
		},
		select
	});
}

const fetchLocations = async () => {
	return prisma.location.findMany()
}

const fetchCuisine = async () => {
	return prisma.cuisine.findMany();
}

export default async function Search({
	searchParams
}: {
	searchParams: {
		city: string
	}
}) {
	const restaurants = await fetchRestaurantsByCity(searchParams.city);
	const location = await fetchLocations();
	const cuisine = await fetchCuisine();

	return (
		<>
			<SearchHeader />
			<div className="flex py-4 m-auto w-2/3 justify-between items-start">
				<SearchSideBar
					locations={location}
					cuisines={cuisine}
				/>
				<div className="w-5/6">
					{restaurants.length ? (
						<>
							{restaurants.map((restaurant) => (
								<SearchRestaurantCard restaurant={restaurant} />
							))
							}
						</>
					) : (
						<p>Sorry, no results.</p>
					)}
				</div>
			</div>
		</>
	)
}