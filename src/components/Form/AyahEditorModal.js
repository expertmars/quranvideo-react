import React from "react";
import { url } from "socket.io-client/build/cjs/url";
import Modal from "../UI/Modal";
import ReactAudioPlayer from "react-audio-player";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import socketIO from "../hooks/socket";
import styled from "styled-components";
import Loading from "../UI/Loading";
import GlobalStyle from "./GlobalStyle";

import Tag from "../UI/Tag";

import { createGlobalStyle } from "styled-components";
import { current } from "@reduxjs/toolkit";

const AyahEditorModal = (props) => {
  const fromAyah = props.ayahs[1]; // 5
  const toAyah = props.ayahs[0]; // 10

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00.00");
  const [splittingCount, setSplittingCount] = useState(0);
  const [splittingTimes, setSplittingTimes] = useState([]);
  const [currentDuration, setCurrentDuration] = useState("00:00.00");
  const [totalDuration, setTotalDuration] = useState("00:00.00");

  const engTrans = useSelector((state) => state.generate.engTrans);
  const localTrans = useSelector((state) => state.generate.localTrans);
  const glyph = useSelector((state) => state.generate.listOfAyah);
  const ayahAudios = useSelector((state) => state.generate.ayahAudios);

  const [step, setStep] = useState(0);

  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);

  // console.log(fromAyah, toAyah);

  useEffect(() => {
    console.log(splittingTimes);
  }, [splittingTimes]);

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
    setCurrentTime(time);
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
    setSplittingTimes((prevState) => {
      const copiedArray = [...prevState];
      copiedArray[splittingCount] = currentDuration;
      return copiedArray;
    });

    /* 
      [
        {
        currentTime: 00:22.23
        currentDuration: 2.32432
      },
      {
        currentTime: 00:22.23
        currentDuration: 2.32432
      }
    ]

    */
  };

  const resetSplit = () => {
    setSplittingTimes([]);
  };

  const onNextStepHandler = () => {
    if (step === 3) {
      setSplittingCount((count) => count + 1);
      return setStep(0);
    }
    setStep((state) => state + 1);
  };

  const onPreviousStepHandler = () => {
    setStep((state) => state - 1);
  };

  const pagenum = `${Object.values(glyph)[currentAyahIndex]}`.padStart(3, "0");
  console.log("ayahaydi", ayahAudios, glyph);
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
                {splittingTimes.length > 0 && (
                  <button className="btn" onClick={resetSplit}>
                    Reset Split
                  </button>
                )}
                <div className="slider">
                  {splittingTimes && (
                    <div className="markerdiv">
                      {splittingTimes.map((splittime) => (
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
                {!splittingTimes[splittingCount] && <p>Current Time: {currentDuration}</p>}

                {splittingTimes[splittingCount] && <p>Spliting At: {splittingTimes[splittingCount]}</p>}

                {/* <audio
            src="https://upload.wikimedia.org/wikipedia/commons/1/15/Bicycle-bell.wav"
            type="audio/ogg"
            controls
            autoPlay
          /> */}
                <ReactAudioPlayer
                  className="react-player"
                  id="myAudio"
                  src={Object.values(ayahAudios)[currentAyahIndex]}
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
          {/* ============================================================================================ */}
          {/* ============================================================================================ */}

          <div>
            {step === 1 && (
              <>
                <h3>Arabic</h3>
                <Tag defaultTags={[Object.keys(glyph)[currentAyahIndex]]} page={pagenum} arabic={true} />
              </>
            )}

            {step === 2 && (
              <>
                <h3>English</h3>
                <Tag defaultTags={[engTrans[currentAyahIndex]]} arabic={false} />
              </>
            )}

            {step === 3 && (
              <>
                <h3>Local - Malayalam</h3>
                <Tag defaultTags={[localTrans[currentAyahIndex]]} arabic={false} />
              </>
            )}
            {splittingTimes[splittingCount] && (
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
