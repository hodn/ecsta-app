import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { testComponent } from './testComponent';

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={testComponent} />
        <Route path="/login/" component="" />
        <Route path="/signup" component="" />
        <Route path="/user" component="" />
      </div>
    </Router>
  );
}

export default App;