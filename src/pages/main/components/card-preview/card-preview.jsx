import React from "react";
import styles from "./card-preview.css";

const CardPreivew = ({ card }) => {
  return (
    <div className={`card ${card.color}`} id={card.id}>
      <div className="card-left">
        {/* <strong>{card.file ? card.file : ""}</strong> */}
        <div className="card-profile-img-container">
          <img src={`${card.fileUrl}`} alt="" />
        </div>
      </div>
      <div className="card-right">
        <h3 className="card-name">{card.name ? card.name : ""}</h3>
        <strong className="card-company">
          {card.company ? card.company : ""}
        </strong>
        <strong className="card-position">
          {card.position ? card.position : ""}
        </strong>
        <strong className="card-email">{card.email ? card.email : ""}</strong>
        <strong className="card-desc">{card.desc ? card.desc : ""}</strong>
      </div>
    </div>
  );
};

export default CardPreivew;

// card maker에서, input에 input이벤트 걸어주고, 넘겨받은 prop card 수정해주고, parent에 넘겨줘서 re-render하면 될 듯?....
