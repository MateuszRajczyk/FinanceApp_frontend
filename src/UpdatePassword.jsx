import { useRef, useEffect, useState } from "react";
import classes from "./UpdatePassword.module.css";
import { useParams } from "react-router";
function UpdatePassword() {
  let { token } = useParams();
  const [isURLValid, setIsURLValid] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/checkForgotToken", {
      method: "POST",
      body: JSON.stringify({
        token: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.message == true) {
          setIsURLValid(true);
        }
      });
  }, []);
  const newPasswordInputRef = useRef();

  function changePasswordFormHandler(event) {
    event.preventDefault();
    fetch("http://127.0.0.1:5000/forgot", {
      method: "POST",
      body: JSON.stringify({
        token: token,
        newPassword: newPasswordInputRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then(() => {
        setPasswordUpdated(true);
      });
  }
  return isURLValid ? (
    passwordUpdated ? (
      <>
        <div className={classes.login_form}>
          <h2 className={classes.header}>Password updated successfully</h2>
          <span>
            You have changed the password, you can sign in on your account
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
          <h2 className={classes.header}>Change Password</h2>
          <span>Please type new password below</span>

          <form className="space-y-4" onSubmit={changePasswordFormHandler}>
            <div>
              <label className={classes.text_label}>New Password</label>
              <input
                type="password"
                className={classes.text_input}
                placeholder="••••••••"
                ref={newPasswordInputRef}
              />
            </div>
            <div>
              <label className={classes.text_label}>Repeat New Password</label>
              <input
                type="password"
                className={classes.text_input}
                placeholder="••••••••"
                ref={newPasswordInputRef}
              />
            </div>

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
    )
  ) : (
    <>
      <div className={classes.login_form}>
        <h2 className={classes.header}>Link not valid</h2>
        <span>
          The link is no longer valid, please click Forgot password button or
          Sign in
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
  );
}
export default UpdatePassword;
