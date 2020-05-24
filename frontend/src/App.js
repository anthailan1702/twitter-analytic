import React from 'react';
import './style/App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LocationMap from './components/LocationMap';
import LocationGraph from './components/LocationGraph';
import TimeGraph from './components/TimeGraphs';
import Heatmap from './components/Heatmap';
import { NavBar } from './components/NavBar';

function App() {

  return (
    <React.Fragment>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/location">
            <LocationMap />
          </Route>
          <Route path="/time">
            <TimeGraph />
          </Route>
          <Route path="/heatmap">
            <Heatmap />
          </Route>
          <Route path="/">
            <LocationGraph />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
