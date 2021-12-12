import React from "react";
import Modal from "../UI/Modal";
import { ProgressBar, Button } from "react-bootstrap";
import socketIO from "../hooks/socket";

import { useState } from "react";

const ProgressModal = () => {
  const [now, setNow] = useState(0);
  const [status, setStatus] = useState("Initializing the connection");

  var socket = socketIO.get();

  socket.on("onUpdateProgress", (data) => {
    console.log(data);
    setNow(data);
  });

  socket.on("onUpdateProgressText", (statusText) => {
    console.log(statusText);
    setStatus(statusText);
  });

  return (
    <Modal modalClass={"progresspopup"}>
      <div className="progressBox">
        <h4 className="progressBox__text">{status}</h4>
        <div className="progressBar">
          <ProgressBar variant="success" animated label={`${now}%`} now={now} />
        </div>

        <Button variant="danger">Danger</Button>
      </div>
    </Modal>
  );
};

export default ProgressModal;
