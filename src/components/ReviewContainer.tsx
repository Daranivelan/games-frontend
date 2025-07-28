import { useEffect } from "react";
import { useGameStore } from "../context/gameContext";
import { useAuth } from "../context/authContext";

const ReviewContainer = ({ gameId }: { gameId: string }) => {
  const { getReviews, reviews, deleteReview } = useGameStore();
  const { user } = useAuth();

  const handleDeleteReview = async (reviewId: string) => {
    deleteReview(reviewId);
    getReviews(gameId);
  };

  useEffect(() => {
    if (gameId) {
      getReviews(gameId);
    }
  }, [gameId]);
  return (
    <div className="bg-[#2d2a1f] p-4 rounded-lg shadow-md text-[#e6e5c7]">
      <h2>Reviews</h2>
      <div>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="mb-4">
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-12 h-12 rounded-full text-2xl bg-[#ff4e00] text-white flex items-center justify-center text-[#2d2a1f] font-bold">
                  {review.user.username.charAt(0).toUpperCase()}
                </div>
                <div className="text-[#e6e5c7]">
                  <h3 className="text-lg font-semibold">
                    {review.user.username}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <p className="mt-2">{review.comment}</p>
              <div className="mt-2">
                <span className="text-yellow-500">
                  {"★".repeat(review.rating)}
                </span>
                <span className="text-gray-400">
                  {"★".repeat(5 - review.rating)}
                </span>
              </div>
              {user && review.user._id === user._id && (
                <div>
                  <button onClick={() => handleDeleteReview(review._id)}>
                    Delete
                  </button>
                  <button>Update</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-[#a8a594]">No reviews available for this game.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewContainer;
