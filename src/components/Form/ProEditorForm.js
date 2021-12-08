import { Fragment } from "react";
// Assets
import ProEditorIcon from "../assets/pro-editor.png";

const ProEditorForm = (props) => {
  return (
    <Fragment>
      <img src={ProEditorIcon} alt="Pro editor icon" className="editor__icon" />
      <form>
        <div className="form-group">
          <label htmlFor="arabic-font" className="form-label">
            Quran Font
          </label>
          <select className="form-list" name="arabicFont" onChange={props.onChangeHandler}>
            <option value={1} className="form-list-item">
              Quran V2
            </option>
            <option value={2} className="form-list-item">
              Quran V3
            </option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="translation-font" className="form-label">
            Translation Font
          </label>
          <select className="form-list" name="translationFont" onChange={props.onChangeHandler}>
            <option value={1} className="form-list-item">
              Indulekha
            </option>
            <option value={2} className="form-list-item">
              Leela
            </option>
            <option value={3} className="form-list-item">
              Karthika (Sura)
            </option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="english-font" className="form-label">
            English Font
          </label>
          <select className="form-list" name="englishFont" onChange={props.onChangeHandler}>
            <option value={1} className="form-list-item">
              Roboto
            </option>
            <option value={2} className="form-list-item">
              Poppins
            </option>
            <option value={3} className="form-list-item">
              Montserrat
            </option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="checkbox"
            name="removeWatermark"
            id="removeWatermark"
            className="form-checkbox"
            onChange={props.onChangeHandler}
          />
          <label htmlFor="removeWatermark" className="form-checkbox__label">
            <span className="form-checkbox__checkbox">&nbsp;</span>Remove Watermark
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="chooseOwnWatermark" className="form-choose">
            Watermark{" "}
          </label>
          <input
            type="file"
            id="chooseOwnWatermark"
            name="chooseOwnWatermark"
            className="form-input-file"
            onChange={props.onChangeHandler}
          />
          {/* <a href="#file-choose" id="uploadFile" class="form-choose"
                >Choose a file</a
              > */}
        </div>
        <div className="form-group">
          <label htmlFor="watermark-layout" className="form-label">
            Layout
          </label>
          <select className="form-list" name="layout" onChange={props.onChangeHandler}>
            <option value={1} className="form-list-item">
              Logo on top
            </option>
            <option value={2} className="form-list-item">
              Logo on bottom
            </option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="video-quality" className="form-label">
            Video Quality
          </label>
          <select className="form-list" name="videoQuality" onChange={props.onChangeHandler}>
            <option value={1} className="form-list-item">
              1920 x 1080
            </option>
            <option value={2} className="form-list-item">
              1280 x 720
            </option>
            <option value={3} className="form-list-item">
              640 x 480
            </option>
          </select>
        </div>
      </form>
    </Fragment>
  );
};

export default ProEditorForm;
