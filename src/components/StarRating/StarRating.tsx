import React, { useState } from "react";
import "./StarRating.css";
import { FaStar } from "react-icons/fa";

export default function StarRating() {
  interface Rating {
    rating: any | null;
    setRating: any | null;
  }
  interface Hover {
    rating: any | null;
    setRating: any | null;
  }
  //   @ts-ignore
  const [rating, setRating] = useState<Rating>(null);
  //   @ts-ignore
  const [hover, setHover] = useState<Hover>(null);
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
              size={30}
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#696969"}
              className="star"
              onMouseEnter={() => setHover(ratingValue)}
              //   @ts-ignore
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}
