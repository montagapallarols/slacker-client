import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import { useDispatch, useSelector } from "react-redux";

function App() {
  return (
    <div className="App">
      <Navigation />
      {/* <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/explore" component={Explore} />
        <Route exact path="/explore" component={Reviews} />
        <Route path="/profiles/:userId" component={ProfilePage} />
        <Route path="/:userId" component={MyProfile} />
      </Switch> */}
    </div>
  );
}

export default App;
