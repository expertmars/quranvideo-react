import React from "react";
import MainHeader from "../Layout/MainHeader";
import { useDispatch, useSelector } from "react-redux";

// Assets
import appStoreLogo from "../assets/app-store-2x.png";
import playStoreLogo from "../assets/play-store-2x.png";

import classes from "./Home.module.scss";
import SignInPage from "./SignIn";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLogged);

  return (
    <div>
      <MainHeader />

      <main>
        <section className={classes.sectionHero}>
          <div className={classes.row}>
            <div className={classes.hero__heading}>
              <h1 className={`${classes["hero__heading--main"]} ${classes["u-margin-bottom-small"]}`}>
                The Free &amp; Superfast <br />
                Quranic Video Generator
              </h1>
              <h3 className={`${classes["hero__heading--sub"]} ${classes["u-margin-bottom-medium"]}`}>
                Free Quran Story Maker allows you to generate beautiful quran reciting video that can <br />
                be used for stories and video purpose within seconds.
              </h3>
              <div className={classes.hero__button}>
                {isLoggedIn && (
                  <a href="/generate" className={classes["hero__button--text"]}>
                    Start the generator!
                  </a>
                )}
                {!isLoggedIn && <SignInPage />}
              </div>
            </div>
            <div className={`${classes["info"]} ${classes["u-margin-top-medium"]}`}>
              <div className={classes.info__box}>
                <div className={classes.info__icons}>
                  <img src={appStoreLogo} className={classes.info__img} alt="App store icon" />
                  <img src={playStoreLogo} className={classes.info__img} alt="Play store icon" />
                </div>
                <div className={classes.info__text}>
                  <p>Sorry, We are currently developing applications for Google Play Store and App Store.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
