import React, { useState } from "react";
import Modal from "../UI/Modal";
import { generateActions } from "../../store/generate-slice";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const ChooseVideoCard = (props) => {
  const dispatch = useDispatch();
  const photoThumbnail = useSelector((state) => state.generate.photoThumbnail);
  const selectedPhotos = useSelector((state) => state.generate.selectedPhotos);

  const showChooseVideo = useSelector((state) => state.ui.chooseVideoIsVisible);
  const showChoosePhoto = useSelector((state) => state.ui.choosePhotoIsVisible);

  const photoClickHandler = (e) => {
    dispatch(generateActions.addPhotoToList(e.target.src));
  };

  const choosePhotoClickHandler = (e) => {
    dispatch(uiActions.hideChooseVideo());
    dispatch(uiActions.showChoosePhoto());
  };

  const chooseVideoClickHandler = (e) => {
    dispatch(uiActions.hideChoosePhoto());
    dispatch(uiActions.showChooseVideo());
  };

  // 15 photo  15 / 3 = 5

  const photoCount = photoThumbnail.length;
  const photoPerCol = photoCount / 3; // 5

  let col1 = [];
  let col2 = [];
  let col3 = [];

  for (let i = 0; i < photoCount; i++) {
    if (col1.length < photoPerCol) {
      col1.push(photoThumbnail[i]);
    } else if (col2.length < photoPerCol) {
      col2.push(photoThumbnail[i]);
    } else {
      col3.push(photoThumbnail[i]);
    }
  }

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
        <input type="text" placeholder="Search assets" className="videopopup__search" />
      </div>
      <div className="videopopup__row">
        {/* Choose Video Section */}
        {showChooseVideo && (
          <div className="videopopup__row-grid">
            <div className="row">
              <div className="column"> "No Videos!"</div>
            </div>
          </div>
        )}

        {/* Choose Photos Section */}
        {showChoosePhoto && (
          <div className="videopopup__row-grid">
            <div className="row">
              <div className="column">
                <div className="row">
                  <div className="column">
                    {col1.map((img) => (
                      <img
                        src={img.photo}
                        alt="videoPopup_video"
                        style={{ width: "100%" }}
                        onClick={photoClickHandler}
                      />
                    ))}
                  </div>
                  <div className="column">
                    {col2.map((img) => (
                      <img
                        src={img.photo}
                        alt="videoPopup_video"
                        style={{ width: "100%" }}
                        onClick={photoClickHandler}
                      />
                    ))}
                  </div>
                  <div className="column">
                    {col3.map((img) => (
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
