import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";
import TaskPage from "./pages/TaskPage";
import ChatPage from "./pages/ChatPage";
// import RepairPage from "./pages/RepairPage";
import AdminPage from "./pages/AdminPage";
import OrderPage from "./pages/OrderPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => (
  <BrowserRouter>
    <div>
        <Switch>
          <Route exact path="/" component={WelcomePage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/tasks" component={TaskPage}/>
          <Route path="/chat" component={ChatPage}/>
          <Route path="/orders" component={OrderPage}/>
          <Route path="/admin" component={AdminPage}/>
          <Route component={NotFoundPage}/>
        </Switch>
    </div>
  </BrowserRouter>
);

export default App;