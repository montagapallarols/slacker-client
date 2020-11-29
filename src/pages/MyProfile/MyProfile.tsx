import React from "react";
import "./MyProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUserProfile, selectUser } from "../../store/user/selectors";
import { selectAllProfiles } from "../../store/profiles/selectors";
import {
  selectAllFavourites,
  selectAllListItems,
} from "../../store/listItems/selectors";

export default function MyProfile() {
  const user = useSelector(selectUser);
  const userProfile = useSelector(selectUserProfile);
  const allProfiles = useSelector(selectAllProfiles);
  const allFavourites = useSelector(selectAllFavourites);
  const allListItems = useSelector(selectAllListItems);

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
          <div>
            <p>{f.item.name}</p>
          </div>
        );
      })}

      {/* {userProfileWithLists?.lists.map((l: any) => {
        return (
          <div>
            <h3 key={l.id}>{l.type}</h3>
            {allListItems?.map((i: any) => {
              return i.listId === l.id ? (
                <div>
                  <p>{i.item.name}</p>
                </div>
              ) : null;
            })}
          </div>
        );
      })} */}
    </div>
  );
}
