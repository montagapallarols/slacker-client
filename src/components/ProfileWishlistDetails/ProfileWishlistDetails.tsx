import React, { useEffect, useState, MouseEvent } from "react";
import "./ProfileWishlistDetails.css";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";
import {
  selectApiItemsLoading,
  selectAllApiItems,
  selectApiItemDetails,
  selectFavouriteApiItemDetails,
} from "../../store/apiItems/selectors";
import { selectAllProfiles } from "../../store/profiles/selectors";
import {
  selectAllCategories,
  selectAllListItems,
} from "../../store/listItems/selectors";

export default function ProfileLibraryDetails() {
  const dispatch = useDispatch();
  const allProfiles = useSelector(selectAllProfiles);
  const apiItemsLoading = useSelector(selectApiItemsLoading);
  const allApiItems = useSelector(selectAllApiItems);
  const allListItems = useSelector(selectAllListItems);

  interface ParamTypes {
    categoryName: string;
  }
  const { categoryName } = useParams<ParamTypes>();
  console.log(categoryName);

  interface ParamTypes {
    userId: any;
  }
  const { userId } = useParams<ParamTypes>();
  const userIdNum = parseInt(userId);
  const userProfile: any = allProfiles?.find((p: any) => {
    return p.userId === userIdNum;
  });

  const itemType = categoryName === "Films" ? "movie" : "series";

  const listItemsInWishlist = allListItems?.filter((i: any) => {
    return (
      i.list.type === "Wishlist" &&
      i.list.profileId === userProfile.id &&
      i.item.type === itemType
    );
  });
  // console.log("List Items in wishlist", listItemsInLibrary);

  return (
    <div>
      <h2>
        {userProfile.user.firstName}'s {categoryName} Library
      </h2>
      <div className="library-list">
        {listItemsInWishlist?.map((i: any) => {
          return (
            <div key={i.item.apiId} className="item-card">
              <h3>
                {i.item.name} ({i.item.year})
              </h3>
              <em>
                <p>{i.item.type}</p>
              </em>
              {i.item.poster === "N/A" ? null : (
                <img src={i.item.poster} alt="poster" height="200px" />
              )}
              <Link
                to={`/profiles/${userIdNum}/wishlist/${categoryName}/${i.item.apiId}`}
              >
                <Button variant="outline-dark">Details</Button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
