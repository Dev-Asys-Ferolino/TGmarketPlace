"use client";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import api from "@/lib/api/api";
import { useRouter } from "next/navigation";

const Sellerform = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const router = useRouter();
  const handleChange = (e: any) => {
    setName(e.target.value);
  };
  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handleChangePhone = (e: any) => {
    setPhone(e.target.value);
  };
  const handleChangeDescription = (e: any) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await sellerUser();
  };
  const handleDropdownChange = () => {
    const dropdownElement = document.querySelector(
      ".select.select-bordered.w-full.max-w-xs.border-red-300.border-\\[1px\\]"
    );
    if (
      dropdownElement !== null &&
      dropdownElement instanceof HTMLSelectElement
    ) {
      setDepartment(dropdownElement.value);
    }
  };

  const sellerUser = async () => {
    try {
      const response = await api.post("/users/register-vendor", {
        name,
        email,
        phone,
        description,
        department,
      });
      router.push("/sellerdashboard");
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    router.push("/dashboard");
  };
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
              type="name"
              className="input input-bordered border-red-300 border-[1px]"
              required
              value={name}
              onChange={handleChange}
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
              value={email}
              onChange={handleChangeEmail}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="phone"
              className="input input-bordered border-red-300 border-[1px]"
              maxLength={11}
              required
              value={phone}
              onChange={handleChangePhone}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Department</span>
            </label>
            <select
              className="select select-bordered w-full max-w-xs border-red-300 border-[1px]"
              value={department}
              onChange={handleDropdownChange}
            >
              <option value="SoftDev">SoftDev</option>
              <option value="Project Owner">Project Owner</option>
              <option value="Infrastracture">Infrastracture</option>
              <option value="API team">API team</option>
            </select>
          </div>
          <div className="form-control">
            <textarea
              className="textarea textarea-bordered border-red-300 border-[1px]"
              placeholder="Description"
              value={description}
              onChange={handleChangeDescription}
            ></textarea>
          </div>
          <div>
            <button
              className="btn btn-neutral flex-1 w-[8rem] mt-2 bg-black text-white"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="btn btn-error flex-1 w-[8rem] mt-2 bg-red-500 text-white ml-3"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
