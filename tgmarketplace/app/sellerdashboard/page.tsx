import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function SellerDashboardPage() {
  return (
    <div>
      <div className="hero-content text-neutral-content text-center">
        <div className="w-[900px] h-[250px] rounded-[20px] border-red-500 border-2 mt-10 ml-[600px]">
          <h1 className="mb-5 text-5xl font-bold mt-10 text-black">
            What's New
          </h1>
          <p className="mb-5 text-black">
            Your One-Stop Shop for Snacks and Food
          </p>
          {/* <button className="btn btn-primary">See Products</button> */}
          <Link href="/dashboard/products" legacyBehavior>
            <a className="btn btn-outline btn-error flex-1 w-[8rem]">Orders</a>
          </Link>
        </div>
      </div>
      <div className="rounded-[20px] mx-auto max-w-[1440px] w-full overflow-hidden flex gap-4 flex-wrap">
        <div className="flex flex-col max-w-sm flex-1 border-red-400 border-2">
          <div className="w-full">
            <Image
              width={800}
              height={800}
              src="https://th.bing.com/th/id/OIP.CDJGwkRm4rcE0iqbyIahuAHaE8?w=262&h=180&c=7&r=0&o=5&pid=1.7"
              alt="Shoes"
              className="W-full"
            />
          </div>
          <div className="card-body">
            <h2 className="card-title">Biscuits</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Add To Cart</button>
            </div>
          </div>
        </div>
        <div className="flex flex-col max-w-sm flex-1 border-red-400 border-2">
          <div className="w-full">
            <Image
              width={800}
              height={800}
              src="https://th.bing.com/th/id/OIP.CDJGwkRm4rcE0iqbyIahuAHaE8?w=262&h=180&c=7&r=0&o=5&pid=1.7"
              alt="Shoes"
              className="W-full"
            />
          </div>
          <div className="card-body">
            <h2 className="card-title">Biscuits</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Add To Cart</button>
            </div>
          </div>
        </div>
        <div className="flex flex-col max-w-sm flex-1 border-red-400 border-2">
          <div className="w-full">
            <Image
              width={800}
              height={800}
              src="https://th.bing.com/th/id/OIP.CDJGwkRm4rcE0iqbyIahuAHaE8?w=262&h=180&c=7&r=0&o=5&pid=1.7"
              alt="Shoes"
              className="W-full"
            />
          </div>
          <div className="card-body">
            <h2 className="card-title">Biscuits</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Add To Cart</button>
            </div>
          </div>
        </div>
        <div className="flex flex-col max-w-sm flex-1 border-red-400 border-2">
          <div className="w-full">
            <Image
              width={800}
              height={800}
              src="https://th.bing.com/th/id/OIP.CDJGwkRm4rcE0iqbyIahuAHaE8?w=262&h=180&c=7&r=0&o=5&pid=1.7"
              alt="Shoes"
              className="W-full"
            />
          </div>
          <div className="card-body">
            <h2 className="card-title">Biscuits</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
