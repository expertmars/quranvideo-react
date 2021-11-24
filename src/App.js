import React, { Fragment } from "react";
import { Routes, Route, Link } from "react-router";

// Page
import Home from "./components/Pages/Home";
import Generate from "./components/Pages/Generate";

const App = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
      </Routes>
    </Fragment>
  );
};

export default App;
