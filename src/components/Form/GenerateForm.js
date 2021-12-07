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
  const [formData, setFormData] = useState({});
  const showFileChoose = useSelector((state) => state.ui.fileChooseIsVisible);

  const generateForm = useSelector((state) => state.generate.generateForm);
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

  let freeFormData;
  let proFormData;
  const freeFormDataHandler = (data) => {
    freeFormData = { ...data };
  };

  const proFormDataHandler = (data) => {
    proFormData = data;
  };

  console.log(freeFormData);

  useEffect(() => {
    dispatch(startGenerateVideoData(generateForm));
  }, [generateForm]);

  const submissionButtonHandler = useCallback((data) => {
    dispatch(generateActions.updateToGenerateForm(data));
  });

  useEffect(() => {
    submissionButtonHandler(formData);
  }, [submissionButton]);

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
          <FreeEditorForm formChooseFileHandler={showChooseFile} freeFormData={freeFormDataHandler} />
        </div>
        <div className="col-2-of-4">
          <ProgressBar animated now={45} striped variant="success" now={40} />
        </div>
        <div className="col-1-of-4">
          <ProEditorForm proFormData={proFormDataHandler} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default GenerateForm;
