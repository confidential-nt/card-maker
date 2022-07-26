import React, { useEffect, useRef, useState } from "react";
import styles from "./file-uploader.module.css";

const FileUploader = ({ handleCardChange, card, idx }) => {
  const [loading, setLoadingState] = useState(false);
  const [file, setFile] = useState(null);

  const id = idx;

  const inputRef = useRef();

  const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
      if (didMount.current) {
        func();
      } else {
        didMount.current = true;
      }
    }, deps);
  };

  useDidMountEffect(() => {
    wait().then(() => {
      setLoadingState(false);

      handleCardChange({ file });
    });
  }, [loading]);

  const wait = () =>
    new Promise((resolve) => setTimeout(() => resolve(), 2500));

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        name="file"
        accept="image/*"
        id={id}
        onChange={(e) => {
          setLoadingState(true);
          setFile(inputRef.current.files[0].name);
        }}
        // defaultValue={card.file ? card.file : ""}
      />
      {loading ? (
        <label
          htmlFor={id}
          className={`${styles.fileUploaderLabel} ${styles.fileLoadingLabel}`}
        >
          <div className={styles.spinnerContainer}>
            <img src="/spinner.jpg" alt="spinner" />
          </div>
        </label>
      ) : card.file ? (
        <label
          htmlFor={id}
          className={`${styles.fileUploaderLabel} ${styles.fileLoadedLabel}`}
        >
          {card.file}
        </label>
      ) : inputRef.current && inputRef.current.files.length ? (
        <label
          htmlFor={id}
          className={`${styles.fileUploaderLabel} ${styles.fileLoadedLabel}`}
        >
          {inputRef.current.files[0].name}
        </label>
      ) : (
        <label htmlFor={id} className={styles.fileUploaderLabel}>
          No file
        </label>
      )}
    </>
  );
};

export default FileUploader;
