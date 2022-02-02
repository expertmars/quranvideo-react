import React from "react";
import Modal from "../UI/Modal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../config";
import ReactAudioPlayer from "react-audio-player";
import GlobalStyle from "./GlobalStyle";

import { generateActions } from "../../store/generate-slice";

import axios from "axios";
import { useDispatch } from "react-redux";

const CustomAudioModal = (props) => {
  const dispatch = useDispatch();

  const uid = useSelector((state) => state.auth.userData.uId);
  const ayahEditor = useSelector((state) => state.generate.ayahEditor);

  const fromAyah = props.ayahs[1]; // 5
  const toAyah = props.ayahs[0]; // 10

  let ayahCount = toAyah - fromAyah;

  const [file, setFile] = useState();
  const [url, setURL] = useState();
  const [splitTimes, setSplitTimes] = useState([]);

  const [error, setError] = useState(null);
  const [currentDuration, setCurrentDuration] = useState("00:00.00");
  const editForm = useSelector((state) => state.generate.editForm);

  const [isPlaying, setIsPlaying] = useState(false);
  const [totalDuration, setTotalDuration] = useState("00:00.00");

  const onPlayHandler = (e) => {
    setCurrentDuration(e);
    const time = new Date(e * 1000).toISOString().substr(14, 8);
  };
  function player() {
    return document.getElementById("myAudio");
  }

  const onPlayerPlay = (e) => {
    setIsPlaying(true);
  };

  const onPlayerPause = (e) => {
    setIsPlaying(false);
  };

  const onAudioFileLoaded = (e) => {
    var x = player().duration;
    setTotalDuration(x);
  };
  const rangeChangeHandler = (e) => {
    console.log(e.target.value);
    player().currentTime = e.target.value / 10;
    setCurrentDuration(e.target.value / 10);
  };

  const playAudio = () => {
    player().play();
  };
  const pauseAudio = () => {
    player().pause();
  };

  const onSplit = () => {
    player().pause();
    setSplitTimes((state) => [...state, currentDuration]);
  };

  const resetSplit = () => {
    setSplitTimes([]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please choose a file");
      return;
    }

    let formData = new FormData();

    formData.append("uid", uid);
    formData.append("audio", file);
    // appending the duration as the last split.
    formData.append("splitTimes", [...splitTimes, totalDuration]);

    axios.post(BACKEND_URL + "/upload-audio", formData).then(
      (res) => {
        if (res.status === 200) {
          setFile();
          setError(null);

          dispatch(generateActions.updateCustomAyahAudio({ uid: uid }));
        }
      },
      (err) => setError(err.response.statusText)
    );
  };

  const uploadAudioChangeHandler = (e) => {
    let selected = e.target.files[0];
    setFile(selected);

    setURL(URL.createObjectURL(selected));
    // setUploadAudioValue(file);
  };

  return (
    <>
      <Modal modalClass="progresspopup ayahEditorPopup" onClose={props.onClose}>
        <div>
          <h2>You need select a audio with {ayahCount + 1} ayahs to split</h2>
          <form className="progressBox">
            {error !== null && <p>{error}</p>}
            <label htmlFor="uploadaudio">Upload .mp3 File</label>
            <input
              type="file"
              className="form-input-file"
              name="uploadaudio"
              id="uploadaudio"
              // value={uploadAudioValue}
              onChange={uploadAudioChangeHandler}
            />
          </form>{" "}
          <h1>Player</h1>
          {url != null && (
            <div className="ayahPlayer">
              <div className="slider">
                <div className="markerdiv">
                  {splitTimes.map((splittime) => (
                    <div className="marker" style={{ left: (splittime / totalDuration) * 100 + "%" }}>
                      {splittime.toFixed(2)}s
                    </div>
                  ))}
                </div>
                <input
                  type="range"
                  className="audioslider"
                  min="0"
                  max={totalDuration * 10}
                  onChange={rangeChangeHandler}
                  value={currentDuration * 10}
                />
              </div>

              <ReactAudioPlayer
                className="react-player"
                id="myAudio"
                src={url}
                onListen={onPlayHandler}
                onPlay={onPlayerPlay}
                onPause={onPlayerPause}
                listenInterval={10}
                autoPlay
                onLoadedMetadata={onAudioFileLoaded}
                controls
                // hidden
              />

              <button className="btn" onClick={isPlaying ? pauseAudio : playAudio}>
                {isPlaying ? "Pause" : "Play"}
              </button>
              {splitTimes.length < ayahCount && (
                <button className="btn" onClick={onSplit}>
                  Split
                </button>
              )}
              {splitTimes.length > 0 && (
                <button className="btn" onClick={resetSplit}>
                  Reset All Split
                </button>
              )}
              <br />
              {splitTimes.length >= ayahCount && (
                <div>
                  <button className="btn" onClick={submitHandler}>
                    Submit
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
      <GlobalStyle />
    </>
  );
};

export default CustomAudioModal;
