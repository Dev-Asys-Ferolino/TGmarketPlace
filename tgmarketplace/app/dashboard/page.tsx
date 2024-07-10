import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sampleImage } from "@/images";
interface Product {
  name: string;
  price: number;
  stock: number;
  description: string;
  ProductImage: ProductImage[];
}
interface ProductImage {
  image_url: string;
}
export default function DashboardPage() {
  return (
    <div>
      <div className="hero-content text-neutral-content text-center">
        <div className="w-[900px] h-[250px] rounded-[20px] border-red-500 border-2 mt-10 ml-[600px]">
          <h1 className="mb-5 text-5xl font-bold mt-10 text-black">
            What is New
          </h1>
          <p className="mb-5 text-black">
            Your One-Stop Shop for Snacks and Food
          </p>
          {/* <button className="btn btn-primary">See Products</button> */}
          <Link href="/dashboard/products" legacyBehavior>
            <a className="btn btn-outline btn-error flex-1 w-[8rem]">
              See Products
            </a>
          </Link>
        </div>
      </div>
      <div className="rounded-[20px] mx-auto max-w-[1200px] w-full overflow-hidden flex gap-4 flex-wrap">
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
      </div>
    </div>
  );
}
