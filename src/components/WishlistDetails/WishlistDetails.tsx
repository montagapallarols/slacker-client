import React, { useEffect, useState, MouseEvent } from "react";
import "./WishlistDetails.css";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";
import {
  fetchApiItems,
  fetchApiItemById,
  removeSearchItems,
} from "../../store/apiItems/actions";
import {
  selectApiItemsLoading,
  selectAllApiItems,
  selectApiItemDetails,
} from "../../store/apiItems/selectors";
import { selectUser } from "../../store/user/selectors";
import {
  selectAllCategories,
  selectAllListItems,
} from "../../store/listItems/selectors";
import {
  removeItemFromWishlist,
  addItemToList,
} from "../../store/listItems/actions";

export default function WishlistDetails() {
  const dispatch = useDispatch();
  const apiItemsLoading = useSelector(selectApiItemsLoading);
  const allApiItems = useSelector(selectAllApiItems);
  const apiItemDetails: any = useSelector(selectApiItemDetails);
  const user = useSelector(selectUser);
  const allCategories = useSelector(selectAllCategories);
  const allListItems = useSelector(selectAllListItems);

  useEffect(() => {
    console.log("Clear");
    dispatch(removeSearchItems);
  }, [dispatch]);

  const categoryId =
    apiItemDetails.Type === "movie"
      ? 1
      : apiItemDetails.Type === "series"
      ? 2
      : null;

  interface ParamTypes {
    categoryName: string;
  }
  const { categoryName } = useParams<ParamTypes>();

  const [searchText, setSearchText] = useState("");
  const [searchBar, setSearchBar] = useState(false);
  const searchButtonText = searchBar
    ? "Hide"
    : `Search and add ${categoryName}`;

  const userWishlistList = user.profile.lists?.find((l: any) => {
    return l.type === "Wishlist";
  });
  const userLibraryListId = userWishlistList.id;

  function onClickSearch(event: MouseEvent) {
    event.preventDefault();

    dispatch(fetchApiItems(searchText));
    console.log("Fetching", searchText);

    setSearchText("");
  }

  function handleClickRemove(event: any) {
    event.preventDefault();
    console.log("Event value", event.target.value);
    dispatch(removeItemFromWishlist(event.target.value));
  }

  const listItemsInWishlist = allListItems?.filter((i: any) => {
    return i.list.type === "Wishlist" && i.list.profileId === user.profile.id;
  });
  const apiIdWishlistArray = listItemsInWishlist?.map((i: any) => {
    return i.item.apiId;
  });
  console.log("ListItems in wishlist", listItemsInWishlist);
  // console.log("Api id array", apiIdWishlistArray);

  function onClickAdd() {
    // console.log("api item details", apiItemDetails);
    // console.log("category id", categoryId);
    // console.log("User library id", userLibraryListId);
    dispatch(addItemToList(apiItemDetails, categoryId, userLibraryListId));
  }

  return (
    <div>
      <h2>My {categoryName} Wishlist</h2>
      <Button variant="dark" onClick={() => setSearchBar(!searchBar)}>
        {searchButtonText}
      </Button>
      {searchBar ? (
        <div>
          <Container>
            <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
              <Form.Group controlId="formBasicText">
                <Form.Label>
                  Search for {categoryName.toLowerCase()} to add them to your
                  Wishlist:
                </Form.Label>
                <Form.Control
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  type="text"
                  placeholder={`Search ${categoryName.toLowerCase()}...`}
                />
              </Form.Group>
              <Button variant="dark" type="submit" onClick={onClickSearch}>
                Search
              </Button>
            </Form>
          </Container>
          <div className="search-list">
            {allApiItems?.map((i: any) => {
              return (
                <div key={i.imdbID} className="item-card">
                  <h3>
                    {i.Title} ({i.Year})
                  </h3>
                  <em>
                    <p>{i.Type}</p>
                  </em>
                  {i.Poster === "N/A" ? null : (
                    <img src={i.Poster} alt="poster" height="200px" />
                  )}
                  {apiIdWishlistArray?.includes(i.imdbID) ? (
                    <Button
                      onClick={handleClickRemove}
                      value={i.imdbID}
                      variant="outline-dark"
                    >
                      Remove from Wishlist
                    </Button>
                  ) : (
                    <Button onClick={onClickAdd} variant="outline-dark">
                      Add to Wishlist
                    </Button>
                  )}
                  <Link
                    to={`/my-profile/${user.id}/wishlist/${categoryName}/${i.imdbID}`}
                  >
                    <Button variant="outline-dark">More details</Button>
                  </Link>
                  <Button variant="outline-dark">Favourites</Button>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
