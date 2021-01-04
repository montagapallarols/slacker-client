import React, { useEffect } from "react";
import "./FavouritesItemDetails.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiItemById } from "../../store/apiItems/actions";
import { selectApiItemDetails } from "../../store/apiItems/selectors";
import StarRating from "../StarRating/StarRating";

export default function FavouritesItemDetails() {
  const dispatch = useDispatch();
  const apiItemDetails: any = useSelector(selectApiItemDetails);

  interface ParamTypes {
    itemId: string;
  }

  const { itemId } = useParams<ParamTypes>();

  useEffect(() => {
    console.log("Item id", itemId);
    dispatch(fetchApiItemById(itemId));
  }, [dispatch, itemId]);

  return (
    <div>
      <h2>{apiItemDetails?.Title}</h2>
      <p>{apiItemDetails?.Year}</p>

      <p>Directed by {apiItemDetails?.Director}</p>
      <em>
        <p>{apiItemDetails?.Genre}</p>
      </em>
      <img src={apiItemDetails?.Poster} height="250px" alt="poster" />
      <StarRating />
      <p className="plot">{apiItemDetails?.Plot}</p>
    </div>
  );
}
