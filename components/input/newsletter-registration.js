import { useRef, useContext } from "react";
import NotificationContext from "../../store/notification-context";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
    const payload = { email: emailInputRef.current.value };

    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Resgistering for newsletter.",
      status: "pending",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    })
      .then(async (resp) => {
        if (resp.ok) return resp.json();

        const r = await resp.json();
        throw new Error(r.message || "Something went wrong");
      })
      .then((result) => {
        console.log(result);
        emailInputRef.current.value = "";

        notificationCtx.showNotification({
          title: "Success!!",
          message: "Successfully registered for newsletter",
          status: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        notificationCtx.showNotification({
          title: "Error!!",
          message: err.message || "Something went wrong",
          status: "error",
        });
      });
    // .finally(() => notificationCtx.hideNotification());
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input type="email" id="email" placeholder="Your email" aria-label="Your email" ref={emailInputRef} />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
