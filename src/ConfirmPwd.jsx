import { useEffect, useState } from "react";
import classes from "./ConfirmPwd.module.css";
import { useParams } from "react-router";
function ConfirmPwd() {
  let { token } = useParams();
  const [isURLValid, setIsURLValid] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  useEffect(() => {
    fetch("http://127.0.0.1:5000/checkAuthToken", {
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
          setUserMessage(data.reason);
        } else {
          setUserMessage(data.reason);
        }
      });
  }, []);
  return (
    <>
      <div className={classes.login_form}>
        <div className="text-gray-900 mb-6 font-bold text-center">
          {userMessage}
        </div>

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
export default ConfirmPwd;
