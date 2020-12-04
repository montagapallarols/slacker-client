import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiItems, fetchApiItemById } from "../../store/apiItems/actions";
import {
  selectApiItemsLoading,
  selectAllApiItems,
  selectApiItemDetails,
} from "../../store/apiItems/selectors";
import { selectUser } from "../../store/user/selectors";
import {
  selectAllCategories,
  selectAllListItems,
} from "../../store/listItems/selectors";
import StarRating from "../StarRating/StarRating";

export default function FavouritesItemDetails() {
  const dispatch = useDispatch();
  const apiItemsLoading = useSelector(selectApiItemsLoading);
  const allApiItems = useSelector(selectAllApiItems);
  const apiItemDetails: any = useSelector(selectApiItemDetails);
  const user = useSelector(selectUser);
  const allCategories = useSelector(selectAllCategories);
  const allListItems = useSelector(selectAllListItems);

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
      <p>({apiItemDetails?.Type})</p>
      <p>Directed by {apiItemDetails?.Director}</p>
      <em>
        <p>{apiItemDetails?.Genre}</p>
      </em>
      <img src={apiItemDetails?.Poster} height="250px" />
      <StarRating />
      <p>{apiItemDetails?.Plot}</p>
    </div>
  );
}
