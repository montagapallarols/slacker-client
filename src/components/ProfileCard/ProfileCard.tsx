import React, { useEffect } from "react";
import "./ProfileCard.css";
import { useSelector, useDispatch } from "react-redux";
import { selectAllProfiles } from "../../store/profiles/selectors";
import { selectAllListItems } from "../../store/listItems/selectors";
import { selectUser, selectToken } from "../../store/user/selectors";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchProfiles } from "../../store/profiles/actions";
// import { fetchListItems } from "../../store/listItems/actions";

export default function ProfileCard() {
  const dispatch = useDispatch();
  const allProfiles = useSelector(selectAllProfiles);
  const allListItems = useSelector(selectAllListItems);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  return (
    <div className="profile-list">
      {allProfiles?.map((p: any) => {
        return (
          <Card style={{ width: "18rem", margin: "30px" }} key={p.id}>
            <Card.Img
              variant="top"
              src={p.imageUrl}
              height="180px"
              width="171px"
            />

            <Card.Body>
              <Card.Title>{`${p.firstName} ${p.lastName}`}</Card.Title>
              <Card.Text></Card.Text>
              <em>
                <p>
                  {p.lists?.map((list: any) => {
                    return list.type === "Favourites" ? (
                      <strong key={list.id}>{list.type}</strong>
                    ) : null;
                  })}
                </p>
              </em>
              <div className="card-list">
                {allListItems?.map((list: any) => {
                  return list.list?.type === "Favourites" &&
                    list.list?.profileId === p.id ? (
                    <div key={list.item?.id} className="card-item">
                      <img
                        src={list.item?.poster}
                        alt="poster"
                        height="100px"
                      />
                    </div>
                  ) : null;
                })}
              </div>
              {token && p.userId === user?.id ? (
                <Link to={`/my-profile/${p.userId}`} className="link">
                  <Button variant="info">View Profile</Button>
                </Link>
              ) : (
                <Link to={`/profiles/${p.userId}`} className="link">
                  <Button variant="info">View Profile</Button>
                </Link>
              )}
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}

//   <div key={p.id}>
//     <div className="profile-card">
//       <h3 className="profile-user">{`${p.firstName} ${p.lastName}`}</h3>
//       <div className="profile-card-image">
//         <img src={p.imageUrl} height="180px" width="171px" />
//       </div>
//       <p></p>
//       <em>
//         <p>
//           {p.lists.map((list: any) => {
//             return list.type === "Favourites" ? (
//               <strong key={list.id}>{list.type}</strong>
//             ) : null;
//           })}
//         </p>
//       </em>
//       <div className="card-list">
//         {allListItems?.map((list: any) => {
//           return list.list?.type === "Favourites" &&
//             list.list?.profileId === p.id ? (
//             <div key={list.item?.id} className="card-item">
//               {/* <p>{list.item.name}</p> */}
//               <img
//                 src={list.item?.poster}
//                 alt="poster"
//                 height="100px"
//               />
//             </div>
//           ) : null;
//         })}
//       </div>
//       {token && p.userId === user?.id ? (
//         <Link to={`/my-profile/${p.userId}`} className="link">
//           <Button variant="outline-dark">View Profile</Button>
//         </Link>
//       ) : (
//         <Link to={`/profiles/${p.userId}`} className="link">
//           <Button variant="outline-dark">View Profile</Button>
//         </Link>
//       )}
//     </div>
//   </div>
