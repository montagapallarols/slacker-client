import React, { useEffect, useState, MouseEvent } from "react";
import "./WishlistDetails.css";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";
import { fetchApiItems, fetchApiItemById } from "../../store/apiItems/actions";
import {
  selectApiItemsLoading,
  selectAllApiItems,
} from "../../store/apiItems/selectors";
import { selectUser } from "../../store/user/selectors";
import { selectAllCategories } from "../../store/listItems/selectors";

export default function WishlistDetails() {
  const dispatch = useDispatch();
  const apiItemsLoading = useSelector(selectApiItemsLoading);
  const allApiItems = useSelector(selectAllApiItems);
  const user = useSelector(selectUser);
  const allCategories = useSelector(selectAllCategories);

  interface ParamTypes {
    categoryName: string;
  }
  const { categoryName } = useParams<ParamTypes>();

  const [searchText, setSearchText] = useState("");

  function onClickSearch(event: MouseEvent) {
    event.preventDefault();

    dispatch(fetchApiItems(searchText));
    console.log("Fetching", searchText);

    setSearchText("");
  }

  return (
    <div>
      <h2>My {categoryName} Wishlist</h2>
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
              <Button variant="outline-dark">Add to Wishlist</Button>
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
  );
}
