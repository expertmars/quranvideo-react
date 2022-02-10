import React, { useEffect, useState } from "react";
import GenerateHeader from "../Layout/GenerateHeader";
import GenerateForm from "../Form/GenerateForm";
import { useSelector, useDispatch } from "react-redux";
import { startGenerateVideoData, fetchAyahData, fetchAyah } from "../../store/generate-actions";
import { Navigate } from "react-router";
import { generateActions } from "../../store/generate-slice";

const Generate = () => {
  const dispatch = useDispatch();
  const generateForm = useSelector((state) => state.generate.generateForm);
  const editForm = useSelector((state) => state.generate.editForm);
  const submissionButton = useSelector((state) => state.generate.submissionButton);

  const editButton = useSelector((state) => state.generate.editButtonIsClicked);
  const customAudio = useSelector((state) => state.generate.showCustomAudioModal);

  const isLoggedIn = useSelector((state) => state.auth.isLogged);

  const ayahEditor = useSelector((state) => state.generate.ayahEditor);

  const [oldEditForm, setOldEditForm] = useState({});
  const [isInitial, setIsInitial] = useState(true);

  // let isInitial = true;

  useEffect(() => {
    if (generateForm.length > 0) {
      console.log(generateForm);
      console.log("GENERATE FORM ayah editor LENGTH IS ", generateForm[0].ayahEditor.length);
      // if (generateForm[0].ayahEditor.length === 0) {
      //   console.log("THIS COMPLETED");
      //   // dispatch(fetchAyahData(editForm, false));

      //   fetchAyah(dispatch, editForm, false).then(() => {
      //     dispatch(generateActions.updateSubmissionButton());
      //     dispatch(startGenerateVideoData(generateForm, editForm, ayahEditor, false));
      //   });

      //   return;
      // }

      dispatch(startGenerateVideoData(generateForm, editForm, ayahEditor, false));
    }
  }, [generateForm]);

  useEffect(() => {
    console.log(editForm);
    console.log(editButton);

    // if (isInitial) {
    //   setIsInitial(false);
    //   return;
    // }

    if (oldEditForm !== editForm) {
      dispatch(generateActions.emptyAyahEditorData({ index: 0 }));
      console.log("EMPTYED AYAH");
    }

    if (oldEditForm !== editForm && editButton) {
      dispatch(fetchAyahData(editForm, true));
      console.log("THIS IS");
      setOldEditForm(editForm);
    }
  }, [editForm]);

  if (!isLoggedIn) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <React.Fragment>
      <div>
        <GenerateHeader />
      </div>
      <main>
        <GenerateForm />
      </main>
    </React.Fragment>
  );
};

export default Generate;
