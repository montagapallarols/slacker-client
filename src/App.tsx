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
import { selectToken } from "./store/user/selectors";
import { getUserWithStoredToken } from "./store/user/actions";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);
  const userWithToken = useSelector(selectToken);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/signup" component={SignUp} />
        <Route exact path="/explore" component={ExplorePage} />
        <Route exact path="/explore" component={ReviewsPage} />
        <Route path="/profiles/:userId" component={ProfilePage} />
        <Route path="/:userId" component={MyProfile} /> */}
      </Switch>
    </div>
  );
}

export default App;
