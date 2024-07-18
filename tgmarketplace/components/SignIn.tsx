import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { logimImage } from "@/images";
import api from "@/lib/api/api";
import { useRouter } from "next/navigation";
import ErrorModal from "@/components/errormodal";
import { error } from "console";

interface SignIn {
  email: string;
  password: string;
}

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetCode, setResetCode] = useState("");
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  // Handlers for input changes
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
    setResetCode(e.target.value);
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(e.target.value);
  };

  // Form submit handler
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await signInUser();
  };

  // Function to handle sign-in
  const signInUser = async () => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      if (response.status === 201) {
        router.push("/dashboard");
      } else {
        setErrorMessage("Invalid Email or Password");
        setIsErrorModalOpen(true);
      }
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("name", response.data.name);
      console.log(response.data.id);
      return response;
    } catch (error) {
      setErrorMessage("Invalid Email or Password");
      setIsErrorModalOpen(true);
    }
  };

  // Handler to open/close modals
  const handleForgotPasswordClick = () => {
    setIsModalOpen(true);
  };

  const handleInputVerificationClick = () => {
    setIsModalOpen(false);
    setIsVerificationModalOpen(true);
  };

  // Function to send the verification code
  const handleSendVerificationCode = async () => {
    try {
      const response = await api.post("/auth/forgot-password", {
        email,
      });
      if (response.status === 200) {
        setVerificationSent(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to verify the code
  const handleVerifyCode = async () => {
    try {
      const response = await api.post("/auth/verify-reset-code", {
        email,
        resetCode,
      });
      console.log(response.status);
      if (response.status === 201) {
        setIsResetPasswordModalOpen(true);
      } else {
        window.alert("Invalid Verification Code");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to reset the password
  const handleResetPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      console.log("Passwords do not match");
      return;
    }
    try {
      const response = await api.post("/auth/reset-password", {
        email,
        password: newPassword,
      });
      if (response.status === 201) {
        setIsResetPasswordModalOpen(false);
        setIsVerificationModalOpen(false);
        router.push("/");
      } else {
        console.log("Error resetting password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen ">
      <div className="w-1/2 bg-white-500 flex flex-col items-center justify-center">
        <div className="w-[400px] rounded mb-[50px]">
          <Image alt="image" width={800} height={800} src={logimImage} />
        </div>
        <div>
          <p className="font-medium text-[2rem] mb-[100px]">
            <a className="ml-[100px]">Welcome to TG Market Web</a>
            <br />
            <a>Your One-Stop Shop for Snacks and Food</a>
          </p>
        </div>
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center p-8 bg-gradient-to-b from-red-500 via-red-700 to-red-900">
        <form className="mx-auto mb-10   h-full min-w-full flex flex-col items-center justify-center align-middle">
          <h1 className="text-white font-semi-bold text-[2rem] mb-10 mr-[290px]">
            SIGN IN
          </h1>
          <div className="mb-5">
            <label className="block mb-5 text-sm font-medium text-[18px] text-white dark:text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-black  rounded-lg  block w-[400px] p-2.5 mb-7"
              value={email}
              onChange={handleChangeEmail}
            />
          </div>
          <div className="mb-5">
            <label className="block mb-5 text-sm font-medium text-[18px] text-white dark:text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-black  rounded-lg  block w-[400px] p-2.5 "
              value={password}
              onChange={handleChangePassword}
            />
            <label className="label-white">
              <a
                href="#"
                className="label-text-alt link hover-white text-white"
                onClick={handleForgotPasswordClick}
              >
                Forgot password?
              </a>
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="text-black btn btn-success font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-5"
              onClick={handleSubmit}
            >
              SIGN IN
            </button>
            <Link href="/register" legacyBehavior>
              <a className="text-black btn btn-warning font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-5">
                REGISTER
              </a>
            </Link>
          </div>
        </form>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Forgot Password !!</h2>
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-50 border border-black rounded-lg block w-full p-2.5 mb-4"
              value={email}
              onChange={handleChangeEmail}
            />
            <button
              className="bg-black text-white px-4 py-2 rounded"
              onClick={handleSendVerificationCode}
            >
              Send Verification Code
            </button>
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded ml-4"
              onClick={handleInputVerificationClick}
            >
              Input Verification Code
            </button>
            {verificationSent && (
              <p className="text-green-500 mt-2">Verification code sent!</p>
            )}
            <button
              className="bg-red-400 text-white px-4 py-2 rounded ml-4"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isVerificationModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Enter Verification Code
            </h2>
            <input
              type="text"
              placeholder="Enter the 6-digit code"
              className="bg-gray-50 border border-black rounded-lg block w-full p-2.5 mb-4"
              value={resetCode}
              onChange={handleChangeCode}
            />
            <button
              className="bg-black text-white px-4 py-2 rounded"
              onClick={handleVerifyCode}
            >
              Verify Code
            </button>
            <button
              className="bg-red-400 text-white px-4 py-2 rounded ml-4"
              onClick={() => setIsVerificationModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isResetPasswordModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Reset Password</h2>aw
            <input
              type="email"
              className="bg-gray-50 border border-black rounded-lg block w-full p-2.5 mb-4"
              value={email}
              disabled
            />
            <input
              type="password"
              placeholder="Enter new password"
              className="bg-gray-50 border border-black rounded-lg block w-full p-2.5 mb-4"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              className="bg-gray-50 border border-black rounded-lg block w-full p-2.5 mb-4"
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
            />
            <button
              className="bg-black text-white px-4 py-2 rounded"
              onClick={handleResetPassword}
            >
              Update Password
            </button>
            <button
              className="bg-red-400 text-white px-4 py-2 rounded ml-4"
              onClick={() => setIsResetPasswordModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isErrorModalOpen && (
        <ErrorModal
          message={errorMessage}
          onClose={() => setIsErrorModalOpen(false)}
        />
      )}
    </div>
  );
}

function setErrorMessage(arg0: string) {
  throw new Error("Function not implemented.");
}
