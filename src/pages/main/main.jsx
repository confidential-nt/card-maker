import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardMakerList from "./components/card-maker-list/card-maker-list";
import CardPreviewList from "./components/card-preview-list/card-preview-list";
import styles from "./main.module.css";

const Main = (props) => {
  const navigate = useNavigate();
  const [cards, setCard] = useState([{}]);

  useEffect(() => {
    if (!props.user) {
      navigate("/");
      return;
    }

    // const data = {};
    // props.database.readData("cards", data);
    // console.log(data);
    // // console.log(data);
    // // if (data.length) {
    // //   data.push({});
    // //   setCard(data);
    // // }
  }, []);

  const makeCard = (cardObj) => {
    const newCardArr = [...cards];

    const targetIdx = newCardArr.findIndex((el) => el.id === undefined);
    newCardArr.splice(targetIdx, 0, cardObj);

    // props.database.writeCardData(cardObj);
    props.database.writeCardDataTwo(cardObj);

    setCard(newCardArr);
  };

  const updateCard = (cardObj) => {
    const newCardArr = [...cards];
    const targetCardIdx = cards.findIndex((card) => card.id === cardObj.id);
    newCardArr[targetCardIdx] = cardObj;

    setCard(newCardArr);
  };

  const deleteCard = (cardObj) => {
    const newCardArr = [...cards];
    const targetCardIdx = cards.findIndex((card) => card.id === cardObj.id);
    newCardArr.splice(targetCardIdx, 1);

    setCard(newCardArr);
  };

  return (
    <>
      <main className={styles.main}>
        <CardMakerList
          cards={cards}
          onMakeCard={makeCard}
          onUpdateCard={updateCard}
          onDeleteCard={deleteCard}
          user={props.user}
          database={props.database}
        />
        <CardPreviewList cards={cards} user={props.user} />
      </main>
    </>
  );
};

export default Main;
