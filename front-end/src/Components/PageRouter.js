import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Bagdex from "./Bagdex";
import PageLogin from "./PageLogin"
import Logout from "./Logout";
import PageUser from "./PageUser";
import PageDailyBagmon from "./PageDailyBagmon";

import AuthService from "../Services/AuthService";
import PageListUser from "./PageListUser";

export default function PageRouter() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <Routes>
      {currentUser ? (
        [
          <Route path='/'
            element={
              <Bagdex text={"Logout"} isLogged={true} />
            } />,
          <Route path='/user'
            element={
              <PageUser text={"Logout"} isLogged={true} />
            } />,
          <Route path='/dailyBagmon'
              element={
                <PageDailyBagmon text={"Logout"} isLogged={true} />
              } />,
          <Route path='/listUser'
              element={
                <PageListUser text={"Logout"} isLogged={true} />
              } />,
        ]) :
        (
          [
            <Route path='/'
              element={
                <Bagdex text={"Login"} isLogged={false} />
              } />,
            <Route path='/user'
              element={
                <PageUser text={"Login"} isLogged={false} />
              } />,
            <Route path='/dailyBagmon'
              element={
                <PageDailyBagmon text={"Login"} isLogged={false} />
              } />,
            <Route path='/listUser'
              element={
                <PageListUser text={"Login"} isLogged={false} />
              } />
          ]
        )
      }

      <Route path="/login"
        element={<PageLogin backTo={"/"} />}
      />

      <Route path="/user/login"
        element={<PageLogin backTo={"/user"} />}
      />

      <Route path="/dailyBagmon/login"
        element={<PageLogin backTo={"/dailyBagmon"} />}
      />

      <Route path="/listUser/login"
        element={<PageLogin backTo={"/dailyBagmon"} />}
      />

      <Route path="/logout"
        element={<Logout />}
      />

      <Route path="/user/logout"
        element={<Logout />}
      />

      <Route path="/dailyBagmon/logout"
        element={<Logout backTo={"/dailyBagmon"} />}
      />

      <Route path="/listUser/logout"
        element={<Logout backTo={"/dailyBagmon"} />}
      />

    </Routes>
  )

}
