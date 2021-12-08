import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import FreeEditorForm from "./FreeEditorForm";
import ProEditorForm from "./ProEditorForm";
import ChooseVideoCard from "../Form/ChooseVideoCard";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  fetchImageData,
  fetchVideoData,
  fetchQuranData,
  fetchRecitorData,
  startGenerateVideoData,
} from "../../store/generate-actions";
import { generateActions } from "../../store/generate-slice";

const GenerateForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    arabicFont: 1,
    englishFont: 1,
    fromAyah: 1,
    layout: 1,
    recitor: 1,
    resolution: 1,
    showArabicMeaning: true,
    showEnglishMeaning: true,
    showTranslation: true,
    surahName: 1,
    toAyah: 3,
    translation: 1,
    translationFont: 1,
    videoQuality: 1,
    removeWatermark: false,
  });

  const showFileChoose = useSelector((state) => state.ui.fileChooseIsVisible);

  const submissionButton = useSelector((state) => state.generate.submissionButton);

  const videoPage = useSelector((state) => state.generate.videoPage);
  const videoQuery = useSelector((state) => state.generate.videoQuery);

  const imagePage = useSelector((state) => state.generate.imagePage);
  const imageQuery = useSelector((state) => state.generate.imageQuery);

  const showChooseFile = () => {
    dispatch(uiActions.showFileChoose());
  };

  const hideChooseFile = () => {
    dispatch(uiActions.hideFileChoose());
    dispatch(generateActions.clearAll());
  };

  const inputChangeHandler = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submissionButtonHandler = useCallback((data) => {
    dispatch(generateActions.updateToGenerateForm(data));
  });

  useEffect(() => {
    if (submissionButton) {
      submissionButtonHandler(formData);
    }
  }, [formData, submissionButton]);

  useEffect(() => {
    dispatch(fetchRecitorData());
    dispatch(fetchImageData(imagePage, imageQuery));
    dispatch(fetchQuranData());
    dispatch(fetchVideoData(videoPage, videoQuery));
  }, [imagePage, imageQuery, videoPage, videoQuery]);

  return (
    <React.Fragment>
      {showFileChoose && <ChooseVideoCard onClose={hideChooseFile} />}
      <div className="editor">
        <div className="col-1-of-4">
          <FreeEditorForm formChooseFileHandler={showChooseFile} onChangeHandler={inputChangeHandler} />
        </div>
        <div className="col-2-of-4">
          <ProgressBar animated now={45} striped variant="success" now={40} />
        </div>
        <div className="col-1-of-4">
          <ProEditorForm onChangeHandler={inputChangeHandler} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default GenerateForm;
