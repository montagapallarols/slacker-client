import React from "react";
import { useParams } from "react-router-dom";
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

export default function ProfilePage() {
  const dispatch = useDispatch();
  const allProfiles = useSelector(selectAllProfiles);
  const allFavourites = useSelector(selectAllFavourites);
  const allListItems = useSelector(selectAllListItems);
  const allCategories = useSelector(selectAllCategories);

  interface ParamTypes {
    userId: any;
  }

  const { userId } = useParams<ParamTypes>();
  const userIdNum = parseInt(userId);
  console.log(userIdNum);
  const userProfile: any = allProfiles?.find((p: any) => {
    return p.userId === userIdNum;
  });
  console.log("User's profile", userProfile);

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
                    to={`/profiles/${userIdNum}/favourites/${f.item.apiId}`}
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
                  <Link to={`/profiles/${userIdNum}/library/${c.name}`}>
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
                  <Link to={`/profiles/${userIdNum}/wishlist/${c.name}`}>
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
