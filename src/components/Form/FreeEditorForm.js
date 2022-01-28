import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import generateSlice, { generateActions } from "../../store/generate-slice";
import { uiActions } from "../../store/ui-slice";

// import { useSelector, useDispatch } from "react-redux";
import { fetchAyahData, startGenerateVideoData } from "../../store/generate-actions";

// Assets
import freeEditorIcon from "../assets/free-editor.png";

const Form = (props) => {
  const dispatch = useDispatch();
  const quranSurah = useSelector((state) => state.generate.quranSurah);
  const selectedSurahVerseCount = useSelector((state) => state.generate.selectedSurahVerseCount);
  const generatedRecitors = useSelector((state) => state.generate.generatedRecitors);
  const generateForm = useSelector((state) => state.generate.generateForm);
  const editForm = useSelector((state) => state.generate.editForm);
  const transList = useSelector((state) => state.generate.transList);

  const ayahEditor = useSelector((state) => state.generate.ayahEditor);

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
      dispatch(uiActions.showLoading());
    } else {
      dispatch(uiActions.showAyahEditorModal());
    }
  };

  return (
    <Fragment>
      <div>
        <img src={freeEditorIcon} alt="Free editor icon" className="editor__icon" />
        <form>
          <div className="form-group">
            <label htmlFor="surah" className="form-label">
              Surah
            </label>
            <select className="form-list" name="surahName" onChange={surahRefChangeHandler}>
              {quranSurah.map((surah) => (
                <option value={surah.id} key={surah.id} defaultValue id={surah.versesCount} className="form-list-item">
                  {surah.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="ayahno" className="form-label">
              Ayah No
            </label>
            <input
              type="number"
              defaultValue={1}
              min={1}
              max={selectedSurahVerseCount}
              className="header__form"
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
            <span className="to">to</span>
            <input
              type="number"
              min={1}
              defaultValue={3}
              onChange={valueResettingHandler}
              max={selectedSurahVerseCount}
              className="header__form"
              name="toAyah"
            />
          </div>
          <div className="form-group">
            <label htmlFor="recitor" className="form-label">
              Recitor
            </label>
            <select className="form-list" name="recitor" onChange={props.onChangeHandler}>
              {generatedRecitors.map((recitor) => (
                <option value={recitor.id} className="form-list-item">
                  {recitor.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="translation" className="form-label">
              Local Translation
            </label>
            <select className="form-list" name="localTranslation" onChange={props.onChangeHandler}>
              {transList.map((item) => {
                if (item.language_name !== "english")
                  return item.id == 37 ? (
                    <option value={parseInt(item.id)} selected="selected" className="form-list-item">
                      {item.language_name.toUpperCase()} - {item.name}
                    </option>
                  ) : (
                    <option value={parseInt(item.id)} className="form-list-item">
                      {item.language_name.toUpperCase()} - {item.name}
                    </option>
                  );
              })}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="translation" className="form-label">
              English Translation
            </label>
            <select className="form-list" name="englishTranslation" onChange={props.onChangeHandler}>
              {transList.map((item) => {
                if (item.language_name === "english") {
                  const sel = item.id == 203 ? "selected" : "";
                  return (
                    <option value={parseInt(item.id)} selected={sel} className="form-list-item">
                      {item.language_name.toUpperCase()} - {item.name}
                    </option>
                  );
                }
              })}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="#" className="form-label">
              Background Videos
            </label>
            <a onClick={props.formChooseFileHandler} className="form-choose">
              Choose Videos
            </a>
          </div>
          <div className="form-group">
            <label htmlFor="#" className="form-label">
              Ayah Editor
            </label>
            <a onClick={showEditorHandler} className="form-choose">
              Edit
            </a>
          </div>
          <div className="form-group">
            <label htmlFor="resolution" className="form-label">
              Resolution
            </label>
            <select className="form-list" name="resolution" onChange={props.onChangeHandler}>
              <option value={"720x1080"} className="form-list-item">
                Whatsapp Story
              </option>
              <option value={"1080x720"} className="form-list-item">
                Landscape
              </option>
              <option value={3} className="form-list-item">
                Instagram Story
              </option>
              <option value={4} className="form-list-item">
                Portait
              </option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              defaultChecked
              className="form-checkbox"
              id="english-meaning"
              name="showEnglishMeaning"
              onChange={props.onChangeHandler}
            />
            <label htmlFor="english-meaning" className="form-checkbox__label">
              <span className="form-checkbox__checkbox">&nbsp;</span>English Meaning
            </label>
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              name="showTranslation"
              id="translation_checkbox"
              defaultChecked
              className="form-checkbox"
              onChange={props.onChangeHandler}
            />
            <label htmlFor="translation_checkbox" className="form-checkbox__label">
              <span className="form-checkbox__checkbox">&nbsp;</span>Translation
            </label>
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              defaultChecked
              id="arabic-meaning"
              name="showArabic"
              className="form-checkbox"
              onChange={props.onChangeHandler}
            />
            <label htmlFor="arabic-meaning" className="form-checkbox__label">
              <span className="form-checkbox__checkbox">&nbsp;</span>Arabic Meaning
            </label>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Form;
