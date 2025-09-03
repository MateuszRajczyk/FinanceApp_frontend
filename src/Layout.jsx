import classes from "./Layout.module.css";
import { Outlet } from "react-router";

function Layout() {
  return (
    <div className={classes.main_container}>
      <Outlet />
    </div>
  );
}

export default Layout;
