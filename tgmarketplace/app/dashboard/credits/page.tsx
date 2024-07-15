import { sampleImage } from "@/images";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function CreditsPage() {
  return (
    <div className="flex h-auto align-middle justify-center mt-10">
      <div className="card bg-base-100 w-full max-w-[70%] shrink-0 items-center">
        <form className="card-body">
          <div className="overflow-x-auto card h-auto w-[1000px]">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th> Product Name</th>
                  <th> Price</th>
                  <th> Quantity</th>
                  <th> Total Price:</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>1</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="h-[150px] w-[150px]">
                          <Image
                            width={800}
                            height={800}
                            src={sampleImage}
                            alt="product"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold ml-5">Softdrinks</div>
                      </div>
                    </div>
                  </td>
                  <td>30.00</td>
                  <td>3</td>
                  <td>90.00</td>
                </tr>
              </tbody>
              <tfoot className="border-t-2 border-black">
                <tr>
                  <th></th>
                  <td></td>
                  <td>Grand Total:</td>
                  <td>PHP</td>
                  <td>300.00</td>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </form>
      </div>
    </div>
  );
}
