import React from "react";
import classnames from "classnames";
import "../AddCardForm/AddCardForm.scss";
import "./CardTemplate.scss";
import { Card } from "../../../../types/Card";

type Props = {
  isHovered: boolean;
  cardData: Card;
};

export const CardTemplate: React.FC<Props> = ({ isHovered, cardData }) => {
  const frontClass = classnames("front", {
    "is-inactive": isHovered,
  });

  const backClass = classnames("back", {
    "is-active": isHovered,
  });

  console.log("cardData", cardData);

  return (
    <div className="card-container">
      <div className={frontClass}>
        <div className="image">
          <img src="../src/img/chip-logo.png" alt="chip" />
          <img src="../src/img/master2.png" alt="" />
        </div>
        <div className="card-number-box">
          {cardData.number ? cardData.number : "################"}
        </div>
        <div className="flexbox">
          <div className="box">
            <span>Card Holder</span>
            <div className="card-holder-name">
              {cardData.cardholder || "Full Name"}
            </div>
          </div>
          <div className="box">
            <span>Expires</span>
            <div className="expiration">
              <span className="exp-month">{cardData.date || "MM/YY"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={backClass}>
        <div className="stripe"></div>
        <div className="box">
          <span>{cardData.cvv || "CVV"}</span>
          <div className="cvv-box">{/* cvv */}</div>
          <img src="image/visa.png" alt="" />
        </div>
      </div>
    </div>
  );
};
