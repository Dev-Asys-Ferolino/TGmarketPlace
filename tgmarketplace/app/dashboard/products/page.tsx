"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { sampleImage } from "@/images";
import api from "@/lib/api/api";

interface Product {
  name: string;
  price: number;
  stock: number;
  description: string;
  ProductImage: ProductImage[];
}
interface ProductImage {
  image_url: string;
}

export default function ProductsPage() {
  const [id, setId] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const price = 100;

  useEffect(() => {
    // Access localStorage only on the client-side
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("id");
      setId(userId ? userId : "");
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get<Product[]>(
          `/users/get-all-products/${id}`
        );
        console.log("this is i", id);
        console.log(response.data);
        console.log(response.data[0].ProductImage[0].image_url);
        setProducts(response.data);
        console.log(setProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [id]);

  return (
    <div className="flex flex-col mt-10 ">
      <div className="rounded-[20px] mx-auto max-w-[1600px] w-full overflow-hidden flex gap-4 flex-wrap">
        {products.map((product) => (
          <div
            className="dashboardcard bg-base-100 w-96 shadow-xl border-2 border-red-400 rounded-box"
            key={product.name}
          >
            <figure className="px-10 pt-10">
              {product.ProductImage.map((image) => (
                <Image
                  width={200}
                  height={300}
                  src={image.image_url}
                  // src={"/uploads/images/Screenshot 2024-05-11 085513.png"}
                  // src={sampleImage}
                  alt={product.name}
                  className="rounded-xl"
                />
              ))}
            </figure>
            <div className="dashboardcard-body items-center text-center">
              <h2 className="dashboardcard-title mt-4">
                <b>{product.name}</b>
              </h2>
              <p className="text-red-500 mt-2">{product.price}</p>
              <div className="dashboardcard-actions">
                <button className="btn btn-outline bg-white flex-1 w-[8rem] mb-2 mt-4">
                  Edit
                </button>
                <button className="btn btn-outline bg-red-400 flex-1 w-[8rem] mb-2 mt-4 ml-2">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
