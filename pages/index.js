import Link from "next/link";
import { useRef, useState } from "react";
import { Fragment } from "react";
import FeedbacksPage from "./feedbacks";

function HomePage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const emailRef = useRef();
  const feedbackRef = useRef();

  function submitFormHandler(e) {
    e.preventDefault();

    const payload = { email: emailRef.current.value, text: feedbackRef.current.value };
    // console.log(payload);

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        clearForm();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function clearForm() {
    emailRef.current.value = "";
    feedbackRef.current.value = "";
  }

  function getFeedbacksData() {
    fetch("/api/feedback")
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        setFeedbacks(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Fragment>
      <div className="center" style={{ textAlign: "center" }}>
        <h3>Feedback Form</h3>

        <form onSubmit={submitFormHandler}>
          <div>
            <label htmlFor="email">Email Address</label>
            <br />
            <input type="email" id="email" ref={emailRef} required />
          </div>
          <br />
          <div>
            <label htmlFor="feedback">Email Address</label>
            <br />
            <textarea id="email" rows="5" ref={feedbackRef} required></textarea>
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>

        <hr />
        <button onClick={getFeedbacksData}>Load feedbacks</button>
        <button>
          <Link href="/feedbacks">View All feedbacks</Link>
        </button>
        <br />
      </div>

      <FeedbacksPage feedbacks={feedbacks} />
    </Fragment>
  );
}

export default HomePage;
