import React, { useEffect, useRef, useState } from "react";
import styles from "./file-uploader.module.css";

const FileUploader = ({
  handleCardChange,
  card,
  idx,
  cloudinary,
  fileUploaderRef,
}) => {
  const [loading, setLoadingState] = useState(false);
  const [file, setOtherFile] = useState(null);

  const id = idx;

  let isReady = false;

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
    wait(5000).then(() => {
      if (file) {
        setLoadingState(false);

        handleCardChange({ fileName: file.fileName, fileUrl: file.fileUrl });
      }
    });
  }, [loading, file]);

  const wait = (time) =>
    new Promise((resolve) => setTimeout(() => resolve(), time));

  return (
    <>
      <input
        ref={fileUploaderRef}
        type="file"
        name="file"
        accept="image/*"
        id={id}
        onChange={async (e) => {
          let fileUrl;

          setLoadingState(true);

          if (!fileUploaderRef.current.files[0]) {
            fileUrl = "/blank-profile.png";
          } else {
            const formData = new FormData();
            formData.append("file", fileUploaderRef.current.files[0]);
            formData.append("upload_preset", "q6nxw20m");

            const json = await cloudinary.uploadImage(formData);
            fileUrl = json.url;
          }

          setOtherFile({
            fileName: fileUploaderRef.current.files[0].name,
            fileUrl,
          });
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
      ) : card.fileName ? (
        <label
          htmlFor={id}
          className={`${styles.fileUploaderLabel} ${styles.fileLoadedLabel}`}
        >
          {card.fileName}
        </label>
      ) : fileUploaderRef.current && fileUploaderRef.current.files.length ? (
        <label
          htmlFor={id}
          className={`${styles.fileUploaderLabel} ${styles.fileLoadedLabel}`}
        >
          {fileUploaderRef.current.files[0].name}
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
