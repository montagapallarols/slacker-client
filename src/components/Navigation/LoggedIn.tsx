import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/actions";
import Button from "react-bootstrap/Button";
import { selectToken, selectUser } from "../../store/user/selectors";
import Nav from "react-bootstrap/Nav";
import NavbarItem from "./NavbarItem";
import { useHistory } from "react-router-dom";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (!token) {
      history.push("/");
    }
  }, [token, history]);

  return (
    <>
      <NavbarItem path={`/my-profile/${user.id}`} linkText="My Profile" />
      <Nav.Item style={{ padding: ".5rem 1rem" }}>{user.firstName}</Nav.Item>
      <Button variant="dark" onClick={() => dispatch(logOut())}>
        Logout
      </Button>
    </>
  );
}
