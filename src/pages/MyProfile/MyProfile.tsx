import React from "react";
import "./MyProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUserProfile } from "../../store/user/selectors";

export default function MyProfile() {
  const userProfile = useSelector(selectUserProfile);

  return (
    <div>
      <h1>{`${userProfile.firstName} ${userProfile.lastName}`}</h1>
      <img src={userProfile.imageUrl} className="profile-image" />
    </div>
  );
}
