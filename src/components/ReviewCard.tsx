import { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useGameStore } from "../context/gameContext";

const ReviewCard = ({ gameId }: { gameId: string }) => {
  const { addReview, getReviews } = useGameStore();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = async () => {
    if (comment.trim() && rating > 0) {
      try {
        await addReview(gameId, comment, rating);
        setComment("");
        setRating(0);
        getReviews(gameId);
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    } else {
      console.warn("Please provide both comment and rating");
    }
  };

  return (
    <div className="text-[#e6e5c7] max-w-2xl mx-auto p-6">
      <div className="bg-[#2d2a1f] rounded-xl p-6 border border-[#3e3b2c]/50">
        <h2 className="text-2xl font-bold mb-6 text-[#ff4e08]">
          Write a Review
        </h2>

        <div className="space-y-4">
          {/* Comment Textarea */}
          <div>
            <label className="block text-[#a8a594] text-sm font-medium mb-2">
              Your Review
            </label>
            <textarea
              placeholder="Share your thoughts about this game..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full h-32 p-3 border border-[#3e3b2c] bg-[#3e3b2c] text-[#e6e5c7] rounded-lg focus:outline-none focus:border-[#ff4e08] transition-colors duration-200 resize-none"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-[#a8a594] text-sm font-medium mb-2">
              Rating
            </label>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Rating
                name="simple-controlled"
                size="large"
                value={rating}
                onChange={(_event, newValue) => {
                  setRating(newValue ?? 0);
                }}
              />
            </Box>
            <p className="text-[#a8a594] text-sm mt-1">
              {rating > 0 ? `You rated: ${rating}/5 stars` : "Click to rate"}
            </p>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!comment.trim() || rating === 0}
            className="w-full bg-[#ff4e08] hover:bg-[#e63e00] disabled:bg-[#3e3b2c] disabled:text-[#a8a594] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
