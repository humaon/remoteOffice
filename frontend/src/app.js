import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Tables from "views/admin/Tables";
import CardTable from "components/Cards/CardTable";
import Uploader from "views/admin/Uploader";

export function App() {
  // localStorage.setItem("user", JSON.stringify({ role: "admin" }));
  const user = JSON.parse(localStorage.getItem("user") || null);
  console.log(user);
  if (user?.role === "admin") {
    return (
      <BrowserRouter>
        <Switch>
          {/* add routes with layouts */}
          <Route exact path="/admin" component={Admin} />
          <Route path="/auth" component={Auth} />
          {/* add routes without layouts */}
          <Route path="/landing" component={Landing} />
          <Route path="/profile" component={Profile} />
          <Route path="/admin/tables" exact component={Tables} />
          <Route path="/admin/edit/:id" exact component={Uploader} />
          {/* <Route path="/admin/users" component={CardTable} /> */}
          {/* <Route path="/doc" exact component={ShowDoc} /> */}

          {/* add redirect for first page */}
          <Redirect from="*" to="/auth/login" />
        </Switch>
      </BrowserRouter>
    );
  } else if (user?.role === "user") {
    return (
      <BrowserRouter>
        <Switch>
          {/* add routes with layouts */}
          <Route path="/auth" component={Auth} />
          <Route path="/profile" component={Profile} />
          <Redirect from="*" to="/auth/login" />
        </Switch>
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Redirect from="*" to="/auth/login" />
      </Switch>
    </BrowserRouter>
  );
}
