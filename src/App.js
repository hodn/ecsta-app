import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SignInView } from './Views/SignInView';
import { SignUpView } from './Views/SignUpView';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={SignInView} />
        <Route path="/signin/" component={SignInView} />
        <Route path="/signup/" component={SignUpView} />
      </Switch>
    </Router>
  );
}

export default App;