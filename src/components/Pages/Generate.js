import React from "react";
import GenerateHeader from "../Layout/GenerateHeader";
import GenerateForm from "../Form/GenerateForm";
import { useDispatch } from "react-redux";

import { fetchVideoData } from "../../store/generate-actions";

const Generate = () => {
  const dispatch = useDispatch();

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
