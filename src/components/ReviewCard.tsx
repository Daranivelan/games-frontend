import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useGameStore } from "../context/gameContext";
import type { Review } from "../types/review";

interface ReviewCardProps {
  gameId: string;
  editingReview: Review | null;
  onCancelEdit: () => void;
}

const ReviewCard = ({
  gameId,
  editingReview,
  onCancelEdit,
}: ReviewCardProps) => {
  const { addReview, getReviews, updateReview } = useGameStore();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (editingReview) {
      setComment(editingReview.comment);
      setRating(editingReview.rating);
      setIsEditing(true);
    } else {
      setIsEditing(false);
      setComment("");
      setRating(0);
    }
  }, [editingReview]);

  const handleSubmit = async () => {
    if (comment.trim() && rating > 0) {
      try {
        if (isEditing && editingReview) {
          // Update existing review
          await updateReview(editingReview._id, { comment, rating });
        } else {
          // Create new review
          await addReview(gameId, comment, rating);
        }
        setComment("");
        setRating(0);
        setIsEditing(false);
        getReviews(gameId);

        if (onCancelEdit) {
          onCancelEdit();
        }
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    } else {
      console.warn("Please provide both comment and rating");
    }
  };

  const handleCancel = () => {
    setComment("");
    setRating(0);
    setIsEditing(false);
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <div className="text-[#e6e5c7] max-w-7xl mx-auto py-6">
      <div className="bg-[#2d2a1f] rounded-xl p-6 border border-[#3e3b2c]/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#ff4e08]">
            {isEditing ? "Edit Review" : "Write a Review"}
          </h2>
          {isEditing && (
            <button
              onClick={handleCancel}
              className="text-[#a8a594] hover:text-[#e6e5c7] transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {isEditing && (
          <div className="bg-[#ff4e08]/10 border border-[#ff4e08]/30 rounded-lg p-3 mb-4">
            <p className="text-[#ff4e08] text-sm">
              ✏️ You are editing your review. Make your changes and click
              "Update Review" to save.
            </p>
          </div>
        )}
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
            {isEditing ? "Update Review" : "Submit Review"}
          </button>

          {isEditing && (
            <button
              onClick={handleCancel}
              className="px-6 py-3 border border-[#3e3b2c] text-[#a8a594] hover:text-[#e6e5c7] hover:border-[#a8a594] rounded-lg font-medium transition-colors duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
