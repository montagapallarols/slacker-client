import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <p>
        Welcome to Slacker! Here you can curate, review and share your favourite
        films, TV shows, books and podcasts or add them to your wish list.
      </p>
      <p>Sign up to create your profile and connect with your friends!</p>
      <br></br>
      <Link to="/signup">
        <Button variant="dark">Sign up</Button>
      </Link>
      <br></br>
      <p>
        Already have an account? Log in <Link to="/login">here</Link>
      </p>
    </div>
  );
}
