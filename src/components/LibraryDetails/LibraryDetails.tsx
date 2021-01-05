import React, { useEffect, useState, MouseEvent } from "react";
import "./LibraryDetails.css";
import { useParams, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Form, Col, Card } from "react-bootstrap";
import {
  fetchApiItems,
  fetchApiItemById,
  removeSearchItems,
  fetchFavouriteApiItemById,
} from "../../store/apiItems/actions";
import {
  selectAllApiItems,
  selectApiItemDetails,
  selectFavouriteApiItemDetails,
} from "../../store/apiItems/selectors";
import { selectUser } from "../../store/user/selectors";
import { selectAllListItems } from "../../store/listItems/selectors";
import {
  removeItemFromLibrary,
  addItemToList,
  removeItemFromFavourites,
  fetchListItems,
  fetchCategories,
} from "../../store/listItems/actions";
import { selectAllProfiles } from "../../store/profiles/selectors";
import { fetchProfiles } from "../../store/profiles/actions";

export default function ListDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allApiItems = useSelector(selectAllApiItems);
  const apiItemDetails: any = useSelector(selectApiItemDetails);
  const allProfiles = useSelector(selectAllProfiles);
  const favouriteApiItemDetails: any = useSelector(
    selectFavouriteApiItemDetails
  );
  const user = useSelector(selectUser);
  const allListItems = useSelector(selectAllListItems);

  useEffect(() => {
    dispatch(removeSearchItems);
  }, [dispatch]);

  useEffect(() => {
    if (!user.token) {
      history.push("/");
    }
  }, [user.token, history]);

  useEffect(() => {
    dispatch(fetchListItems);
    dispatch(fetchCategories);
    dispatch(fetchProfiles);
  }, [dispatch]);

  const categoryId =
    apiItemDetails.Type === "movie"
      ? 1
      : apiItemDetails.Type === "series"
      ? 2
      : null;

  const favouriteCategoryId =
    favouriteApiItemDetails.Type === "movie"
      ? 1
      : favouriteApiItemDetails.Type === "series"
      ? 2
      : null;

  interface ParamTypes {
    categoryName: string;
  }
  const { categoryName } = useParams<ParamTypes>();

  const [searchText, setSearchText] = useState("");
  const [searchBar, setSearchBar] = useState(false);
  const [desiredItemId, setDesiredItemId] = useState("");
  const itemToAdd =
    apiItemDetails?.imdbID === desiredItemId ? apiItemDetails : null;
  const [favouriteItemId, setFavouriteItemId] = useState("");
  const favouriteItemToAdd =
    favouriteApiItemDetails?.imdbID === favouriteItemId
      ? favouriteApiItemDetails
      : null;

  const searchButtonText = searchBar
    ? "Hide"
    : `Search and add ${categoryName}`;

  const userProfile: any = allProfiles?.find((p: any) => {
    return p.userId === user.id;
  });
  const userLibraryList = userProfile?.lists?.find((l: any) => {
    return l.type === "Library";
  });

  const userLibraryListId = userLibraryList?.id;

  const userFavouriteList = userProfile?.lists?.find((l: any) => {
    return l.type === "Favourites";
  });

  const userFavouriteListId = userFavouriteList?.id;

  function onClickSearch(event: MouseEvent) {
    event.preventDefault();

    dispatch(fetchApiItems(searchText));

    setSearchText("");
  }

  function handleClickRemove(event: any) {
    event.preventDefault();

    dispatch(removeItemFromLibrary(event.target.value));
  }

  const itemType = categoryName === "Films" ? "movie" : "series";

  const listItemsInLibrary = allListItems?.filter((i: any) => {
    return (
      i.list.type === "Library" &&
      i.list.profileId === userProfile?.id &&
      i.item.type === itemType
    );
  });

  const apiIdLibraryArray = listItemsInLibrary?.map((i: any) => {
    return i.item.apiId;
  });

  const listItemsInFavourites = allListItems?.filter((i: any) => {
    return i.list.type === "Favourites" && i.list.profileId === userProfile?.id;
  });
  // console.log("List items in Favourites", listItemsInFavourites);

  const apiIdFavouritesArray = listItemsInFavourites?.map((i: any) => {
    return i.item.apiId;
  });

  function onClickAdd(event: any) {
    setDesiredItemId(event.target.value);
    dispatch(fetchApiItemById(event.target.value));
  }

  useEffect(() => {
    dispatch(addItemToList(itemToAdd, categoryId, userLibraryListId));
  }, [dispatch, itemToAdd, categoryId, userLibraryListId]);

  function onClickFavouritesAdd(event: any) {
    setFavouriteItemId(event.target.value);
    dispatch(fetchFavouriteApiItemById(event.target.value));
  }

  useEffect(() => {
    dispatch(
      addItemToList(
        favouriteItemToAdd,
        favouriteCategoryId,
        userFavouriteListId
      )
    );
  }, [dispatch, favouriteItemToAdd, favouriteCategoryId, userFavouriteListId]);

  function favouritesRemove(event: any) {
    event.preventDefault();
    console.log("Event value", event.target.value);
    dispatch(removeItemFromFavourites(event.target.value));
  }

  return (
    <div>
      <h2>My {categoryName} Library</h2>
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
                  Library:
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
                <Card style={{ width: "12rem", margin: "20px" }} key={i.imdbID}>
                  {i.Poster === "N/A" ? null : (
                    <Link
                      to={`/my-profile/${user.id}/library/${categoryName}/${i.imdbID}`}
                    >
                      <Card.Img variant="top" src={i.Poster} alt="poster" />
                    </Link>
                  )}
                  <Card.Body>
                    <Card.Title>{i.Title}</Card.Title>
                    <Card.Text>({i.Year})</Card.Text>
                    {apiIdLibraryArray?.includes(i.imdbID) ? (
                      <Button
                        onClick={handleClickRemove}
                        value={i.imdbID}
                        variant="outline-dark"
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button
                        onClick={onClickAdd}
                        value={i.imdbID}
                        variant="outline-dark"
                      >
                        Add to Library
                      </Button>
                    )}
                    {apiIdFavouritesArray?.includes(i.imdbID) ? (
                      <Button
                        onClick={favouritesRemove}
                        value={i.imdbID}
                        variant="outline-dark"
                      >
                        Remove from Favourites
                      </Button>
                    ) : (
                      <Button
                        onClick={onClickFavouritesAdd}
                        value={i.imdbID}
                        variant="outline-dark"
                      >
                        Favourites
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </div>
      ) : null}
      <p></p>
      <h3>In my Library</h3>
      <div className="library-list">
        {listItemsInLibrary?.map((i: any) => {
          return (
            <Card style={{ width: "12rem", margin: "20px" }} key={i.item.apiId}>
              {i.item.poster === "N/A" ? null : (
                <Link
                  to={`/my-profile/${user.id}/library/${categoryName}/${i.item.apiId}`}
                >
                  <Card.Img variant="top" src={i.item.poster} alt="poster" />
                </Link>
              )}
              <Card.Body>
                <Card.Title>{i.item.name}</Card.Title>
                <Card.Text>({i.item.year})</Card.Text>
                <Button
                  onClick={handleClickRemove}
                  value={i.item.apiId}
                  variant="outline-dark"
                >
                  Remove
                </Button>

                {apiIdFavouritesArray?.includes(i.item.apiId) ? (
                  <Button
                    onClick={favouritesRemove}
                    value={i.item.apiId}
                    variant="outline-dark"
                  >
                    Remove from Favourites
                  </Button>
                ) : (
                  <Button
                    onClick={onClickFavouritesAdd}
                    value={i.item.apiId}
                    variant="outline-dark"
                  >
                    Favourites
                  </Button>
                )}
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
