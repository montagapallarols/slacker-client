import React, { useState } from "react";
import "./StarRating.css";
import { FaStar } from "react-icons/fa";

export default function StarRating() {
  const [rating, setRating] = useState(null);
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
            <FaStar size={40} className="star" />
          </label>
        );
      })}
    </div>
  );
}
