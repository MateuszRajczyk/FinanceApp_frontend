import { useRef, useState } from "react";
import classes from "./ForgotPassword.module.css";
function ForgotPassword() {
  const emailInputRef = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState();

  async function submitForgotPasswordFormHandler(event) {
    event.preventDefault();
    await fetch("http://127.0.0.1:5000/sendForgotEmail", {
      method: "POST",
      body: JSON.stringify({
        email: emailInputRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.message == "email_sent") {
          setSubmitted(true);
        } else {
          setError(data.message);
          document.getElementById("forgotForm").reset();
        }
      });
  }

  return submitted ? (
    <>
      <div className={classes.login_form}>
        <h2 className={classes.header}>Check your email box</h2>
        <span>
          Email sent, please check the email box with link to change the
          password
        </span>

        <div className="mt-6 text-center text-sm text-gray-600">
          <a
            href="/"
            className="text-stone-500 hover:text-stone-800 font-medium"
          >
            Sign in
          </a>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className={classes.login_form}>
        <h2 className={classes.header}>Forgot your password ?</h2>
        <span>
          Enter your email address and click the SUBMIT button below, and we
          will send you an email to reset your password. If you do not receive
          an email from us within a few moments, please check your SPAM folder.
        </span>

        <form
          className="space-y-4"
          id="forgotForm"
          onSubmit={submitForgotPasswordFormHandler}
        >
          <div>
            <label className={classes.text_label}>Email</label>
            <input
              type="email"
              className={classes.text_input}
              placeholder="your@email.com"
              ref={emailInputRef}
              name="to_email"
            />
          </div>
          <div>{error}</div>

          <button className={classes.button}>Submit</button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <a
            href="/"
            className="text-stone-500 hover:text-stone-800 font-medium"
          >
            Sign in
          </a>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
