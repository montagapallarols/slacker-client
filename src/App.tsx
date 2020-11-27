import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "../src/pages/Home/HomePage";
import Login from "../src/pages/Login/Login";

import { useDispatch, useSelector } from "react-redux";

function App() {
  return (
    <div className="App">
      <Navigation />
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
