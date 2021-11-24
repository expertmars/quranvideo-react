import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import FreeEditorForm from "./FreeEditorForm";
import ProEditorForm from "./ProEditorForm";
import ChooseVideoCard from "../Form/ChooseVideoCard";
import { fetchGenerateData } from "../../store/generate-actions";

const GenerateForm = () => {
  const dispatch = useDispatch();
  const showFileChoose = useSelector((state) => state.ui.fileChooseIsVisible);

  const showChooseFile = () => {
    dispatch(uiActions.showFileChoose());
  };

  const hideChooseFile = () => {
    dispatch(uiActions.hideFileChoose());
  };

  useEffect(() => {
    dispatch(fetchGenerateData());
  }, []);

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
