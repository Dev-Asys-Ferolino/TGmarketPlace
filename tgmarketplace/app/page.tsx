// import Image from "next/image";
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SignIn from "../components/SignIn";

export default function Home() {
  let user = true;
  // const router = useRouter();

  if (!user) {
    return <>Unauthenticated</>;
  }

  return <SignIn />;
}
