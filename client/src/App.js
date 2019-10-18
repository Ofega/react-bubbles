import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import PrivateRoute from "./components/PrivateRoute";
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/login" render={props => <Login {...props} />} />
        <PrivateRoute exact path="/" component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
