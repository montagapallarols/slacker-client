import React, { useEffect } from "react";
import "./Reviews.css";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllReviews,
  selectReviewsLoading,
} from "../../store/reviews/selectors";
import { fetchReviews } from "../../store/reviews/actions";
import { selectUser, selectToken } from "../../store/user/selectors";
import WriteReview from "../../components/WriteReview/WriteReview";
import Rating from "@material-ui/lab/Rating";
import {
  selectAllListItems,
  selectListItemsLoading,
} from "../../store/listItems/selectors";
import {
  selectAllProfiles,
  selectProfilesLoading,
} from "../../store/profiles/selectors";
import { fetchListItems } from "../../store/listItems/actions";
import { fetchProfiles } from "../../store/profiles/actions";

export default function Reviews() {
  const dispatch = useDispatch();
  const reviewsLoading = useSelector(selectReviewsLoading);
  const allListItems = useSelector(selectAllListItems);
  const listItemsLoading = useSelector(selectListItemsLoading);
  const allProfiles = useSelector(selectAllProfiles);
  const profilesLoading = useSelector(selectProfilesLoading);
  const allReviews = useSelector(selectAllReviews);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const history = useHistory();

  const userProfile: any = allProfiles?.find((p: any) => {
    return p.userId === user?.id;
  });

  // useEffect(() => {
  //   dispatch(fetchReviews);
  // }, [dispatch]);

  useEffect(() => {
    if (reviewsLoading || listItemsLoading || profilesLoading) {
      dispatch(fetchReviews);
      dispatch(fetchListItems);
      dispatch(fetchProfiles);
    }
  }, [dispatch, reviewsLoading, listItemsLoading, profilesLoading]);

  useEffect(() => {
    if (reviewsLoading) {
      history.push("/");
    }
  }, [reviewsLoading, history]);

  return (
    <div>
      <h1>All Reviews</h1>
      {allReviews?.map((r: any) => {
        return (
          <div key={r.id} className="review-list">
            <div className="review-content">
              <h4>{r.item.name}</h4>
              {r.item.poster === "N/A" ? null : (
                <img src={r.item.poster} alt="poster" height="150px" />
              )}
              <em>
                <h5>{r.name}</h5>
              </em>
              <div className="review-text">
                <em>
                  <p>{r.content}</p>
                </em>
              </div>
              <Rating name="read-only" value={r.rating} readOnly />

              {token && r.profileId === userProfile?.id ? (
                <Link to={`/my-profile/${user.id}`} className="link">
                  <em>
                    <strong>
                      <p>
                        {r.profile.firstName} {r.profile.lastName}
                      </p>
                    </strong>
                  </em>
                </Link>
              ) : (
                <Link to={`/profiles/${r.profile.userId}`} className="link">
                  <em>
                    <strong>
                      <p>
                        {r.profile.firstName} {r.profile.lastName}
                      </p>
                    </strong>
                  </em>
                </Link>
              )}
            </div>
          </div>
        );
      })}
      {token ? (
        <WriteReview />
      ) : (
        <h5>
          <Link to="/login">Log in </Link> or <Link to="/signup">sign up</Link>{" "}
          to write a review.
        </h5>
      )}
    </div>
  );
}
