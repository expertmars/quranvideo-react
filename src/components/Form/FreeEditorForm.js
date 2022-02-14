import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import generateSlice, { generateActions } from "../../store/generate-slice";
import { uiActions } from "../../store/ui-slice";

// import { useSelector, useDispatch } from "react-redux";
import { fetchAyah, startGenerateVideoData } from "../../store/generate-actions";

// Assets
import freeEditorIcon from "../assets/free-editor.png";
import classes from "./FreeEditorForm.module.scss";
import { useEffect } from "react";

const Form = (props) => {
  const dispatch = useDispatch();
  const quranSurah = useSelector((state) => state.generate.quranSurah);
  const selectedSurahVerseCount = useSelector((state) => state.generate.selectedSurahVerseCount);
  const generatedRecitors = useSelector((state) => state.generate.generatedRecitors);
  const generateForm = useSelector((state) => state.generate.generateForm);
  const editForm = useSelector((state) => state.generate.editForm);
  const transList = useSelector((state) => state.generate.transList);
  const selectedMedia = useSelector((state) => state.generate.selectedMedia);
  const ayahEditor = useSelector((state) => state.generate.ayahEditor);

  const [mediaIsValid, setMediaIsValid] = useState(false);

  useEffect(() => {
    if (selectedMedia[0]) {
      setMediaIsValid(true);
    } else {
      setMediaIsValid(false);
    }
  }, [selectedMedia]);

  useEffect(() => {
    if (mediaIsValid) {
      dispatch(generateActions.updateFormValidation({ status: true }));
    } else {
      dispatch(generateActions.updateFormValidation({ status: false }));
    }
  }, [mediaIsValid]);

  const surahRefChangeHandler = (e) => {
    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");
    dispatch(generateActions.updateSelectedSurahVerseCount(optionElementId));
    dispatch(generateActions.resetAyahKeysAndListOfAyah());
    props.onChangeHandler(e);
  };

  const valueResettingHandler = (e) => {
    var max = parseInt(e.target.max);
    var min = parseInt(e.target.min);
    if (e.target.value > max) {
      e.target.value = max;
    }
    props.onChangeHandler(e);
  };

  const showEditorHandler = () => {
    dispatch(generateActions.editButtonIsClicked());
    if (!ayahEditor.length > 0) {
      fetchAyah(dispatch, editForm, false).then(() => {
        dispatch(uiActions.hideLoading());
        dispatch(uiActions.showAyahEditorModal());
      });
      dispatch(uiActions.showLoading());
    } else {
      dispatch(uiActions.showAyahEditorModal());
    }
  };

  return (
    <Fragment>
      <div>
        <img src={freeEditorIcon} alt="Free editor icon" className={classes.editor__icon} />
        <form>
          <div className={classes["form-group"]}>
            <label htmlFor="surah" className={classes["form-label"]}>
              Surah
            </label>
            <select className={classes["form-list"]} name="surahName" onChange={surahRefChangeHandler}>
              {quranSurah.map((surah) => (
                <option
                  value={surah.id}
                  key={surah.id}
                  defaultValue
                  id={surah.versesCount}
                  className={classes["form-list-item"]}>
                  {surah.name}
                </option>
              ))}
            </select>
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="ayahno" className={classes["form-label"]}>
              Ayah No
            </label>
            <input
              type="number"
              defaultValue={1}
              min={1}
              max={selectedSurahVerseCount}
              className={classes.header__form}
              name="fromAyah"
              onChange={props.onChangeHandler}
            />
            {/* <select className="form-list" name="fromAyah" onChange={props.onChangeHandler}>
              {Array.from({ length: selectedSurahVerseCount }, (_, k) => {
                <option value={k} className="form-list-item">
                  {k}
                </option>;
              })}
            </select> */}
            <span className={classes.to}>to</span>
            <input
              type="number"
              min={1}
              defaultValue={3}
              onChange={valueResettingHandler}
              max={selectedSurahVerseCount}
              className={classes.header__form}
              name="toAyah"
            />
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="recitor" className={classes["form-label"]}>
              Recitor
            </label>
            <select className={classes["form-list"]} name="recitor" onChange={props.onChangeHandler}>
              {generatedRecitors.map((recitor) => (
                <option value={recitor.id} className={classes["form-list-item"]}>
                  {recitor.name}
                </option>
              ))}
            </select>
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="translation" className={classes["form-label"]}>
              Local Translation
            </label>
            <select className={classes["form-list"]} name="localTranslation" onChange={props.onChangeHandler}>
              {transList.map((item) => {
                if (item.language_name !== "english")
                  return item.id == 37 ? (
                    <option value={parseInt(item.id)} selected="selected" className={classes["form-list-item"]}>
                      {item.language_name.toUpperCase()} - {item.name}
                    </option>
                  ) : (
                    <option value={parseInt(item.id)} className={classes["form-list-item"]}>
                      {item.language_name.toUpperCase()} - {item.name}
                    </option>
                  );
              })}
            </select>
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="englishTranslation" className={classes["form-label"]}>
              English Translation
            </label>
            <select className={classes["form-list"]} name="englishTranslation" onChange={props.onChangeHandler}>
              {transList.map((item) => {
                if (item.language_name === "english") {
                  const sel = item.id == 203 ? "selected" : "";
                  return (
                    <option value={parseInt(item.id)} selected={sel} className={classes["form-list-item"]}>
                      {item.language_name.toUpperCase()} - {item.name}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          {!mediaIsValid && <div className={classes["err"]}>Please choose some videos first</div>}
          <div className={classes["form-group"]}>
            <label htmlFor="choose-video" className={classes["form-label"]}>
              Background Videos
            </label>
            <span id="choose-video" className={classes["file-choose__input"]}>
              <a onClick={props.formChooseFileHandler} className={classes["form-choose"]}>
                Choose Videos
              </a>
            </span>
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="#" className={classes["form-label"]}>
              Ayah Editor
            </label>
            <span id="choose-video" className={classes["file-choose__input"]}>
              <a onClick={showEditorHandler} className={classes["form-choose"]}>
                Edit
              </a>
            </span>
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="resolution" className={classes["form-label"]}>
              Resolution
            </label>
            <select className={classes["form-list"]} name="resolution" onChange={props.onChangeHandler}>
              <option value={"0"} className={classes["form-list-item"]}>
                Whatsapp / Instagram Story
              </option>
              <option value={"1"} className={classes["form-list-item"]}>
                Landscape
              </option>
              <option value={"2"} className={classes["form-list-item"]}>
                Sqaure
              </option>
            </select>
          </div>
          <div className={classes["form-group"]}>
            <input
              type="checkbox"
              defaultChecked
              className={classes["form-checkbox"]}
              id="english-meaning"
              name="showEnglishMeaning"
              onChange={props.onChangeHandler}
            />
            <label htmlFor="english-meaning" className={classes["form-checkbox__label"]}>
              <span className={classes["form-checkbox__checkbox"]}>&nbsp;</span>English Meaning
            </label>
          </div>
          <div className={classes["form-group"]}>
            <input
              type="checkbox"
              name="showTranslation"
              id="translation_checkbox"
              defaultChecked
              className={classes["form-checkbox"]}
              onChange={props.onChangeHandler}
            />
            <label htmlFor="translation_checkbox" className={classes["form-checkbox__label"]}>
              <span className={classes["form-checkbox__checkbox"]}>&nbsp;</span>Translation
            </label>
          </div>
          <div className={classes["form-group"]}>
            <input
              type="checkbox"
              defaultChecked
              id="arabic-meaning"
              name="showArabic"
              className={classes["form-checkbox"]}
              onChange={props.onChangeHandler}
            />
            <label htmlFor="arabic-meaning" className={classes["form-checkbox__label"]}>
              <span className={classes["form-checkbox__checkbox"]}>&nbsp;</span>Arabic Meaning
            </label>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Form;
