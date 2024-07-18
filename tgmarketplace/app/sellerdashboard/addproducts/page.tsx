
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/lib/api/api";
import { useRouter } from "next/navigation";

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

const ITEMS_PER_PAGE = 8;

export default function AddProductsPage() {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [localEmail, setLocalEmail] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [id, setId] = useState("");
  const [productId, setProductId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({}); // State for validation errors

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userEmail = localStorage.getItem("email");
      const userId = localStorage.getItem("id");
      setLocalEmail(userEmail ? userEmail : "");
      setId(userId ? userId : "");
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get<Product[]>(`/vendor/get-vendor-products/${localEmail}`);
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

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price.toString());
    setStock(product.stock.toString());
    setDescription(product.description);
    setProductId(product.id.toString());
    setSelectedImage(product.ProductImage[0]?.image_url || "");
  };

  // Function to validate form fields
  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!name) errors.name = "Product name is required";
    if (!price) errors.price = "Price is required";
    if (!stock) errors.stock = "Stock is required";
    if (!description) errors.description = "Description is required";
    if (!selectedImage) errors.image = "Product image is required";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdate = async (id: number, price: number, stock: number, description: string, name: string, image: string) => {
    // Validate form before updating
    if (!validateForm()) return;
    setUploading(true);
    try {
      if (!editingProduct) return;
      await api.put(`/vendor/edit-product/${id}`, {
        email: localEmail,
        price,
        stock,
        description,
        name,
        image_url: image,
      });
      router.push("/sellerdashboard/addproducts");
      window.location.reload();
    } catch (error) {
      console.error("Error updating product:", error);
    }
    setUploading(false);
  };

  const handleUpload = async () => {
    // Validate form before uploading
    if (!validateForm()) return;
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("email", localEmail);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("stock", stock);
      formData.append("name", name);
      await api.post("/vendor/add-product", formData);
      setSelectedImage("");
      setSelectedFile(null);
      setUploading(false);
      router.push("/sellerdashboard/addproducts");
      window.location.reload();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setUploading(false);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(products.length / ITEMS_PER_PAGE)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto mt-1">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-[-150px] mt-5">
            {paginatedProducts.map((product) => (
              <div key={product.id} className="dashboardcard bg-base-900 w-full shadow-xl backdrop-blur-lg border-2 border-base rounded-box ">
                <figure className="px-10 pt-10">
                  {product.ProductImage.map((image) => (
                    <Image
                      key={image.image_url}
                      width={200}
                      height={200}
                      src={image.image_url.replaceAll("\\", "/")}
                      alt={product.name}
                      className="rounded-xl object-cover h-48 w-48"
                    />
                  ))}
                </figure>
                <div className="dashboardcard-body items-center text-center">
                  <h2 className="dashboardcard-title mt-4"><b>{product.name}</b></h2>
                  <p className="text-red-500 mt-2"><span className="text-black">Price: </span>{product.price}</p>
                  <p className="text-red-500 mt-2"><span className="text-black">Availability: </span>{product.stock}</p>
                  <p className="text-red-500 mt-2"><span className="text-black">Description: </span>{product.description}</p>
                  <div className="dashboardcard-actions">
                    <button
                      className="btn btn-outline bg-white flex-1 w-[8rem] mb-2 mt-4"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline bg-red-500 flex-1 w-[8rem] mb-2 mt-4 ml-2 text-white"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2 mb-2">
            <div className="join grid grid-cols-2">
              <button
                className="join-item btn  border-red-400 text-white bg-black"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous page
              </button>
              <button
                className="join-item btn  border-red-400 text-white bg-red-400"
                onClick={handleNextPage}
                disabled={currentPage === Math.ceil(products.length / ITEMS_PER_PAGE)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="w-full lg:w-1/3 flex flex-col items-center mr-[-250px] mt-10">
          <div className="text-red-500 text-[30px] ml-[120px]">
            <b><i>{editingProduct ? "EDIT PRODUCT" : "ADD YOUR PRODUCTS"}</i></b>
          </div>
          <div className="dashboardcard bg-base-100 w-full max-w-[24rem] shadow-xl border-2 border-base rounded-box mt-10 ml-[130px]">
            <div className="max-w-4xl mx-auto p-6 space-y-6">
              <label>
                <input
                  type="file"
                  hidden
                  disabled={!!editingProduct} 
                  onChange={({ target }) => {
                    if (target.files && !editingProduct) { 
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
              {validationErrors.image && (
                <p className="text-red-500 mt-2">{validationErrors.image}</p>
              )}
            </div>
            <div className="dashboardcard-body items-center text-center">
              <h2 className="dashboardcard-title mt-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  className="input input-bordered w-full max-w-[13rem] mt-2 border-black"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {validationErrors.name && (
                  <p className="text-red-500 mt-2">{validationErrors.name}</p>
                )}
              </h2>
              <h2 className="dashboardcard-title mt-4">
                <input
                  type="number"
                  placeholder="Price"
                  className="input input-bordered w-full max-w-[13rem] mt-2 border-black"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                {validationErrors.price && (
                  <p className="text-red-500 mt-2">{validationErrors.price}</p>
                )}
              </h2>
              <h2 className="dashboardcard-title mt-4">
                <input
                  type="number"
                  placeholder="Stocks Available"
                  className="input input-bordered w-full max-w-[13rem] mt-2 border-black"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
                {validationErrors.stock && (
                  <p className="text-red-500 mt-2">{validationErrors.stock}</p>
                )}
              </h2>
              <h2 className="dashboardcard-title mt-4">
                <textarea
                  className="textarea textarea-bordered w-full max-w-[13rem] border-black"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </h2>
              <button
                onClick={editingProduct ? handleUpdate.bind(null, +productId, +price, +stock, description, name, selectedImage) : handleUpload}
                disabled={uploading}
                style={{ opacity: uploading ? 0.5 : 1 }}
                className="btn btn-outline bg-red-500 flex-1 w-[13rem] mb-2 mt-4 text-white"
              >
                {uploading ? "Uploading..." : editingProduct ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
