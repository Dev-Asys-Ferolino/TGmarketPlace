import React from "react";
import Image from "next/image";
import { sampleImage } from "@/images";

export default function Page() {
  return (
    <div className="flex h-auto align-middle justify-center mt-10">
      <div className="card bg-base-100 w-full max-w-[90%] shrink-0 flex flex-col justify-center">
        <form className="card-body flex flex-row gap-4 max-w-[80%]">
          <div className="overflow-x-auto card h-auto border-2 border-red-400 rounded-box w-[450px]">
            <div>
              <div className="flex w-62 flex-row gap-4 mr-4">
                <div className="dashboardskeleton h-42 w-[3000px]">
                  <Image
                    width={300}
                    height={500}
                    src={sampleImage}
                    alt=""
                    className=" ml-[10px] w-[160px] h-[170px] mt-9"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="dashboardcard-body items-center text-center">
                    <h2 className="dashboardcard-title mt-4">
                      <b className="text-[20px] border-black border-b-[1px]">
                        Sample Product
                      </b>
                    </h2>
                    <div className="flex flex-row align-middle justify-center">
                      <p className="w-full max-w-[rem] mt-2 pt-2">
                        <b>Price :</b>
                      </p>
                      <p className="w-full max-w-[6rem] mt-4 border-black border-[1px] rounded-[10px] mr-6">
                        PHP 30.00
                      </p>
                    </div>
                    <div className="flex flex-row align-middle justify-center">
                      <p className="w-full max-w-[rem] mt-2 pt-2">
                        <b>Avail. :</b>
                      </p>
                      <p className="w-full max-w-[6rem] mt-4 border-black border-[1px] rounded-[10px] mr-6">
                        10
                      </p>
                    </div>

                    <div className="flex flex-row align-middle justify-center">
                      <p className="w-full max-w-[rem] mt-2 pt-2">
                        <b>Pieces :</b>
                      </p>
                      <p className="w-full max-w-[6rem] mt-4 mr-6">
                        <input
                          type="number"
                          className="w-[5.7rem] border-black border-[1px] rounded-[10px] text-center"
                        />
                      </p>
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
          <div className="overflow-x-auto card h-auto border-2 border-red-400 rounded-box w-[450px]">
            <div className="">
              <div className="flex w-62 flex-row gap-4 mr-4">
                <div className="dashboardskeleton h-42 w-[3000px]">
                  <Image
                    width={300}
                    height={500}
                    src={sampleImage}
                    alt=""
                    className=" ml-[10px] w-[160px] h-[170px] mt-9"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="dashboardcard-body items-center text-center">
                    <h2 className="dashboardcard-title mt-4">
                      <b className="text-[20px] border-black border-b-[1px]">
                        Sample Product
                      </b>
                    </h2>
                    <div className="flex flex-row align-middle justify-center">
                      <p className="w-full max-w-[rem] mt-2 pt-2">
                        <b>Price :</b>
                      </p>
                      <p className="w-full max-w-[6rem] mt-4 border-black border-[1px] rounded-[10px] mr-6">
                        PHP 30.00
                      </p>
                    </div>
                    <div className="flex flex-row align-middle justify-center">
                      <p className="w-full max-w-[rem] mt-2 pt-2">
                        <b>Avail. :</b>
                      </p>
                      <p className="w-full max-w-[6rem] mt-4 border-black border-[1px] rounded-[10px] mr-6">
                        10
                      </p>
                    </div>

                    <div className="flex flex-row align-middle justify-center">
                      <p className="w-full max-w-[rem] mt-2 pt-2">
                        <b>Pieces :</b>
                      </p>
                      <p className="w-full max-w-[6rem] mt-4 mr-6">
                        <input
                          type="number"
                          className="w-[5.7rem] border-black border-[1px] rounded-[10px] text-center"
                        />
                      </p>
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
          <div className="overflow-x-auto card h-auto border-2 border-red-400 rounded-box w-[450px]">
            <div className="">
              <div className="flex w-62 flex-row gap-4 mr-4">
                <div className="dashboardskeleton h-42 w-[3000px]">
                  <Image
                    width={300}
                    height={500}
                    src={sampleImage}
                    alt=""
                    className=" ml-[10px] w-[160px] h-[170px] mt-9"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="dashboardcard-body items-center text-center">
                    <h2 className="dashboardcard-title mt-4">
                      <b className="text-[20px] border-black border-b-[1px]">
                        Sample Product
                      </b>
                    </h2>
                    <div className="flex flex-row align-middle justify-center">
                      <p className="w-full max-w-[rem] mt-2 pt-2">
                        <b>Price :</b>
                      </p>
                      <p className="w-full max-w-[6rem] mt-4 border-black border-[1px] rounded-[10px] mr-6">
                        PHP 30.00
                      </p>
                    </div>
                    <div className="flex flex-row align-middle justify-center">
                      <p className="w-full max-w-[rem] mt-2 pt-2">
                        <b>Avail. :</b>
                      </p>
                      <p className="w-full max-w-[6rem] mt-4 border-black border-[1px] rounded-[10px] mr-6">
                        10
                      </p>
                    </div>

                    <div className="flex flex-row align-middle justify-center">
                      <p className="w-full max-w-[rem] mt-2 pt-2">
                        <b>Pieces :</b>
                      </p>
                      <p className="w-full max-w-[6rem] mt-4 mr-6">
                        <input
                          type="number"
                          className="w-[5.7rem] border-black border-[1px] rounded-[10px] text-center"
                        />
                      </p>
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
        </form>
        <form className="card-body flex flex-row gap-4 max-w-[80%]">
          <div className="overflow-x-auto card h-auto border-2 border-red-400 rounded-box w-[450px]">
            <div>
              <div className="flex w-62 flex-row gap-4 mr-4">
                <div className="dashboardskeleton h-42 w-[3000px]">
                  <Image
                    width={300}
                    height={500}
                    src={sampleImage}
                    alt=""
                    className=" ml-[10px] w-[160px] h-[170px] mt-9"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="dashboardcard-body items-center text-center">
                    <h2 className="dashboardcard-title mt-4">
                      <b className="text-[20px] border-black border-b-[1px]">
                        Sample Product
                      </b>
                    </h2>
                    <div className="flex flex-row align-middle justify-center">
                      <p className="w-full max-w-[rem] mt-2 pt-2">
                        <b>Price :</b>
                      </p>
                      <p className="w-full max-w-[6rem] mt-4 border-black border-[1px] rounded-[10px] mr-6">
                        PHP 30.00
                      </p>
                    </div>
                    <div className="flex flex-row align-middle justify-center">
                      <p className="w-full max-w-[rem] mt-2 pt-2">
                        <b>Avail. :</b>
                      </p>
                      <p className="w-full max-w-[6rem] mt-4 border-black border-[1px] rounded-[10px] mr-6">
                        10
                      </p>
                    </div>

                    <div className="flex flex-row align-middle justify-center">
                      <p className="w-full max-w-[rem] mt-2 pt-2">
                        <b>Pieces :</b>
                      </p>
                      <p className="w-full max-w-[6rem] mt-4 mr-6">
                        <input
                          type="number"
                          className="w-[5.7rem] border-black border-[1px] rounded-[10px] text-center"
                        />
                      </p>
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
          <div className="overflow-x-auto card h-auto border-2 border-red-400 rounded-box w-[450px]">
            <div className="">
              <div className="flex w-62 flex-row gap-4 mr-4">
                <div className="dashboardskeleton h-42 w-[3000px]">
                  <Image
                    width={300}
                    height={500}
                    src={sampleImage}
                    alt=""
                    className=" ml-[10px] w-[160px] h-[170px] mt-9"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="dashboardcard-body items-center text-center">
                    <h2 className="dashboardcard-title mt-4">
                      <b className="text-[20px] border-black border-b-[1px]">
                        Sample Product
                      </b>
                    </h2>
                    <div className="flex flex-row align-middle justify-center">
                      <p className="w-full max-w-[rem] mt-2 pt-2">
                        <b>Price :</b>
                      </p>
                      <p className="w-full max-w-[6rem] mt-4 border-black border-[1px] rounded-[10px] mr-6">
                        PHP 30.00
                      </p>
                    </div>
                    <div className="flex flex-row align-middle justify-center">
                      <p className="w-full max-w-[rem] mt-2 pt-2">
                        <b>Avail. :</b>
                      </p>
                      <p className="w-full max-w-[6rem] mt-4 border-black border-[1px] rounded-[10px] mr-6">
                        10
                      </p>
                    </div>

                    <div className="flex flex-row align-middle justify-center">
                      <p className="w-full max-w-[rem] mt-2 pt-2">
                        <b>Pieces :</b>
                      </p>
                      <p className="w-full max-w-[6rem] mt-4 mr-6">
                        <input
                          type="number"
                          className="w-[5.7rem] border-black border-[1px] rounded-[10px] text-center"
                        />
                      </p>
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
          <div className="overflow-x-auto card h-auto border-2 border-red-400 rounded-box w-[450px]">
            <div className="">
              <div className="flex w-62 flex-row gap-4 mr-4">
                <div className="dashboardskeleton h-42 w-[3000px]">
                  <Image
                    width={300}
                    height={500}
                    src={sampleImage}
                    alt=""
                    className=" ml-[10px] w-[160px] h-[170px] mt-9"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="dashboardcard-body items-center text-center">
                    <h2 className="dashboardcard-title mt-4">
                      <b className="text-[20px] border-black border-b-[1px]">
                        Sample Product
                      </b>
                    </h2>
                    <div className="flex flex-row align-middle justify-center">
                      <p className="w-full max-w-[rem] mt-2 pt-2">
                        <b>Price :</b>
                      </p>
                      <p className="w-full max-w-[6rem] mt-4 border-black border-[1px] rounded-[10px] mr-6">
                        PHP 30.00
                      </p>
                    </div>
                    <div className="flex flex-row align-middle justify-center">
                      <p className="w-full max-w-[rem] mt-2 pt-2">
                        <b>Avail. :</b>
                      </p>
                      <p className="w-full max-w-[6rem] mt-4 border-black border-[1px] rounded-[10px] mr-6">
                        10
                      </p>
                    </div>

                    <div className="flex flex-row align-middle justify-center">
                      <p className="w-full max-w-[rem] mt-2 pt-2">
                        <b>Pieces :</b>
                      </p>
                      <p className="w-full max-w-[6rem] mt-4 mr-6">
                        <input
                          type="number"
                          className="w-[5.7rem] border-black border-[1px] rounded-[10px] text-center"
                        />
                      </p>
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
        </form>
      </div>
    </div>
  );
}
