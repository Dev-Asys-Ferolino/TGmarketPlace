'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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


export default function SellerDashboardPage() {
  const [id, setId] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [localEmail, setLocalEmail] = useState("");

  useEffect(() => {
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
        const response = await api.get<Product[]>(`/users/get-all-products/${id}`);
        setProducts(response.data.slice(-3));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    if (id) {
      fetchProducts();
    }
  }, [id]);

  const handleAddtoCart = async (productId: number, quantity: number, price: number) => {
    try {
      const response = await api.post("/customer/add-to-cart", {
        email: localEmail,
        productId: productId,
        quantity: quantity,
        price: price,
      });
      console.log(response);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div>
      <div className="hero-content text-neutral-content text-center">
        <div className="w-[900px] h-[250px] rounded-[20px] border-red-200 border-2 mt-10 ml-[600px] shadow-2xl">
          <h1 className="mb-5 text-5xl font-bold mt-10 text-black">What is New</h1>
          <p className="mb-5 text-black">Your One-Stop Shop for Snacks and Food</p>
          <Link href="/dashboard/products" legacyBehavior>
            <a className="btn btn-outline btn-error flex-1 w-[8rem]">Add Products</a>
          </Link>
        </div>
      </div>
      <div className="rounded-[20px] mx-auto max-w-[1200px] w-full overflow-hidden flex gap-4 flex-wrap mt-5">
        {products.map((product) => (
          <div key={product.id} className="dashboardcard bg-base-100 w-96 shadow-xl border-2 border-red-200 rounded-box flex flex-col items-center gap-4 p-4 ml-[2px] shadow-2xl">
            <figure className="w-full h-64 flex items-center justify-center">     
              {product.ProductImage.map((image) => (
                <Image
                  key={image.image_url}
                  width={200}
                  height={200}
                  src={image.image_url}
                  alt={product.name}
                  className="object-cover w-[200px] h-[200px] rounded-xl"
                />
              ))}
            </figure>
            <div className="card-body text-center w-full">
              <h2 className="card-title justify-center  py-2">{product.name}</h2>
              <p className="text-red-500 border-black border-[1px] rounded-md py-2 my-2"><span className="text-black">Price :  </span> {product.price}</p>
              <p className="text-red-500 border-black border-[1px] rounded-md py-2"><span className="text-black">Availability :  </span> {product.stock}</p>
              <p className="text-red-500 border-black border-[1px] rounded-md py-2"> {product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
