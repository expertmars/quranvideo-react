import React, { useState } from "react";
import Modal from "../UI/Modal";
import { generateActions } from "../../store/generate-slice";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import InfiniteScroll from "react-infinite-scroll-component";

import { Player } from "video-react";

const ChooseVideoCard = (props) => {
  const dispatch = useDispatch();
  const photoThumbnail = useSelector((state) => state.generate.photoThumbnail);
  const generatedVideos = useSelector((state) => state.generate.generatedVideos);

  const selectedPhotos = useSelector((state) => state.generate.selectedPhoto);
  const selectedVideos = useSelector((state) => state.generate.selectedVideo);

  const showChooseVideo = useSelector((state) => state.ui.chooseVideoIsVisible);
  const showChoosePhoto = useSelector((state) => state.ui.choosePhotoIsVisible);

  // const videoPhotoMerged = selectedVideos.concat(selectedPhotos);

  const photoClickHandler = (e) => {
    dispatch(generateActions.addPhotoToList(e.target.src));
  };

  const videoClickHandler = (videoArray) => {
    dispatch(generateActions.addVideoToList(videoArray));
  };

  const choosePhotoClickHandler = (e) => {
    dispatch(uiActions.hideChooseVideo());
    dispatch(uiActions.showChoosePhoto());
  };

  const chooseVideoClickHandler = (e) => {
    dispatch(uiActions.hideChoosePhoto());
    dispatch(uiActions.showChooseVideo());
  };

  // Photo Column - 15 photo  (15 / 3 = 5)
  const photoCount = photoThumbnail.length;
  const photoPerCol = photoCount / 3; // 5

  let photoCol1 = [];
  let photoCol2 = [];
  let photoCol3 = [];

  for (let i = 0; i < photoCount; i++) {
    if (photoCol1.length < photoPerCol) {
      photoCol1.push(photoThumbnail[i]);
    } else if (photoCol2.length < photoPerCol) {
      photoCol2.push(photoThumbnail[i]);
    } else {
      photoCol3.push(photoThumbnail[i]);
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
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    if (seconds < 10) {
      return `${minutes}:0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  };

  // Video preview
  const mouseOverHandler = (e) => {
    const playPromise = e.currentTarget.play();

    if (playPromise !== undefined) {
      playPromise.then((_) => {}).catch((error) => {});
    }
  };

  const mouseOutHandler = (e) => {
    e.currentTarget.pause();
  };

  // Search
  const searchVideo = (e) => {
    if (e.keyCode === 13) {
      dispatch(generateActions.updateVideoQuery(e.target.value));
    }
  };

  return (
    <Modal onClose={props.onClose}>
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
        <a href="#" className="videopopup__tab">
          Upload Video / Photo
        </a>
        <a href="#" onClick={props.onClose} className="videopopup__close">
          <img src="https://i.imgur.com/v7wuPPh.png" alt="videoPopup_close" />
        </a>
      </div>
      <div className="videopopup__row">
        <p href="#" className="videopopup__tab videopopup__tab--active">
          Ayahwise
        </p>
        <p href="#" className="videopopup__tab">
          Lengthwise
        </p>
        <p href="#" className="videopopup__tab">
          Audiowise
        </p>
      </div>
      <div className="videopopup__row">
        <img src="https://i.imgur.com/s3KmYLP.png" alt="videoPopup_row" className="videopopup__searchicon" />
        <input
          type="text"
          onKeyDown={(e) => searchVideo(e)}
          placeholder="Search assets"
          className="videopopup__search"
        />
      </div>
      <div className="videopopup__row">
        <div className="videopopup__row-grid">
          <InfiniteScroll
            dataLength={generatedVideos.length}
            next={() => dispatch(generateActions.updateVideoPage())}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            height={360}
            scrollThreshold="200px"
            scrollableTarget="row"
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }>
            <div className="row">
              <div className="column">
                {videoCol1.map((videoArray) => (
                  <>
                    <img
                      src={videoArray.thumbnail}
                      alt="videoPopup_video"
                      style={{ width: "100%" }}
                      onClick={() => videoClickHandler(videoArray)}
                    />
                  </>
                ))}
              </div>

              <div className="column">
                {videoCol2.map((videoArray) => (
                  <>
                    <img
                      src={videoArray.thumbnail}
                      alt="videoPopup_video"
                      style={{ width: "100%" }}
                      onClick={() => videoClickHandler(videoArray)}
                    />
                  </>
                ))}
              </div>

              <div className="column">
                {videoCol3.map((videoArray) => (
                  <>
                    <img
                      src={videoArray.thumbnail}
                      alt="videoPopup_video"
                      style={{ width: "100%" }}
                      onClick={() => videoClickHandler(videoArray)}
                    />
                  </>
                ))}
              </div>
            </div>
          </InfiniteScroll>
        </div>

        {/* Choose Photos Section */}
        {showChoosePhoto && (
          <div className="videopopup__row-grid">
            <div className="row">
              <div className="column">
                <div className="row">
                  <div className="column">
                    {photoCol1.map((img) => (
                      <img
                        src={img.photo}
                        alt="videoPopup_video"
                        style={{ width: "100%" }}
                        onClick={photoClickHandler}
                      />
                    ))}
                  </div>
                  <div className="column">
                    {photoCol2.map((img) => (
                      <img
                        src={img.photo}
                        alt="videoPopup_video"
                        style={{ width: "100%" }}
                        onClick={photoClickHandler}
                      />
                    ))}
                  </div>
                  <div className="column">
                    {photoCol3.map((img) => (
                      <img
                        src={img.photo}
                        alt="videoPopup_video"
                        style={{ width: "100%" }}
                        onClick={photoClickHandler}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Choose Photos Section - END */}
      </div>
      <div className="videopopup__row">
        {selectedPhotos.map((img) => (
          <div className="selectedvideo">
            <img src={img} key={img} alt="videoPopup_video" className="selectedvideo__thumb" />
            <div className="selectedvideo__left">
              {" "}
              <h3 className="selectedvideo__name">{img.split("w3images/")[1]}</h3>
              <p className="selectedvideo__len">01:30</p>
            </div>
            <img src="https://i.imgur.com/v7wuPPh.png" alt="videoPopup_video" className="selectedvideo__del" />
          </div> // sdds
        ))}
        {selectedVideos.map((videoArray) => (
          <div className="selectedvideo">
            <img src={videoArray.thumbnail} alt="videoPopup_video" className="selectedvideo__thumb" />
            <div className="selectedvideo__left">
              {" "}
              <h3 className="selectedvideo__name">video-sample</h3>
              <p className="selectedvideo__len">{timeConvert(videoArray.duration)}</p>
            </div>
            <img src="https://i.imgur.com/v7wuPPh.png" alt="videoPopup_video" className="selectedvideo__del" />
          </div> // sdds
        ))}
        <div className="videopopup__timeinfo">
          <span className="videopopup__current-time">03:54</span>
          <span className="videopopup__remaining-time"> / 04:43</span>
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
