import React, { useEffect, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import "./MyProfile.css";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { selectAllProfiles } from "../../store/profiles/selectors";
import {
  selectAllFavourites,
  selectAllCategories,
} from "../../store/listItems/selectors";
import {
  removeItemFromFavourites,
  fetchListItems,
  fetchAllFavourites,
  fetchCategories,
} from "../../store/listItems/actions";
// import StarRating from "../../components/StarRating/StarRating";
import {
  selectAllReviews,
  selectReviewsLoading,
} from "../../store/reviews/selectors";
import Rating from "@material-ui/lab/Rating";
import { fetchReviews } from "../../store/reviews/actions";
import { updateProfile } from "../../store/profiles/actions";
import { BsHeartFill, BsStarFill, BsClockFill } from "react-icons/bs";
import { Col, Button, Form, Card } from "react-bootstrap";

export default function MyProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const allProfiles = useSelector(selectAllProfiles);
  const allFavourites = useSelector(selectAllFavourites);
  const allCategories = useSelector(selectAllCategories);
  const reviewsLoading = useSelector(selectReviewsLoading);
  const allReviews = useSelector(selectAllReviews);
  const history = useHistory();

  const [editProfile, setEditProfile] = useState(false);
  const [profileButton, setProfileButton] = useState("lists");

  useEffect(() => {
    if (!user.token) {
      history.push("/");
    }
  }, [user.token, history]);

  useEffect(() => {
    if (reviewsLoading) {
      dispatch(fetchReviews);
    }
  }, [dispatch, reviewsLoading]);

  useEffect(() => {
    console.log("USE EFFECT");
    dispatch(fetchListItems);
    dispatch(fetchAllFavourites);
    dispatch(fetchCategories);
  }, [dispatch]);

  interface ParamTypes {
    userId: string;
  }
  const { userId } = useParams<ParamTypes>();
  const userIdNum = parseInt(userId);

  const userProfile: any = allProfiles?.find((p: any) => {
    return p.userId === user?.id;
  });
  const userProfileId = userProfile?.id;

  const [imageUrl, setImageUrl] = useState(userProfile?.imageUrl);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });

  const userFavourites = allFavourites?.filter((f: any) => {
    return f.list.profileId === userProfile?.id;
  });

  const profileReviews = allReviews?.filter((r: any) => {
    return r.profile.userId === userIdNum;
  });

  function handleClickRemove(event: any) {
    event.preventDefault();
    dispatch(removeItemFromFavourites(event.target.value));
  }

  function changePicture() {
    dispatch(updateProfile(userProfileId, imageUrl));
    setEditProfile(false);
  }

  return (
    <div>
      <div className="background-image">
        <h1 className="profile-name">{`${userProfile?.firstName} ${userProfile?.lastName}`}</h1>

        <div className="profile-image">
          <img src={userProfile?.imageUrl} alt="profile-pic" />
        </div>

        <p></p>
      </div>
      <div>
        {editProfile ? (
          <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
            <Form.Group controlId="formUrl">
              <Form.Label>Image url</Form.Label>
              <Form.Control
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                type="url"
                placeholder=""
                required
              />
            </Form.Group>
            {imageUrl ? (
              <div>
                <p>Image preview:</p>

                <AvatarEditor
                  className="profile-image"
                  image={imageUrl}
                  // width={250}
                  // height={250}
                  border={0}
                  color={[255, 255, 255, 0.6]}
                  scale={1}
                  rotate={0}
                  position={position}
                  onPositionChange={(event) => setPosition(event)}
                />
              </div>
            ) : null}
            <Button
              className="change-button"
              onClick={changePicture}
              variant="success"
            >
              Change picture
            </Button>
          </Form>
        ) : null}
      </div>
      <Button
        onClick={() => setProfileButton("lists")}
        style={{ margin: "10px" }}
        variant="dark"
      >
        Lists
      </Button>
      <Button onClick={() => setProfileButton("reviews")} variant="dark">
        Reviews
      </Button>
      <Button
        onClick={() => setEditProfile(!editProfile)}
        style={{ margin: "10px" }}
        variant="info"
      >
        Edit profile
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
                    <div key={f.itemId}>
                      <Link
                        to={`/my-profile/${user.id}/favourites/${f.item.apiId}`}
                        className="link"
                      >
                        <div key={f.id} className="item-card">
                          <p>{f.item.name}</p>
                          {allCategories?.map((c: any) => {
                            return c.id === f.item.categoryId ? (
                              <em key={c.id}>
                                <p className="category-name">({c.name})</p>
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
                        <Link to={`/my-profile/${user.id}/library/${c.name}`}>
                          <Button variant="dark">See list</Button>
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
                        <Link to={`/my-profile/${user.id}/wishlist/${c.name}`}>
                          <Button variant="dark">See list</Button>
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
                {r.item.poster === "N/A" ? null : (
                  <img
                    className="review-image"
                    src={r.item.poster}
                    alt="poster"
                    height="130px"
                  />
                )}
                <em>
                  <h5>{r.name}</h5>
                </em>
                <em>
                  <p className="plot">{r.content}</p>
                </em>
                <Rating name="read-only" value={r.rating} readOnly />
                <em>
                  <p>
                    {r.profile.firstName} {r.profile.lastName}
                  </p>
                </em>
                <hr style={{ width: "60%" }} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
