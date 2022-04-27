import { useState, Fragment } from "react";
import { extractFeedbackData, getFilePath } from "../api/feedback";

export default function FeedbacksPage(props) {
  console.log(props.fee);
  const feedbacks = props.feedbacks || [];
  const [selectedFeedback, setSelectedFeedback] = useState(false);

  function getFeedbackData(id) {
    fetch(`/api/feedback/${id}`)
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        setSelectedFeedback(r.data);
      });
  }

  return (
    <Fragment>
      <div className="center">
        <h3>Feedbacks List</h3>
        <ul>
          {feedbacks.map((fb) => {
            return (
              <li key={fb.id}>
                <span>
                  <button onClick={getFeedbackData.bind(null, fb.id)}>Show details</button>
                </span>
                <span> - {fb.email}</span>
              </li>
            );
          })}
        </ul>
        {/* <table border="1">
        <tr>
        <th>ID</th>
        <th>Email</th>
        <th>Feedback </th>
        </tr>
        {feedbacks.length > 0 ? (
          feedbacks.map((fb) => {
            return (
              <tr key={fb.id}>
              <td>
              <button onClick={getFeedbackData.bind(null, fb.id)}>{fb.id}</button>
              </td>
              <td>{fb.email}</td>
              <td>{fb.text}</td>
              </tr>
              );
          })
        ) : (
          <tr>
          <td colSpan={3}>No details found</td>
          </tr>
          )}
        </table> */}
        {selectedFeedback && (
          <div style={{ padding: "5px", textAlign: "center", border: "1px solid black", borderRadius: "5px" }}>
            <h4>{selectedFeedback.email}</h4>
            <p>
              {selectedFeedback.id}: {selectedFeedback.text}
            </p>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export async function getStaticProps() {
  const filePath = getFilePath();
  const respData = extractFeedbackData(filePath);
  return { props: { feedbacks: respData } };
}
