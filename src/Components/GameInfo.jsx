import "../CSS/gameinfo.css";
import React from "react";
import Popup from "reactjs-popup";
import Shiba from "../assets/dogShiba/Shiba.png";
import Crow from "../assets/Bird/Crow.png";
import trashcan from "../assets/Can/trashcan.png";
import Pigeon from "../assets/Bird/Pigeon.png";
import goldieSprite from "../assets/Fish/goldieSprite.png";
import salmonSprite from "../assets/Fish/salmonSprite.png";
import tunaSprite from "../assets/Fish/tunaSprite.png";
import Doberman from "../assets/dogDoberman/Doberman.png";
import up from "../assets/up.png";
import back from "../assets/back.png";
import forward from "../assets/forward.png";

const GameInfo = () => (
  //Creates a button that renders a pop up menu when clicked
  <Popup
    trigger={<button className="button"> HOW TO PLAY </button>}
    modal
    nested
  >
    {(close) => (
      <div className="infomodal">
        <button className="infoclose" onClick={close}>
          &times;
        </button>
        <div className="infoheader"> HOW TO PLAY </div>
        <div className="infocontent">
          <div className="infoheader"> Controls : </div>
          <p>
            <img className="arrow" src={up} /> - Jump
          </p>
          <p>
            {" "}
            <img className="arrow" src={up} /> +{" "}
            <img className="arrow" src={up} /> - Double Jump{" "}
          </p>
          <p>
            {" "}
            (Tap) <img className="arrow" src={back} /> - Step Backwards{" "}
          </p>
          <p>
            {" "}
            (Tap) <img className="arrow" src={forward} /> - Step Forward{" "}
          </p>
          <p>
            {" "}
            (Hold) <img className="arrow" src={forward} /> - Run Forward{" "}
          </p>
          <br />
          <div className="infoheader">
            Enemies : <br />
            AVOID AT ALL COSTS
          </div>
          <img className="infopop_up_img" src={Doberman} alt="Doberman" />
          <img className="infopop_up_img" src={Shiba} alt="Shiba" />
          <img className="infopop_up_img" src={Crow} alt="Crow" />
          <img className="infopop_up_img" src={Pigeon} alt="Pigeon" />
          <img className="infopop_up_img" src={trashcan} alt="Trashcan" />
          <br />
          <br />
          <div className="infoheader">
            Food : <br />
            EAT AS MANY AS YOU CAN
          </div>
          <img className="infopop_up_img" src={goldieSprite} alt="Goldfish" />
          <img className="infopop_up_img" src={salmonSprite} alt="Salmon" />
          <img className="infopop_up_img" src={tunaSprite} alt="Tuna" />
        </div>
        <div className="infoactions">
          <button
            className="infobutton"
            onClick={() => {
              close();
            }}
          >
            close
          </button>
        </div>
      </div>
    )}
  </Popup>
);

export default GameInfo;
