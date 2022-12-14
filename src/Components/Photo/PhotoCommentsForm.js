import React from "react";
import { useState } from "react";
import { ReactComponent as Enviar } from "../../Assets/enviar.svg";
import { COMMENT_POST } from "../../Hooks/api";
import useFetch from "../../Hooks/UseFetch";
import Error from "../Helper/Error";
import styles from "./PhotoCommentsForm.module.css";
function PhotoCommentsForm({ id, setComments, single }) {
  const { request, error } = useFetch();
  const [comment, setComment] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = COMMENT_POST(id, { comment });
    const { response, json } = await request(url, options);
    console.log(json);
    if (response.ok) {
      setComment("");
      setComments((comments) => [...comments, json]);
    }
  }

  return (
    <form
      className={`${styles.form} ${single ? styles.single : ""}`}
      onSubmit={handleSubmit}
    >
      <textarea
        className={styles.textarea}
        placeholder="Comente..."
        id="comment"
        name="comment"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button className={styles.button}>
        <Enviar />
      </button>
      <Error error={error} />
    </form>
  );
}

export default PhotoCommentsForm;
