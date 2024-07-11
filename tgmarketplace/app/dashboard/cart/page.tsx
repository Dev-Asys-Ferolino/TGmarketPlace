"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/lib/api/api";

interface CartItem {
  id: number;
  product: {
    name: string;
    price: number;
    ProductImage: { image_url: string }[];
  };
  quantity: number;
  total: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [localId, setLocalId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("id");
      setLocalId(userId ? userId : "");
    }
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get<CartItem[]>(`/customer/get-cart/${localId}`);
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    if (localId) {
      fetchCartItems();
    }
  }, [localId]);

  // const handleQuantityChange = async (itemId: number, quantity: number) => {
  //   try {
  //     await api.put(`/customer/update-cart-item`, {
  //       itemId,
  //       quantity,
  //     });
  
  //     const response = await api.get<CartItem[]>(`/customer/get-cart/${localId}`);
  //     setCartItems(response.data);
  //   } catch (error) {
  //     console.error("Error updating cart item:", error);
  //   }
  // };


    const handleDeleteCartItem = async (itemId: number) => {
    try {
      const response =  await api.delete(`/customer/remove-from-cart`, {
        data: {
          productId: +itemId,

        },
      });
      console.log(response);
      window.alert("Product Removed from Cart");
      window.location.reload();
  }
  catch (error) {
    console.error("Error deleting cart item:", error);
  }
};



  return (
    <div className="flex h-auto align-middle justify-center mt-10">
      <div className="card bg-base-100 w-full max-w-[60%] shrink-0 flex flex-col justify-center">
        <div className="overflow-x-auto ml-[1px]">
          <table className="table">
            <thead>
              <tr>
                <th><input type="checkbox" defaultChecked className="checkbox" /></th>
                <th>Product Images</th>
                <th><span className="ml-10">Product Name</span></th>
                <th>Price</th>
                <th><span>Quantity</span></th>
                <th><span className="ml-[-200px]">Total Amount</span></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td><input type="checkbox" defaultChecked className="checkbox" /></td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-[150px] w-[150px]">
                          <Image
                            width={300}
                            height={300}
                            src={item.product.ProductImage[0]?.image_url || ""}
                            alt={item.product.name}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold ml-10">{item.product.name}</div>
                  </td>
                  <td>{item.product.price}</td>
                  <td><span className="ml-5">{item.quantity}</span></td>
                  {/* <td>
                    <input
                      className=" w-[90px] h-[30px] text-center"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    />
                  </td> */}
                  <td>
                    <div className="ml-[-160px]">{item.total}<span><button className="btn btn-m ml-[80px] bg-red-400 text-white w-[5rem]" onClick={() => handleDeleteCartItem(item.id)}>Delete</button></span></div>
                  </td>
                </tr> 
              ))}
            </tbody>
            <tfoot className="bg-base-100 border-t-2 border-black">
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th className="text-black">Overall Total:</th>
                <th className="text-black">
                  <span className="ml-5">Php: </span>
                  {cartItems.reduce((acc, item) => acc + +item.total, 0)}
                  <button className="btn ml-10 bg-red-400 text-white">Checkout <br /><span>({cartItems.length})</span></button>
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
