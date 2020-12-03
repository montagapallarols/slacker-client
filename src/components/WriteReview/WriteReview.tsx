import React, { useState, useEffect, MouseEvent } from "react";
import "./WriteReview.css";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";
import {
  fetchApiItems,
  fetchApiItemById,
  removeSearchItems,
  fetchFavouriteApiItemById,
} from "../../store/apiItems/actions";
import {
  selectAllApiItems,
  selectApiItemsLoading,
} from "../../store/apiItems/selectors";
import Rating from "@material-ui/lab/Rating";

export default function WriteReview() {
  const dispatch = useDispatch();
  const apiItemsLoading = useSelector(selectApiItemsLoading);
  const allApiItems = useSelector(selectAllApiItems);

  interface ReviewItem {
    Poster: any | null;
    Title: any | null;
    Type: any | null;
    Year: any | null;
    imdbID: any | null;
  }

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [searchText, setSearchText] = useState("");
  const [value, setValue] = React.useState(0);
  const [reviewItem, setReviewItem] = React.useState<ReviewItem>();
  console.log("Review item", reviewItem);

  useEffect(() => {
    dispatch(removeSearchItems);
  }, [dispatch]);

  function onClickSearch(event: MouseEvent) {
    event.preventDefault();

    dispatch(fetchApiItems(searchText));

    setSearchText("");
  }

  useEffect(() => {
    dispatch(removeSearchItems);
  }, [dispatch, reviewItem]);

  function onClickRating() {
    console.log("Rating");
  }

  function submitForm(event: MouseEvent) {
    console.log("Submit review");
  }

  return (
    <div>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <h2 className="mt-5 mb-5">Write a Review</h2>
        <Form.Group controlId="formBasicText">
          <Form.Label>
            Search and select the film or show you want to review:
          </Form.Label>
          <Form.Control
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            type="text"
            placeholder="Search..."
          />
        </Form.Group>
        <Button variant="dark" type="submit" onClick={onClickSearch}>
          Search
        </Button>

        <div className="search-list">
          {allApiItems?.map((i: any) => {
            return (
              <div
                key={i.imdbID}
                className="item-card"
                onClick={() => setReviewItem(i)}
              >
                <strong>
                  <p>{i.Title}</p>
                </strong>
                <p>({i.Year})</p>

                {i.Poster === "N/A" ? null : (
                  <img src={i.Poster} alt="poster" height="120px" />
                )}
              </div>
            );
          })}
        </div>

        {reviewItem ? (
          <div className="search-list">
            <div className="item-card">
              <p>{reviewItem?.Title}</p>
              <p>({reviewItem?.Year})</p>
              <img src={reviewItem?.Poster} alt="poster" height="100px" />
            </div>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue: any) => {
                setValue(newValue);
              }}
              onClick={onClickRating}
            />
          </div>
        ) : null}

        <Form.Group controlId="review-title">
          <Form.Control
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            placeholder="Review title..."
            required
          />
        </Form.Group>
        <Form.Group controlId="review-content">
          <Form.Control
            value={content}
            onChange={(event) => setContent(event.target.value)}
            as="textarea"
            rows={3}
            required
          />
        </Form.Group>
        <Form.Group className="mt-5">
          <Button variant="dark" type="submit" onClick={submitForm}>
            Add review
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
