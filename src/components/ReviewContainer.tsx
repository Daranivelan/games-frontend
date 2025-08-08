import { useEffect } from "react";
import { useGameStore } from "../context/gameContext";
import { useAuth } from "../context/authContext";
import { Trash2 } from "lucide-react";
import { SquarePen } from "lucide-react";
import Rating from "@mui/material/Rating";
import type { Review } from "../types/review";

interface ReviewContainerProps {
  gameId: string;
  onEditClick: (review: Review) => void; // Add this prop
}

const ReviewContainer = ({ gameId, onEditClick }: ReviewContainerProps) => {
  const { getReviews, reviews, deleteReview } = useGameStore();
  const { user } = useAuth();

  const handleDeleteReview = async (reviewId: string) => {
    try {
      await deleteReview(reviewId);
      getReviews(gameId);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  useEffect(() => {
    if (gameId) {
      getReviews(gameId);
    }
  }, [gameId]);

  const handleEdit = (review: Review) => {
    console.log(review);

    onEditClick(review);
    // Additional logic for editing can be added here
  };

  const validReviews = reviews.filter((review) => review && review.user);

  return (
    <div className="bg-[#2d2a1f] p-4 rounded-lg shadow-md text-[#e6e5c7]">
      <div className="border-b pb-4 mb-4">
        <h2>Reviews</h2>
      </div>
      <div className="space-y-4">
        {validReviews.length > 0 ? (
          validReviews.map((review) => {
            // Additional safety check
            if (!review || !review.user) {
              return null;
            }
            return (
              <div key={review._id} className="mb-4">
                <div className="flex items-center space-x-4 mb-2">
                  <div className="w-8 h-8 rounded-full text-lg bg-[#ff4e00] flex items-center justify-center text-[#2d2a1f] font-bold">
                    {review.user.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-[#e6e5c7]">
                    <h3 className="text-[18px] font-semibold">
                      {review.user.username}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    <Rating
                      name="read-only"
                      value={review.rating}
                      readOnly
                      size="small"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="mt-2">{review.comment}</p>
                {user && review.user._id === user._id && (
                  <div className="mt-2 flex space-x-2">
                    <button
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDeleteReview(review._id)}
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                    <button
                      className="text-yellow-500 cursor-pointer"
                      onClick={() => handleEdit(review)}
                    >
                      <SquarePen className="w-6 h-6" />
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-[#a8a594]">No reviews available for this game.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewContainer;
