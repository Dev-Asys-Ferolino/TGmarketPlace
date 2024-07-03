import React from "react";
import Image from "next/image";

export default function AddProductsPage() {
  return (
    <div>
      <div className="flex w-full flex-col lg:flex-row mt-10">
        <div className="card bg-base-300 rounded-box grid h-auto w-[35%] flex-grow place-items-center"></div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="card bg-base-300 rounded-box grid h-32 flex-grow place-items-center"></div>
      </div>
    </div>
  );
}
