import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfiles } from "../../store/profile/actions";
import { fetchListItems, fetchCategories } from "../../store/listItems/actions";
import {
  selectProfilesLoading,
  selectAllProfiles,
} from "../../store/profile/selectors";
import {
  selectListItemsLoading,
  selectAllListItems,
} from "../../store/listItems/selectors";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

export default function HomePage() {
  const dispatch = useDispatch();
  const profilesLoading = useSelector(selectProfilesLoading);
  const allProfiles = useSelector(selectAllProfiles);
  const listItemsLoading = useSelector(selectListItemsLoading);
  const allListItems = useSelector(selectAllListItems);

  const [filterList, setFilterList] = useState("profiles");

  useEffect(() => {
    dispatch(fetchProfiles);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchListItems);
  }, [dispatch]);

  function onSearchFavourites() {
    setFilterList("favourites");
  }

  function onSearchProfiles() {
    setFilterList("profiles");
  }

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
          <Button onClick={onSearchProfiles} variant="outline-dark">
            All profiles
          </Button>{" "}
          <Button onClick={onSearchFavourites} variant="outline-dark">
            Favourite Films
          </Button>{" "}
          <Button variant="outline-dark">Favourite TV Shows</Button>{" "}
        </div>
        <br></br>
        <div>
          {filterList === "profiles" ? (
            <ProfileCard />
          ) : filterList === "favourites" ? (
            "Favourite Films"
          ) : null}
        </div>
      </div>
    );
  }
}
