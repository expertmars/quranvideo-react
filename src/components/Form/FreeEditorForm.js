import { Fragment, useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateActions } from "../../store/generate-slice";

// Assets
import freeEditorIcon from "../assets/free-editor.png";

const Form = (props) => {
  const dispatch = useDispatch();
  const submissionButton = useSelector((state) => state.generate.submissionButton);
  const quranSurah = useSelector((state) => state.generate.quranSurah);
  const selectedSurahVerseCount = useSelector((state) => state.generate.selectedSurahVerseCount);
  const generatedRecitors = useSelector((state) => state.generate.generatedRecitors);

  const surahRef = useRef();
  const fromAyahRef = useRef();
  const toAyahRef = useRef();
  const recitorRef = useRef();
  const translationRef = useRef();
  const resolutionRef = useRef();
  const englishMeaningRef = useRef();
  const translationMeaningRef = useRef();
  const arabicMeaningRef = useRef();

  const submissionButtonHandler = (formData) => {
    dispatch(generateActions.updateToGenerateForm(formData));
  };

  const surahRefChangeHandler = (e) => {
    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");
    dispatch(generateActions.updateSelectedSurahVerseCount(optionElementId));
  };

  const valueResettingHandler = (e) => {
    if (e.target.value > selectedSurahVerseCount) {
      e.target.value = selectedSurahVerseCount;
    }
  };

  useEffect(() => {
    if (submissionButton) {
      const formData = {
        surahRef: surahRef.current.value,
        fromAyahRef: fromAyahRef.current.value,
        toAyahRef: toAyahRef.current.value,
        recitorRef: recitorRef.current.value,
        translationRef: translationRef.current.value,
        resolutionRef: resolutionRef.current.value,
        englishMeaningRef: englishMeaningRef.current.checked,
        translationMeaningRef: translationMeaningRef.current.checked,
        arabicMeaningRef: arabicMeaningRef.current.checked,
      };
      submissionButtonHandler(formData);
    }
  }, [submissionButton]);

  return (
    <Fragment>
      <div>
        <img src={freeEditorIcon} alt="Free editor icon" className="editor__icon" />
        <form>
          <div className="form-group">
            <label htmlFor="surah" className="form-label">
              Surah
            </label>
            <select className="form-list" id="surah" ref={surahRef} onChange={surahRefChangeHandler}>
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
              name="fromayah"
              ref={fromAyahRef}
            />
            <span className="to">to</span>
            <input
              type="number"
              min={1}
              defaultValue={3}
              onChange={valueResettingHandler}
              max={selectedSurahVerseCount}
              className="header__form"
              name="toayah"
              ref={toAyahRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="recitor" className="form-label">
              Recitor
            </label>
            <select className="form-list" id="recitor" ref={recitorRef}>
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
            <select className="form-list" id="translation" ref={translationRef}>
              <option value={1} className="form-list-item">
                Malayalam
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
            <select className="form-list" id="resolution" ref={resolutionRef}>
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
              id="english-meaning"
              className="form-checkbox"
              ref={englishMeaningRef}
            />
            <label htmlFor="english-meaning" className="form-checkbox__label">
              <span className="form-checkbox__checkbox">&nbsp;</span>English Meaning
            </label>
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              defaultChecked
              id="translation_checkbox"
              className="form-checkbox"
              ref={translationMeaningRef}
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
              className="form-checkbox"
              ref={arabicMeaningRef}
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
