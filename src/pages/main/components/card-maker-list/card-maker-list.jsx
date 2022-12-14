import React, { memo } from "react";
import CardMaker from "../card-maker/card-maker";
import styles from "./card-maker-list.module.css";

const CardMakerList = memo(
  ({
    cards,
    onMakeCard,
    onUpdateCard,
    onDeleteCard,
    user,
    database,
    cloudinary,
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
          cloudinary={cloudinary}
        />
      ))}
    </section>
  )
);

export default CardMakerList;
