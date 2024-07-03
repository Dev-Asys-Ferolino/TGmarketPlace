import Link from "next/link";
import React from "react";

export default function CreditsPage() {
  return (
    <div className="flex h-auto align-middle justify-center mt-10">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl border-red-400 border-2 mt-10">
        <form className="card-body">
          <div className="overflow-x-auto">
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
                  <td>Biscuits</td>
                  <td>30.00</td>
                  <td>3</td>
                  <td>90.00</td>
                </tr>
                {/* row 2 */}
                <tr>
                  <th>2</th>
                  <td>Biscuits</td>
                  <td>30.00</td>
                  <td>3</td>
                  <td>90.00</td>
                </tr>
                {/* row 3 */}
                <tr>
                  <th>4</th>
                  <td>Biscuits</td>
                  <td>30.00</td>
                  <td>3</td>
                  <td>90.00</td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>Biscuits</td>
                  <td>30.00</td>
                  <td>3</td>
                  <td>90.00</td>
                </tr>
                <tr>
                  <th>5</th>
                  <td>Biscuits</td>
                  <td>30.00</td>
                  <td>3</td>
                  <td>90.00</td>
                </tr>
                <tr>
                  <th>6</th>
                  <td>Biscuits</td>
                  <td>30.00</td>
                  <td>3</td>
                  <td>90.00</td>
                </tr>
              </tbody>
              <tfoot>
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
