'use client';
import React, { PropsWithChildren, useEffect, useState } from "react";
import Image from "next/image";
import { captureImage, hahaImage, logimImage, logoutImage, trolleyImage } from "@/images";
import Link from "next/link";
export default function DashboardLayout({ children }: PropsWithChildren) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userEmail = localStorage.getItem("email");
      setEmail(userEmail ? userEmail : "");
      const userName = localStorage.getItem("name");
      setName(userName ? userName : "");
    }
  },
  []);
  return (
    <main className="grid-rows-[auto_1fr] sticky-navbar sticky">
      <nav className="navbar  bg-red-500">
        <div className="flex-1">
          <div className="w-[150px] rounded ml-5">
            <Image alt="image" width={800} height={800} src={captureImage} />
          </div>
        </div>
        <div className="space-x-[50px] mr-[400px]">
          <div>
            <Link href="/sellerdashboard" legacyBehavior>
              <a className="btn border-red-400 bg-white flex-1 w-[8rem]"> Home </a>
            </Link>
          </div>
          <div>
            <Link href="/sellerdashboard/addproducts" legacyBehavior>
              <a className="btn border-red-400 bg-white flex-1 w-[8rem]">
                Add Products
              </a>
            </Link>
          </div>
          <div>
            <Link href="/sellerdashboard/Orders" legacyBehavior>
              <a className="btn border-red-400 bg-white flex-1 w-[8rem]">Orders</a>
            </Link>
          </div>
          <div>
            <Link href="/sellerdashboard/credits" legacyBehavior>
              <a className="btn border-red-400 bg-white flex-1 w-[8rem]">Credits</a>
            </Link>
          </div>
        </div>

        <div className="flex-none gap-5 mr-5">
          <div className="form-control w-[350px]">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto input-error"
            />
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <Image
                  alt="Tailwind CSS Navbar component"
                  width={800}
                  height={800}
                  src={hahaImage}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content border-red-500 bg-white border-[1px] rounded-box z-[1] mt-3 w-62 p-2 shadow text-black"
            >
              <li>
                <div className="dashboardskeleton">
                  <div>
                    <b className="border-black border-b-[1px] text-[20px]">
                      {name}
                    </b>
                    <br />
                    <span className="text-[13px]">Customer</span>
                    <div className="mt-2">{email}</div>
                  </div>
                </div>
              </li>
              <div className="flex flex-col justify-center items-center gap-1">
                <li>
                  <button className="btn bg-red-400 flex-1 w-[6rem] mt-7">
                    <Link href="/dashboard" legacyBehavior>
                      <a className="text-[13px] text-white">Be a Customer</a>
                    </Link>
                  </button>
                </li>
                <li>
                  <button className="btn bg-red-400 flex-1 w-[6rem]">
                    <Link href="/sellerform" legacyBehavior>
                      <a className="text-[13px] text-white">Change Password</a>
                    </Link>
                  </button>
                </li>
              </div>
            </ul>
          </div>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar mr-2"
          >
            <Link href="/" legacyBehavior>
              <div className="w-10 rounded-full">
                <Image
                  width={800}
                  height={800}
                  alt="logout"
                  src={logoutImage}
                />
              </div>
            </Link>
          </div>
        </div>
      </nav>
      {children}
    </main>
  );
}
