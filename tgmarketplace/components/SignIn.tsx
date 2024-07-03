import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { logimImage } from "@/images";
import api from "@/lib/api/api";
import { useRouter } from "next/navigation";

interface SignIn {
  email: string;
  password: string;
}

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await signInUser();
  };

  const signInUser = async () => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      router.push("/dashboard");
      if (response.status === 401) {
        setErrorMessage("Invalid email or password");
      }
      localStorage.setItem("id", response.data.id);
      console.log(response.data.id);
      return response;
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
              className="bg-gray-50 border border-black  rounded-lg  block w-[400px] p-2.5 mb-10"
              value={password}
              onChange={handleChangePassword}
            />
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
    </div>
  );
}

function setErrorMessage(arg0: string) {
  throw new Error("Function not implemented.");
}
//   return (
//     <div className="flex h-screen ">
//       <div className="w-1/2 bg-white-500 flex flex-col items-center justify-center">
//         <div className="w-[400px] rounded mb-[50px]">
//           <Image alt="image" width={800} height={800} src={logimImage} />
//         </div>
//         <div>
//           <p className="font-medium text-[2rem] mb-[100px]">
//             <a className="ml-[100px]">Welcome to TG Market Web</a>
//             <br />
//             <a>Your One-Stop Shop for Snacks and Food</a>
//           </p>
//         </div>
//       </div>

//       <div className="w-1/2 flex flex-col justify-center items-center p-8 bg-gradient-to-b from-red-500 via-red-700 to-red-900">
//         <form className="mx-auto mb-10   h-full min-w-full flex flex-col items-center justify-center align-middle">
//           <h1 className="text-white font-semi-bold text-[2rem] mb-10 mr-[290px]">
//             SIGN IN
//           </h1>
//           <div className="mb-5">
//             <label className="block mb-5 text-sm font-medium text-[18px] text-white dark:text-white">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="bg-gray-50 border border-black  rounded-lg  block w-[400px] p-2.5 mb-7"
//             />
//           </div>
//           <div className="mb-5">
//             <label className="block mb-5 text-sm font-medium text-[18px] text-white dark:text-white">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="bg-gray-50 border border-black  rounded-lg  block w-[400px] p-2.5 mb-10"
//             />
//           </div>
//           <div>
//             <Link href="/dashboard" legacyBehavior>
//               <a className="text-black btn btn-success font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-5">
//                 SIGN IN
//               </a>
//             </Link>
//             {/* <button
//               type="submit"
//               className="text-black btn btn-warning font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-5"
//             >
//               REGISTER
//             </button> */}
//             <Link href="/register" legacyBehavior>
//               <a className="text-black btn btn-warning font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-5">
//                 REGISTER
//               </a>
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
