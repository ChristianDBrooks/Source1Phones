import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import AboutPage from "./pages/AboutPage";
import TaskPage from "./pages/TaskPage";
import ChatPage from "./pages/ChatPage";
import RepairPage from "./pages/RepairPage";

const App = () => (
  <Router>
    <div>
      <NavBar />
      <Route exact path="/" component={AboutPage}/>
      <Route exact path="/tasks" component={TaskPage}/>
      <Route exact path="/chat" component={ChatPage}/>
      <Route exact path="/repair" component={RepairPage}/>
    </div>
  </Router>
);

export default App;
