import classes from "./comment-list.module.css";

function CommentList(props) {
  const comments = props.comments;

  return (
    <>
      {comments.length > 0 ? (
        <ul className={classes.comments}>
          {comments.map((comment) => {
            return (
              <li key={comment._id}>
                <p>{comment.text}</p>
                <div>
                  By <address>{comment.name}</address>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No comments found</p>
      )}
    </>
  );
}

export default CommentList;
