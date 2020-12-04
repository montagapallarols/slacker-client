import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfiles } from "../../store/profiles/actions";
import {
  fetchListItems,
  fetchCategories,
  fetchFavouritesByCategory,
  fetchAllFavourites,
} from "../../store/listItems/actions";
import {
  selectProfilesLoading,
  // selectAllProfiles,
} from "../../store/profiles/selectors";
import {
  selectListItemsLoading,
  selectAllCategories,
  selectAllFavourites,
} from "../../store/listItems/selectors";
// import { selectFavouriteItemsByCategory } from "../../store/listItems/selectors";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import FavouriteCard from "../../components/FavouriteCard/FavouriteCard";
import { selectToken } from "../../store/user/selectors";

export default function HomePage() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const profilesLoading = useSelector(selectProfilesLoading);
  const listItemsLoading = useSelector(selectListItemsLoading);
  const allCategories = useSelector(selectAllCategories);
  const allFavourites = useSelector(selectAllFavourites);
  // const allProfiles = useSelector(selectAllProfiles);
  // const favouriteItemsByCategory = useSelector(selectFavouriteItemsByCategory);

  const [filterList, setFilterList] = useState("Profiles");
  const [categoryFilterId, setCategoryFilterId] = useState("");

  // useEffect(() => {
  //   dispatch(fetchProfiles);
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchCategories);
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchListItems);
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchAllFavourites);
  // }, [dispatch]);

  useEffect(() => {
    if (
      listItemsLoading ||
      profilesLoading ||
      !allFavourites ||
      !allCategories
    ) {
      dispatch(fetchListItems);
      dispatch(fetchProfiles);
      dispatch(fetchAllFavourites);
      dispatch(fetchCategories);
    }
  }, [
    dispatch,
    listItemsLoading,
    profilesLoading,
    allFavourites,
    allCategories,
  ]);

  function onSearchProfiles() {
    setFilterList("Profiles");
  }

  useEffect(() => {
    dispatch(fetchFavouritesByCategory(categoryFilterId));
  }, [dispatch, categoryFilterId]);

  if (profilesLoading || listItemsLoading) {
    return <p>"Loading..."</p>;
  } else {
    return (
      <div className="welcome-text">
        <h1 className="title">Welcome to Slacker!</h1>
        <img
          src="https://storage.googleapis.com/ff-storage-p01/festivals/logos/000/039/385/large/logo.jpg?1498668430"
          alt="logo"
          height="170px"
        />
        <em>
          <h4>Keeping lists in a notes app can become an incoherent mess. </h4>
        </em>
        <div className="app-description">
          <p>
            Whether you want to curate nostalgic glimpses of a gone generation
            or check a film you’ve just heard about, Slacker is the space for
            you.
          </p>
          <p>
            Here you can curate, review and share your favourite films and
            series or add them to your wishlist so you can enjoy them later.
          </p>
        </div>
        {token ? null : (
          <div>
            <p>Sign up to create your profile!</p>
            <br></br>
            <Link to="/signup">
              <Button variant="dark">Sign up</Button>
            </Link>
            <br></br>
            <p>
              Already have an account? Log in <Link to="/login">here</Link>
            </p>
          </div>
        )}
        <h3>Show me</h3>
        <div>
          <Button onClick={onSearchProfiles} variant="outline-dark">
            All profiles
          </Button>{" "}
          {allCategories?.map((category: any) => (
            <Button
              key={category.id}
              variant="outline-dark"
              onClick={() => {
                setCategoryFilterId(category.id);
                setFilterList(`${category.name}`);
              }}
            >
              All Favourite {category.name}
            </Button>
          ))}
        </div>
        <br></br>
        <div className="profile-list">
          {filterList === "Profiles" ? (
            <ProfileCard />
          ) : filterList === "Films" ? (
            <FavouriteCard />
          ) : (
            <FavouriteCard />
          )}
        </div>
      </div>
    );
  }
}
