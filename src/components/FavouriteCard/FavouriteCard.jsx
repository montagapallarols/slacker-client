import React from "react";
import { useSelector } from "react-redux";
import { selectFavouriteItemsByCategory } from "../../store/listItems/selectors";

export default function FavouriteCard() {
  const favouriteItemsByCategory = useSelector(selectFavouriteItemsByCategory);
  console.log("Favourites by category", favouriteItemsByCategory);
  return (
    <div>
      {favouriteItemsByCategory.map((f) => {
        return (
          <div key={f.id}>
            <p>{f.name}</p>
          </div>
        );
      })}
    </div>
  );
}
