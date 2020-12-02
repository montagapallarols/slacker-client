import React from "react";
import "./ProfileCard.css";
import { useSelector } from "react-redux";
import { selectAllProfiles } from "../../store/profiles/selectors";
import { selectAllListItems } from "../../store/listItems/selectors";
import { selectUser, selectToken } from "../../store/user/selectors";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function ProfileCard() {
  const allProfiles = useSelector(selectAllProfiles);
  const allListItems = useSelector(selectAllListItems);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  return (
    <div>
      {allProfiles?.map((p: any) => {
        return (
          <div key={p.id} className="profile-card">
            <h3>{`${p.firstName} ${p.lastName}`}</h3>
            <img src={p.imageUrl} height="100px" />
            <br></br>
            <em>
              <p>
                {p.lists.map((list: any) => {
                  return list.type === "Favourites" ? (
                    <strong key={list.id}>
                      {`${p.firstName}'s`} {list.type}
                    </strong>
                  ) : null;
                })}
              </p>
            </em>
            {allListItems?.map((list: any) => {
              return list.list.type === "Favourites" &&
                list.list.profileId === p.id ? (
                <div key={list.item.id}>
                  {/* <p>{list.item.name}</p> */}
                  <img src={list.item.poster} alt="poster" height="100px" />
                </div>
              ) : null;
            })}
            {token && p.userId === user.id ? (
              <Link to={`/my-profile/${p.userId}`} className="link">
                <Button variant="outline-dark">View Profile</Button>
              </Link>
            ) : (
              <Link to={`/profiles/:userId`} className="link">
                <Button variant="outline-dark">View Profile</Button>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
