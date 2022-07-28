import { ref, update } from "firebase/database";
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

    const cardDataArr = [];

    const readyCard = async () => {
      const snapShot = await props.database.readData("cards");
      snapShot.forEach((childSnapShot) => {
        if (childSnapShot.val().uid === props.user.uid) {
          cardDataArr.push(childSnapShot.val());
        }
      });
    };

    readyCard().then(() => {
      cardDataArr.push({});
      setCard(cardDataArr);
    });
  }, []);

  const makeCard = (cardObj) => {
    const newCardArr = [...cards];

    const targetIdx = newCardArr.findIndex((el) => el.id === undefined);

    newCardArr.splice(targetIdx, 0, cardObj);

    setCard(newCardArr);
    props.database.writeData("cards", cardObj, cardObj.id);
    saveCardsIdOnDB(newCardArr);
  };

  const saveCardsIdOnDB = (newCardArr) => {
    const updates = {};

    updates["users/" + props.user.uid + "/cards"] = JSON.stringify(
      newCardArr.map((card) => card.id)
    );
    update(ref(props.database.db), updates);
  };

  const updateCard = (cardObj) => {
    const newCardArr = [...cards];
    const targetCardIdx = cards.findIndex((card) => card.id === cardObj.id);
    newCardArr[targetCardIdx] = cardObj;
    props.database.updateDataById("cards", cardObj.id, cardObj);
    setCard(newCardArr);
  };

  const deleteCard = (cardObj) => {
    const newCardArr = [...cards];
    const targetCardIdx = cards.findIndex((card) => card.id === cardObj.id);
    newCardArr.splice(targetCardIdx, 1);
    props.database.deleteDataById("cards", cardObj.id);

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
          cloudinary={props.cloudinary}
        />
        <CardPreviewList cards={cards} user={props.user} />
      </main>
    </>
  );
};

export default Main;
