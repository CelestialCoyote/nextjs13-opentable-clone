import { calculateReviewRatingsAverage } from "@/utilities/calculateReviewRatingAverage";
import { Review } from "@prisma/client";
import { calculateOverrideValues } from "next/dist/server/font-utils";
import Stars from "./Stars";


export default function RestaurantRating({
	reviews
}: {
	reviews: Review[]
}) {
	return (
		<div className="flex items-end">
			<div className="ratings mt-2 flex items-center">
				<Stars reviews={reviews} />
				<p className="text-reg ml-3">
					{calculateReviewRatingsAverage(reviews).toFixed(1)}
				</p>
			</div>
			<div>
				<p className="text-reg ml-4">
					{reviews.length} Review{reviews.length === 1 ? "" : "s"}
				</p>
			</div>
		</div>
	)
}