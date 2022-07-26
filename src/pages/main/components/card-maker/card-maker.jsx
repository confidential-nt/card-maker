import React, { useRef } from "react";
import styles from "./card-maker.module.css";
import FileUploader from "../file-uploader/file-uploader";

const CardMaker = ({
  card,
  onMakeCard,
  onUpdateCard,
  onDeleteCard,
  idx,
  user,
  database,
}) => {
  const formRef = useRef();

  const handleSumbit = (e) => {
    e.preventDefault();
    const { target } = e;

    const cardObj = makeCardObject(
      target.name.value,
      target.company.value,
      target.color.value,
      target.position.value,
      target.email.value,
      target.description.value,
      target.file.files.length && target.file.files[0].name
    );

    onMakeCard(cardObj);
    target.reset();
  };

  const makeCardObject = (
    name,
    company,
    color,
    position,
    email,
    desc,
    file
  ) => ({
    name,
    company,
    color,
    position,
    email,
    desc,
    file,
    id: Date.now(),
    uid: user.uid,
  });

  const handleCardChange = (option) => {
    if (!card.id) return;
    const newCard = { ...card, ...option };
    onUpdateCard(newCard);
  };

  return (
    <form
      action=""
      className={styles.form}
      ref={formRef}
      onSubmit={handleSumbit}
      id={card.id}
    >
      <div className={styles.row}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={(e) => handleCardChange({ name: e.target.value })}
          defaultValue={card.name ? card.name : ""}
        />
        <input
          type="text"
          placeholder="Company"
          name="company"
          onChange={(e) => handleCardChange({ company: e.target.value })}
          defaultValue={card.company ? card.company : ""}
        />
        <select
          name="color"
          id=""
          onChange={(e) => handleCardChange({ color: e.target.value })}
          defaultValue={card.color ? card.color : ""}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="colorful">Colorful</option>
        </select>
      </div>
      <div className={styles.row}>
        <input
          type="text"
          placeholder="Position"
          name="position"
          onChange={(e) => handleCardChange({ position: e.target.value })}
          defaultValue={card.position ? card.position : ""}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => handleCardChange({ email: e.target.value })}
          defaultValue={card.email ? card.email : ""}
        />
      </div>
      <textarea
        name="description"
        id=""
        cols="30"
        rows="10"
        placeholder="Message"
        onChange={(e) => handleCardChange({ desc: e.target.value })}
        defaultValue={card.desc ? card.desc : ""}
      ></textarea>
      <div className={styles.row}>
        <FileUploader
          handleCardChange={handleCardChange}
          card={card}
          idx={idx}
        />
        {card.id ? (
          <button
            type="button"
            onClick={() => onDeleteCard(card)}
            className={styles.btn}
          >
            Delete
          </button>
        ) : (
          <button type="submit" className={styles.btn}>
            Add
          </button>
        )}
      </div>
    </form>
  );
};

export default CardMaker;
