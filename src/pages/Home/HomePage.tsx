import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfiles } from "../../store/profile/actions";
import { fetchListItems } from "../../store/listItems/actions";
import {
  selectProfilesLoading,
  selectAllProfiles,
} from "../../store/profile/selectors";
import {
  selectListItemsLoading,
  selectAllListItems,
} from "../../store/listItems/selectors";

export default function HomePage() {
  const dispatch = useDispatch();
  const profilesLoading = useSelector(selectProfilesLoading);
  const allProfiles = useSelector(selectAllProfiles);
  const listItemsLoading = useSelector(selectListItemsLoading);
  const allListItems = useSelector(selectAllListItems);

  useEffect(() => {
    dispatch(fetchProfiles);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchListItems);
  }, [dispatch]);

  if (profilesLoading || listItemsLoading) {
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
                <h3>{`${p.firstName} ${p.lastName}`}</h3>
                <img src={p.imageUrl} height="80px" />
                <br></br>
                <em>
                  <p>
                    {p.lists.map((list: any) => {
                      return list.type === `${p.firstName}'s Favourites` ? (
                        <strong>{list.type}</strong>
                      ) : null;
                    })}
                  </p>
                  <p>
                    {allListItems?.map((list: any) => {
                      return list.list.type ===
                        `${p.firstName}'s Favourites` ? (
                        <div>
                          {/* <p>{list.list.type}</p> */}
                          <p>{list.item.name}</p>
                        </div>
                      ) : null;
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
