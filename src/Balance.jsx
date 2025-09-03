import classes from "./Balance.module.css";
import { Link, useNavigate } from "react-router";

function Balance() {
  let navigate = useNavigate();
  function logout() {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  }
  return (
    <>
      <div className={classes.balance}>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
}

export default Balance;
