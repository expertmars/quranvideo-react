import React from "react";
import { url } from "socket.io-client/build/cjs/url";
import Modal from "../UI/Modal";
import ReactAudioPlayer from "react-audio-player";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import socketIO from "../hooks/socket";
import styled from "styled-components";
import Loading from "../UI/Loading";
import GlobalStyle from "./GlobalStyle";

import Tag from "../UI/Tag";

import { generateActions } from "../../store/generate-slice";

const AyahEditorModal = (props) => {
  const dispatch = useDispatch();

  const fromAyah = props.ayahs[1]; // 5
  const toAyah = props.ayahs[0]; // 10

  const [isPlaying, setIsPlaying] = useState(false);

  const [currentDuration, setCurrentDuration] = useState("00:00.00");
  const [totalDuration, setTotalDuration] = useState("00:00.00");

  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);

  const editingAyah = useSelector((state) => state.generate.ayahEditor[currentAyahIndex]);
  const splitTimes = editingAyah.splitTimes;

  const [step, setStep] = useState(0);

  // console.log(fromAyah, toAyah);

  useEffect(() => {
    console.log(editingAyah.splitTimes);
  }, [editingAyah.splitTimes]);

  const ayahNoHandler = (e) => {
    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");
    setCurrentAyahIndex(optionElementId);
    console.log(optionElementId);
  };

  const optionsList = [];

  let index = 0;
  for (let i = fromAyah; i <= toAyah; i++) {
    optionsList.push(
      <option value={i} id={index} key={i} className="form-list-item">
        {i}
      </option>
    );
    index++;
  }

  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m > 9 ? m : h ? "0" + m : m || "0", s > 9 ? s : "0" + s].filter((a) => a).join(":");
  }

  function player() {
    return document.getElementById("myAudio");
  }

  const onPlayHandler = (e) => {
    setCurrentDuration(e);
    const time = new Date(e * 1000).toISOString().substr(14, 8);
  };

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
    dispatch(
      generateActions.updateAyahEditor({ task: "updateSplitTime", value: currentDuration, index: currentAyahIndex })
    );
  };

  const resetSplit = () => {
    // dispatch(generateActions.updateAyahEditor({ task: "resetSplitTimes", index: currentAyahIndex }));
    dispatch(generateActions.resetAllSplit({ index: currentAyahIndex }));
  };

  const onNextStepHandler = () => {
    let currentTag;

    if (step === 1) {
    } else if (step === 2) {
    } else if (step === 3) {
    } else {
      console.log("step 0 detected");
    }

    if (step === 3) {
      dispatch(generateActions.updateAyahEditor({ task: "IncreaseSplitCount", index: currentAyahIndex }));
      return setStep(0);
    }

    setStep((state) => state + 1);
  };

  const onPreviousStepHandler = () => {
    setStep((state) => state - 1);
  };

  const pagenum = `${editingAyah.page}`.padStart(3, "0");

  return (
    <React.Fragment>
      {<Loading />}

      <Modal modalClass={"progresspopup ayahEditorPopup"} onClose={props.onClose}>
        <div className="progressBox">
          <h4 className="progressBox__text">AYAH EDITOR</h4>
          {step === 0 && (
            <>
              <div className="form-group">
                <label htmlFor="ayahNo" className="form-label">
                  Select the ayah to edit
                </label>
                <select className="form-list" name="ayahNo" onChange={ayahNoHandler}>
                  {optionsList}
                </select>
              </div>

              <div className="ayahPlayer">
                <button className="btn" onClick={isPlaying ? pauseAudio : playAudio}>
                  {isPlaying ? "Pause" : "Play"}
                </button>
                <button className="btn" onClick={onSplit}>
                  Split
                </button>

                {splitTimes.length > 0 && (
                  <button className="btn" onClick={resetSplit}>
                    Reset All Split
                  </button>
                )}
                <div className="slider">
                  {splitTimes && (
                    <div className="markerdiv">
                      {splitTimes.map((splittime) => (
                        <div className="marker" style={{ left: (splittime / totalDuration) * 100 + "%" }}></div>
                      ))}
                    </div>
                  )}

                  <input
                    type="range"
                    className="audioslider"
                    min="0"
                    max={totalDuration * 10}
                    onChange={rangeChangeHandler}
                    value={currentDuration * 10}></input>
                </div>
                {!editingAyah.splitTimes[editingAyah.splitCount] && <p>Current Time: {currentDuration}</p>}

                {editingAyah.splitTimes[editingAyah.splitCount] && (
                  <p>Spliting At: {editingAyah.splitTimes[editingAyah.splitCount]}</p>
                )}

                {/* <audio
            src="https://upload.wikimedia.org/wikipedia/commons/1/15/Bicycle-bell.wav"
            type="audio/ogg"
            controls
            autoPlay
          /> */}
                <ReactAudioPlayer
                  className="react-player"
                  id="myAudio"
                  src={editingAyah.audio}
                  onListen={onPlayHandler}
                  onPlay={onPlayerPlay}
                  onPause={onPlayerPause}
                  listenInterval={10}
                  autoPlay
                  onLoadedMetadata={onAudioFileLoaded}
                  controls
                  hidden
                />
              </div>
            </>
          )}

          {/* ============================================================================================ */}
          {/* ============================
          
          arab = [
            ['aya','h 1'],
            ['ayah 2'],
            ['ayah 3'],

          ]
          
          ====================================== */}
          {/* ============================================================================================ */}

          <div>
            {step === 1 && (
              <>
                <h3>Arabic</h3>
                <Tag
                  defaultTags={editingAyah.arab}
                  page={pagenum}
                  arabic={true}
                  currentIndex={currentAyahIndex}
                  mode="arab"
                />
              </>
            )}

            {step === 2 && (
              <>
                <h3>English</h3>

                <Tag defaultTags={editingAyah.eng} arabic={false} currentIndex={currentAyahIndex} mode="english" />
              </>
            )}

            {step === 3 && (
              <>
                <h3>Local - Malayalam</h3>
                <Tag defaultTags={editingAyah.local} currentIndex={currentAyahIndex} arabic={false} mode="local" />
              </>
            )}
            {editingAyah.splitTimes[editingAyah.splitCount] && (
              <>
                {step >= 1 && (
                  <button className="btn" onClick={onPreviousStepHandler}>
                    Back
                  </button>
                )}
                <button className="btn" onClick={onNextStepHandler}>
                  Next
                </button>
              </>
            )}
          </div>
        </div>
      </Modal>
      <GlobalStyle />
    </React.Fragment>
  );
};

export default AyahEditorModal;
