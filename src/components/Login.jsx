import { useFormik } from "formik";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { passwordValidate } from "../helper/validate";
import { Link } from "react-router-dom";
import styles from "../styles/Username.module.css";
import avatar from "../assets/profile.png";
import axios from "axios";

export default function Login() {
  const [userInformation, setUserInformation] = useState({});
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {},
  });

  const login = async () => {
    const data = await axios.post(
      "http://localhost:8080/api/login",
      formik.values
    );
    setUserInformation(data);
    localStorage.setItem("token", data?.data?.token);
  };
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore more with connecting us
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img className={styles.profile_img} src={avatar} alt="avatar" />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("email")}
                className={styles.textbox}
                type="email"
                placeholder="Email"
              />
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="password"
                placeholder="password"
              />
              <Link
                to={"/profile"}
                onClick={() => login()}
                className={styles.btn}
                state={userInformation}
              >
                Sign IN
              </Link>
            </div>
            <div className="text-center py-4">
              <span className=" text-gray-500 ">
                Forgot password?{" "}
                <Link className=" text-red-500" to={"/"}>
                  Register
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
