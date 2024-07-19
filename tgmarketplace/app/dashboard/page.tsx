"use client";
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

export default function DashboardPage() {
  const [id, setId] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [localEmail, setLocalEmail] = useState("");
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

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
        const response = await api.get<Product[]>(
          `/users/get-all-products/${id}`
        );
        setProducts(response.data.slice(-3));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    if (id) {
      fetchProducts();
    }
  }, [id]);

  const handleAddtoCart = async (id: number, price: number) => {
    try {
      const quantity = quantities[id];
      console.log(quantity);
      const response = await api.post("/customer/add-to-cart", {
        email: localEmail,
        productId: id,
        quantity: +quantity,
        price: +price,
      });

      console.log(quantities);
      window.alert("Product Added to Cart");
      console.log(response);
    } catch (error) {
      console.error("Error in adding to cart:", error);
    }
  };

  const handleQuantityChange = (productId: number, value: number) => {
    const product = products.find((p) => p.id === productId);

    if (product) {
      const maxQuantity = Math.min(value, product.stock);
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: maxQuantity,
      }));
    }
  };

  return (
    <div>
      <div className="hero-content text-neutral-content text-center">
        <div className="w-[900px] h-[250px] rounded-[20px] border-base-300 border-2 mt-10 ml-[600px] shadow-2xl">
          <h1 className="mb-5 text-5xl font-bold mt-10 text-black">
            What's New?
          </h1>
          <p className="mb-5 text-black">
            Your One-Stop Shop for Snacks and Food
          </p>
          <Link href="/dashboard/products" legacyBehavior>
            <a className="btn btn-outline btn-error flex-1 w-[8rem]">
              See Products
            </a>
          </Link>
        </div>
      </div>
      <div className="rounded-[20px] mx-auto max-w-[1200px] w-full overflow-hidden flex gap-4 flex-wrap mt-5 mb-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="dashboardcard bg-base-100 w-96 shadow-xl border-2 border-base rounded-box flex flex-col items-center gap-4 p-4 ml-[2px] "
          >
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
              <h2 className="card-title justify-center  py-2">
                {product.name}
              </h2>
              <p className="text-red-500 border-black border-[1px] rounded-md py-2 my-2">
                <span className="text-black">Price : </span> {product.price}
              </p>
              <p className="text-red-500 border-black border-[1px] rounded-md py-2">
                <span className="text-black">Availability : </span>{" "}
                {product.stock}
              </p>
              <p className="text-red-500 border-black border-[1px] rounded-md py-2">
                {" "}
                {product.description}
              </p>
              <div className="card-actions justify-center flex flex-row mt-4">
                <button
                  className="btn btn-outline bg-red-500 text-white"
                  onClick={handleAddtoCart.bind(
                    null,
                    product.id,
                    product.price
                  )}
                >
                  Add To Cart
                </button>
                <input
                  type="number"
                  placeholder="Want ?"
                  className="text-center text-red-500 border-black border-[1px] rounded-md w-[100px] h-[47px] ml-2"
                  value={quantities[product.id]}
                  onChange={(e) =>
                    handleQuantityChange(product.id, parseInt(e.target.value))
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
