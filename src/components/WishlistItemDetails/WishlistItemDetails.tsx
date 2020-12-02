import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiItems, fetchApiItemById } from "../../store/apiItems/actions";
import {
  addItemToList,
  removeItemFromWishlist,
} from "../../store/listItems/actions";
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

export default function WishlistItemDetails() {
  const dispatch = useDispatch();
  const apiItemsLoading = useSelector(selectApiItemsLoading);
  const allApiItems = useSelector(selectAllApiItems);
  const apiItemDetails: any = useSelector(selectApiItemDetails);
  const user = useSelector(selectUser);
  const allCategories = useSelector(selectAllCategories);
  const allListItems = useSelector(selectAllListItems);

  interface ParamTypes {
    userId: string;
  }

  const { userId } = useParams<ParamTypes>();
  const profileUserId = parseInt(userId);
  const loggedInUser = profileUserId === user.id ? true : false;
  // console.log("Logged in?", loggedInUser);

  const categoryId =
    apiItemDetails.Type === "movie"
      ? 1
      : apiItemDetails.Type === "series"
      ? 2
      : null;

  const userLibraryList = user.profile.lists?.find((l: any) => {
    return l.type === "Wishlist";
  });
  const userLibraryListId = userLibraryList.id;

  interface ParamTypes {
    itemId: string;
  }

  const { itemId } = useParams<ParamTypes>();

  useEffect(() => {
    // console.log("Item id", itemId);
    dispatch(fetchApiItemById(itemId));
  }, [dispatch, itemId]);

  function onClickAdd() {
    // console.log("api item details", apiItemDetails);
    // console.log("category id", categoryId);
    // console.log("User library id", userLibraryListId);
    dispatch(addItemToList(apiItemDetails, categoryId, userLibraryListId));
  }

  const itemInWishlist = allListItems?.find((i: any) => {
    return i.list.type === "Wishlist" && i.item.apiId === itemId;
  });
  console.log("Item in wishlist", itemInWishlist);

  function onClickRemove() {
    console.log("clicked");
    dispatch(removeItemFromWishlist(itemId));
  }

  return (
    <div>
      <h2>{apiItemDetails.Title}</h2>
      <p>{apiItemDetails.Year}</p>
      <p>({apiItemDetails.Type})</p>
      <p>Directed by {apiItemDetails.Director}</p>
      <em>
        <p>{apiItemDetails.Genre}</p>
      </em>
      {apiItemDetails.Poster === "N/A" ? null : (
        <img src={apiItemDetails.Poster} alt="poster" height="250px" />
      )}
      <p>{apiItemDetails.Plot}</p>
      {loggedInUser ? (
        <div>
          {itemInWishlist ? (
            <Button onClick={onClickRemove} variant="outline-dark">
              Remove from Wishlist
            </Button>
          ) : (
            <Button onClick={onClickAdd} variant="outline-dark">
              Add to Wishlist
            </Button>
          )}
          {/* <Button variant="outline-dark">Favourites</Button> */}
        </div>
      ) : null}
    </div>
  );
}
