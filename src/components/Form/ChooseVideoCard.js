import React, { useRef, useState } from "react";
import Modal from "../UI/Modal";
import { generateActions } from "../../store/generate-slice";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { BACKEND_URL } from "../../config";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { useEffect } from "react";

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

      axios.post(BACKEND_URL + "/upload-video", formData).then((res) => {
        if (res.status === 200) {
          res.data.map((data, index) => {
            let upfile = {
              id: index,
              duration: data.duration,
              thumbnail: "https://dummyimage.com/16:9x1080&text=Video",
              videoURL: BACKEND_URL + "/" + data.destination + "/" + data.filename,
            };
            dispatch(generateActions.addVideoToList(upfile));
          });
        }
      });
    }
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
    <Modal onClose={props.onClose} modalClass={"videopopup"}>
      <div className="videopopup__row">
        <a
          href="#"
          onClick={chooseVideoClickHandler}
          className={`videopopup__tab ${showChooseVideo && `videopopup__tab--active`}`}>
          Choose Video
        </a>
        <a
          href="#"
          onClick={choosePhotoClickHandler}
          className={`videopopup__tab ${showChoosePhoto && `videopopup__tab--active`}`}>
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
        <a href="#" onClick={chooseFileClickHandler} className="videopopup__tab">
          Upload Video / Photo
        </a>
        <a href="#" onClick={props.onClose} className="videopopup__close">
          <img src="https://i.imgur.com/v7wuPPh.png" alt="videoPopup_close" />
        </a>
      </div>
      <div className="videopopup__row">
        <p
          href="#"
          className={`${"videopopup__tab"} ${isAyahwise && "videopopup__tab--active"}`}
          onClick={(e) => dispatch(generateActions.updateAudiowise({ status: true }))}>
          Ayahwise
        </p>
        <p
          href="#"
          className={`${"videopopup__tab"} ${!isAyahwise && "videopopup__tab--active"}`}
          onClick={(e) => dispatch(generateActions.updateAudiowise({ status: false }))}>
          Lengthwise
        </p>
      </div>
      <div className="videopopup__row">
        <img src="https://i.imgur.com/s3KmYLP.png" alt="videoPopup_row" className="videopopup__searchicon" />
        <input
          type="text"
          onKeyDown={(e) => {
            showChooseVideo && searchVideo(e);
            showChoosePhoto && searchImage(e);
          }}
          placeholder="Search assets"
          className="videopopup__search"
        />
      </div>
      <div className="videopopup__row">
        {showChooseVideo && (
          <div className="videopopup__row-grid">
            <InfiniteScroll
              dataLength={generatedVideos.length}
              next={() => dispatch(generateActions.updateVideoPage())}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              height={360}
              scrollThreshold="200px"
              scrollableTarget="row">
              <div className="row">
                <div className="column">
                  {videoCol1.map((videoArray) => (
                    <>
                      <div className="content-box">
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

                <div className="column">
                  {videoCol2.map((videoArray) => (
                    <>
                      <div className="content-box">
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

                <div className="column">
                  {videoCol3.map((videoArray) => (
                    <>
                      <div className="content-box">
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
          <div className="videopopup__row-grid">
            <InfiniteScroll
              dataLength={generatedImages.length}
              next={() => dispatch(generateActions.updateImagePage())}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              height={360}
              scrollThreshold="200px"
              scrollableTarget="row">
              <div className="row">
                <div className="column">
                  {photoCol1.map((imageArray) => (
                    <img
                      src={imageArray.image}
                      alt="videoPopup_image"
                      style={{ width: "100%" }}
                      onClick={() => imageClickHandler(imageArray)}
                    />
                  ))}
                </div>
                <div className="column">
                  {photoCol2.map((imageArray) => (
                    <img
                      src={imageArray.image}
                      alt="videoPopup_image"
                      style={{ width: "100%" }}
                      onClick={() => imageClickHandler(imageArray)}
                    />
                  ))}
                </div>
                <div className="column">
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
      <div className="videopopup__row">
        <div class="selectedvideo">
          {selectedMedia.map((eachMedia, index) => {
            if (eachMedia.image)
              return (
                <div className="selectedvideo__box">
                  <img src={eachMedia.image} key={eachMedia.id} alt={eachMedia.id} className="selectedvideo__thumb" />
                  <div className="selectedvideo__left">
                    <h3 className="selectedvideo__name">{photoMediaName(eachMedia)}</h3>
                    <p className="selectedvideo__len">00:00</p>
                  </div>
                  <img
                    src="https://i.imgur.com/v7wuPPh.png"
                    alt="selectedvideo__images"
                    className="selectedvideo__del"
                    onClick={() => dispatch(generateActions.removeVideoFromList(eachMedia))}
                  />
                </div>
              );

            if (eachMedia.thumbnail)
              return (
                <div className="selectedvideo__box">
                  <img src={eachMedia.thumbnail} alt="videoPopup_video" className="selectedvideo__thumb" />
                  <div className="selectedvideo__left">
                    <h3 className="selectedvideo__name">{index + 1}</h3>
                    <p className="selectedvideo__len">{timeConvert(eachMedia.duration)}</p>
                  </div>
                  <img
                    src="https://i.imgur.com/v7wuPPh.png"
                    alt="selectedvideo__videos"
                    className="selectedvideo__del"
                    onClick={() => dispatch(generateActions.removeVideoFromList(eachMedia))}
                  />
                </div>
              );
          })}
        </div>
        <div className="videopopup__timeinfo">
          <span className="videopopup__current-time">{timeConvert(totalDuration)}</span>
          <span className="videopopup__remaining-time"> / {timeConvert(audioDuration)}</span>
        </div>
      </div>
      <div className="videopopup__row">
        <p className="videopopup__info">
          <img className="videopopup__info-icon" alt="videoPopup_video" src="https://i.imgur.com/iKsTavG.png" /> The
          time shows the total video length out of total audio length. If time exceeded it will automatically cropped to
          that limit.
        </p>
      </div>
    </Modal>
  );
};

export default ChooseVideoCard;
