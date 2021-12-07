import React, { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router";
import openSocket from "socket.io-client";

// Page
import Home from "./components/Pages/Home";
import Generate from "./components/Pages/Generate";

const App = () => {
  useEffect(() => {
    var socket = openSocket("http://localhost:3000", { transports: ["websocket"] });
    socket.emit("join", { email: "mubarak@gmail.com" });

    socket.on("generate", (data) => {
      console.log(data);
    });
  }, []);

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
