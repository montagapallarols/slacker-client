import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import StaticStarRating from "../../components/StaticStarRating/StaticStarRating";
import {
  selectAllReviews,
  selectReviewsLoading,
} from "../../store/reviews/selectors";
import { fetchReviews } from "../../store/reviews/actions";
import { selectUser, selectToken } from "../../store/user/selectors";
import WriteReview from "../../components/WriteReview/WriteReview";
import Loading from "../../components/Loading";

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
          <div key={r.id}>
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
