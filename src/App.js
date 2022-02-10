import React, { Fragment } from "react";
import { Routes, Route } from "react-router";
import { authActions } from "./store/auth-slice";

// Page
import Home from "./components/Pages/Home";
import Generate from "./components/Pages/Generate";
import SignInPage from "./components/Pages/SignIn";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(authActions.getUserData());
  // });

  // if (useS !== null) {
  //   const expiry = new Date(userData.expireOn);
  //   const timenow = new Date();
  //   if (timenow > expiry) {
  //     // userData = null;
  //   }
  // }

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
    </Fragment>
  );
};

export default App;
