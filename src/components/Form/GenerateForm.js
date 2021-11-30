import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import FreeEditorForm from "./FreeEditorForm";
import ProEditorForm from "./ProEditorForm";
import ChooseVideoCard from "../Form/ChooseVideoCard";
import { fetchImageData, fetchVideoData, fetchQuranData, fetchRecitorData } from "../../store/generate-actions";
import { generateActions } from "../../store/generate-slice";

const GenerateForm = () => {
  const dispatch = useDispatch();
  const showFileChoose = useSelector((state) => state.ui.fileChooseIsVisible);

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
          <FreeEditorForm formChooseFileHandler={showChooseFile} />
        </div>
        <div className="col-2-of-4"></div>
        <div className="col-1-of-4">
          <ProEditorForm />
        </div>
      </div>
    </React.Fragment>
  );
};

export default GenerateForm;
