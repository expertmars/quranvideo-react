import { Fragment, useRef } from "react";

// Assets
import freeEditorIcon from "../assets/free-editor.png";

const Form = (props) => {
  const surahRef = useRef("surah1");
  const fromAyahRef = useRef(1);
  const toAyahRef = useRef(24);
  const recitorRef = useRef("Mishary Al Fasi");
  const translationRef = useRef();
  const fileRef = useRef();
  const resolutionRef = useRef();
  const englishMeaningRef = useRef();
  const translationMeaningRef = useRef();
  const arabicMeaningRef = useRef();

  const submissionHandler = (e) => {
    e.preventDefault();
    console.log(
      surahRef.current.value,
      fromAyahRef.current.value,
      toAyahRef.current.value,
      recitorRef.current.value,
      translationRef.current.value,
      resolutionRef.current.value,
      englishMeaningRef.current.checked,
      translationMeaningRef.current.checked,
      arabicMeaningRef.current.checked
    );
  };

  return (
    <Fragment>
      <div>
        <img src={freeEditorIcon} alt="Free editor icon" className="editor__icon" />
        <form onSubmit={submissionHandler}>
          <div className="form-group">
            <label htmlFor="surah" className="form-label">
              Surah
            </label>
            <select className="form-list" id="surah" ref={surahRef}>
              <option value={"surah1"} defaultValue className="form-list-item">
                Al Fathiha
              </option>
              <option value={"surah2"} className="form-list-item">
                Al Bakarah
              </option>
              <option value={"surah3"} className="form-list-item">
                Alu Imran
              </option>
              <option value={"surah4"} className="form-list-item">
                An Nisa
              </option>
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
              max={18}
              className="header__form"
              name="fromayah"
              ref={fromAyahRef}
            />
            <span className="to">to</span>
            <input
              type="number"
              defaultValue={18}
              min={1}
              max={18}
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
              <option value={1} className="form-list-item">
                Mishary Al Fasi
              </option>
              <option value={2} className="form-list-item">
                Al Bakarah
              </option>
              <option value={3} className="form-list-item">
                Alu Imran
              </option>
              <option value={4} className="form-list-item">
                An Nisa
              </option>
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
              <option value={2} className="form-list-item">
                Malayalam
              </option>
              <option value={3} className="form-list-item">
                Alu Imran
              </option>
              <option value={4} className="form-list-item">
                An Nisa
              </option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="#" className="form-label">
              Background Videos
            </label>
            <button onClick={props.formChooseFileHandler} className="form-choose">
              Choose Videos
            </button>
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
                Al Bakarah
              </option>
              <option value={3} className="form-list-item">
                Alu Imran
              </option>
              <option value={4} className="form-list-item">
                An Nisa
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
          <button type="submit">OK</button>
        </form>
      </div>
    </Fragment>
  );
};

export default Form;
