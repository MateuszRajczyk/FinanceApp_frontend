import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import LoginForm from "./LoginForm.jsx";
import Layout from "./Layout.jsx";
import Balance from "./Balance.jsx";
import PrivateRoutes from "./PrivateRoute.jsx";
import UpdatePassword from "./UpdatePassword.jsx";
import SendEmail from "./api_db/SendEmail.jsx";
import RegisterForm from "./RegisterForm.jsx";
import ConfirmPwd from "./ConfirmPwd.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<LoginForm></LoginForm>} />
          <Route path="/signUp" element={<RegisterForm></RegisterForm>} />
          <Route path="/test" element={<SendEmail></SendEmail>} />
          <Route path="resetPassword/:token" element={<UpdatePassword />} />
          <Route path="confirmSignUp/:token" element={<ConfirmPwd />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/about" element={<Balance></Balance>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
