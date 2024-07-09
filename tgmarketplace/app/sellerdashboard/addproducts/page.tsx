"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import api from "@/lib/api/api";
import { useRouter } from "next/navigation";

interface Product {
  id: number; // Add id to interface
  name: string;
  price: number;
  stock: number;
  description: string;
  ProductImage: ProductImage[];
}
interface ProductImage {
  image_url: string;
}

export default function AddProductsPage() {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [localEmail, setLocalEmail] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [id, setId] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userEmail = localStorage.getItem("email");
      const userId = localStorage.getItem("id");
      setLocalEmail(userEmail ? userEmail : "");
      setId(userId ? userId : "");
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get<Product[]>(
          `/vendor/get-vendor-products/${localEmail}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    if (localEmail) {
      fetchProducts();
    }
  }, [localEmail]);

  const handleDelete = async (id: number) => {
    try {
      await api.delete("/vendor/remove-product", {
        data: { email: localEmail, id: id },
      });

      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const response = await api.put<Product>("/vendor/edit-product/:id", {
        data: { email: localEmail, id: id },
      });
      handleUpload();
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("email", localEmail);
      formData.append("price", "100");
      formData.append("description", "Shabu is a great product");
      formData.append("stock", "100");
      formData.append("name", "Shabu");
      const response = await api.post("/vendor/add-product", formData);
      setSelectedImage("");
      setSelectedFile(undefined);
      setUploading(false);
      router.push("/sellerdashboard/addproducts");
      window.location.reload();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setUploading(false);
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-[-150px]">
            {products.map((product) => (
              <div
                key={product.id}
                className="dashboardcard bg-base-100 w-full shadow-xl border-2 border-red-400 rounded-box"
              >
                <figure className="px-10 pt-10">
                  {product.ProductImage.map((image) => (
                    <Image
                      key={image.image_url}
                      width={200}
                      height={300}
                      src={image.image_url.replaceAll("\\", "/")}
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
                    <button
                      className="btn btn-outline bg-white flex-1 w-[8rem] mb-2 mt-4"
                      onClick={handleEdit.bind(null, product.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline bg-red-400 flex-1 w-[8rem] mb-2 mt-4 ml-2"
                      onClick={handleDelete.bind(null, product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="w-full lg:w-1/3 flex flex-col items-center mr-[-250px]">
          <div className="text-red-500 text-[30px] ml-[120px]">
            <b>
              <i>ADD YOUR PRODUCTS</i>
            </b>
          </div>
          <div className="dashboardcard bg-base-100 w-full max-w-[24rem] shadow-xl border-2 border-red-400 rounded-box mt-10 ml-[130px]">
            <div className="max-w-4xl mx-auto p-6 space-y-6">
              <label>
                <input
                  type="file"
                  hidden
                  onChange={({ target }) => {
                    if (target.files) {
                      const file = target.files[0];
                      setSelectedImage(URL.createObjectURL(file));
                      setSelectedFile(file);
                    }
                  }}
                />
                <div className="w-full h-48 aspect rounded items-center justify-center border-2 border-dashed cursor-pointer flex">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="selectedImage"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>Select Image</span>
                  )}
                </div>
              </label>
            </div>
            <div className="dashboardcard-body items-center text-center">
              <h2 className="dashboardcard-title mt-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  className="input input-bordered w-full max-w-[13rem] mt-2 border-black"
                />
              </h2>
              {/* <div className="flex flex-row align-middle justify-center">
                <p className="w-full max-w-[6rem] mt-2 pt-2 border-black border-2 text-start">
                  <b className="ml-10">Price :</b>
                </p>
                <input
                  type="number"
                  placeholder="Php"
                  className="input input-bordered w-full max-w-[5rem] mt-2 border-black"
                />
              </div>
              <div className="flex flex-row align-middle justify-center">
                <p className="w-full max-w-[4rem] mt-2 pt-2 border-black border-2 justify-start">
                  <b>Stock :</b>
                </p>
                <input
                  type="text"
                  placeholder="Avail."
                  className="input input-bordered w-full max-w-[5rem] mt-2 border-black"
                />
              </div> */}
              <h2 className="dashboardcard-title mt-4">
                <input
                  type="number"
                  placeholder="Price "
                  className="input input-bordered w-full max-w-[13rem] mt-2 border-black"
                />
              </h2>
              <h2 className="dashboardcard-title mt-4">
                <input
                  type="number"
                  placeholder="Stocks Available"
                  className="input input-bordered w-full max-w-[13rem] mt-2 border-black"
                />
              </h2>

              <h2 className="dashboardcard-title mt-4">
                <textarea
                  className="textarea textarea-bordered w-full max-w-[13rem] border-black"
                  placeholder="Description"
                ></textarea>
              </h2>
              <button
                onClick={handleUpload}
                disabled={uploading}
                style={{ opacity: uploading ? 0.5 : 1 }}
                className="btn btn-outline bg-red-400 flex-1 w-[13rem] mb-2 mt-4"
              >
                {uploading ? "Uploading..." : "Add Products"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
