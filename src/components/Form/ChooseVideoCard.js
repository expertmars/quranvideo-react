import React, { useRef, useState } from "react";
import Modal from "../UI/Modal";
import { generateActions } from "../../store/generate-slice";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { BACKEND_URL } from "../../config";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { useEffect } from "react";

import classes from "./ChooseVideoCard.module.scss";

const ChooseVideoCard = (props) => {
  const dispatch = useDispatch();

  const fileInputRef = useRef();

  const [audioDuration, setAudioDuration] = useState(0);

  const uid = useSelector((state) => state.auth.userData.uId);

  const isAyahwise = useSelector((state) => state.generate.isAyahwise);

  const generatedImages = useSelector((state) => state.generate.generatedImages);
  const generatedVideos = useSelector((state) => state.generate.generatedVideos);

  const selectedMedia = useSelector((state) => state.generate.selectedMedia);

  const showChooseVideo = useSelector((state) => state.ui.chooseVideoIsVisible);
  const showChoosePhoto = useSelector((state) => state.ui.choosePhotoIsVisible);

  const totalDuration = useSelector((state) => state.generate.totalDuration);
  const ayahEditor = useSelector((state) => state.generate.ayahEditor);

  const [err, setErr] = useState();

  console.log(selectedMedia);

  // onImage, onVideo Click Handlers
  const imageClickHandler = (imageArray) => {
    dispatch(generateActions.addPhotoToList(imageArray));
  };

  const videoClickHandler = (videoArray) => {
    dispatch(generateActions.addVideoToList(videoArray));
  };

  function getDuration(src) {
    return new Promise(function (resolve) {
      var audio = new Audio();
      audio.addEventListener("loadedmetadata", function () {
        resolve(audio.duration);
      });
      audio.src = src;
    });
  }

  // Top Tab Click Handlers
  const choosePhotoClickHandler = (e) => {
    dispatch(uiActions.hideChooseVideo());
    dispatch(uiActions.showChoosePhoto());
  };

  const chooseVideoClickHandler = (e) => {
    dispatch(uiActions.hideChoosePhoto());
    dispatch(uiActions.showChooseVideo());
  };

  const chooseFileClickHandler = () => {
    fileInputRef.current.click();
  };

  // Photo Column - 15 photo  (15 / 3 = 5)
  const photoCount = generatedImages.length;
  const photoPerCol = photoCount / 3; // 5

  let photoCol1 = [];
  let photoCol2 = [];
  let photoCol3 = [];

  for (let i = 0; i < photoCount; i++) {
    if (photoCol1.length < photoPerCol) {
      photoCol1.push(generatedImages[i]);
    } else if (photoCol2.length < photoPerCol) {
      photoCol2.push(generatedImages[i]);
    } else {
      photoCol3.push(generatedImages[i]);
    }
  }

  // Video Column - 15 photo (15 / 3 = 5)
  const videoCount = generatedVideos.length;
  const videoPerCol = videoCount / 3; // 5

  let videoCol1 = [];
  let videoCol2 = [];
  let videoCol3 = [];

  for (let i = 0; i < videoCount; i++) {
    if (videoCol1.length < videoPerCol) {
      videoCol1.push(generatedVideos[i]);
    } else if (videoCol2.length < videoPerCol) {
      videoCol2.push(generatedVideos[i]);
    } else {
      videoCol3.push(generatedVideos[i]);
    }
  }

  // Duration for video
  const timeConvert = (duration) => {
    duration = parseInt(duration);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    if (seconds < 10) {
      return `${minutes}:0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  };

  // Video preview
  const mouseOverHandler = (e) => {
    var playPromise = e.target.play();

    if (playPromise !== undefined) {
      playPromise.then((_) => {}).catch((error) => {});
    }
  };

  const mouseOutHandler = (e) => {
    e.target.pause();
  };

  // Search
  const searchVideo = (e) => {
    if (e.keyCode === 13) {
      dispatch(generateActions.updateVideoQuery(e.target.value));
    }
  };

  const searchImage = (e) => {
    if (e.keyCode === 13) {
      dispatch(generateActions.updateImageQuery(e.target.value));
    }
  };

  // String manipulation for data name
  const cutString = (string, number) => {
    const cut = string.indexOf("-", number);
    if (cut == -1) return string;
    return string.substring(0, cut);
  };

  const videoMediaName = (mediaArray) => {
    return cutString(mediaArray.thumbnail.split(`/${mediaArray.id}/`)[1].split(`-${mediaArray.id}.`)[0], 10) || "image";
  };

  const photoMediaName = (mediaArray) => {
    return cutString(mediaArray.name.split(`/photo/`)[1].toString(), 10);
  };

  // File Choose
  const chooseFileChangeHandler = (e) => {
    let proceed = window.confirm("Do you want to upload this to the server?");
    if (proceed) {
      let files = e.target.files;

      let formData = new FormData();
      formData.append("uid", uid);

      for (let i = 0; i < files.length; i++) {
        formData.append("video", files[i]);
      }

      axios.post(BACKEND_URL + "/upload-video", formData).then(
        (res) => {
          if (res.status === 200) {
            res.data.map((data, index) => {
              let upfile = {
                id: index,
                duration: data.duration,
                thumbnail: "https://dummyimage.com/16:9x1080&text=Video",
                videoURL: BACKEND_URL + "/" + data.destination + "/" + data.filename,
              };
              dispatch(generateActions.addCustomMediaToList(upfile));
            });
          }
        },
        (err) => {
          setErr(err.response.statusText);
        }
      );
    }
  };

  const clearErrorHandler = () => {
    setErr();
  };

  // Ayahwise Active Class Styling

  const ayahwiseActiveClass = isAyahwise;

  useEffect(() => {
    ayahEditor.map((data) => {
      getDuration(data.audio).then(function (length) {
        setAudioDuration((prevState) => prevState + length);
      });
    });
  }, []);

  return (
    <Modal onClose={props.onClose} modalClass={classes.videopopup}>
      <div className={classes.videopopup__row}>
        <a
          href="#"
          onClick={chooseVideoClickHandler}
          className={`${classes.videopopup__tab} ${showChooseVideo && classes["videopopup__tab--active"]}`}>
          Choose Video
        </a>
        <a
          href="#"
          onClick={choosePhotoClickHandler}
          className={`${classes.videopopup__tab} ${showChoosePhoto && classes["videopopup__tab--active"]}`}>
          Choose Photo
        </a>
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          multiple="multiple"
          onChange={chooseFileChangeHandler}
          ref={fileInputRef}
        />
        <a href="#" onClick={chooseFileClickHandler} className={classes.videopopup__tab}>
          Upload Video / Photo
        </a>
        <a href="#" onClick={props.onClose} className={classes.videopopup__close}>
          <img src="https://i.imgur.com/v7wuPPh.png" alt="videoPopup_close" />
        </a>
        {err && (
          <div className={classes.err} onClick={clearErrorHandler}>
            {err}
            <img src="https://i.imgur.com/v7wuPPh.png" className={classes.errClose} />
          </div>
        )}
      </div>
      <div className={classes.videopopup__row}>
        <p
          href="#"
          className={`${classes.videopopup__tab} ${isAyahwise && classes["videopopup__tab--active"]}`}
          onClick={(e) => dispatch(generateActions.updateAudiowise({ status: true }))}>
          Ayahwise
        </p>
        <p
          href="#"
          className={`${classes.videopopup__tab} ${!isAyahwise && classes["videopopup__tab--active"]}`}
          onClick={(e) => dispatch(generateActions.updateAudiowise({ status: false }))}>
          Lengthwise
        </p>
      </div>
      <div className={classes.videopopup__row}>
        <img src="https://i.imgur.com/s3KmYLP.png" alt="videoPopup_row" className={classes.videopopup__searchicon} />
        <input
          type="text"
          onKeyDown={(e) => {
            showChooseVideo && searchVideo(e);
            showChoosePhoto && searchImage(e);
          }}
          placeholder="Search assets"
          className={classes.videopopup__search}
        />
      </div>
      <div className={classes.videopopup__row}>
        {showChooseVideo && (
          <div className={classes["videopopup__row-grid"]}>
            <InfiniteScroll
              dataLength={generatedVideos.length}
              next={() => dispatch(generateActions.updateVideoPage())}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              height={360}
              scrollThreshold="200px"
              scrollableTarget="row">
              <div className={classes.row}>
                <div className={classes.column}>
                  {videoCol1.map((videoArray) => (
                    <>
                      <div className={classes["content-box"]}>
                        <video
                          onMouseOver={mouseOverHandler}
                          onMouseOut={mouseOutHandler}
                          onClick={() => videoClickHandler(videoArray)}
                          muted
                          loop>
                          <source src={videoArray.videoURL} type="video/mp4" />
                        </video>
                        <p>{timeConvert(videoArray.duration)}</p>
                      </div>
                    </>
                  ))}
                </div>

                <div className={classes.column}>
                  {videoCol2.map((videoArray) => (
                    <>
                      <div className={classes["content-box"]}>
                        <video
                          onMouseOver={mouseOverHandler}
                          onMouseOut={mouseOutHandler}
                          onClick={() => videoClickHandler(videoArray)}
                          muted
                          loop>
                          <source src={videoArray.videoURL} type="video/mp4" />
                        </video>
                        <p>{timeConvert(videoArray.duration)}</p>
                      </div>
                    </>
                  ))}
                </div>

                <div className={classes.column}>
                  {videoCol3.map((videoArray) => (
                    <>
                      <div className={classes["content-box"]}>
                        <video
                          onMouseOver={mouseOverHandler}
                          onMouseOut={mouseOutHandler}
                          onClick={() => videoClickHandler(videoArray)}
                          muted
                          loop>
                          <source src={videoArray.videoURL} type="video/mp4" />
                        </video>
                        <p>{timeConvert(videoArray.duration)}</p>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </InfiniteScroll>
          </div>
        )}

        {/* Choose Photos Section */}
        {showChoosePhoto && (
          <div className={classes["videopopup__row-grid"]}>
            <InfiniteScroll
              dataLength={generatedImages.length}
              next={() => dispatch(generateActions.updateImagePage())}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              height={360}
              scrollThreshold="200px"
              scrollableTarget="row">
              <div className={classes.row}>
                <div className={classes.column}>
                  {photoCol1.map((imageArray) => (
                    <img
                      src={imageArray.image}
                      alt="videoPopup_image"
                      style={{ width: "100%" }}
                      onClick={() => imageClickHandler(imageArray)}
                    />
                  ))}
                </div>
                <div className={classes.column}>
                  {photoCol2.map((imageArray) => (
                    <img
                      src={imageArray.image}
                      alt="videoPopup_image"
                      style={{ width: "100%" }}
                      onClick={() => imageClickHandler(imageArray)}
                    />
                  ))}
                </div>
                <div className={classes.column}>
                  {photoCol3.map((imageArray) => (
                    <img
                      src={imageArray.image}
                      alt="videoPopup_image"
                      style={{ width: "100%" }}
                      onClick={() => imageClickHandler(imageArray)}
                    />
                  ))}
                </div>
              </div>
            </InfiniteScroll>
          </div>
        )}
        {/* Choose Photos Section - END */}
      </div>
      <div className={classes.videopopup__row}>
        <div className={classes.selectedvideo}>
          {selectedMedia.map((eachMedia, index) => {
            if (eachMedia.image)
              return (
                <div className={classes.selectedvideo__box}>
                  <img
                    src={eachMedia.image}
                    key={eachMedia.id}
                    alt={eachMedia.id}
                    className={classes.selectedvideo__thumb}
                  />
                  <div className={classes.selectedvideo__left}>
                    <h3 className={classes.selectedvideo__name}>{photoMediaName(eachMedia)}</h3>
                    <p className={classes.selectedvideo__len}>00:00</p>
                  </div>
                  <img
                    src="https://i.imgur.com/v7wuPPh.png"
                    alt="selectedvideo__images"
                    className={classes.selectedvideo__del}
                    onClick={() => dispatch(generateActions.removeVideoFromList(eachMedia))}
                  />
                </div>
              );

            if (eachMedia.thumbnail)
              return (
                <div className={classes.selectedvideo__box}>
                  <img src={eachMedia.thumbnail} alt="videoPopup_video" className={classes.selectedvideo__thumb} />
                  <div className={classes.selectedvideo__left}>
                    <h3 className={classes.selectedvideo__name}>{index + 1}</h3>
                    <p className={classes.selectedvideo__len}>{timeConvert(eachMedia.duration)}</p>
                  </div>
                  <img
                    src="https://i.imgur.com/v7wuPPh.png"
                    alt="selectedvideo__videos"
                    className={classes.selectedvideo__del}
                    onClick={() => dispatch(generateActions.removeVideoFromList(eachMedia))}
                  />
                </div>
              );
          })}
        </div>
        <div className={classes.videopopup__timeinfo}>
          <span className={classes["videopopup__current-time"]}>{timeConvert(totalDuration)}</span>
          <span className={classes["videopopup__remaining-time"]}> / {timeConvert(audioDuration)}</span>
        </div>
      </div>
      <div className={classes.videopopup__row}>
        <p className={classes.videopopup__info}>
          <img
            className={classes["videopopup__info-icon"]}
            alt="videoPopup_video"
            src="https://i.imgur.com/iKsTavG.png"
          />{" "}
          The time shows the total video length out of total audio length. If time exceeded it will automatically
          cropped to that limit.
        </p>
      </div>
    </Modal>
  );
};

export default ChooseVideoCard;
