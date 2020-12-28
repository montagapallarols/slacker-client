import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllProfiles,
  // selectProfilesLoading,
} from "../../store/profiles/selectors";
import {
  selectAllFavourites,
  selectAllListItems,
  selectAllCategories,
} from "../../store/listItems/selectors";
import { fetchListItems } from "../../store/listItems/actions";
import {
  selectAllReviews,
  // selectReviewsLoading,
} from "../../store/reviews/selectors";
import { fetchProfiles } from "../../store/profiles/actions";
import Rating from "@material-ui/lab/Rating";
import {
  BsHeartFill,
  BsHeart,
  BsStarFill,
  BsStar,
  BsClockFill,
  BsClock,
} from "react-icons/bs";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const allProfiles = useSelector(selectAllProfiles);
  // const profilesLoading = useSelector(selectProfilesLoading);
  const allFavourites = useSelector(selectAllFavourites);
  const allListItems = useSelector(selectAllListItems);
  const allCategories = useSelector(selectAllCategories);
  // const reviewsLoading = useSelector(selectReviewsLoading);
  const allReviews = useSelector(selectAllReviews);

  useEffect(() => {
    dispatch(fetchProfiles);
    dispatch(fetchListItems);
  }, [dispatch]);

  interface ParamTypes {
    userId: any;
  }

  const { userId } = useParams<ParamTypes>();
  const userIdNum = parseInt(userId);
  const userProfile: any = allProfiles?.find((p: any) => {
    return p.userId === userIdNum;
  });

  const profileReviews = allReviews?.filter((r: any) => {
    return r.profile.userId === userIdNum;
  });

  const userFavourites = allFavourites?.filter((f: any) => {
    return f.list.profileId === userProfile?.id;
  });

  // function handleClickRemove(event: any) {
  //   event.preventDefault();
  //   console.log("Event value", event.target.value);
  //   dispatch(removeItemFromFavourites(event.target.value));
  // }

  return (
    <div>
      <div className="background-image">
        <h1 className="profile-name">{`${userProfile?.firstName} ${userProfile?.lastName}`}</h1>
        <img
          src={userProfile?.imageUrl}
          className="profile-image"
          height="180px"
          width="171px"
        />
        <p></p>
      </div>

      <div className="list">
        <div className="list-card">
          <h3>
            <BsStarFill /> Favourites
          </h3>
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
          <h3>
            <BsHeartFill /> Library
          </h3>
          <div className="item-list">
            {allCategories?.map((c: any) => {
              return (
                <div key={c.id} className="item-card">
                  <p>{c.name}</p>
                  {c.name === "Films" ? (
                    <img
                      src="https://storage.googleapis.com/ff-storage-p01/festivals/logos/000/039/385/large/logo.jpg?1498668430"
                      alt="logo"
                      height="100px"
                    />
                  ) : (
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUHuZo6NHZMspV5r5Lv_JT3_sCp9PEkl774g&usqp=CAU"
                      alt="logo"
                      height="80px"
                    />
                  )}
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
          <h3>
            <BsClockFill /> Wishlist
          </h3>
          <div className="item-list">
            {allCategories?.map((c: any) => {
              return (
                <div key={c.id} className="item-card">
                  <p>{c.name}</p>
                  {c.name === "Films" ? (
                    <img
                      src="https://storage.googleapis.com/ff-storage-p01/festivals/logos/000/039/385/large/logo.jpg?1498668430"
                      alt="logo"
                      height="100px"
                    />
                  ) : (
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUHuZo6NHZMspV5r5Lv_JT3_sCp9PEkl774g&usqp=CAU"
                      alt="logo"
                      height="80px"
                    />
                  )}
                  <Link to={`/profiles/${userIdNum}/wishlist/${c.name}`}>
                    <Button variant="outline-dark">See list</Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <h3 className="reviews-title">{userProfile?.firstName}'s Reviews</h3>
      {profileReviews?.map((r: any) => {
        return (
          <div key={r.id}>
            <h4 className="review-item-name">{r.item.name}</h4>
            <img src={r.item.poster} alt="poster" height="100px" />
            <em>
              <h5>{r.name}</h5>
            </em>
            <em>
              <p>{r.content}</p>
            </em>
            <Rating name="read-only" value={r.rating} readOnly />
            <em>
              <p>
                {r.profile.firstName} {r.profile.lastName}
              </p>
            </em>
          </div>
        );
      })}
    </div>
  );
}
