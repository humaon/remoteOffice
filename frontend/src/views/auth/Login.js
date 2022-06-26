import React, { useState } from "react";
import { Link, NavLink, withRouter, useHistory } from "react-router-dom";
import axios from "axios";
import DocViewer from "react-doc-viewer";
import { baseUrl } from "config";
import jwtDecode from "jwt-decode";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(32).required(),
});

export default function Login() {
  let history = useHistory();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const handleFormSubmit = async (data) => {
    const { email, password } = data;

    try {
      const response = await axios.post(`${baseUrl}/login`, {
        email,
        password,
      });
      console.log("response---------", response);

      const token = response.data.token;
      if (token) {
        let user = null;

        if (token) {
          user = jwtDecode(token);
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
        }

        if (user && user?.role === "admin") {
          console.log("admin");
          window.location.href = "/admin/tables";
        } else if (user && user?.role === "user") {
          console.log("user");
          window.location.href = "/profile";
          // history.push("/profile");
        }
      }
      return response.data;
    } catch (e) {
      toast.error("Credentials doesn't match!");
      console.log(e);
    }
  };

  return (
    <>
      <div className="container h-full px-4 mx-auto">
        <div className="flex items-center content-center justify-center h-full">
          <div className="w-full px-4 lg:w-4/12">
            <div className="relative flex flex-col w-full min-w-0 mb-6 break-words border-0 rounded-lg shadow-lg bg-blueGray-200">
              <div className="px-6 py-6 mb-0 rounded-t">
                {/* <div className="mb-3 text-center">
                  <h6 className="text-sm font-bold text-blueGray-500">
                    Sign in with
                  </h6>
                </div> */}
                {/* <div className="text-center btn-wrapper">
                  <button
                    className="inline-flex items-center px-4 py-2 mb-1 mr-2 text-xs font-normal font-bold uppercase transition-all duration-150 ease-linear bg-white rounded shadow outline-none active:bg-blueGray-50 text-blueGray-700 focus:outline-none hover:shadow-md"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("assets/img/github.svg").default}
                    />
                    Github
                  </button>
                  <button
                    className="inline-flex items-center px-4 py-2 mb-1 mr-1 text-xs font-normal font-bold uppercase transition-all duration-150 ease-linear bg-white rounded shadow outline-none active:bg-blueGray-50 text-blueGray-700 focus:outline-none hover:shadow-md"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("assets/img/google.svg").default}
                    />
                    Google
                  </button>
                </div> */}
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                <div className="mb-3 font-bold text-center text-blueGray-400">
                  <small> sign in with credentials</small>
                </div>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                      placeholder="Email"
                      id="email"
                    />
                    <p>{errors.email?.message}</p>
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      {...register("password")}
                      type="password"
                      id="password"
                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                      placeholder="Password"
                    />
                    <p>{errors.password?.message}</p>
                  </div>
                  {/* <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="w-5 h-5 ml-1 transition-all duration-150 ease-linear border-0 rounded form-checkbox text-blueGray-700"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div> */}

                  <div className="mt-6 text-center">
                    <button
                      className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-blueGray-800 active:bg-blueGray-600 hover:shadow-lg focus:outline-none"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                  <div>
                    Don't have any account ?{" "}
                    <Link to="/auth/register">Register Here</Link>
                  </div>
                </form>
              </div>
            </div>
            {/* <div className="relative flex flex-wrap mt-6">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-blueGray-200">
                  <small>Create new account</small>
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
