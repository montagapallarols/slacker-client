import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfiles } from "../../store/profile/actions";
import {
  fetchListItems,
  fetchCategories,
  fetchFavouritesByCategory,
} from "../../store/listItems/actions";
import { selectProfilesLoading } from "../../store/profile/selectors";
import {
  selectListItemsLoading,
  selectAllCategories,
} from "../../store/listItems/selectors";
import { selectFavouriteItemsByCategory } from "../../store/listItems/selectors";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import FavouriteCard from "../../components/FavouriteCard/FavouriteCard";

export default function HomePage() {
  const dispatch = useDispatch();
  const profilesLoading = useSelector(selectProfilesLoading);
  const listItemsLoading = useSelector(selectListItemsLoading);
  const allCategories = useSelector(selectAllCategories);
  const favouriteItemsByCategory = useSelector(selectFavouriteItemsByCategory);

  const [filterList, setFilterList] = useState("Profiles");
  const [categoryFilterId, setCategoryFilterId] = useState("");

  useEffect(() => {
    dispatch(fetchProfiles);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchListItems);
  }, [dispatch]);

  function onSearchProfiles() {
    setFilterList("Profiles");
  }

  useEffect(() => {
    dispatch(fetchFavouritesByCategory(categoryFilterId));
  }, [categoryFilterId]);

  // console.log("Favourites by category", favouriteItemsByCategory);

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
        <h3>Show me</h3>
        <div>
          <Button onClick={onSearchProfiles} variant="outline-dark">
            All profiles
          </Button>{" "}
          {allCategories?.map((category: any) => (
            <Button
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
        <div>
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
