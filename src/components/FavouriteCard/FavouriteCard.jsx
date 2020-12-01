import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFavouriteItemsByCategory } from "../../store/listItems/selectors";

export default function FavouriteCard() {
  const favouriteItemsByCategory = useSelector(selectFavouriteItemsByCategory);
  console.log("Favourites by category", favouriteItemsByCategory);
  return (
    <div>
      {favouriteItemsByCategory.map((f) => {
        return (
          <Link to={`/favourites/${f.apiId}`} className="link" key={f.id}>
            <div>
              <p>{f.name}</p>
              <img src={f.poster} alt="poster" height="150" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
