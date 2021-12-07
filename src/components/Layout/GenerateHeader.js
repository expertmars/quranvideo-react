import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { generateActions } from "../../store/generate-slice";

// Assets
import logoWhite from "../assets/logo-white.png";

const GenerateHeader = () => {
  const dispatch = useDispatch();
  const generateForm = useSelector((state) => state.generate.generateForm);

  const downloadHandler = (e) => {
    e.preventDefault();
    dispatch(generateActions.updateSubmissionButton());
  };

  useEffect(() => {
    console.log(generateForm);
  }, [generateForm]);

  return (
    <Fragment>
      <header className="generate-header">
        <div className="generate-header__logo-box">
          <img src={logoWhite} alt="Logo" className="generate-header__logo" />
        </div>
        <div className="generate-header__left">
          <div className="generate-header__user">
            <div className="generate-header__user-avatar">M</div>
            <div className="generate-header__user-text">armuneermalik@gmail.com</div>
          </div>
          <a onClick={downloadHandler} href="/" className="generate-header__btn">
            Download
          </a>
        </div>
      </header>
    </Fragment>
  );
};

export default GenerateHeader;
