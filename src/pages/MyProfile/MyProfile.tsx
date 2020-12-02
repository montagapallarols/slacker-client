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
import { removeItemFromFavourites } from "../../store/listItems/actions";
import StarRating from "../../components/StarRating/StarRating";

export default function MyProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userProfile = useSelector(selectUserProfile);
  const allProfiles = useSelector(selectAllProfiles);
  const allFavourites = useSelector(selectAllFavourites);
  const allListItems = useSelector(selectAllListItems);
  const allCategories = useSelector(selectAllCategories);

  const userProfileWithLists: any = allProfiles?.find((p: any) => {
    return p.userId === user.id;
  });

  const userFavourites = allFavourites?.filter((f: any) => {
    return f.list.profileId === userProfile.id;
  });

  function handleClickRemove(event: any) {
    event.preventDefault();
    console.log("Event value", event.target.value);
    dispatch(removeItemFromFavourites(event.target.value));
  }

  return (
    <div>
      <StarRating />
      <h1>{`${userProfile.firstName} ${userProfile.lastName}`}</h1>
      <img src={userProfile.imageUrl} className="profile-image" />
      <p></p>

      <div className="list">
        <div className="list-card">
          <h3>Favourites</h3>
          <div className="item-list">
            {userFavourites?.map((f: any) => {
              return (
                <div key={f.item.id}>
                  <Link
                    to={`/my-profile/${user.id}/favourites/${f.item.apiId}`}
                    className="link"
                  >
                    <div key={f.id} className="item-card">
                      <p>{f.item.name}</p>
                      {allCategories?.map((c: any) => {
                        return c.id === f.item.categoryId ? (
                          <em key={c.id}>
                            <p>({c.name})</p>
                          </em>
                        ) : null;
                      })}
                      {f.item.poster === "N/A" ? null : (
                        <img src={f.item.poster} alt="poster" height="150px" />
                      )}
                    </div>
                    <Button
                      onClick={handleClickRemove}
                      value={f.item.apiId}
                      variant="outline-dark"
                    >
                      Remove
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="list">
        <div className="list-card">
          <h3>Library</h3>
          <div className="item-list">
            {allCategories?.map((c: any) => {
              return (
                <div key={c.id} className="item-card">
                  <p>{c.name}</p>
                  <Link to={`/my-profile/${user.id}/library/${c.name}`}>
                    <Button variant="outline-dark">See list</Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="list">
        <div className="list-card">
          <h3>Wishlist</h3>
          <div className="item-list">
            {allCategories?.map((c: any) => {
              return (
                <div key={c.id} className="item-card">
                  <p>{c.name}</p>
                  <Link to={`/my-profile/${user.id}/wishlist/${c.name}`}>
                    <Button variant="outline-dark">See list</Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
