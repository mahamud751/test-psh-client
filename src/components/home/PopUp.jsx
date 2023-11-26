import React from "react";
import "./PopUp.css";
import { useState } from "react";
import ceoImg from "../../assets/img/CEO-Welcome.jpg";
const PopUp = () => {
  const [load, setLoad] = useState(false);
  const [hide, sethide] = useState(true);

  return (
    <div>
      {load === false && (
        <div id="pop" className={hide === true ? "pop_Up" : "hidden"}>
          <div className="contain">
            <button
              id="close"
              onClick={() => {
                setLoad(true);
                sethide(false);
              }}
              className="pop-up-close"
            >
              &times;
            </button>
            <div className="pop_img">
              <img className="img" src={ceoImg} alt="" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUp;
