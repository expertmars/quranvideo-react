import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import FreeEditorForm from "./FreeEditorForm";
import ProEditorForm from "./ProEditorForm";
import ChooseVideoCard from "../Form/ChooseVideoCard";
import ProgressModal from "./ProgressModal";
import { fetchAyah, fetchTranslationList, fetchGoogleFonts } from "../../store/generate-actions";
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
  const ayahEditor = useSelector((state) => state.generate.ayahEditor);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    arabicFont: 1,
    layout: 1,
    recitor: 7,
    resolution: "720x1080",
    showArabic: true,
    showEnglishMeaning: true,
    showTranslation: true,
    surahName: 1,
    fromAyah: 1,
    toAyah: 3,
    localTranslation: 37,
    englishTranslation: 203,
    englishFont: "Poppins",
    translationFont: "Baloo Chettan 2",
    englishSize: 24,
    translationSize: 22,
    videoQuality: 1,
    removeWatermark: false,
    uid: userData.uId,
    email: userData.email,
    customLogo: false,
    ayahEditor: [
      {
        audio: "https://verses.quran.com/Alafasy/mp3/001001.mp3",
        arab: ["ﱁ ﱂ ﱃ ﱄ ﱅ"],
        unchanged: { arab: [Array], local: [Array], eng: [Array] },
        splitTimes: [],
        splitCount: 0,
        ayahKey: "1:1",
        page: 1,
        local: ["പരമകാരുണികനും കരുണാനിധിയുമായ അല്ലാഹുവിന്റെ നാമത്തില്‍ ."],
        eng: ["In the name of Allah, the All-Merciful, the Bestower of mercy"],
        ayahDuration: 5.590204,
      },
      {
        audio: "https://verses.quran.com/Alafasy/mp3/001002.mp3",
        arab: ["ﱆ ﱇ ﱈ ﱉ ﱊ"],
        unchanged: { arab: [Array], local: [Array], eng: [Array] },
        splitTimes: [],
        splitCount: 0,
        ayahKey: "1:2",
        page: 1,
        local: ["സ്തുതി സര്‍വ്വലോക പരിപാലകനായ അല്ലാഹുവിന്നാകുന്നു."],
        eng: ["All praise be to Allah, Lord of all realms,"],
        ayahDuration: 4.623673,
      },
      {
        audio: "https://verses.quran.com/Alafasy/mp3/001003.mp3",
        arab: ["ﱋ ﱌ ﱍ"],
        unchanged: { arab: [Array], local: [Array], eng: [Array] },
        splitTimes: [],
        splitCount: 0,
        ayahKey: "1:3",
        page: 1,
        local: ["പരമകാരുണികനും കരുണാനിധിയും."],
        eng: ["the All-Merciful, the Bestower of mercy,"],
      },
    ],
  });

  const showFileChoose = useSelector((state) => state.ui.fileChooseIsVisible);

  const submissionButton = useSelector((state) => state.generate.submissionButton);

  const editForm = useSelector((state) => state.generate.editForm);
  const editButton = useSelector((state) => state.generate.editButtonIsClicked);

  const showProgressModal = useSelector((state) => state.ui.progressModalIsVisible);
  const showAyahEditorModal = useSelector((state) => state.ui.ayahEditorIsVisible);

  const showLoading = useSelector((state) => state.ui.showLoading);
  // const showAyahEditorModal = useSelector((state) => state.ui.ayahEditorIsVisible);

  const videoPage = useSelector((state) => state.generate.videoPage);
  const videoQuery = useSelector((state) => state.generate.videoQuery);

  const imagePage = useSelector((state) => state.generate.imagePage);
  const imageQuery = useSelector((state) => state.generate.imageQuery);

  const generateForm = useSelector((state) => state.generate.generateForm);

  // Choose Video Modal Handling
  const showChooseFile = () => {
    dispatch(uiActions.showFileChoose());
  };

  const hideChooseFile = () => {
    dispatch(uiActions.hideFileChoose());
    dispatch(generateActions.clearAll());
  };

  const hideAyahEditor = () => {
    dispatch(generateActions.editButtonIsClosed());
    dispatch(uiActions.hideAyahEditorModal());
  };

  // Form Handling
  const inputChangeHandler = (event) => {
    const target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,

      // ayahEditor: [],
    });

    if (
      name === "surahName" ||
      name === "fromAyah" ||
      name === "toAyah" ||
      name === "recitor" ||
      name === "localTranslation" ||
      name === "englishTranslation"
    ) {
      dispatch(generateActions.updateToEditForm({ name, value }));
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

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

  useEffect(() => {
    if (submissionButton) {
      if (ayahEditor.length < 1) {
        console.log("THIS FETCHING AYAH EDITOR NOW");

        fetchAyah(dispatch, editForm, false).then(() => {
          submissionButtonHandler(formData);
        });
        return;
      }
      console.log("USING ALREADY FGETCHED AYAH DATA");

      submissionButtonHandler(formData);
    }
  }, [submissionButton]);

  // Choose Video Card Data Fetching
  useEffect(() => {
    dispatch(fetchRecitorData());
    dispatch(fetchQuranData());
    dispatch(fetchTranslationList());
    dispatch(fetchGoogleFonts());
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

    // socket.on("onAyahEditorLoad", (data) => {
    //   dispatch(uiActions.showLoading());
    //   // dispatch(uiActions.showAyahEditorModal());

    //   console.log(data);
    // });
  }, []);

  // Fetch Ayah

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
          <FreeEditorForm
            formChooseFileHandler={showChooseFile}
            onChangeHandler={inputChangeHandler}
            formData={formData}
          />
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
