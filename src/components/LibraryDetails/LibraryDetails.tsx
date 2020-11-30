import React from "react";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";

export default function ListDetails() {
  interface ParamTypes {
    categoryName: string;
  }
  const { categoryName } = useParams<ParamTypes>();

  return (
    <div>
      <h2>My {categoryName} Library</h2>
      <Container>
        <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              Search for {categoryName.toLowerCase()} to add them to your
              Library:
            </Form.Label>
            <Form.Control
              type="search"
              placeholder={`Search ${categoryName.toLowerCase()}...`}
            />
          </Form.Group>
          <Button variant="dark" type="search">
            Search
          </Button>
        </Form>
      </Container>
    </div>
  );
}
