import React from "react";
import "./MyProfile.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserProfile, selectUser } from "../../store/user/selectors";
import { selectAllProfiles } from "../../store/profiles/selectors";
import {
  selectAllFavourites,
  selectAllListItems,
  selectAllCategories,
} from "../../store/listItems/selectors";

export default function MyProfile() {
  const user = useSelector(selectUser);
  const userProfile = useSelector(selectUserProfile);
  const allProfiles = useSelector(selectAllProfiles);
  const allFavourites = useSelector(selectAllFavourites);
  const allListItems = useSelector(selectAllListItems);
  const allCategories = useSelector(selectAllCategories);

  const userProfileWithLists: any = allProfiles?.find((p: any) => {
    return p.userId === user.id;
  });
  console.log("User profile with lists", userProfileWithLists);

  //   const profileListsNamesArray = userProfileWithLists?.lists.map((l: any) => {
  //     return l.type;
  //   });
  //   console.log("Profile Lists Names:", profileListsNamesArray);

  const userFavourites = allFavourites?.filter((f: any) => {
    return f.list.profileId === userProfile.id;
  });
  console.log("USER FAVOURITES:", userFavourites);

  return (
    <div>
      <h1>{`${userProfile.firstName} ${userProfile.lastName}`}</h1>
      <img src={userProfile.imageUrl} className="profile-image" />
      <p></p>

      <h3>Favourites</h3>
      {userFavourites?.map((f: any) => {
        return (
          <div key={f.id}>
            <p>{f.item.name}</p>
            {allCategories?.map((c: any) => {
              return c.id === f.item.categoryId ? (
                <em>
                  <p>({c.name})</p>
                </em>
              ) : null;
            })}
          </div>
        );
      })}

      <h3>Library</h3>
      {allCategories?.map((c: any) => {
        return (
          <div key={c.id}>
            <p>{c.name}</p>
            <Link to={`/${user.id}/library/${c.name}`}>
              <Button variant="outline-dark">See list</Button>
            </Link>
          </div>
        );
      })}
      <h3>Wishlist</h3>
      {allCategories?.map((c: any) => {
        return (
          <div key={c.id}>
            <p>{c.name}</p>
            <Link to={`/${user.id}/library/${c.name}`}>
              <Button variant="outline-dark">See list</Button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
