"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { sampleImage } from "@/images";
import api from "@/lib/api/api";

interface Product {
  id: number;
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
  const [localEmail, setLocalEmail] = useState("");

  useEffect(() => {
    // Access localStorage only on the client-side
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("id");
      const userEmail = localStorage.getItem("email");
      setId(userId ? userId : "");
      setLocalEmail(userEmail ? userEmail : "");
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

  const handleAddtoCart = async (id: number, stock: number, price: number) => {
    try {
      const response = await api.post("/customer/add-to-cart", {
        email: localEmail,
        productId: id,
        quantity: +stock,
        price: +price,
      });
      console.log(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="flex flex-col mt-10 ">
      <div className="rounded-[20px] mx-auto max-w-[1600px] w-full overflow-hidden flex gap-4 flex-wrap">
        {products.map((product) => (
          <div className="dashboardcard bg-base-100 w-96 shadow-xl border-2 border-red-400 rounded-box flex flex-col gap-4 text-center ml-1">
            <figure className="px-10 pt-10 ml-[60px]">
              {product.ProductImage.map((image) => (
                <Image
                  width={200}
                  height={300}
                  src={image.image_url}
                  alt="Sampleproducts"
                  className="rounded-xl"
                />
              ))}
            </figure>
            <div className="card-body text-center">
              <h2 className="card-title justify-center">{product.name}</h2>
              <p className="text-red-500 mt-1">{product.price}</p>
              <div className="card-actions justify-center">
                <button
                  className="btn btn-primary"
                  onClick={handleAddtoCart.bind(
                    null,
                    product.id,
                    product.stock,
                    product.price
                  )}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
