import React from "react";

// Asset
import logo from "../assets/logo.png";

const MainHeader = () => {
  return (
    <header className="header">
      <div className="row">
        <nav className="header__navigation">
          <div className="header__left">
            <div className="header__logo-box">
              <img src={logo} alt="Logo" className="header__logo" />
            </div>
            <ul className="header__list">
              <li className="header__item">
                <a href="/" className="header__link">
                  Generate
                </a>
              </li>
              <li className="header__item">
                <a href="/" className="header__link--pro">
                  Go Pro
                </a>
              </li>
            </ul>
          </div>
          <div className="header__right">
            <ul className="header__list">
              <li className="header__item">
                <a href="/" className="header__link">
                  Sign In
                </a>
              </li>
              <li className="header__item">
                <a href="/" className="header__link btn">
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default MainHeader;
