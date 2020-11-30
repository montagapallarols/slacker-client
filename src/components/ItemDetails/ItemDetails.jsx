import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiItems, fetchApiItemById } from "../../store/apiItems/actions";
import {
  selectApiItemsLoading,
  selectAllApiItems,
} from "../../store/apiItems/selectors";
import { selectUser } from "../../store/user/selectors";
import { selectAllCategories } from "../../store/listItems/selectors";

export default function ItemDetails() {
  const dispatch = useDispatch();
  const apiItemsLoading = useSelector(selectApiItemsLoading);
  const allApiItems = useSelector(selectAllApiItems);
  const user = useSelector(selectUser);
  const allCategories = useSelector(selectAllCategories);

  const { itemId } = useParams();

  useEffect(() => {
    console.log("Item id", itemId);
    dispatch(fetchApiItemById(itemId));
  }, [dispatch, itemId]);

  return (
    <div>
      <h1>Item details</h1>
    </div>
  );
}
