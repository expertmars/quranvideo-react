import React, { Fragment } from "react";
import { Routes, Route } from "react-router";

// Page
import Home from "./components/Pages/Home";
import Generate from "./components/Pages/Generate";
import SignInPage from "./components/Pages/SignIn";

const App = () => {
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
