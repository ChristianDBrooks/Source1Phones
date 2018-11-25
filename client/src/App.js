import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";
import TaskPage from "./pages/TaskPage";
import ChatPage from "./pages/ChatPage";
// import RepairPage from "./pages/RepairPage";
import AdminPage from "./pages/AdminPage";
import OrderPage from "./pages/OrderPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => (
  <Router>
    <div>
      <div>
        <Switch>
          <Route exact path="/" component={WelcomePage}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/tasks" component={TaskPage}/>
          <Route exact path="/chat" component={ChatPage}/>
          {/* <Route exact path="/repair" component={RepairPage}/> */}
          <Route exact path="/orders" component={OrderPage}/>
          <Route exact path="/admin" component={AdminPage}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
