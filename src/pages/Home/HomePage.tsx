import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfiles, setLoading } from "../../store/profile/actions";
import {
  selectProfilesLoading,
  selectAllProfiles,
} from "../../store/profile/selectors";
import { LOADING_USER } from "../../store/user/types";

export default function HomePage() {
  const dispatch = useDispatch();
  const profilesLoading = useSelector(selectProfilesLoading);
  const allProfiles = useSelector(selectAllProfiles);

  useEffect(() => {
    dispatch(fetchProfiles);
  }, [dispatch]);

  if (profilesLoading) {
    return <p>"Loading..."</p>;
  } else {
    return (
      <div>
        <h1>Welcome to Slacker!</h1>
        <p>
          Here you can curate, review and share your favourite films, TV shows,
          books and podcasts or add them to your wish list.
        </p>
        <p>Sign up to create your profile and connect with your friends!</p>
        <br></br>
        <Link to="/signup">
          <Button variant="dark">Sign up</Button>
        </Link>
        <br></br>
        <p>
          Already have an account? Log in <Link to="/login">here</Link>
        </p>

        <div>
          <Button variant="outline-dark">All profiles</Button>{" "}
          <Button variant="outline-dark">Favourite Films</Button>{" "}
          <Button variant="outline-dark">Favourite TV Shows</Button>{" "}
        </div>
        <br></br>
        <div>
          {allProfiles?.map((p: any) => {
            return (
              <div key={p.id}>
                <p>{`${p.firstName} ${p.lastName}`}</p>
                <img src={p.imageUrl} height="80px" />
                <br></br>
                <em>
                  <p>
                    {p.lists.map((list: any) => {
                      return list.type === `${p.firstName}'s Favourites`
                        ? list.type
                        : null;
                    })}
                  </p>
                </em>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
