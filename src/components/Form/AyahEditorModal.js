import React from "react";
import { url } from "socket.io-client/build/cjs/url";
import Modal from "../UI/Modal";
import ReactAudioPlayer from "react-audio-player";
import { useState } from "react";
import { useSelector } from "react-redux";
import socketIO from "../hooks/socket";
import styled from "styled-components";
import Loading from "../UI/Loading";
import GlobalStyle from "./GlobalStyle";

import Tag from "../UI/Tag";

import { createGlobalStyle } from "styled-components";

const AyahEditorModal = (props) => {
  const fromAyah = props.ayahs[1]; // 5
  const toAyah = props.ayahs[0]; // 10

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00.00");
  const [splittingTime, setSplittingTime] = useState();
  const [currentDuration, setCurrentDuration] = useState("00:00.00");
  const [totalDuration, setTotalDuration] = useState("00:00.00");

  const engTrans = useSelector((state) => state.generate.engTrans);
  const localTrans = useSelector((state) => state.generate.localTrans);
  const glyph = useSelector((state) => state.generate.listOfAyah);

  console.log(glyph);

  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);

  // console.log(fromAyah, toAyah);

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
    player().currentTime = e.target.value;
    setCurrentDuration(e.target.value);
  };

  const playAudio = () => {
    player().play();
  };
  const pauseAudio = () => {
    player().pause();
  };

  const onSplit = () => {
    player().pause();
    setSplittingTime(currentTime);
  };

  const pagenum = `${Object.values(glyph)[currentAyahIndex]}`.padStart(3, "0");

  return (
    <React.Fragment>
      {<Loading />}

      <Modal modalClass={"progresspopup ayahEditorPopup"} onClose={props.onClose}>
        <div className="progressBox">
          <h4 className="progressBox__text">AYAH EDITOR</h4>

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
            <div>
              <input
                type="range"
                className="audioslider"
                min="0"
                max={totalDuration}
                onChange={rangeChangeHandler}
                value={currentDuration}></input>
            </div>
            <p>Current Time: {currentTime}</p>
            {splittingTime && <p>Spliting At: {splittingTime}</p>}

            {/* <audio
            src="https://upload.wikimedia.org/wikipedia/commons/1/15/Bicycle-bell.wav"
            type="audio/ogg"
            controls
            autoPlay
          /> */}
            <ReactAudioPlayer
              className="react-player"
              id="myAudio"
              src="https://verses.quran.com/AbdulBaset/Mujawwad/mp3/002259.mp3"
              onListen={onPlayHandler}
              onPlay={onPlayerPlay}
              onPause={onPlayerPause}
              listenInterval={100}
              autoPlay
              onLoadedMetadata={onAudioFileLoaded}
              controls
              hidden
            />
            <button>Test</button>
          </div>

          {/* ============================================================================================ */}
          {/* ============================================================================================ */}
          {/* ============================================================================================ */}

          <div className="form-group">
            <label htmlFor="resolution" className="form-label">
              Arabic
            </label>
            {/* <textarea
              className="form-text-ayaheditor"
              style={{
                fontFamily: `QCF2${pagenum}`,
                fontSize: 30,
              }}
              id="arabText"
              //defaultValue={Object.keys(glyph)[currentAyahIndex]}
              defaultValue='<div>
              <span class="test1">Hello world!</span> <span class="test2">How are you</span>
            </div>'></textarea> */}
            <Tag defaultTags={[Object.keys(glyph)[currentAyahIndex]]} page={pagenum} arabic={true} />
          </div>
          <h3>English</h3>
          <Tag defaultTags={[engTrans[currentAyahIndex]]} arabic={false} />
          {/* <div className="form-group">
            
            <textarea
              className="form-text-ayaheditor"
              id="english"
              defaultValue={}></textarea>
          </div> */}

          <h3>Local - Malayalam</h3>
          <Tag defaultTags={[localTrans[currentAyahIndex]]} arabic={false} />

          {/* <div className="form-group">
            <label htmlFor="local" className="form-label">
              Local Translation (Malayalam)
            </label>
            <textarea
              className="form-text-ayaheditor"
              id="local"
              defaultValue={localTrans[currentAyahIndex]}></textarea>
          </div> */}

          {/* {status === "Video processed successfully" && <button onClick={onClickDownload}>Download</button>} */}
        </div>
      </Modal>
      <GlobalStyle />
    </React.Fragment>
  );
};

export default AyahEditorModal;
