import React from 'react';
import './CSS/App.css';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import Landing from "./Landing";
import Main from "./Main";
import Rating from "./Rating";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/Main">
            <Main />
          </Route>
          <Route path="/Rating">
            <Rating />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}



export default App;
