import React from "react";
import "./MyProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUserProfile, selectUser } from "../../store/user/selectors";
import { selectAllProfiles } from "../../store/profiles/selectors";

export default function MyProfile() {
  const user = useSelector(selectUser);
  const userProfile = useSelector(selectUserProfile);
  const allProfiles = useSelector(selectAllProfiles);

  const userProfileLists = allProfiles?.find((p: any) => {
    return p.userId === user.id;
  });
  console.log("Logged in user's lists", userProfileLists);

  return (
    <div>
      <h1>{`${userProfile.firstName} ${userProfile.lastName}`}</h1>
      <img src={userProfile.imageUrl} className="profile-image" />
      <p></p>
      <p>Hello</p>
    </div>
  );
}
