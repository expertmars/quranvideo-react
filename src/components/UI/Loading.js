import React from "react";
import classes from "./Loading.module.css";
import Modal from "./Modal";

const Loading = () => {
  return (
    <Modal modalClass={"loadingPopup"}>
      <h1>Loading</h1>
    </Modal>
  );
};

export default Loading;
