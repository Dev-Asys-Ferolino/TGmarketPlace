import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sampleImage } from "@/images";

export default function SellerDashboardPage() {
  return (
    <div className="flex w-full flex-col lg:flex-col">
      <div className="hero-content text-neutral-content text-center">
        <div className="w-[900px] h-[250px] rounded-[20px] border-red-500 border-2 mt-10 ml-[600px]">
          <h1 className="mb-5 text-5xl font-bold mt-10 text-black">
            What is New
          </h1>
          <p className="mb-5 text-black">
            Your One-Stop Shop for Snacks and Food
          </p>
          {/* <button className="btn btn-primary">See Products</button> */}
          <Link href="/sellerdashboard/addproducts" legacyBehavior>
            <a className="btn btn-outline btn-error flex-1 w-[8rem]">
              Add Products
            </a>
          </Link>
        </div>
      </div>
      <div className="rounded-[20px] mx-auto max-w-[1200px] w-full overflow-hidden flex gap-4 flex-wrap mt-10">
        <div className="flex flex-row gap-4 ml-1">
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
            <div className="dashboardcard-body">
              <h2 className="dashboardcard-title mt-4 mb-4">
                <b>Sample Products</b>
              </h2>
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
            <div className="dashboardcard-body">
              <h2 className="dashboardcard-title mt-4">
                <b>Sample Products</b>
              </h2>
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
            <div className="dashboardcard-body">
              <h2 className="dashboardcard-title mt-4">
                <b>Sample Products</b>
              </h2>
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
          <div className="dashboardcard-body">
            <h2 className="dashboardcard-title mt-4 mb-4">
              <b>Sample Products</b>
            </h2>
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
          <div className="dashboardcard-body">
            <h2 className="dashboardcard-title mt-4 mb-4">
              <b>Sample Products</b>
            </h2>
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
          <div className="dashboardcard-body">
            <h2 className="dashboardcard-title mt-4 mb-4">
              <b>Sample Products</b>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
