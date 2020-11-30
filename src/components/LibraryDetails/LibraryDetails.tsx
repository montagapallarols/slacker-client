import React, { useEffect, useState, MouseEvent } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";
import { fetchApiItems } from "../../store/apiItems/actions";

export default function ListDetails() {
  const dispatch = useDispatch();
  interface ParamTypes {
    categoryName: string;
  }
  const { categoryName } = useParams<ParamTypes>();

  const [searchText, setSearchText] = useState("");

  function onClickSearch(event: MouseEvent) {
    console.log("hi");
    event.preventDefault();

    dispatch(fetchApiItems(searchText));
    console.log("Fetching", searchText);

    setSearchText("");
  }
  console.log("Search text", searchText);

  return (
    <div>
      <h2>My {categoryName} Library</h2>
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
    </div>
  );
}
