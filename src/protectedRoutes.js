import { useEffect, useState } from "react";
import Login from "./components/Login";

const Protected = ({ children, isLoggedIn }) => {
  return <>{isLoggedIn ? children : <Login />}</>;
};

export default Protected;
