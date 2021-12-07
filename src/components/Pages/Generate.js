import React, { useEffect } from "react";
import GenerateHeader from "../Layout/GenerateHeader";
import GenerateForm from "../Form/GenerateForm";

const Generate = () => {
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
