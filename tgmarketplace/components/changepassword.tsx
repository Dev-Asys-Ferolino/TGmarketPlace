"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/api/api";
import { useRouter } from "next/navigation";

interface Password {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  email: string;
}

export default function ChangePassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmnewPassword, setConfirmnewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null); // For displaying error messages

  useEffect(() => {
    if (confirmPassword !== confirmnewPassword) {
      setError("Passwords do not match");
    } else {
      setError(null);
    }
  }, [confirmPassword,confirmnewPassword, error]);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  
  const handleCurrentPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  
  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

 const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmnewPassword(e.target.value);
  };

  const handleSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirmPassword !== confirmnewPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await api.post<Password[]>("/auth/change-password", {
        oldPassword: password,
        newPassword: confirmPassword,
        email,
      });
      console.log(response);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      setError("Failed to change password. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mt-10 flex justify-center items-center">
        <form className="card-body" onSubmit={handleSubmitPassword}>
          <div className="form-control">
            <label className="label">
              <span className="label-text ml-20">
                <b>
                  <i>Change Password</i>
                </b>
              </span>
            </label>
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered border-red-300 border-[1px]"
              required
              onChange={handleEmail}
              value={email}
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Current Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered border-red-300 border-[1px]"
              required
              onChange={handleCurrentPassword}
              value={password}
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">New Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered border-red-300 border-[1px]"
              required
              onChange={handleNewPassword}
              value={confirmPassword}
            />
          </div>
          
            <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm New Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered border-red-300 border-[1px]"
              required
              onChange={handleConfirmPassword}
              value={confirmnewPassword}
            />
          </div>
          {error && (
            <div className="form-control">
              <p className="text-red-500">{error}</p>
            </div>
          )}
          
          <div>
            <button
              className="btn btn-neutral flex-1 w-[8rem] mt-2 ml-[60px] bg-black text-white"
              type="submit"
            >
              Submit Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

