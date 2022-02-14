import React from "react";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import classes from "./Upload.module.css";

import { generateActions } from "../../store/generate-slice";
import { useDispatch } from "react-redux";
import Button from "./Button";

const Upload = (props) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const [url, setURL] = useState();
  const [err, setErr] = useState([]);

  const [ok, setOK] = useState(false);

  const watermarkHandler = (e) => {
    e.preventDefault();

    if (!file) {
      setErr("No file selected");
      setOK(false);
      return;
    }

    let formData = new FormData();

    formData.append("uid", props.uid);
    formData.append("watermark", file);

    axios.post(BACKEND_URL + "/watermark", formData).then(
      (res) => {
        if (res.status === 200) {
          setErr([]);
          setOK(true);
          setFile();
          dispatch(generateActions.updateCustomLogo({ status: true }));
        }
      },
      (err) => {
        setErr(err.response.statusText);
      } //setErr(err)
    );
  };

  const onWaterChange = (event) => {
    setFile((state) => {
      let selected = event.target.files[0];
      if (selected) {
        setURL(URL.createObjectURL(selected));

        return selected;
      }
      return state;
    });
  };

  const removeImageHandler = (e) => {
    e.preventDefault();

    setErr([]);
    setOK(false);
    setURL();
    setFile();
    dispatch(generateActions.updateCustomLogo({ status: false }));
  };

  return (
    <form>
      <div className={classes["form-group"]}>
        {err.length > 0 && (
          <div class={classes.err} onClick={() => setErr([])}>
            {err}
          </div>
        )}
        {ok && <div class={classes.success}>Success</div>}

        <label htmlFor="chooseOwnWatermark" className={classes["form-choose"]}>
          {(url && (
            <div>
              <img height="50" src={url} />
            </div>
          )) ||
            "Logo"}
        </label>
        <input type="text" name="uid" value={props.uid} hidden />
        <input
          type="file"
          id="chooseOwnWatermark"
          name="watermark"
          className={classes["form-input-file"]}
          onChange={onWaterChange}
        />
        {/* <a href="#file-choose" id="uploadFile" class="form-choose"
        >Choose a file</a
      > */}
        <Button onClick={ok != true ? watermarkHandler : removeImageHandler}>{ok != true ? "Upload" : "Reset"}</Button>
      </div>
    </form>
  );
};

export default Upload;
