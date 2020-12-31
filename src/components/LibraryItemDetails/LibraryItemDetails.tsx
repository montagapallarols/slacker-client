import React, { useEffect, useState } from "react";
import "./LibraryItemDetails.css";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApiItems,
  fetchApiItemById,
  fetchFavouriteApiItemById,
} from "../../store/apiItems/actions";
import {
  addItemToList,
  removeItemFromLibrary,
  removeItemFromFavourites,
} from "../../store/listItems/actions";
import {
  selectApiItemsLoading,
  selectAllApiItems,
  selectApiItemDetails,
  selectFavouriteApiItemDetails,
} from "../../store/apiItems/selectors";
import { selectUser } from "../../store/user/selectors";
import {
  selectAllCategories,
  selectAllListItems,
} from "../../store/listItems/selectors";
import StarRating from "../StarRating/StarRating";
import { selectAllProfiles } from "../../store/profiles/selectors";

export default function LibraryItemDetails() {
  const dispatch = useDispatch();
  const apiItemsLoading = useSelector(selectApiItemsLoading);
  const allApiItems = useSelector(selectAllApiItems);
  const apiItemDetails: any = useSelector(selectApiItemDetails);
  const favouriteApiItemDetails: any = useSelector(
    selectFavouriteApiItemDetails
  );
  const user = useSelector(selectUser);
  const allCategories = useSelector(selectAllCategories);
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

  const favouriteCategoryId =
    favouriteApiItemDetails.Type === "movie"
      ? 1
      : favouriteApiItemDetails.Type === "series"
      ? 2
      : null;

  const userProfile: any = allProfiles?.find((p: any) => {
    return p.userId === user.id;
  });
  const userLibraryList = userProfile?.lists?.find((l: any) => {
    return l.type === "Library";
  });
  const userLibraryListId = userLibraryList?.id;

  const userFavouriteList = userProfile?.lists?.find((l: any) => {
    return l.type === "Favourites";
  });
  const userFavouriteListId = userFavouriteList?.id;

  interface ParamTypes {
    itemId: string;
  }

  const { itemId } = useParams<ParamTypes>();

  useEffect(() => {
    dispatch(fetchApiItemById(itemId));
  }, [dispatch, itemId]);

  useEffect(() => {
    dispatch(fetchFavouriteApiItemById(itemId));
  }, [dispatch, favouriteApiItemDetails]);

  function onClickAdd() {
    dispatch(addItemToList(apiItemDetails, categoryId, userLibraryListId));
  }

  function favouriteAdd() {
    dispatch(
      addItemToList(favouriteApiItemDetails, categoryId, userFavouriteListId)
    );
  }

  const itemInLibrary = allListItems?.find((i: any) => {
    return i.list.type === "Library" && i.item.apiId === itemId;
  });

  const itemInFavourites = allListItems?.find((i: any) => {
    return i.list.type === "Favourites" && i.item.apiId === itemId;
  });

  function onClickRemove() {
    dispatch(removeItemFromLibrary(itemId));
  }

  function favouriteRemove() {
    dispatch(removeItemFromFavourites(itemId));
  }

  return (
    <div>
      <div>
        <h2 className="item-title">{apiItemDetails?.Title}</h2>
        <p>{apiItemDetails?.Year}</p>
        <p>Directed by {apiItemDetails?.Director}</p>
        <em>
          <p>{apiItemDetails?.Genre}</p>
        </em>
        <img
          className="poster-image"
          src={apiItemDetails?.Poster}
          height="350px"
        />
        <StarRating />
      </div>
      <p className="plot">{apiItemDetails?.Plot}</p>

      {loggedInUser ? (
        <div>
          {itemInLibrary ? (
            <Button onClick={onClickRemove} variant="outline-dark">
              Remove from Library
            </Button>
          ) : (
            <Button onClick={onClickAdd} variant="outline-dark">
              Add to Library
            </Button>
          )}
          {itemInFavourites ? (
            <Button onClick={favouriteRemove} variant="outline-dark">
              Remove from Favourites
            </Button>
          ) : (
            <Button onClick={favouriteAdd} variant="outline-dark">
              Favourites
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
}
