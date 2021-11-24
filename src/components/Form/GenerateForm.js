import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import FreeEditorForm from "./FreeEditorForm";
import ProEditorForm from "./ProEditorForm";
import ChooseVideoCard from "../Form/ChooseVideoCard";

const GenerateForm = () => {
  const [videoThumbnail, setVideoThumbnail] = useState([]);

  const dispatch = useDispatch();
  const showFileChoose = useSelector((state) => state.ui.fileChooseIsVisible);

  const showChooseFile = () => {
    dispatch(uiActions.showFileChoose());
  };

  const hideChooseFile = () => {
    dispatch(uiActions.hideFileChoose());
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("https://api.pexels.com/v1/search?query=nature&per_page=15", {
        headers: {
          Authorization: "563492ad6f91700001000001290bb5e8cc084013ac451e247fb800fb",
        },
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Could not fetch generate data!");
      }

      const data = await response.json().then((data) => data.photos);

      console.log(data);

      const loadedPictures = [];

      for (const key in data) {
        loadedPictures.push({
          id: key,
          photo: data[key].src.large,
        });
      }
      setVideoThumbnail(loadedPictures);
      console.log(loadedPictures);
    } catch {
      throw new Error("Failed to connect! Something went wrong!");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <React.Fragment>
      {showFileChoose && <ChooseVideoCard onClose={hideChooseFile} videoPicture={videoThumbnail} />}
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
