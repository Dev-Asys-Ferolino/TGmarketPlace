"use client";
import React, { PropsWithChildren, use, useEffect, useState } from "react";
import Image from "next/image";
import { captureImage, logimImage, logoutImage, trolleyImage } from "@/images";
import Link from "next/link";
import api from "@/lib/api/api";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    // Access localStorage only on the client-side
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("id");
      const userName = localStorage.getItem("name");
      const userEmail = localStorage.getItem("email");
      setId(userId ? userId : "");
      setName(userName ? userName : "");
      setEmail(userEmail ? userEmail : "");
    }
  }, []);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        console.log("This is the id" + id);
        const response = await api.get(`/users/check-vendor/${id}`);
        if (response.status === 200) {
          setIsSeller(true);
        }
        console.log(setIsSeller);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSellers();
  }, [id]);

  const router = useRouter();
  const handleLogout = async () => {
    await api.post("/auth/logout", { id: id });
    console.log("logout" + id);
    router.push("/");
  };

  return (
    <main className="grid-rows-[auto_1fr]">
      <div className="navbar bg-red-400 border-red-500 border-b-2">
        <div className="flex-1">
          <div className="w-[150px] rounded ml-5">
            <Image alt="image" width={800} height={800} src={captureImage} />
          </div>
        </div>
        <div className="space-x-[80px] mr-[300px]">
          <div>
            <Link href="/dashboard" legacyBehavior>
              <a className="btn btn-outline bg-white flex-1 w-[8rem]">Home</a>
            </Link>
          </div>
          <div>
            <Link href="/dashboard/products" legacyBehavior>
              <a className="btn btn-outline bg-white flex-1 w-[8rem]">
                Products
              </a>
            </Link>
          </div>
          <div>
            <Link href="/dashboard/orders" legacyBehavior>
              <a className="btn btn-outline bg-white flex-1 w-[8rem]">Orders</a>
            </Link>
          </div>
          <div>
            <Link href="/dashboard/credits" legacyBehavior>
              <a className="btn btn-outline bg-white flex-1 w-[8rem]">
                Credits
              </a>
            </Link>
          </div>
        </div>

        <div className="flex-none gap-5 mr-5">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost bg-transparent hover-none btn-circle avatar mr-2"
          >
            <Link href="/dashboard/cart" legacyBehavior>
              <div className="w-10 rounded-full">
                <Image width={800} height={800} alt="cart" src={trolleyImage} />
              </div>
            </Link>
          </div>
          <div className="form-control">
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
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
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
                {isSeller ? (
                  <li>
                    <button className="btn bg-red-400 flex-1 w-[6rem] mt-7">
                      <Link href="/sellerdashboard" legacyBehavior>
                        <a className="text-[13px] text-white">My Products</a>
                      </Link>
                    </button>
                  </li>
                ) : (
                  <li>
                    <button className="btn bg-red-400 flex-1 w-[6rem] mt-7">
                      <Link href="/sellerform" legacyBehavior>
                        <a className="text-[13px] text-white">Be a Seller</a>
                      </Link>
                    </button>
                  </li>
                )}
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
            <a onClick={handleLogout}>
              <div className="w-10 rounded-full">
                <Image
                  width={800}
                  height={800}
                  alt="logout"
                  src={logoutImage}
                />
              </div>
            </a>
          </div>
        </div>
      </div>
      {children}

      {/* <footer className="dashboardfooter-sticky bg-black text-white p-10 flex flex-row justify-between mt-10">
        <nav className="flex flex-col gap-4">
          <h6 className="dashboardfooter-title">
            {" "}
            <b>Services</b>
          </h6>
          <a className="dashboardlink dashboardlink-hover">Branding</a>
          <a className="dashboardlink dashboardlink-hover">Design</a>
          <a className="dashboardlink dashboardlink-hover">Marketing</a>
          <a className="dashboardlink dashboardlink-hover">Advertisement</a>
        </nav>
        <nav className="flex flex-col gap-4">
          <h6 className="dashboardfooter-title">
            <b>Company</b>
          </h6>
          <a className="dashboardlink dashboardlink-hover">About us</a>
          <a className="dashboardlink dashboardlink-hover">Contact</a>
          <a className="dashboardlink dashboardlink-hover">Jobs</a>
          <a className="dashboardlink dashboardlink-hover">Press kit</a>
        </nav>
        <nav className="flex flex-col gap-4">
          <h6 className="dashboardfooter-title">
            <b>Legal</b>
          </h6>
          <a className="dashboardlink dashboardlink-hover">Terms of use</a>
          <a className="dashboardlink dashboardlink-hover">Privacy policy</a>
          <a className="dashboardlink dashboardlink-hover">Cookie policy</a>
        </nav>
      </footer> */}
      {/* <footer className="dashboardfooter sticky bg-base-200 text-base-content border-base-300 border-t px-10 py-4 flex flex-row justify-between mt-10 max-w-screen">
        <aside className="grid-flow-row items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current"
          >
            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>
          <p>
            ACME Industries Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </footer> */}
    </main>
  );
}
