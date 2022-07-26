import React from "react";
import CardMaker from "../card-maker/card-maker";
import styles from "./card-maker-list.module.css";

const CardMakerList = ({
  cards,
  onMakeCard,
  onUpdateCard,
  onDeleteCard,
  user,
  database,
}) => (
  <section className={styles.makerList}>
    <h2>Card Maker</h2>
    {cards.map((card, idx) => (
      <CardMaker
        card={card}
        key={card.id}
        onMakeCard={onMakeCard}
        onUpdateCard={onUpdateCard}
        onDeleteCard={onDeleteCard}
        idx={idx}
        user={user}
        database={database}
      />
    ))}
  </section>
);

export default CardMakerList;
