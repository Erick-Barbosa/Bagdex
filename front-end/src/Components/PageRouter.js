import React, { useEffect, useState }  from "react";
import { Routes, Route } from "react-router-dom";
import Bagdex from "./Bagdex";
import Login from "./Login"

import AuthService from "../Services/AuthService";
import Logout from "./Logout";

export default function PageRouter(props) {
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
      <Route path='/'
      element={
          <Bagdex text={"Logout"}/>
      }/>
    ) : 
    (
      <Route path='/'
      element={
        <Bagdex text={"Login"}/>
    }/>
    )}

      <Route path="/login"
        element={<Login/>}
      />

      <Route path="/logout"
        element={<Logout/>}
      />

    </Routes>
  )

}
