import type { User } from "./auth";
import type { Game } from "./games";

export type Review = {
  _id: string;
  gameId: string;
  userId: string;
  comment: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
};
