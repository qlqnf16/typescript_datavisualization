import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./routes/Home";
import PersonDetail from "./routes/PersonDetail";

const App: React.FC = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/person/:personId" component={PersonDetail} />
      </Switch>
    </div>
  </Router>
);

export default App;
