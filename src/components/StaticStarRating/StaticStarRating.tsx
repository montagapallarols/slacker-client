import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";

export default function StaticStarRating(props: any) {
  return (
    <div>
      <Rating name="read-only" value={props.rating} readOnly />
    </div>
  );
}
