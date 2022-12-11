import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Profile } from "./pages/Profile";
import { ForgotPassword } from "./pages/ForgotPassword";
import { HomePage } from "./pages/HomePage";
import { NotFound } from "./pages/NotFound";
import { Layout } from "./components/Layout";
import { NewPassword } from "./pages/NewPassword";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="profile" element={<Profile />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="new-password" element={<NewPassword />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
