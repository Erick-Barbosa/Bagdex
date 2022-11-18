import React, { useEffect, useState }  from "react";
import { Routes, Route } from "react-router-dom";
import Bagdex from "./Bagdex";
import Login from "./Login"

import AuthService from "../Services/AuthService";

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
          <Bagdex text={"Logout"} logged={true}/>
      }/>
    ) : 
    (
      <Route path='/'
      element={
        <Bagdex text={"Login"} logged={false}/>
    }/>
    )}

    <Route path="/login"
      element={<Login></Login>}
    />

    </Routes>
  )

}
