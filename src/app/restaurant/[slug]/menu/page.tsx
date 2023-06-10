import Menu from "@/app/components/Menu";
import RestaurantNavBar from "@/app/components/RestaurantNavBar";


export default function RestaurantMenu() {
	return (
		<>
			<div className="bg-white w-[100%] rounded p-3 shadow">
				<RestaurantNavBar />
				<Menu />
			</div>
		</>
	)
}