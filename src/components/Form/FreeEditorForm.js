import { Fragment } from "react";
import { useSelector } from "react-redux";

// Assets
import freeEditorIcon from "../assets/free-editor.png";

const Form = (props) => {
  const quranSurah = useSelector((state) => state.generate.quranSurah);
  const selectedSurahVerseCount = useSelector((state) => state.generate.selectedSurahVerseCount);
  const generatedRecitors = useSelector((state) => state.generate.generatedRecitors);

  // const surahRefChangeHandler = (e) => {
  //   const index = e.target.selectedIndex;
  //   const optionElement = e.target.childNodes[index];
  //   const optionElementId = optionElement.getAttribute("id");
  //   dispatch(generateActions.updateSelectedSurahVerseCount(optionElementId));
  // };

  // const valueResettingHandler = (e) => {
  //   if (e.target.value > selectedSurahVerseCount) {
  //     e.target.value = selectedSurahVerseCount;
  //   }
  // };

  return (
    <Fragment>
      <div>
        <img src={freeEditorIcon} alt="Free editor icon" className="editor__icon" />
        <form>
          <div className="form-group">
            <label htmlFor="surah" className="form-label">
              Surah
            </label>
            <select className="form-list" name="surahName" onChange={props.onChangeHandler}>
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
              max={17}
              className="header__form"
              name="fromAyah"
              onChange={props.onChangeHandler}
            />
            <span className="to">to</span>
            <input
              type="number"
              min={1}
              defaultValue={3}
              onChange={props.onChangeHandler}
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
              Translation
            </label>
            <select className="form-list" name="translation" onChange={props.onChangeHandler}>
              <option value={1} className="form-list-item">
                Malayalam
              </option>
              <option value={2} className="form-list-item">
                Malayalam2
              </option>
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
            <label htmlFor="resolution" className="form-label">
              Resolution
            </label>
            <select className="form-list" name="resolution" onChange={props.onChangeHandler}>
              <option value={1} className="form-list-item">
                Whatsapp Story
              </option>
              <option value={2} className="form-list-item">
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
              name="showArabicMeaning"
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
