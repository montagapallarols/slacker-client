import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StaticStarRating from "../../components/StaticStarRating/StaticStarRating";
import {
  selectAllReviews,
  selectReviewsLoading,
} from "../../store/reviews/selectors";
import { fetchReviews } from "../../store/reviews/actions";
import { selectUser, selectToken } from "../../store/user/selectors";
import WriteReview from "../../components/WriteReview/WriteReview";

export default function Reviews() {
  const reviewsLoading = useSelector(selectReviewsLoading);
  const allReviews = useSelector(selectAllReviews);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  return (
    <div>
      <h1>All Reviews</h1>
      {allReviews?.map((r: any) => {
        return (
          <div>
            <h4>{r.item.name}</h4>
            {r.item.poster === "N/A" ? null : (
              <img src={r.item.poster} alt="poster" height="150px" />
            )}
            <em>
              <h5>{r.name}</h5>
            </em>
            <em>
              <p>{r.content}</p>
            </em>
            <StaticStarRating rating={r.rating} />
            <em>
              {token && r.profileId === user.profile.id ? (
                <Link to={`/my-profile/${user.id}`} className="link">
                  <p>
                    {r.profile.firstName} {r.profile.lastName}
                  </p>
                </Link>
              ) : (
                <Link to={`/profiles/${r.profile.userId}`} className="link">
                  <p>
                    {r.profile.firstName} {r.profile.lastName}
                  </p>
                </Link>
              )}
            </em>
          </div>
        );
      })}
      <WriteReview />
    </div>
  );
}
