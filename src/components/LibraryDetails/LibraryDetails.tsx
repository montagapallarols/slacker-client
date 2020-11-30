import React from "react";
import { useParams } from "react-router-dom";

export default function ListDetails() {
  interface ParamTypes {
    categoryName: string;
  }
  const { categoryName } = useParams<ParamTypes>();

  return (
    <div>
      <h2>My {categoryName} Library</h2>
    </div>
  );
}
