import { useEffect } from "react";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import Upload from "../UI/Upload";
import { useDispatch } from "react-redux";
import { generateActions } from "../../store/generate-slice";
import { uiActions } from "../../store/ui-slice";

import { fetchAyah } from "../../store/generate-actions";

// Assets
import ProEditorIcon from "../assets/pro-editor.png";
import classes from "./ProEditorForm.module.scss";

const ProEditorForm = (props) => {
  const dispatch = useDispatch();

  const googleFonts = useSelector((state) => state.generate.googleFonts);
  const ayahEditor = useSelector((state) => state.generate.ayahEditor);
  const uid = useSelector((state) => state.auth.userData.uId);
  const editForm = useSelector((state) => state.generate.editForm);

  const [engSizes, setEngSizes] = useState([]);
  const [localSizes, setLocalSizes] = useState([]);

  const showCustomAudioHandler = () => {
    if (!ayahEditor.length > 0) {
      fetchAyah(dispatch, editForm, false).then(() => {
        dispatch(uiActions.hideLoading());
        dispatch(generateActions.customAudioModal({ status: true }));
      });
      dispatch(uiActions.showLoading());
    } else {
      dispatch(generateActions.customAudioModal({ status: true }));
    }
  };

  useEffect(() => {
    const list = [];
    for (let i = 22; i <= 36; i++) {
      list.push(i);
    }
    setEngSizes(list);
    setLocalSizes(list);
  }, []);

  return (
    <Fragment>
      <img src={ProEditorIcon} alt="Pro editor icon" className={classes.editor__icon} />
      <form>
        <div className={classes["form-group"]}>
          <label htmlFor="arabic-font" className={classes["form-label"]}>
            Quran Font
          </label>
          <select className={classes["form-list"]} name="arabicFont" onChange={props.onChangeHandler}>
            <option value={1} className={classes["form-list-item"]}>
              Quran V2
            </option>
            <option value={2} className={classes["form-list-item"]}>
              Quran V3
            </option>
          </select>
        </div>

        <div className={classes["form-group"]}>
          <label htmlFor="translation-font" className={classes["form-label"]}>
            Translation Font
          </label>
          <select className={classes["form-list"]} name="translationFont" onChange={props.onChangeHandler}>
            {googleFonts.map((font) => {
              const sel = font.family === "Baloo Chettan 2" ? "selected" : "";

              return (
                <option value={font.family} selected={sel} className={classes["form-list-item"]}>
                  {font.family}
                </option>
              );
            })}
          </select>
        </div>

        <div className={classes["form-group"]}>
          <label htmlFor="translationSize" className={classes["form-label"]}>
            Translation Size
          </label>
          <select className={classes["form-list"]} name="translationSize" onChange={props.onChangeHandler}>
            {localSizes.map((size) => {
              const sel = size === 28 ? "selected" : "";

              return (
                <option value={size} selected={sel} className={classes["form-list-item"]}>
                  {size}
                </option>
              );
            })}
          </select>
        </div>

        <div className={classes["form-group"]}>
          <label htmlFor="english-font" className={classes["form-label"]}>
            English Font
          </label>
          <select className={classes["form-list"]} name="englishFont" onChange={props.onChangeHandler}>
            {googleFonts.map((font) => {
              const sel = font.family === "Poppins" ? "selected" : "";

              return (
                <option value={font.family} selected={sel} className={classes["form-list-item"]}>
                  {font.family}
                </option>
              );
            })}
          </select>
        </div>

        <div className={classes["form-group"]}>
          <label htmlFor="englishSize" className={classes["form-label"]}>
            English Size
          </label>
          <select className={classes["form-list"]} name="englishSize" onChange={props.onChangeHandler}>
            {engSizes.map((size) => {
              const sel = size === 24 ? "selected" : "";

              return (
                <option value={size} selected={sel} className={classes["form-list-item"]}>
                  {size}
                </option>
              );
            })}
          </select>
        </div>

        <div className={classes["form-group"]}>
          <input
            type="checkbox"
            name="removeWatermark"
            id="removeWatermark"
            className={classes["form-checkbox"]}
            onChange={props.onChangeHandler}
          />
          <label htmlFor="removeWatermark" className={classes["form-checkbox__label"]}>
            <span className={classes["form-checkbox__checkbox"]}>&nbsp;</span>Remove Watermark
          </label>
        </div>

        <Upload uid={uid} />

        <div className={classes["form-group"]}>
          <label htmlFor="#" className={classes["form-label"]}>
            Custom Audio
          </label>
          <span id="choose-video" className={classes["file-choose__input"]}>
            <a onClick={showCustomAudioHandler} className={classes["form-choose"]}>
              Upload .mp3 File
            </a>
          </span>
        </div>

        {/* <div className={classes["form-group"]}>
          <label htmlFor="watermark-layout" className={classes["form-label"]}>
            Layout
          </label>
          <select className={classes["form-list"]} name="layout" onChange={props.onChangeHandler}>
            <option value={1} className={classes["form-list-item"]}>
              Logo on top
            </option>
            <option value={2} className={classes["form-list-item"]}>
              Logo on bottom
            </option>
          </select>
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="video-quality" className={classes["form-label"]}>
            Video Quality
          </label>
          <select className={classes["form-list"]} name="videoQuality" onChange={props.onChangeHandler}>
            <option value={1} className={classes["form-list-item"]}>
              1920 x 1080
            </option>
            <option value={2} className={classes["form-list-item"]}>
              1280 x 720
            </option>
            <option value={3} className={classes["form-list-item"]}>
              640 x 480
            </option>
          </select>
        </div> */}
      </form>
    </Fragment>
  );
};

export default ProEditorForm;
