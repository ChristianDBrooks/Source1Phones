import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import TaskPage from "./pages/TaskPage";
import ChatPage from "./pages/ChatPage";
import RepairPage from "./pages/RepairPage";

const App = () => (
  <Router>
    <div>
      <div>
        <Route exact path="/" component={LoginPage}/>
      </div>
      <div>
        <Route exact path="/about" component={AboutPage}/>
        <Route exact path="/tasks" component={TaskPage}/>
        <Route exact path="/chat" component={ChatPage}/>
        <Route exact path="/repair" component={RepairPage}/>
      </div>
    </div>
  </Router>
);

export default App;
