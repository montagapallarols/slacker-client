import React from "react";
import { FaStar } from "react-icons/fa";
export default function StarRating() {
  return (
    <div>
      {[...Array(5)].map((s: any) => {
        return <FaStar size={40} />;
      })}
    </div>
  );
}
