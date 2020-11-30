import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/actions";
import Button from "react-bootstrap/Button";
import { selectUser } from "../../store/user/selectors";
import Nav from "react-bootstrap/Nav";
import NavbarItem from "./NavbarItem";
import { useHistory } from "react-router-dom";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const history = useHistory();

  // function handleOnClick() {
  //   dispatch(logOut);
  //   history.push("/");
  // }

  return (
    <>
      <NavbarItem path={`/my-profile/${user.id}`} linkText="My Profile" />
      <Nav.Item style={{ padding: ".5rem 1rem" }}>{user.firstName}</Nav.Item>
      <Button variant="dark" onClick={() => dispatch(logOut())}>
        Logout
      </Button>
      {/* <Button onClick={handleOnClick}>Logout</Button> */}
    </>
  );
}
