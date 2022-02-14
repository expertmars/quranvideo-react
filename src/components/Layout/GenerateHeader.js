import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { generateActions } from "../../store/generate-slice";

// Assets
import logoWhite from "../assets/logo-white.png";
import classes from "./GenerateHeader.module.scss";
import Button from "../UI/Button";

const GenerateHeader = () => {
  const dispatch = useDispatch();
  const generateForm = useSelector((state) => state.generate.generateForm);
  const formIsValid = useSelector((state) => state.generate.formIsValid);

  const downloadHandler = (e) => {
    e.preventDefault();
    dispatch(generateActions.updateSubmissionButton());
  };

  const userData = useSelector((state) => state.auth.userData);

  return (
    <Fragment>
      <header className={classes["generate-header"]}>
        <div className={classes["generate-header__logo-box"]}>
          <img src={logoWhite} alt="Logo" className={classes["generate-header__logo"]} />
        </div>
        <div className={classes["generate-header__left"]}>
          <div className={classes["generate-header__user"]}>
            <div
              className={classes["generate-header__user-avatar"]}
              style={{
                backgroundImage: `url(${userData.avatar})`,
              }}>
              &nbsp; {!userData.avatar && "M"}
            </div>
            <div className={classes["generate-header__user-text"]}>{userData.email}</div>
          </div>
          <Button onClick={downloadHandler} disabled={!formIsValid} btnClass={classes["generate-header__btn"]}>
            Download
          </Button>
        </div>
      </header>
    </Fragment>
  );
};

export default GenerateHeader;
