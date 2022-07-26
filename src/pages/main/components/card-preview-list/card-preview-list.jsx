import React from "react";
import CardPreivew from "../card-preview/card-preview";
import styles from "./card-preview-list.module.css";

const CardPreviewList = ({ cards }) => (
  <section className={styles.previewList}>
    <h2>Card Preview</h2>
    {cards.map((card) => {
      if (card.id) {
        return <CardPreivew card={card} key={card.id} />;
      }
    })}
  </section>
);

export default CardPreviewList;
