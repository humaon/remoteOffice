import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Files from "views/admin/Files.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import Uploader from "views/admin/Uploader.js";
import Tables from "views/admin/Tables.js";
import Explorer from "views/admin/Explorer";
import PDFViewer from "views/admin/PDFViewer";
import DOCViewer from "views/admin/DOCViewer";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="w-full px-4 mx-auto -m-24 md:px-10">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/maps" exact component={Maps} />
            <Route path="/admin/settings" exact component={Settings} />
            {/* <Route path="/admin/edit/:id" exact component={Uploader} /> */}
            {/* <Route path="/admin/tables" exact component={Tables} /> */}
            <Route path="/admin/files" exact component={Files} />
            <Route path="/admin/explorer" exact component={Explorer} />
            <Route path="/admin/viewer" exact component={PDFViewer} />
            <Route path="/admin/doc" exact component={DOCViewer} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
