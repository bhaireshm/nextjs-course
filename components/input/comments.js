import { useState, useEffect, useContext } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) getComments();
  }, [showComments]);

  function getComments() {
    setIsLoading(true);
    fetch(`/api/comments/${eventId}`)
      .then(async (resp) => resp.json())
      .then((result) => {
        setComments(result.comments);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      status: "pending",
      title: "Sending Comment...",
      message: "Your comment is currenlty being stored in database.",
    });

    commentData["eventId"] = eventId;
    // send data to API

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData.payload),
      headers: { "Content-Type": "application/json" },
    })
      .then(async (resp) => {
        if (resp.ok) return resp.json();
        const r = await resp.json();
        throw new Error(r.message || "Something went wrong");
      })
      .then((result) => {
        // console.log(result);
        if (result.status) {
          commentData.clearForm();
          getComments();

          notificationCtx.showNotification({
            title: "Success!!",
            message: "Your comment was saved",
            status: "success",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        notificationCtx.showNotification({
          title: "Error!!",
          message: err.message || "Something went wrong",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>{showComments ? "Hide" : "Show"} Comments</button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isLoading && <CommentList comments={comments} />}
      {showComments && isLoading && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
