import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";

const Profile = () => {
  const location = useLocation();
  const values = location.state;
  console.log(values);
  const onClickLogout = () => {
    localStorage.removeItem("token");
  };
  return (
    <div className=" bg-slate-200 flex items-center justify-center h-screen">
      <div className=" flex h-80 w-80 bg-slate-800 text-gray-100 flex-col text-center rounded-lg shadow-2xl ">
        <h1 className=" mt-20 text-3xl uppercase">{values.username || ""}</h1>
        <h2 className="mt-5 text-xl  mb-8">{values.email || ""}</h2>
        <Link to="/login">
          <Button text={"Logout"} onClick={onClickLogout} />
        </Link>
      </div>
    </div>
  );
};

export default Profile;
