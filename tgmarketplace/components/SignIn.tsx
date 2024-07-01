import Link from "next/link";
import React from "react";
import Image from "next/image";
import { logimImage } from "@/images";

export default function SignIn() {
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
        <form className="mx-auto mb-10   h-full min-w-full flex flex-col items-center justify-center align-middle">
          <h1 className="text-white font-semi-bold text-[2rem] mb-10 mr-[290px]">
            SIGN IN
          </h1>
          <div className="mb-5">
            <label className="block mb-5 text-sm font-medium text-[18px] text-white dark:text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-black  rounded-lg  block w-[400px] p-2.5 mb-7"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-5 text-sm font-medium text-[18px] text-white dark:text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-black  rounded-lg  block w-[400px] p-2.5 mb-10"
            />
          </div>
          <div>
            <Link href="/dashboard" legacyBehavior>
              <a className="text-black btn btn-success font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-5">
                SIGN IN
              </a>
            </Link>
            {/* <button
              type="submit"
              className="text-black btn btn-warning font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-5"
            >
              REGISTER
            </button> */}
            <Link href="/register" legacyBehavior>
              <a className="text-black btn btn-warning font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-5">
                REGISTER
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
