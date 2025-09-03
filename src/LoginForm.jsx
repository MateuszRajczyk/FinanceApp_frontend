import { useEffect, useRef, useState } from "react";
import classes from "./LoginForm.module.css";
import { useNavigate } from "react-router";
import ForgotPassword from "./ForgotPassword.jsx";
import { BeatLoader } from "react-spinners";

function LoginForm() {
  const loginInputRef = useRef();
  const passwordInputRef = useRef();
  const [error, setError] = useState("");
  const [isForgot, setIsForgot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  async function submitLoginFormHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    const enteredLogin = loginInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      body: JSON.stringify({
        email: enteredLogin,
        password: enteredPassword,
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
        if (data.message == "user_logged") {
          setError("");
          localStorage.setItem("isAuthenticated", true);
          navigate("/about");
        } else {
          setError(data.message);
          document.getElementById("loginForm").reset();
        }
      });
  }

  function forgotPasswordHandler() {
    setIsForgot(true);
  }

  if (localStorage.getItem("isAuthenticated")) {
    useEffect(() => {
      navigate("/about");
    }, []);
  } else {
    return isForgot ? (
      <ForgotPassword></ForgotPassword>
    ) : (
      <>
        <div className={classes.login_form}>
          <h2 className={classes.header}>Sign In</h2>

          <form
            className="space-y-4"
            id="loginForm"
            onSubmit={submitLoginFormHandler}
          >
            <div className="text-red-700">{error}</div>
            <div hidden>{error}</div>
            <div>
              <label className={classes.text_label}>Email</label>
              <input
                type="email"
                className={classes.text_input}
                placeholder="your@email.com"
                ref={loginInputRef}
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

            <div className="flex items-center justify-between">
              <span
                onClick={forgotPasswordHandler}
                className={classes.forgot_password}
              >
                Forgot password?
              </span>
            </div>

            {isLoading ? (
              <div className={classes.loader}>
                <BeatLoader size={10} />
              </div>
            ) : (
              <button className={classes.button}>Sign In</button>
            )}
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?
            <a
              href="/signUp"
              className="text-stone-500 hover:text-stone-800 font-medium"
            >
              Sign up
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default LoginForm;
