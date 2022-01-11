import React, { useEffect } from "react";
import GenerateHeader from "../Layout/GenerateHeader";
import GenerateForm from "../Form/GenerateForm";
import { useSelector, useDispatch } from "react-redux";
import { startGenerateVideoData, fetchAyahData } from "../../store/generate-actions";
import { Navigate } from "react-router";

const Generate = () => {
  const dispatch = useDispatch();
  const generateForm = useSelector((state) => state.generate.generateForm);
  const editForm = useSelector((state) => state.generate.editForm);
  const submissionButton = useSelector((state) => state.generate.submissionButton);
  const isLogged = useSelector((state) => state.auth.isLogged);

  const ayahKeys = useSelector((state) => state.generate.ayahKeys);
  const listOfAyah = useSelector((state) => state.generate.listOfAyah);

  useEffect(() => {
    if (generateForm.length > 0) {
      dispatch(startGenerateVideoData(generateForm));
    }
  }, [generateForm]);

  useEffect(() => {
    console.log(ayahKeys);
    console.log(listOfAyah);
  }, [ayahKeys, listOfAyah]);

  useEffect(() => {
    console.log(editForm);
    //   dispatch(startGenerateVideoData([...editForm, true])); // this true stands for ayaheditor
    if (editForm.length > 0) {
      dispatch(fetchAyahData(editForm));
    }
  }, [editForm]);

  if (!isLogged) {
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
