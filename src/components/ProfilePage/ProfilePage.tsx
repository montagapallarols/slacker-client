import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
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

  const [profileButton, setProfileButton] = useState("lists");

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
        <div className="profile-image">
          <img src={userProfile?.imageUrl} height="180px" width="171px" />
        </div>
        <p></p>
      </div>
      <Button
        onClick={() => setProfileButton("lists")}
        style={{ margin: "10px" }}
        variant="outline-dark"
      >
        Lists
      </Button>
      <Button
        onClick={() => setProfileButton("reviews")}
        variant="outline-dark"
      >
        Reviews
      </Button>
      {profileButton === "lists" ? (
        <div>
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
                            <img
                              src={f.item.poster}
                              alt="poster"
                              height="150px"
                            />
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
                    <Card
                      style={{ width: "18rem", marginTop: "40px" }}
                      key={c.id}
                    >
                      {c.name === "Films" ? (
                        <Card.Img
                          variant="top"
                          src="https://www.nyfa.edu/film-school-blog/wp-content/uploads/2015/02/projector.jpg"
                          alt="logo"
                        />
                      ) : (
                        <Card.Img
                          variant="top"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT79Dlq-fPrW1L2bVz2PJH73FwFHDpsWjhdw&usqp=CAU"
                          alt="logo"
                        />
                      )}
                      <Card.Body>
                        <Card.Title>{c.name}</Card.Title>
                        <Card.Text></Card.Text>
                        <Link to={`/profiles/${userIdNum}/library/${c.name}`}>
                          <Button variant="outline-dark">See list</Button>
                        </Link>
                      </Card.Body>
                    </Card>
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
                    <Card
                      style={{ width: "18rem", marginTop: "40px" }}
                      key={c.id}
                    >
                      {c.name === "Films" ? (
                        <Card.Img
                          variant="top"
                          src="https://www.nyfa.edu/film-school-blog/wp-content/uploads/2015/02/projector.jpg"
                          alt="logo"
                        />
                      ) : (
                        <Card.Img
                          variant="top"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT79Dlq-fPrW1L2bVz2PJH73FwFHDpsWjhdw&usqp=CAU"
                          alt="logo"
                        />
                      )}
                      <Card.Body>
                        <Card.Title>{c.name}</Card.Title>
                        <Card.Text></Card.Text>
                        <Link to={`/profiles/${userIdNum}/wishlist/${c.name}`}>
                          <Button variant="outline-dark">See list</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
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
      )}
    </div>
  );
}
