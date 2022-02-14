import React from "react";
import classes from "./Contribute.module.scss";
// Assets
import quranimg from "../assets/quran.png";
import vps from "../assets/vps.png";
import appStoreLogo from "../assets/app-store-2x.png";
import playStoreLogo from "../assets/play-store-2x.png";

import MainHeader from "../Layout/MainHeader";
import "../../sass/main.scss";

function Contribute() {
  return (
    <div>
      <MainHeader />
      <h2 className={classes.heading}>
        Your Contributions are
        <br /> welcome
      </h2>
      <br />
      <div className="row">
        <p className="col-1-of-2">
          We have created the world's first Quran Video Generating App. There is no funding while creating this project,
          but we managed to complete it with 2 months of hardwork. Hope you all like this project and if you like to
          improve please consider contributing to this project by the below link.
        </p>
        <span className="col-1-of-2">
          <img src={quranimg} />
        </span>
      </div>
      <div className="row">
        <img src={vps} className="col-1-of-2" />

        <p className="col-1-of-2">
          <span>
            This project is fully running on a Private Server right now, the Videos are rendering with the power of the
            server machine. There is a charge every month we need to pay for making this service online.
          </span>
          <br />
          <br />

          <p>
            We also planning to create an Android / IOS App which will do the same so the people can easily use it in
            their own mobile devices and render using it.
          </p>
        </p>
      </div>

      <div className={classes.hero__button}>
        <a href="https://paypal.me/abdul127" target="_blank" className={classes["hero__button--text"]}>
          Contribute Now!
        </a>
      </div>
      <br />
      <br />
      <br />
      <div className={classes.foot}>copyright 2022 - all rights received QuranVideoMaker</div>
    </div>
  );
}

export default Contribute;
