import { useRef, useState } from "react";
import classes from "./RegisterForm.module.css";
import { BeatLoader } from "react-spinners";
function RegisterForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function validateForm(email,password){
    const errors = {};

    if (!data.password) {
        errors.password = 'Password is required';
    } else if (data.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
    }

    if (data.confirmPassword !== data.password) {
        errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  }

  async function submitRegisterFormHandler(event) {
    event.preventDefault();

    setIsLoading(true);
    await fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      body: JSON.stringify({
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        if (data.message == "user_registered") {
          setIsRegistered(true);
        } else {
          setError(data.message);
          document.getElementById("registerForm").reset();
        }
      });
  }
  return isRegistered ? (
    <>
      <div className={classes.login_form}>
        <h2 className={classes.header}>User successfully registered</h2>
        <span>Please check your email box to confirm your account</span>

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
        <h2 className={classes.header}>Sign Up</h2>

        <form
          className="space-y-4"
          id="registerForm"
          onSubmit={submitRegisterFormHandler}
        >
          <div>{error}</div>
          <div>
            <label className={classes.text_label}>Email</label>
            <input
              type="email"
              className={classes.text_input}
              placeholder="your@email.com"
              ref={emailInputRef}
              required
            />
          </div>

          <div>
            <label className={classes.text_label}>Password</label>
            <input
              type="password"
              className={classes.text_input}
              placeholder="••••••••"
              ref={passwordInputRef}
              required
            />
          </div>
          <div>
            <label className={classes.text_label}>Repeat Password</label>
            <input
              type="password"
              className={classes.text_input}
              placeholder="••••••••"
            />
          </div>

          {isLoading ? (
            <div className={classes.loader}>
              <BeatLoader size={10} />
            </div>
          ) : (
            <button className={classes.button}>Sign Up</button>
          )}
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?
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

export default RegisterForm;
