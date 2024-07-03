import Link from "next/link";
import React from "react";

const Sellerform = () => {
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl flex align-center justify-center border-red-500 border-2">
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Name"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone Number</span>
          </label>
          <input
            type="password"
            placeholder="Phone Number"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <textarea
            className="textarea textarea-bordered mt-3"
            placeholder="Description"
          ></textarea>
        </div>
        <Link href="/sellerdashboard" legacyBehavior>
          <a className="btn btn-outline btn-error flex-1 w-[8rem]">
            Be a Seller
          </a>
        </Link>
      </form>
    </div>
  );
};

export default Sellerform;
