import { useState, useEffect } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (showComments) getComments();
  }, [showComments]);

  function getComments() {
    fetch(`/api/comments/${eventId}`)
      .then((r) => r.json())
      .then((result) => {
        setComments(result.comments);
      })
      .catch((err) => console.log("err", err));
  }

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    commentData["eventId"] = eventId;
    // send data to API

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData.payload),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((result) => {
        // console.log(result);
        if (result.status) {
          commentData.clearForm();
          getComments();
        }
      })
      .catch((err) => console.log("err", err));
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>{showComments ? "Hide" : "Show"} Comments</button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
