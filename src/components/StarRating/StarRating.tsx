import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";

export default function StaticStarRating(props: any) {
  const [value, setValue] = React.useState(0);
  return (
    <div>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue: any) => {
          setValue(newValue);
        }}
      />
    </div>
  );
}
