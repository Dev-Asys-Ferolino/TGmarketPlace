import React from "react";
import Image from "next/image";
import { sampleImage } from "@/images";
import { sample } from "rxjs";

export default function AddProductsPage() {
  return (
    <div>
      <div className="flex w-full flex-col lg:flex-row mt-10">
        <div className="card h-auto max-w-[65%] flex flex-row place-items-center gap-4">
          <div className="flex flex-col gap-4">
            <div className=" flex flex-row place-items-center gap-4">
              <div className="dashboardcard bg-base-100 w-96 shadow-xl border-2 border-red-400 rounded-box">
                <figure className="px-10 pt-10">
                  <Image
                    width={200}
                    height={300}
                    src={sampleImage}
                    alt="Sampleproducts"
                    className="rounded-xl"
                  />
                </figure>
                <div className="dashboardcard-body items-center text-center">
                  <h2 className="dashboardcard-title mt-4">
                    <b>Sample Products</b>
                  </h2>
                  <p className="text-red-500 mt-2">PHP 30.00</p>
                  <div className="dashboardcard-actions">
                    <button className="btn btn-outline bg-white flex-1 w-[8rem] mb-2 mt-4">
                      Edit
                    </button>
                    <button className="btn btn-outline bg-red-400 flex-1 w-[8rem] mb-2 mt-4 ml-2">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <div className="dashboardcard bg-base-100 w-96 shadow-xl border-2 border-red-400 rounded-box">
                <figure className="px-10 pt-10">
                  <Image
                    width={200}
                    height={300}
                    src={sampleImage}
                    alt="Sampleproducts"
                    className="rounded-xl"
                  />
                </figure>
                <div className="dashboardcard-body items-center text-center">
                  <h2 className="dashboardcard-title mt-4">
                    <b>Sample Products</b>
                  </h2>
                  <p className="text-red-500 mt-2">PHP 30.00</p>
                  <div className="dashboardcard-actions">
                    <button className="btn btn-outline bg-white flex-1 w-[8rem] mb-2 mt-4">
                      Edit
                    </button>
                    <button className="btn btn-outline bg-red-400 flex-1 w-[8rem] mb-2 mt-4 ml-2">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <div className="dashboardcard bg-base-100 w-96 shadow-xl border-2 border-red-400 rounded-box">
                <figure className="px-10 pt-10">
                  <Image
                    width={200}
                    height={300}
                    src={sampleImage}
                    alt="Sampleproducts"
                    className="rounded-xl"
                  />
                </figure>
                <div className="dashboardcard-body items-center text-center">
                  <h2 className="dashboardcard-title mt-4">
                    <b>Sample Products</b>
                  </h2>
                  <p className="text-red-500 mt-2">PHP 30.00</p>
                  <div className="dashboardcard-actions">
                    <button className="btn btn-outline bg-white flex-1 w-[8rem] mb-2 mt-4">
                      Edit
                    </button>
                    <button className="btn btn-outline bg-red-400 flex-1 w-[8rem] mb-2 mt-4 ml-2">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex flex-row place-items-center gap-4">
              <div className="dashboardcard bg-base-100 w-96 shadow-xl border-2 border-red-400 rounded-box">
                <figure className="px-10 pt-10">
                  <Image
                    width={200}
                    height={300}
                    src={sampleImage}
                    alt="Sampleproducts"
                    className="rounded-xl"
                  />
                </figure>
                <div className="dashboardcard-body items-center text-center">
                  <h2 className="dashboardcard-title mt-4">
                    <b>Sample Products</b>
                  </h2>
                  <p className="text-red-500 mt-2">PHP 30.00</p>
                  <div className="dashboardcard-actions">
                    <button className="btn btn-outline bg-white flex-1 w-[8rem] mb-2 mt-4">
                      Edit
                    </button>
                    <button className="btn btn-outline bg-red-400 flex-1 w-[8rem] mb-2 mt-4 ml-2">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <div className="dashboardcard bg-base-100 w-96 shadow-xl border-2 border-red-400 rounded-box">
                <figure className="px-10 pt-10">
                  <Image
                    width={200}
                    height={300}
                    src={sampleImage}
                    alt="Sampleproducts"
                    className="rounded-xl"
                  />
                </figure>
                <div className="dashboardcard-body items-center text-center">
                  <h2 className="dashboardcard-title mt-4">
                    <b>Sample Products</b>
                  </h2>
                  <p className="text-red-500 mt-2">PHP 30.00</p>
                  <div className="dashboardcard-actions">
                    <button className="btn btn-outline bg-white flex-1 w-[8rem] mb-2 mt-4">
                      Edit
                    </button>
                    <button className="btn btn-outline bg-red-400 flex-1 w-[8rem] mb-2 mt-4 ml-2">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <div className="dashboardcard bg-base-100 w-96 shadow-xl border-2 border-red-400 rounded-box">
                <figure className="px-10 pt-10">
                  <Image
                    width={200}
                    height={300}
                    src={sampleImage}
                    alt="Sampleproducts"
                    className="rounded-xl"
                  />
                </figure>
                <div className="dashboardcard-body items-center text-center">
                  <h2 className="dashboardcard-title mt-4">
                    <b>Sample Products</b>
                  </h2>
                  <p className="text-red-500 mt-2">PHP 30.00</p>
                  <div className="dashboardcard-actions">
                    <button className="btn btn-outline bg-white flex-1 w-[8rem] mb-2 mt-4">
                      Edit
                    </button>
                    <button className="btn btn-outline bg-red-400 flex-1 w-[8rem] mb-2 mt-4 ml-2">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="card rounded-box grid h-auto flex-grow place-items-center">
          <div className="text-red-500 text-[30px]">
            <b>
              <i>ADD YOUR PRODUCTS</i>
            </b>
          </div>
          <div className="dashboardcard bg-base-100 w-96 shadow-xl border-2 border-red-400 rounded-box mt-[-300px]">
            <figure className="px-10 pt-10">
              <Image
                width={200}
                height={300}
                src=""
                alt=""
                className="rounded-xl border-2 border-red-400"
              />
            </figure>
            <div className="dashboardcard-body items-center text-center">
              <h2 className="dashboardcard-title mt-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  className="input input-bordered w-full max-w-[13rem] mt-2 border-black"
                />
              </h2>
              <div className="flex flex-row align-middle justify-center">
                <p className="w-full max-w-[8rem] mt-2 pt-2">
                  <b className="ml-10">Price :</b>
                </p>
                <input
                  type="number"
                  placeholder="Php"
                  className="input input-bordered w-full max-w-[5rem] mt-2 border-black"
                />
              </div>
              <div className="flex flex-row align-middle justify-center">
                <p className="w-full max-w-[8rem] mt-2 pt-2">
                  <b>Availability :</b>
                </p>
                <input
                  type="text"
                  placeholder="Avail."
                  className="input input-bordered w-full max-w-[5rem] mt-2 border-black"
                />
              </div>
              <div className="dashboardcard-actions">
                <button className="btn btn-outline bg-red-400 flex-1 w-[13rem] mb-2 mt-4">
                  Add Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
