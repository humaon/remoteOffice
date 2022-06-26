import React, { useEffect, useState } from "react";

import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { baseUrl } from "config";
import { useForm } from "react-hook-form";
import { Resolver, yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  dob: yup.date().required(),
});

// components

export default function CardSettings() {
  const [user, setUser] = useState();
  const [file, setFile] = useState();
  const [dateOfBirth, onDateChange] = useState(new Date());
  const [fileName, setFileName] = useState("");
  const token = localStorage.getItem("token");
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  let history = useHistory();
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/singleUser/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        const date = new Date(res?.data?.dateOfBirth);
        let day =
          date.getDate().toString().length < 2
            ? `0${date.getDate()}`
            : date.getDate();

        let month =
          (date.getMonth() + 1).toString().length < 2
            ? `0${date.getMonth() + 1}`
            : date.getMonth() + 1;
        let year = date.getFullYear();
        console.log(`${year}-${month}-${day}`);
        setValue("dob", `${year}-${month}-${day}`);
        setValue("name", res?.data?.name);
        setValue("email", res?.data?.email);
        onDateChange(res?.data?.dateOfBirth);
      });
  }, []);

  const uploadFile = async (data) => {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("dateOfBirth", new Date(data.dob));
    try {
      const res = await axios({
        url: `${baseUrl}/updateUser`,
        method: "patch",
        data: formData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        toast.success("Updated successfully");
        history.push("/admin/tables");
      }
    } catch (ex) {
      toast.error(ex.response.data.message);
      console.error(ex);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("user", "");
    history.push("/");
  };
  return (
    <>
      <div className="relative flex flex-col w-full min-w-0 mb-6 break-words border-0 rounded-lg shadow-lg bg-blueGray-100">
        <div className="px-6 py-6 mb-0 bg-white rounded-t">
          <div className="flex justify-between text-center">
            <h6 className="text-xl font-bold text-blueGray-700">User Edit</h6>
            <button
              className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
              type="button"
              onClick={handleLogout}
            >
              <i className="fas fa-arrow-alt-circle-down"></i> Logout
            </button>
            {/* <button
              className="px-4 py-2 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-lightBlue-500 active:bg-lightBlue-600 hover:shadow-md focus:outline-none"
              type="button"
            >
              Upload
            </button> */}
          </div>
        </div>
        <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
          <form onSubmit={handleSubmit(uploadFile)}>
            <h6 className="mt-3 mb-6 text-sm font-bold uppercase text-blueGray-400">
              File Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full px-4 lg:w-6/12">
                <div className="relative w-full mb-3">
                  <label
                    className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                    htmlFor="grid-password"
                  >
                    Name
                  </label>
                  <input
                    {...register("name")}
                    id="name"
                    type="text"
                    defaultValue={user?.name}
                    className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                  />
                  <p>{errors.name?.message}</p>
                </div>
              </div>
              <div className="w-full px-4 lg:w-6/12">
                <div className="relative w-full mb-3">
                  <label
                    className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                    htmlFor="grid-password"
                  >
                    Email
                  </label>
                  <input
                    {...register("email")}
                    id="email"
                    type="email"
                    defaultValue={user?.email}
                    className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                  />
                  <p>{errors.email?.message}</p>
                </div>
              </div>
              <div className="w-full px-4 lg:w-6/12">
                <div className="relative w-full mb-3">
                  <label
                    className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                    htmlFor="grid-password"
                  >
                    Date Of birth
                  </label>
                  <input {...register("dob")} type="date" />
                  {/* <DatePicker onChange={onDateChange} value={dateOfBirth} /> */}
                </div>
              </div>
            </div>
            <div className="px-6 py-6 mb-0 rounded-t">
              <div className="flex justify-between text-center">
                <h6 className="text-xl font-bold text-blueGray-700"></h6>
                <button
                  className="px-4 py-2 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-lightBlue-500 active:bg-lightBlue-600 hover:shadow-md focus:outline-none"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </div>
            <hr className="mt-6 border-b-1 border-blueGray-300" />

            {/* <h6 className="mt-3 mb-6 text-sm font-bold uppercase text-blueGray-400">
              Contact Information
            </h6> */}
            {/* <div className="flex flex-wrap">
              <div className="w-full px-4 lg:w-12/12">
                <div className="relative w-full mb-3">
                  <label
                    className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                    htmlFor="grid-password"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                    defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                  />
                </div>
              </div>
              <div className="w-full px-4 lg:w-4/12">
                <div className="relative w-full mb-3">
                  <label
                    className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                    htmlFor="grid-password"
                  >
                    City
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                    defaultValue="New York"
                  />
                </div>
              </div>
              <div className="w-full px-4 lg:w-4/12">
                <div className="relative w-full mb-3">
                  <label
                    className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                    htmlFor="grid-password"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                    defaultValue="United States"
                  />
                </div>
              </div>
              <div className="w-full px-4 lg:w-4/12">
                <div className="relative w-full mb-3">
                  <label
                    className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                    htmlFor="grid-password"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                    defaultValue="Postal Code"
                  />
                </div>
              </div>
            </div> */}

            {/* <hr className="mt-6 border-b-1 border-blueGray-300" /> */}

            {/* <h6 className="mt-3 mb-6 text-sm font-bold uppercase text-blueGray-400">
              About Me
            </h6> */}
            {/* <div className="flex flex-wrap">
              <div className="w-full px-4 lg:w-12/12">
                <div className="relative w-full mb-3">
                  <label
                    className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                    htmlFor="grid-password"
                  >
                    About me
                  </label>
                  <textarea
                    type="text"
                    className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                    defaultValue="A beautiful UI Kit and Admin for React & Tailwind CSS. It is Free and Open Source."
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div> */}
          </form>
        </div>
      </div>
    </>
  );
}
