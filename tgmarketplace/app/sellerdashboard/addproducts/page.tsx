"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { sampleImage } from "@/images";
import api from "@/lib/api/api";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

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

export default function AddProductsPage() {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [localEmail, setLocalEmail] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const price = 100;

  useEffect(() => {
    // Access localStorage only on the client-side
    if (typeof window !== "undefined") {
      const userEmail = localStorage.getItem("email");
      setLocalEmail(userEmail ? userEmail : "");
    }
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get<Product[]>(
          `/vendor/get-vendor-products/${localEmail}`
        );
        console.log("this is email", localEmail);
        console.log(response.data);
        console.log(response.data[0].ProductImage[0].image_url);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [localEmail]);
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
      const data = await api.post("/vendor/add-product", formData);
      setSelectedImage("");
      setSelectedFile(undefined);
      setUploading(false);
      router.push("/sellerdashboard/addproducts");
      console.log(data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setUploading(false);
  };
  return (
    <div>
      <div className="flex w-full flex-col lg:flex-row mt-10">
        <div className="card h-auto max-w-[65%] flex flex-row place-items-center gap-4">
          <div className="flex flex-col gap-4">
            <div className=" flex flex-row place-items-center gap-4">
              {products.map((product) => (
                <div
                  className="dashboardcard bg-base-100 w-96 shadow-xl border-2 border-red-400 rounded-box height-auto width-auto"
                  key={
                    product.name +
                    product.price +
                    product.stock +
                    product.description
                  }
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
              <div className="dashboardcard bg-base-100 w-96 shadow-xl border-2 border-red-400 rounded-box">
                <figure className="px-10 pt-10">
                  <Image
                    width={200}
                    height={300}
                    src={sampleImage}
                    alt="Sampleproducts"
                    className="rounded-xl"
                  />
                </figure>
                <div className="dashboardcard-body items-center text-center">
                  <h2 className="dashboardcard-title mt-4">
                    <b>Sample Products</b>
                  </h2>
                  <p className="text-red-500 mt-2">PHP 30.00</p>
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
              <div className="dashboardcard bg-base-100 w-96 shadow-xl border-2 border-red-400 rounded-box">
                <figure className="px-10 pt-10">
                  <Image
                    width={200}
                    height={300}
                    src={sampleImage}
                    alt="Sampleproducts"
                    className="rounded-xl"
                  />
                </figure>
                <div className="dashboardcard-body items-center text-center">
                  <h2 className="dashboardcard-title mt-4">
                    <b>Sample Products</b>
                  </h2>
                  <p className="text-red-500 mt-2">PHP 30.00</p>
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
              <div className="dashboardcard bg-base-100 w-96 shadow-xl border-2 border-red-400 rounded-box">
                <figure className="px-10 pt-10">
                  <Image
                    width={200}
                    height={300}
                    src={sampleImage}
                    alt="Sampleproducts"
                    className="rounded-xl"
                  />
                </figure>
                <div className="dashboardcard-body items-center text-center">
                  <h2 className="dashboardcard-title mt-4">
                    <b>Sample Products</b>
                  </h2>
                  <p className="text-red-500 mt-2">PHP 30.00</p>
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
            </div>
            <div className=" flex flex-row place-items-center gap-4">
              <div className="dashboardcard bg-base-100 w-96 shadow-xl border-2 border-red-400 rounded-box">
                <figure className="px-10 pt-10">
                  <Image
                    width={200}
                    height={300}
                    src={sampleImage}
                    alt="Sampleproducts"
                    className="rounded-xl"
                  />
                </figure>
                <div className="dashboardcard-body items-center text-center">
                  <h2 className="dashboardcard-title mt-4">
                    <b>Sample Products</b>
                  </h2>
                  <p className="text-red-500 mt-2">PHP 30.00</p>
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
              <div className="dashboardcard bg-base-100 w-96 shadow-xl border-2 border-red-400 rounded-box">
                <figure className="px-10 pt-10">
                  <Image
                    width={200}
                    height={300}
                    src={sampleImage}
                    alt="Sampleproducts"
                    className="rounded-xl"
                  />
                </figure>
                <div className="dashboardcard-body items-center text-center">
                  <h2 className="dashboardcard-title mt-4">
                    <b>Sample Products</b>
                  </h2>
                  <p className="text-red-500 mt-2">PHP 30.00</p>
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
              <div className="dashboardcard bg-base-100 w-96 shadow-xl border-2 border-red-400 rounded-box">
                <figure className="px-10 pt-10">
                  <Image
                    width={200}
                    height={300}
                    src={sampleImage}
                    alt="Sampleproducts"
                    className="rounded-xl"
                  />
                </figure>
                <div className="dashboardcard-body items-center text-center">
                  <h2 className="dashboardcard-title mt-4">
                    <b>Sample Products</b>
                  </h2>
                  <p className="text-red-500 mt-2">PHP 30.00</p>
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
            </div>
          </div>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="card rounded-box grid h-auto flex-grow place-items-center">
          <div className="text-red-500 text-[30px]">
            <b>
              <i>ADD YOUR PRODUCTS</i>
            </b>
          </div>
          <div className="dashboardcard bg-base-100 w-96 shadow-xl border-2 border-red-400 rounded-box mt-[-300px]">
            <div className="max-w-4xl mx-auto p-20 space-y-6">
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
                <div className="w-150 h-120 aspect rounded  items-center justify-center border-2 border-dashed cursor-pointer">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="selectedImage"
                      className="w-100 h-100 object-cover"
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
              <div className="flex flex-row align-middle justify-center">
                <p className="w-full max-w-[8rem] mt-2 pt-2">
                  <b className="ml-10">Price :</b>
                </p>
                <input
                  type="number"
                  placeholder="Php"
                  className="input input-bordered w-full max-w-[5rem] mt-2 border-black"
                />
              </div>
              <div className="flex flex-row align-middle justify-center">
                <p className="w-full max-w-[8rem] mt-2 pt-2">
                  <b>Availability :</b>
                </p>
                <input
                  type="text"
                  placeholder="Avail."
                  className="input input-bordered w-full max-w-[5rem] mt-2 border-black"
                />
              </div>
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
