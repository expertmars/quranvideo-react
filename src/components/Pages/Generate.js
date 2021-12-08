import React, { useEffect } from "react";
import GenerateHeader from "../Layout/GenerateHeader";
import GenerateForm from "../Form/GenerateForm";
import { useSelector, useDispatch } from "react-redux";
import { startGenerateVideoData } from "../../store/generate-actions";

const Generate = () => {
  const dispatch = useDispatch();
  const generateForm = useSelector((state) => state.generate.generateForm);
  const submissionButton = useSelector((state) => state.generate.submissionButton);

  useEffect(() => {
    if (generateForm.length > 0) {
      dispatch(startGenerateVideoData(generateForm));
    }
  }, [generateForm]);

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
