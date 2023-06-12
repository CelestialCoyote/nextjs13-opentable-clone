import { Review } from "@prisma/client";
import RestaurantReviewCard from "./RestaurantReviewCard";


export default function RestaurantReviews({
	reviews
}: {
	reviews: Review[]
}) {
	return (
		<div>
			<h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
				What {reviews.length} {reviews.length === 1 ? "person is saying" : "people are saying"}
			</h1>
			<div>
				{reviews.map(review => (
					<RestaurantReviewCard key={review.id} review={review} />
				))}
			</div>
		</div>
	)
}