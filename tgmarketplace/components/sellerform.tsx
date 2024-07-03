import Link from "next/link";
import React from "react";

export default function SellerFormPage() {
  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text ml-20">
                <b>
                  <i>Seller Form</i>
                </b>
              </span>
            </label>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="email"
              className="input input-bordered border-red-300 border-[1px]"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered border-red-300 border-[1px]"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="password"
              className="input input-bordered border-red-300 border-[1px]"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Department</span>
            </label>
            <select className="select select-bordered w-full max-w-xs border-red-300 border-[1px]">
              <option disabled selected>
                SoftDev
              </option>
              <option>Project Owner</option>
              <option>Infrastracture</option>
              <option>API team</option>
            </select>
          </div>
          <div className="form-control">
            <textarea
              className="textarea textarea-bordered border-red-300 border-[1px]"
              placeholder="Description"
            ></textarea>
          </div>
          <div>
            <Link href="/sellerdashboard" legacyBehavior>
              <a className="btn btn-neutral flex-1 w-[8rem] mt-2 bg-black text-white">
                Submit
              </a>
            </Link>
            <Link href="/dashboard" legacyBehavior>
              <a className="btn btn-error flex-1 w-[8rem] mt-2 bg-red-500 text-white ml-3">
                Cancel
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
