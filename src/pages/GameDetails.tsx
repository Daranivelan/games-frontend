import { useRef, useState } from "react";
import ReviewCard from "../components/ReviewCard";
import { useParams } from "react-router-dom";
import ReviewContainer from "../components/ReviewContainer";
import GameDetailsContainer from "../components/GameDetailsContainer";
import type { Review } from "../types/review";

const GameDetails = () => {
  const { id } = useParams<{ id: string }>();
  const reviewCardRef = useRef<HTMLDivElement>(null);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const scrollToReviewCard = (review: Review) => {
    setEditingReview(review);

    setTimeout(() => {
      reviewCardRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
  };

  if (!id) {
    return (
      <div className="bg-gradient-to-br from-[#1a1814] to-[#2d2a1f] min-h-screen p-6 flex items-center justify-center">
        <div className="text-[#e6e5c7] text-center">
          <h1 className="text-2xl font-bold mb-4">Game Not Found</h1>
          <p className="text-[#a8a594]">Invalid game ID</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#1a1814] to-[#2d2a1f] text-[#e6e5c7] min-h-screen p-6">
      <GameDetailsContainer gameId={id} />
      <div ref={reviewCardRef}>
        <ReviewCard
          gameId={id}
          editingReview={editingReview}
          onCancelEdit={handleCancelEdit}
        />
      </div>
      <ReviewContainer gameId={id} onEditClick={scrollToReviewCard} />
    </div>
  );
};

export default GameDetails;
