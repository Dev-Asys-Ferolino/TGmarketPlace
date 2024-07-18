"use client";
import Link from "next/link";
import Image from "next/image";
import { logimImage } from "@/images";
import { useState, useEffect } from "react";
import api from "@/lib/api/api";
import { useRouter } from "next/navigation";

interface Register {
  name: string;
  email: string;
  password: string;
}
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleChange = (e: any) => {
    setName(e.target.value);
  };
  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await registerUser();
  };

  const registerUser = async () => {
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      router.push("/");
      return response;
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen ">
      <div className="w-1/2 bg-white-500 flex flex-col items-center justify-center">
        <div className="w-[400px] rounded mb-[50px]">
          <Image alt="image" width={800} height={800} src={logimImage} />
        </div>
        <div>
          <p className="font-medium text-[2rem] mb-[100px]">
            <a className="ml-[100px]">Welcome to TG Market Web</a>
            <br />
            <a>Your One-Stop Shop for Snacks and Food</a>
          </p>
        </div>
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center p-8 bg-gradient-to-b from-red-500 via-red-700 to-red-900">
        <form
          className="mx-auto mb-10   h-full min-w-full flex flex-col items-center justify-center align-middle"
          onSubmit={handleSubmit}
        >
          <h1 className="text-white font-semi-bold text-[2rem] mb-10 mr-[250px]">
            REGISTER
          </h1>
          <div className="mb-5">
            <label className="block mb-5 text-sm font-medium text-[18px] text-white dark:text-white">
              Name
            </label>
            <input
              type="name"
              id="name"
              className="bg-gray-50 border border-black  rounded-lg  block w-[400px] p-2.5 mb-5"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label className="block mb-5 text-sm font-medium text-[18px] text-white dark:text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-black  rounded-lg  block w-[400px] p-2.5 mb-5"
              value={email}
              onChange={handleChangeEmail}
            />
          </div>
          <div className="mb-5">
            <label className="block mb-5 text-sm font-medium text-[18px] text-white dark:text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-black  rounded-lg  block w-[400px] p-2.5 mb-5"
              value={password}
              onChange={handleChangePassword}
            />
          </div>
          <div>
            <button
              className="text-black btn btn-warning font-medium rounded-lg text-sm w-[250px] px-5 py-2.5 text-center ml-4"
              onClick={registerUser}
            >
              REGISTER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
