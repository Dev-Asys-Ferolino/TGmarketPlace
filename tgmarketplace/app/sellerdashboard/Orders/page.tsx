"use client";
import React, { useState } from "react";
import Image from "next/image";
import { sampleImage } from "@/images";

export default function OrdersPage() {
  const [status, setStatus] = useState("Delivered");

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };
  return (
    <div>
      <div className="flex w-full flex-col lg:flex-row mt-10 justify-center">
        <div className="card h-auto border-2 border-red-400 rounded-box w-[75%]">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Order/Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <td>1</td>
                  <td>F Jay E. Ferolino</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-20 w-20">
                          <Image
                            width={800}
                            height={800}
                            src={sampleImage}
                            alt="product"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Softdrinks</div>
                      </div>
                    </div>
                  </td>
                  <td>40</td>
                  <td>2</td>
                  <td>80</td>
                  <td>
                    <select
                      className={`btn flex-1 w-[8rem] mb-2 mt-4 ${
                        status === "Delivered" ? "bg-green-400" : "bg-red-400"
                      }`}
                      value={status}
                      onChange={handleStatusChange}
                    >
                      <option>Delivered</option>
                      <option>Pending</option>
                    </select>
                  </td>
                </tr>
                {/* row 2 */}
                <tr>
                  <td>2</td>
                  <td>Michael Desucatan</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-20 w-20">
                          <Image
                            width={800}
                            height={800}
                            src={sampleImage}
                            alt="product"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Softdrinks</div>
                      </div>
                    </div>
                  </td>
                  <td>40</td>
                  <td>2</td>
                  <td>80</td>
                  <td>
                    <select
                      className={`btn flex-1 w-[8rem] mb-2 mt-4 ${
                        status === "Delivered" ? "bg-green-400" : "bg-red-400"
                      }`}
                      value={status}
                      onChange={handleStatusChange}
                    >
                      <option>Delivered</option>
                      <option>Pending</option>
                    </select>
                  </td>
                </tr>
                {/* row 2 */}
                <tr>
                  <td>2</td>
                  <td>Sheldon Bacalso</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-20 w-20">
                          <Image
                            width={800}
                            height={800}
                            src={sampleImage}
                            alt="product"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Softdrinks</div>
                      </div>
                    </div>
                  </td>
                  <td>40</td>
                  <td>2</td>
                  <td>80</td>
                  <td>
                    <select
                      className={`btn flex-1 w-[8rem] mb-2 mt-4 ${
                        status === "Delivered" ? "bg-green-400" : "bg-red-400"
                      }`}
                      value={status}
                      onChange={handleStatusChange}
                    >
                      <option>Delivered</option>
                      <option>Pending</option>
                    </select>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th></th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <b>TOTAL :</b>
                  </td>
                  <td>160</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
