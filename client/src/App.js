import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";
import TaskPage from "./pages/TaskPage";
import ChatPage from "./pages/ChatPage";
import RepairPage from "./pages/RepairPage";

const App = () => (
  <Router>
    <div>
      <div>
        <Route exaxt path="/" component={WelcomePage}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/tasks" component={TaskPage}/>
        <Route exact path="/chat" component={ChatPage}/>
        <Route exact path="/repair" component={RepairPage}/>
      </div>
    </div>
  </Router>
);

export default App;
