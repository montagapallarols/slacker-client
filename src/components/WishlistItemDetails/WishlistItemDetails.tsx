import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiItemById } from "../../store/apiItems/actions";
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
import { selectAllProfiles } from "../../store/profiles/selectors";

export default function WishlistItemDetails() {
  const dispatch = useDispatch();
  const apiItemDetails: any = useSelector(selectApiItemDetails);
  const user = useSelector(selectUser);
  const allListItems = useSelector(selectAllListItems);
  const allProfiles = useSelector(selectAllProfiles);

  interface ParamTypes {
    userId: string;
  }

  const { userId } = useParams<ParamTypes>();
  const profileUserId = parseInt(userId);
  const loggedInUser = profileUserId === user.id ? true : false;

  const categoryId =
    apiItemDetails.Type === "movie"
      ? 1
      : apiItemDetails.Type === "series"
      ? 2
      : null;

  const userProfile: any = allProfiles?.find((p: any) => {
    return p.userId === user.id;
  });
  const userLibraryList = userProfile?.lists?.find((l: any) => {
    return l.type === "Wishlist";
  });
  const userLibraryListId = userLibraryList?.id;

  interface ParamTypes {
    itemId: string;
  }

  const { itemId } = useParams<ParamTypes>();

  useEffect(() => {
    dispatch(fetchApiItemById(itemId));
  }, [dispatch, itemId]);

  function onClickAdd() {
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
      <h2>{apiItemDetails?.Title}</h2>
      <p>{apiItemDetails?.Year}</p>
      <p>({apiItemDetails?.Type})</p>
      <p>Directed by {apiItemDetails?.Director}</p>
      <em>
        <p>{apiItemDetails?.Genre}</p>
      </em>
      {apiItemDetails?.Poster === "N/A" ? null : (
        <img src={apiItemDetails?.Poster} alt="poster" height="250px" />
      )}
      <p>{apiItemDetails?.Plot}</p>
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
        </div>
      ) : null}
    </div>
  );
}
