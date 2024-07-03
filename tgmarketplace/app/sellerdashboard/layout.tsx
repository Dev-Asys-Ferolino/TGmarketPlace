import React, { PropsWithChildren } from "react";
import Image from "next/image";
import { logimImage } from "@/images";
import Link from "next/link";
export default function SellerDashboardLayout({ children }: PropsWithChildren) {
  return (
    <main className="grid-rows-[auto_1fr]">
      <div className="navbar bg-base-400 border-red-500 border-b-2">
        <div className="flex-1">
          <div className="w-[150px] rounded ml-5">
            <Image alt="image" width={800} height={800} src={logimImage} />
          </div>
        </div>
        <div className="space-x-[80px] mr-[600px]">
          <div>
            <Link href="/sellerdashboard" legacyBehavior>
              <a className="btn btn-outline btn-error flex-1 w-[8rem]">Home</a>
            </Link>
          </div>
          <div>
            <Link href="/sellerdashboard/addproducts" legacyBehavior>
              <a className="btn btn-outline btn-error flex-1 w-[8rem]">
                Add Products
              </a>
            </Link>
          </div>
          <div>
            <Link href="/dashboard/orders" legacyBehavior>
              <a className="btn btn-outline btn-error flex-1 w-[8rem]">
                Orders
              </a>
            </Link>
          </div>
        </div>

        <div className="flex-none gap-5 mr-10">
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
              className="menu menu-sm dropdown-content bg-red-500 rounded-box z-[1] mt-3 w-52 p-2 shadow text-white"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <Link href="/dashboard" legacyBehavior>
                  <a>Be a Customer</a>
                </Link>
              </li>
              <li>
                <Link href="/signin" legacyBehavior>
                  <a>Logout</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {children}
    </main>
  );
}
