import React, { useState } from "react";

// Asset
import logo from "../assets/logo.png";
import classes from "./MainHeader.module.scss";
import googleLogo from "../assets/google.png";
import SignInPage from "../Pages/SignIn";

const MainHeader = () => {
  const [showMenu, setShowMenu] = useState(false);

  const openMenuHandler = () => {
    setShowMenu(!showMenu);
  };

  return (
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

      <header className={classes.mobileheader}>
        <div className={classes["header__logo-box"]}>
          <a href="/">
            <img src={logo} alt="Logo" className={classes.header__logo} />
          </a>
        </div>

        <a href="javascript:void(0);" className={classes.icon} onClick={openMenuHandler}>
          <i class="fa fa-bars"></i>
        </a>
        {showMenu && (
          <React.Fragment>
            <div id="myLinks">
              <a href="/contribute">Contribute</a>
              <a href="#contact">Contact</a>
              <SignInPage onlySignOut={true} />
            </div>
          </React.Fragment>
        )}
      </header>

      <header className={classes.header}>
        <div className={classes.row}>
          <nav className={classes.header__navigation}>
            <div className={classes.header__left}>
              <div className={classes["header__logo-box"]}>
                <a href="/">
                  <img src={logo} alt="Logo" className={classes.header__logo} />
                </a>
              </div>
              <ul className={classes.header__list}>
                <li className={classes.header__item}>
                  <a href="/contribute" className={classes.header__link}>
                    Contribute
                  </a>
                </li>
                {/* <li className={classes.header__item}>
                  <a href="/" className={classes["header__link--pro"]}>
                    Go Pro
                  </a>
                </li> */}
              </ul>
            </div>
            <div className={classes.header__right}>
              <ul className={classes.header__list}>
                <li className={classes.header__item}>
                  <SignInPage />
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </React.Fragment>
  );
};

export default MainHeader;
