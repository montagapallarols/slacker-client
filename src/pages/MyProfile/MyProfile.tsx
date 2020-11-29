import React from "react";
import "./MyProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUserProfile, selectUser } from "../../store/user/selectors";
import { selectAllProfiles } from "../../store/profiles/selectors";
import { selectAllFavourites } from "../../store/listItems/selectors";

export default function MyProfile() {
  const user = useSelector(selectUser);
  const userProfile = useSelector(selectUserProfile);
  const allProfiles = useSelector(selectAllProfiles);
  const allFavourites = useSelector(selectAllFavourites);

  const userProfileWithLists: any = allProfiles?.find((p: any) => {
    return p.userId === user.id;
  });
  console.log("Logged in user's lists", userProfileWithLists);

  const userFavourites = allFavourites?.map((f: any) => {
    if (f.list.profileId === userProfile.id) {
      return f.item;
    } else {
      return null;
    }
  });
  console.log("USER FAVOURITES:", userFavourites);

  return (
    <div>
      <h1>{`${userProfile.firstName} ${userProfile.lastName}`}</h1>
      <img src={userProfile.imageUrl} className="profile-image" />
      <p></p>
      {userProfileWithLists?.lists.map((l: any) => {
        return <h3>{l.type}</h3>;
      })}
    </div>
  );
}
