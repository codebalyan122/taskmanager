import { useFormik } from "formik";
import axios from "axios";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { registerValidation } from "../helper/validate";
import { Link } from "react-router-dom";
import styles from "../styles/Username.module.css";
import avatar from "../assets/profile.png";
import convertToBase64 from "../helper/convert";
import { useMutation } from "react-query";

export default function Register() {
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      email: "example@123@gmail.com",
      username: "",
      password: "Admin@123",
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await { ...values, profile: file || "" };
      console.log(values);
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  const register = async (values) => {
    const data = await axios.post(
      "https://taskmanagerbackend13.onrender.com/api/register",
      values
    );
    localStorage.setItem("token", data?.data?.token);
  };

  // console.log(setRegisterResponse);
  return (
    <div className="container mx-auto h-screen">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center ">
        <div className={styles.glass} style={{ width: "45%" }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-2 text-xl w-2/3 text-center text-gray-500">
              Happy to join you!
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  className={styles.profile_img}
                  src={file || avatar}
                  alt="avatar"
                />
              </label>
              <input
                type="file"
                onChange={onUpload}
                id="profile"
                name="profile"
              />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("email")}
                className={styles.textbox}
                type="email"
                placeholder="Enter a Email"
              />
              <input
                {...formik.getFieldProps("username")}
                className={styles.textbox}
                type="text"
                placeholder="Enter a username*"
                required
              />
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="password"
                placeholder="Enter a password*"
                required
              />

              <Link
                className={styles.btn}
                to={"/profile"}
                onClick={() => register(formik.values)}
                state={formik.values}
              >
                Register
              </Link>
            </div>
            <div className="text-center py-4">
              <span className=" text-gray-500 ">
                Already have an Account?{" "}
                <Link className=" text-red-500" to={"/login"}>
                  Login
                </Link>
                {/* <h2>{registerResponse.}</h2> */}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
