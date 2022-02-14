import React from "react";
import Modal from "../UI/Modal";
import { BACKEND_URL } from "../../config";
import { ProgressBar, Button } from "react-bootstrap";
import socketIO from "../hooks/socket";

import { uiActions } from "../../store/ui-slice";

import { useSelector } from "react-redux";

import { useState } from "react";
import { useDispatch } from "react-redux";

import classes from "./ProgressModal.module.scss";

const ProgressModal = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [now, setNow] = useState(0);
  const [status, setStatus] = useState("Initializing the connection");

  var socket = socketIO.get();

  console.log("VERYFUNNY");

  socket.on("onUpdateProgress", (data) => {
    console.log(data);
    setNow(data);
  });

  socket.on("onUpdateProgressText", (statusText) => {
    console.log(statusText);
    setStatus(statusText);
  });

  const onClickDownload = () => {
    window.open(BACKEND_URL + "/download?uid=" + userData.uId, "_blank");
  };

  const onCloseHandler = () => {
    dispatch(uiActions.hideProgressModal());
  };

  return (
    <Modal modalClass={classes.progress__popup} onClose={onCloseHandler}>
      <div className={classes.progressBox}>
        <h4 className={classes.progressBox__text}>{status}</h4>
        <div className={classes.progressBar}>
          <ProgressBar
            variant={now === 0 ? "warning" : "success"}
            animated
            label={`${now}%`}
            now={now === 0 ? 100 : now}
          />
        </div>

        {status === "Video processed successfully" && <button onClick={onClickDownload}>Download</button>}
      </div>
    </Modal>
  );
};

export default ProgressModal;
