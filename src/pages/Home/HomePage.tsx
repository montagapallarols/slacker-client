import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavouritesByCategory } from "../../store/listItems/actions";
import { selectAllCategories } from "../../store/listItems/selectors";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import FavouriteCard from "../../components/FavouriteCard/FavouriteCard";
import { selectToken } from "../../store/user/selectors";
import { fetchListItems } from "../../store/listItems/actions";
import { fetchProfiles } from "../../store/profiles/actions";
import { selectProfilesLoading } from "../../store/profiles/selectors";

export default function HomePage() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const allCategories = useSelector(selectAllCategories);
  const profilesLoading = useSelector(selectProfilesLoading);

  useEffect(() => {
    console.log("USE EFFECT");
    if (profilesLoading) {
      dispatch(fetchProfiles);
    }
  }, [dispatch, profilesLoading]);

  const [filterList, setFilterList] = useState("Profiles");
  const [categoryFilterId, setCategoryFilterId] = useState("");

  function onSearchProfiles() {
    setFilterList("Profiles");
  }

  useEffect(() => {
    dispatch(fetchFavouritesByCategory(categoryFilterId));
  }, [dispatch, categoryFilterId]);

  return (
    <div className="welcome-text">
      <div className="background">
        <h1 className="title">SLACKER</h1>

        <em>
          <h4 className="app-intro">
            Keeping lists in a notes app can become an incoherent mess.{" "}
          </h4>
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
            <p className="signup-text">
              {" "}
              <Link className="link-text" to="/signup">
                Sign up
              </Link>{" "}
              to create your profile!
            </p>
          </div>
        )}
      </div>

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
      <div className="container">
        <div className="row">
          {filterList === "Profiles" ? <ProfileCard /> : <FavouriteCard />}
        </div>
      </div>
    </div>
  );
}
