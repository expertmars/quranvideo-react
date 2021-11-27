import { Fragment } from "react";

// Assets
import logoWhite from "../assets/logo-white.png";

const GenerateHeader = () => {
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
          <a href="/" className="generate-header__btn">
            Download
          </a>
        </div>
      </header>
    </Fragment>
  );
};

export default GenerateHeader;
