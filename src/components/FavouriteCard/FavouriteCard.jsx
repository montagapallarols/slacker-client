import React from "react";
import "./FavouriteCard.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFavouriteItemsByCategory } from "../../store/listItems/selectors";

export default function FavouriteCard() {
  const favouriteItemsByCategory = useSelector(selectFavouriteItemsByCategory);
  console.log("Favourites by category", favouriteItemsByCategory);
  return (
    <div className="sort-item-list">
      {favouriteItemsByCategory?.map((f) => {
        return (
          <Link to={`/favourites/${f.apiId}`} className="link" key={f.id}>
            <div classname="sort-item-card">
              <p>{f.name}</p>
              <img src={f.poster} alt="poster" height="150" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
