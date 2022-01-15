import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import FreeEditorForm from "./FreeEditorForm";
import ProEditorForm from "./ProEditorForm";
import ChooseVideoCard from "../Form/ChooseVideoCard";
import ProgressModal from "./ProgressModal";
import AyahEditorModal from "./AyahEditorModal";

import {
  fetchImageData,
  fetchVideoData,
  fetchQuranData,
  fetchRecitorData,
  fetchAyahData,
} from "../../store/generate-actions";
import { generateActions } from "../../store/generate-slice";

import socketIO from "../hooks/socket";
import Loading from "../UI/Loading";

const GenerateForm = () => {
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    arabicFont: 1,
    englishFont: 1,
    layout: 1,
    recitor: 7,
    resolution: "720x1080",
    showArabicMeaning: true,
    showEnglishMeaning: true,
    showTranslation: true,
    surahName: 1,
    fromAyah: 1,
    toAyah: 3,
    translation: 37,
    translationFont: 1,
    videoQuality: 1,
    removeWatermark: false,
    uid: userData.uId,
    email: userData.email,
  });

  const showFileChoose = useSelector((state) => state.ui.fileChooseIsVisible);

  const submissionButton = useSelector((state) => state.generate.submissionButton);

  const editButton = useSelector((state) => state.generate.editButtonIsClicked);

  const showProgressModal = useSelector((state) => state.ui.progressModalIsVisible);
  const showAyahEditorModal = useSelector((state) => state.ui.ayahEditorIsVisible);

  const showLoading = useSelector((state) => state.ui.showLoading);
  // const showAyahEditorModal = useSelector((state) => state.ui.ayahEditorIsVisible);

  const videoPage = useSelector((state) => state.generate.videoPage);
  const videoQuery = useSelector((state) => state.generate.videoQuery);

  const imagePage = useSelector((state) => state.generate.imagePage);
  const imageQuery = useSelector((state) => state.generate.imageQuery);

  // Choose Video Modal Handling
  const showChooseFile = () => {
    dispatch(uiActions.showFileChoose());
  };

  const hideChooseFile = () => {
    dispatch(uiActions.hideFileChoose());
    dispatch(generateActions.clearAll());
  };

  const hideAyahEditor = () => {
    dispatch(uiActions.hideAyahEditorModal());
  };

  // Form Handling
  const inputChangeHandler = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const surahRefChangeHandler = (e) => {
  //   const index = e.target.selectedIndex;
  //   const optionElement = e.target.childNodes[index];
  //   const optionElementId = optionElement.getAttribute("id");
  //   dispatch(generateActions.updateSelectedSurahVerseCount(optionElementId));
  // };

  const surahRefChangeHandler = (e) => {
    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");
    dispatch(generateActions.updateSelectedSurahVerseCount(optionElementId));
  };

  const submissionButtonHandler = useCallback((data) => {
    dispatch(generateActions.updateToGenerateForm(data));
  });

  const editButtonHandler = useCallback((data) => {
    dispatch(generateActions.updateToEditForm(data));
  });

  useEffect(() => {
    if (editButton) {
      editButtonHandler(formData);
      return;
    }
    if (submissionButton) {
      submissionButtonHandler(formData);
    }
  }, [formData, submissionButton, editButton]);

  // Choose Video Card Data Fetching
  useEffect(() => {
    dispatch(fetchRecitorData());
    dispatch(fetchQuranData());
  }, []);

  useEffect(() => {
    if (showFileChoose) {
      dispatch(fetchImageData(imagePage, imageQuery));
      dispatch(fetchVideoData(videoPage, videoQuery));
    }
  }, [showFileChoose, imagePage, imageQuery, videoPage, videoQuery]);

  useEffect(() => {
    var socket = socketIO.connectIO();
    socket.emit("join", { email: userData.email });

    socket.on("generate", () => {
      dispatch(uiActions.showProgressModal());
    });

    socket.on("onAyahEditorLoad", (data) => {
      dispatch(uiActions.showLoading());
      // dispatch(uiActions.showAyahEditorModal());

      console.log(data);
    });
  }, []);

  // Fetch Ayah

  useEffect(() => {}, [formData]);

  return (
    <React.Fragment>
      {showLoading && <Loading>LOADING</Loading>}
      {showAyahEditorModal && !showLoading && (
        <AyahEditorModal onClose={hideAyahEditor} ayahs={[formData.toAyah, formData.fromAyah]} />
      )}
      {showProgressModal && <ProgressModal />}
      {showFileChoose && <ChooseVideoCard onClose={hideChooseFile} />}
      <div className="editor">
        <div className="col-1-of-4">
          <FreeEditorForm formChooseFileHandler={showChooseFile} onChangeHandler={inputChangeHandler} />
        </div>
        <div className="col-2-of-4"></div>
        <div className="col-1-of-4">
          <ProEditorForm onChangeHandler={inputChangeHandler} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default GenerateForm;
