import React from "react";
import Image from "next/image";
import { sampleImage } from "@/images";

export default function ProductsPage() {
  return (
    <div className="flex flex-col mt-10 ">
      <div className="rounded-[20px] mx-auto max-w-[1600px] w-full overflow-hidden flex gap-4 flex-wrap">
        <div className="dashboardcard bg-base-100 w-96 shadow-xl border-2 border-red-400 rounded-box flex flex-col gap-4 text-center ml-1">
          <figure className="px-10 pt-10 ml-[60px]">
            <Image
              width={200}
              height={300}
              src={sampleImage}
              alt="Sampleproducts"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body text-center">
            <h2 className="card-title justify-center">Sample Products</h2>
            <p className="text-red-500 mt-1">PHP 30.00</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary">Add To Cart</button>
            </div>
          </div>
        </div>
        <div className="dashboardcard bg-base-100 w-96 shadow-xl border-2 border-red-400 rounded-box flex flex-col gap-4 text-center">
          <figure className="px-10 pt-10 ml-[60px]">
            <Image
              width={200}
              height={300}
              src={sampleImage}
              alt="Sampleproducts"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body text-center">
            <h2 className="card-title justify-center">Sample Products</h2>
            <p className="text-red-500 mt-1">PHP 30.00</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary">Add To Cart</button>
            </div>
          </div>
        </div>
        <div className="dashboardcard bg-base-100 w-96 shadow-xl border-2 border-red-400 rounded-box flex flex-col gap-4 text-center">
          <figure className="px-10 pt-10 ml-[60px]">
            <Image
              width={200}
              height={300}
              src={sampleImage}
              alt="Sampleproducts"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body text-center">
            <h2 className="card-title justify-center">Sample Products</h2>
            <p className="text-red-500 mt-1">PHP 30.00</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary">Add To Cart</button>
            </div>
          </div>
        </div>
        <div className="dashboardcard bg-base-100 w-96 shadow-xl border-2 border-red-400 rounded-box flex flex-col gap-4 text-center">
          <figure className="px-10 pt-10 ml-[60px]">
            <Image
              width={200}
              height={300}
              src={sampleImage}
              alt="Sampleproducts"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body text-center">
            <h2 className="card-title justify-center">Sample Products</h2>
            <p className="text-red-500 mt-1">PHP 30.00</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary">Add To Cart</button>
            </div>
          </div>
        </div>
        <div className="dashboardcard bg-base-100 w-96 shadow-xl border-2 border-red-400 rounded-box flex flex-col gap-4 text-center ml-1">
          <figure className="px-10 pt-10 ml-[60px]">
            <Image
              width={200}
              height={300}
              src={sampleImage}
              alt="Sampleproducts"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body text-center">
            <h2 className="card-title justify-center">Sample Products</h2>
            <p className="text-red-500 mt-1">PHP 30.00</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary">Add To Cart</button>
            </div>
          </div>
        </div>
        <div className="dashboardcard bg-base-100 w-96 shadow-xl border-2 border-red-400 rounded-box flex flex-col gap-4 text-center">
          <figure className="px-10 pt-10 ml-[60px]">
            <Image
              width={200}
              height={300}
              src={sampleImage}
              alt="Sampleproducts"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body text-center">
            <h2 className="card-title justify-center">Sample Products</h2>
            <p className="text-red-500 mt-1">PHP 30.00</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary">Add To Cart</button>
            </div>
          </div>
        </div>
        <div className="dashboardcard bg-base-100 w-96 shadow-xl border-2 border-red-400 rounded-box flex flex-col gap-4 text-center">
          <figure className="px-10 pt-10 ml-[60px]">
            <Image
              width={200}
              height={300}
              src={sampleImage}
              alt="Sampleproducts"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body text-center">
            <h2 className="card-title justify-center">Sample Products</h2>
            <p className="text-red-500 mt-1">PHP 30.00</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary">Add To Cart</button>
            </div>
          </div>
        </div>
        <div className="dashboardcard bg-base-100 w-96 shadow-xl border-2 border-red-400 rounded-box flex flex-col gap-4 text-center">
          <figure className="px-10 pt-10 ml-[60px]">
            <Image
              width={200}
              height={300}
              src={sampleImage}
              alt="Sampleproducts"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body text-center">
            <h2 className="card-title justify-center">Sample Products</h2>
            <p className="text-red-500 mt-1">PHP 30.00</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary">Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
