import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox/MessageBox";
import HomePage from "../src/pages/Home/HomePage";
import Login from "../src/pages/Login/Login";
import SignUp from "../src/pages/Signup/Signup";
import MyProfile from "../src/pages/MyProfile/MyProfile";
import Explore from "../src/pages/Explore/Explore";
import Reviews from "../src/pages/Reviews/Reviews";
import LibraryDetails from "./components/LibraryDetails/LibraryDetails";
import WishlistDetails from "./components/WishlistDetails/WishlistDetails";
import LibraryItemDetails from "./components/LibraryItemDetails/LibraryItemDetails";
import WishlistItemDetails from "./components/WishlistItemDetails/WishlistItemDetails";
import FavouritesItemDetails from "./components/FavouritesItemDetails/FavouritesItemDetails";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ProfileLibraryDetails from "./components/ProfileLibraryDetails/ProfileLibraryDetails";
import ProfileWishlistDetails from "./components/ProfileWishlistDetails/ProfileWishlistDetails";
import { selectToken, selectUser } from "./store/user/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import { fetchReviews } from "./store/reviews/actions";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);
  const user = useSelector(selectUser);
  const userWithToken = useSelector(selectToken);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchReviews);
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/explore" component={Explore} />
        <Route exact path="/reviews" component={Reviews} />
        <Route exact path="/my-profile/:userId" component={MyProfile} />
        <Route exact path="/profiles/:userId" component={ProfilePage} />
        <Route
          exact
          path="/profiles/:userId/favourites/:itemId"
          component={FavouritesItemDetails}
        />
        <Route
          exact
          path="/profiles/:userId/library/:categoryName/:itemId"
          component={LibraryItemDetails}
        />
        <Route
          exact
          path="/profiles/:userId/wishlist/:categoryName/:itemId"
          component={WishlistItemDetails}
        />
        <Route
          exact
          path="/profiles/:userId/library/:categoryName"
          component={ProfileLibraryDetails}
        />
        <Route
          exact
          path="/profiles/:userId/wishlist/:categoryName"
          component={ProfileWishlistDetails}
        />
        <Route
          exact
          path="/my-profile/:userId/library/:categoryName/:itemId"
          component={LibraryItemDetails}
        />
        <Route
          exact
          path="/my-profile/:userId/wishlist/:categoryName/:itemId"
          component={WishlistItemDetails}
        />
        <Route
          exact
          path="/my-profile/:userId/favourites/:itemId"
          component={FavouritesItemDetails}
        />
        <Route
          exact
          path="/favourites/:itemId"
          component={FavouritesItemDetails}
        />
        <Route
          exact
          path="/my-profile/:userId/library/:categoryName"
          component={LibraryDetails}
        />
        <Route
          exact
          path="/my-profile/:userId/wishlist/:categoryName"
          component={WishlistDetails}
        />
      </Switch>
    </div>
  );
}

export default App;
