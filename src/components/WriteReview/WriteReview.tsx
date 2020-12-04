import React, { useState, useEffect, MouseEvent } from "react";
import "./WriteReview.css";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";
import {
  fetchApiItems,
  fetchApiItemById,
  removeSearchItems,
} from "../../store/apiItems/actions";
import {
  selectAllApiItems,
  selectApiItemsLoading,
  selectApiItemDetails,
} from "../../store/apiItems/selectors";
import Rating from "@material-ui/lab/Rating";
import {
  selectAllListItems,
  selectListItemsLoading,
} from "../../store/listItems/selectors";
import { selectUser } from "../../store/user/selectors";
import { addItemToList, fetchListItems } from "../../store/listItems/actions";
import { postReview } from "../../store/reviews/actions";
import {
  selectAllProfiles,
  selectProfilesLoading,
} from "../../store/profiles/selectors";
import { fetchProfiles } from "../../store/profiles/actions";

export default function WriteReview() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const apiItemsLoading = useSelector(selectApiItemsLoading);
  const allListItems = useSelector(selectAllListItems);
  const listItemsLoading = useSelector(selectListItemsLoading);
  const allApiItems = useSelector(selectAllApiItems);
  const apiItemDetails: any = useSelector(selectApiItemDetails);
  const allProfiles = useSelector(selectAllProfiles);
  const profilesLoading = useSelector(selectProfilesLoading);

  interface ReviewItem {
    Poster: any | null;
    Title: any | null;
    Type: any | null;
    Year: any | null;
    imdbID: any | null;
  }

  const [reviewForm, setReviewForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchText, setSearchText] = useState("");
  const [value, setValue] = useState(0);
  const [reviewItem, setReviewItem] = useState<ReviewItem>();
  const profileIdString = user?.profile?.id.toString();
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    dispatch(removeSearchItems);
  }, [dispatch]);

  useEffect(() => {
    if (listItemsLoading || profilesLoading) {
      dispatch(fetchListItems);
      dispatch(fetchProfiles);
    }
  }, [dispatch, listItemsLoading, profilesLoading]);

  const userProfile: any = allProfiles?.find((p: any) => {
    return p.userId === user?.id;
  });

  function onClickSearch(event: MouseEvent) {
    event.preventDefault();

    dispatch(fetchApiItems(searchText));

    setSearchText("");
  }

  useEffect(() => {
    dispatch(fetchApiItemById(reviewItem?.imdbID));
    dispatch(removeSearchItems);
  }, [dispatch, reviewItem]);

  const listItemsInLibrary = allListItems?.filter((i: any) => {
    return i.list?.type === "Library" && i.list?.profileId === userProfile?.id;
  });

  const apiIdLibraryArray = listItemsInLibrary?.map((i: any) => {
    return i.item?.apiId;
  });

  function onClickWrite() {
    setReviewForm(true);
  }

  const categoryId =
    apiItemDetails?.Type === "movie"
      ? 1
      : apiItemDetails?.Type === "series"
      ? 2
      : null;

  const userLibraryList = userProfile?.lists.find((l: any) => {
    return l.type === "Library";
  });
  const userLibraryListId = userLibraryList?.id;

  function addToLibrary() {
    dispatch(addItemToList(apiItemDetails, categoryId, userLibraryListId));
  }

  // const reviewListItem = allListItems?.find((i: any) => {
  //   return i.item.apiId === reviewItem?.imdbID;
  // });

  console.log("Review list item???", reviewItem);
  const reviewItemApiId = reviewItem?.imdbID;

  function submitForm(event: MouseEvent) {
    event.preventDefault();
    dispatch(
      postReview(title, content, value, reviewItemApiId, profileIdString)
    );
    setTitle("");
    setContent("");
    setValue(0);
    setSuccessMessage("Great! Your review has been submitted.");
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

        {reviewItem && reviewItem?.imdbID === apiItemDetails?.imdbID ? (
          <div>
            <div className="search-list">
              <div className="item-card">
                <p>{apiItemDetails?.Title}</p>
                <p>({apiItemDetails?.Year})</p>
                <img src={apiItemDetails?.Poster} alt="poster" height="100px" />
              </div>
              {apiIdLibraryArray?.includes(reviewItem?.imdbID) ? (
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue: any) => {
                    setValue(newValue);
                  }}
                />
              ) : null}
              {apiIdLibraryArray?.includes(apiItemDetails?.imdbID) ? null : (
                <Button
                  onClick={addToLibrary}
                  value={apiItemDetails?.imdbID}
                  variant="outline-dark"
                >
                  Add to Library to review
                </Button>
              )}
            </div>
            {apiIdLibraryArray?.includes(reviewItem?.imdbID) ? (
              <Button variant="dark" type="submit" onClick={onClickWrite}>
                Write a review
              </Button>
            ) : null}
          </div>
        ) : null}

        {reviewForm ? (
          <div>
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
            {successMessage}
            <Form.Group className="mt-5">
              <Button variant="dark" type="submit" onClick={submitForm}>
                Add review
              </Button>
            </Form.Group>
          </div>
        ) : null}
      </Form>
    </div>
  );
}
