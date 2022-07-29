import React, { useRef } from "react";
import styles from "./card-maker.module.css";
import FileUploader from "../file-uploader/file-uploader";
import { child, push, ref } from "firebase/database";

const CardMaker = ({
  card,
  onMakeCard,
  onUpdateCard,
  onDeleteCard,
  idx,
  user,
  database,
  cloudinary,
}) => {
  const formRef = useRef();
  const fileUploaderRef = useRef();

  const handleSumbit = async (e) => {
    e.preventDefault();
    const { target } = e;

    const formData = new FormData();
    formData.append("file", fileUploaderRef.current.files[0]);
    formData.append("upload_preset", "q6nxw20m");
    // q6nxw20m

    let fileUrl;
    const json = await cloudinary.uploadImage(formData);
    fileUrl = json.url;

    const cardObj = makeCardObject(
      target.name.value,
      target.company.value,
      target.color.value,
      target.position.value,
      target.email.value,
      target.description.value,
      target.file.files.length && target.file.files[0].name,
      fileUrl
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
    fileName,
    fileUrl
  ) => {
    const newId = push(child(ref(database.db), "cards")).key;

    return {
      name,
      company,
      color,
      position,
      email,
      desc,
      fileName,
      fileUrl,
      id: newId,
      uid: user.uid,
    };
  };

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
      encType="multipart/form-data"
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
          cloudinary={cloudinary}
          fileUploaderRef={fileUploaderRef}
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
