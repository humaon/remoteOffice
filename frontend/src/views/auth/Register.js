import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-date-picker";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { baseUrl } from "config";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  image: yup
    .mixed()
    .required("File is required")
    .test("fileType", "Unsupported File Format", (value) => {
      return [
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/png",
        "image/*",
      ].includes(value[0].type);
    }),
  attachment: yup
    .mixed()
    .required("File is required")
    .test("fileType", "Unsupported File Format", (value) => {
      return [
        "application/pdf",
        "application/vnd.ms-excel",
         "application/excel",
         "application/x-msexcel",
         "application/msword",
         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/png",
      ].includes(value[0].type);
    }),
  password: yup.string().min(6).max(32).required(),
  passconf: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default function Register() {
  const history = useHistory();
  const [date, setDate] = useState(new Date());

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const handleDateChange = (d) => {
    setDate(d);
  };

  const formSubmit = async (data) => {

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("profileImage", data.image[0]);
    formData.append("attachment", data.attachment[0]);
    formData.append("dateOfBirth", date);
    formData.append("password", data.password);
    try {
      const res = await axios.post(`${baseUrl}/register`, formData);

      if (res.status === 201) {
        toast.success("Registration Successful. Redirecting to Loging page...");
        setTimeout(() => {
          history.push("auth/login");
        }, 3000);
      }
    } catch (ex) {
      toast.error("The E-mail already in use");
      console.log(ex);
    }
  };

  return (
    <>
      <div className="container h-full px-4 mx-auto">
        <div className="flex items-center content-center justify-center h-full">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative flex flex-col w-full min-w-0 mb-6 break-words border-0 rounded-lg shadow-lg bg-blueGray-200">
              <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                <div className="mb-3 font-bold text-center text-blueGray-400">
                  <small>sign up with credentials</small>
                </div>
                <form onSubmit={handleSubmit(formSubmit)}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                      htmlFor="grid-password"
                    >
                      Name
                    </label>
                    <input
                      {...register("name")}
                      // onChange={onChangeInput}
                      name="name"
                      type="text"
                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                      placeholder="Name"
                    />
                    <p>{errors.name?.message}</p>
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      {...register("email")}
                      // onChange={onChangeInput}
                      type="email"
                      name="email"
                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                      placeholder="Email"
                    />
                    <p>{errors?.email?.message}</p>
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                      htmlFor="grid-password"
                    >
                      Date Of Birth
                    </label>
                    <DatePicker onChange={handleDateChange} value={date} />
                    <p>{errors.dob?.message}</p>
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                      htmlFor="grid-password"
                    >
                      Profile Image
                    </label>
                    <input
                      {...register("image")}
                      type="file"
                      required
                      // onChange={saveImage}
                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                    />
                    <p>{errors.image?.message}</p>
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                      htmlFor="grid-password"
                    >
                      Attachment
                    </label>
                    <input
                      {...register("attachment")}
                      type="file"
                      required
                      // onChange={saveAttachment}
                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                    />
                    <p>{errors.attachment?.message}</p>
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
                      // onChange={onChangeInput}
                      type="password"
                      name="password"
                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                      placeholder="Password"
                    />
                    <p>{errors.password?.message}</p>
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                      htmlFor="grid-password"
                    >
                      Confirm Password
                    </label>
                    <input
                      {...register("passconf")}
                      // onChange={onChangeInput}
                      type="password"
                      name="passconf"
                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                      placeholder="Password"
                    />
                    <p>{errors.passconf?.message}</p>
                  </div>

                  {/* <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="w-5 h-5 ml-1 transition-all duration-150 ease-linear border-0 rounded form-checkbox text-blueGray-700"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        I agree with the{" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div> */}

                  <div className="mt-6 text-center">
                    <button
                      className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-blueGray-800 active:bg-blueGray-600 hover:shadow-lg focus:outline-none"
                      type="submit"
                    >
                      Create Account
                    </button>
                  </div>
                  <div>
                    Already have an account ?{" "}
                    <Link to="/auth/login">Login Here</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
