import React from "react";
import MainHeader from "../Layout/MainHeader";

// Assets
import appStoreLogo from "../assets/app-store-2x.png";
import playStoreLogo from "../assets/play-store-2x.png";

const Home = () => {
  return (
    <div>
      <MainHeader />
      <main>
        <section className="section-hero">
          <div className="row">
            <div className="hero__heading">
              <h1 className="hero__heading--main u-margin-bottom-small">
                The Free &amp; Superfast <br />
                Quranic Video Generator
              </h1>
              <h3 className="hero__heading--sub u-margin-bottom-medium">
                Free Quran Story Maker allows you to generate beautiful quran reciting video that can <br />
                be used for stories and video purpose within seconds.
              </h3>
              <div className="hero__button">
                <a href="/" className="hero__button--text">
                  Start the generator!
                </a>
              </div>
            </div>
            <div className="info u-margin-top-medium">
              <div className="info__box">
                <div className="info__icons">
                  <img src={appStoreLogo} className="info__img" alt="App store icon" />
                  <img src={playStoreLogo} className="info__img" alt="Play store icon" />
                </div>
                <div className="info__text">
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
