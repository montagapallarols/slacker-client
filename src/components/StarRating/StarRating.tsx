import React, { useState } from "react";
import "./StarRating.css";
import { FaStar } from "react-icons/fa";

export default function StarRating() {
  interface Rating {
    rating: any | null;
    setRating: any;
  }
  //   @ts-ignore
  const [rating, setRating] = useState<Rating>(null);
  console.log("Rating", rating);

  return (
    <div>
      {[...Array(5)].map((s: any, i) => {
        const ratingValue: any = i + 1;
        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FaStar
              size={40}
              color={ratingValue <= rating ? "#ffc107" : "e4e5e9"}
              className="star"
            />
          </label>
        );
      })}
    </div>
  );
}
