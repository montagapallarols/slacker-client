import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { logOut } from "../../store/user/actions";
import Button from "react-bootstrap/Button";
import { selectUser } from "../../store/user/selectors";
import Nav from "react-bootstrap/Nav";
import NavbarItem from "./NavbarItem";
import { useParams } from "react-router-dom";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  //   const { id } = useParams()
  return (
    <>
      {/* <NavbarItem exact path={`/${user.id}`} linkText="My Space" /> */}
      <Nav.Item style={{ padding: ".5rem 1rem" }}>{user.firstName}</Nav.Item>
      {/* <Button onClick={() => dispatch(logOut())}>Logout</Button> */}
    </>
  );
}
