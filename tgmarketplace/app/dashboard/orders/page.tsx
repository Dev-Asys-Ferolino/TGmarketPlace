import React from "react";

const page = () => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Order</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Status</th>
              <th>Date Purchase</th>
              <th>MOP</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-20 w-20">
                      <img
                        src="https://th.bing.com/th/id/OIP.CDJGwkRm4rcE0iqbyIahuAHaE8?w=262&h=180&c=7&r=0&o=5&pid=1.7"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Softdrinks</div>
                  </div>
                </div>
              </td>
              <td>5</td>
              <td>500</td>
              <td>Pending</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
