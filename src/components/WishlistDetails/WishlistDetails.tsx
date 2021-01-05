import React, { useEffect, useState, MouseEvent } from "react";
import "./WishlistDetails.css";
import { useParams, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Card, Button, Container, Form } from "react-bootstrap";
import {
  fetchApiItems,
  fetchApiItemById,
  removeSearchItems,
} from "../../store/apiItems/actions";
import {
  selectAllApiItems,
  selectApiItemDetails,
} from "../../store/apiItems/selectors";
import { selectUser } from "../../store/user/selectors";
import {
  selectAllCategories,
  selectAllListItems,
  selectListItemsLoading,
} from "../../store/listItems/selectors";
import {
  removeItemFromWishlist,
  addItemToList,
  fetchListItems,
  fetchCategories,
} from "../../store/listItems/actions";
import { selectAllProfiles } from "../../store/profiles/selectors";
import { fetchProfiles } from "../../store/profiles/actions";

export default function WishlistDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allApiItems = useSelector(selectAllApiItems);
  const apiItemDetails: any = useSelector(selectApiItemDetails);
  const user = useSelector(selectUser);
  const allListItems = useSelector(selectAllListItems);
  const listItemsLoading = useSelector(selectListItemsLoading);
  const allProfiles = useSelector(selectAllProfiles);
  const allCategories = useSelector(selectAllCategories);

  useEffect(() => {
    dispatch(fetchProfiles);
  }, [dispatch]);

  useEffect(() => {
    dispatch(removeSearchItems);
  }, [dispatch]);

  useEffect(() => {
    if (!user.token) {
      history.push("/");
    }
  }, [user.token, history]);

  useEffect(() => {
    if (listItemsLoading || !allCategories) {
      dispatch(fetchListItems);
      dispatch(fetchCategories);
    }
  }, [dispatch, listItemsLoading, allCategories]);

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
  const [desiredItemId, setDesiredItemId] = useState("");
  const itemToAdd =
    apiItemDetails?.imdbID === desiredItemId ? apiItemDetails : null;
  const searchButtonText = searchBar
    ? "Hide"
    : `Search and add ${categoryName}`;

  const userProfile: any = allProfiles?.find((p: any) => {
    return p.userId === user?.id;
  });

  const userWishlistList = userProfile?.lists?.find((l: any) => {
    return l.type === "Wishlist";
  });
  const userLibraryListId = userWishlistList?.id;

  function onClickSearch(event: MouseEvent) {
    event.preventDefault();

    dispatch(fetchApiItems(searchText));

    setSearchText("");
  }

  function handleClickRemove(event: any) {
    event.preventDefault();

    dispatch(removeItemFromWishlist(event.target.value));
  }

  const itemType = categoryName === "Films" ? "movie" : "series";

  const listItemsInWishlist = allListItems?.filter((i: any) => {
    return (
      i.list.type === "Wishlist" &&
      i.list.profileId === userProfile?.id &&
      i.item.type === itemType
    );
  });
  const apiIdWishlistArray = listItemsInWishlist?.map((i: any) => {
    return i.item.apiId;
  });
  console.log("ListItems in wishlist", listItemsInWishlist);

  function onClickAdd(event: any) {
    setDesiredItemId(event.target.value);
    dispatch(fetchApiItemById(event.target.value));
  }

  useEffect(() => {
    dispatch(addItemToList(itemToAdd, categoryId, userLibraryListId));
  }, [dispatch, apiItemDetails]);

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
                <Card style={{ width: "12rem", margin: "20px" }} key={i.imdbID}>
                  {i.Poster === "N/A" ? null : (
                    <Link
                      to={`/my-profile/${user.id}/wishlist/${categoryName}/${i.imdbID}`}
                    >
                      <Card.Img variant="top" src={i.Poster} alt="poster" />
                    </Link>
                  )}
                  <Card.Body>
                    <Card.Title>{i.Title}</Card.Title>
                    <Card.Text>({i.Year})</Card.Text>
                    {apiIdWishlistArray?.includes(i.imdbID) ? (
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
                        Add to Wishlist
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
      <h3>In my Wishlist</h3>
      <div className="wishlist-list">
        {listItemsInWishlist?.map((i: any) => {
          return (
            <Card style={{ width: "12rem", margin: "20px" }} key={i.item.apiId}>
              {i.item.poster === "N/A" ? null : (
                <Link
                  to={`/my-profile/${user.id}/wishlist/${categoryName}/${i.item.apiId}`}
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
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
