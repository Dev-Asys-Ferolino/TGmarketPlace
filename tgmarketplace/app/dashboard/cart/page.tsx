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
  vendor_id: number;
  quantity: number;
  total: number;
}

export default function CartPage() {
  const [uploading, setUploading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [localId, setLocalId] = useState("");
  const [selectedCheckbox, setSelectedCheckbox] = useState<number[]>([]);
  const [cartItemsChecked, setCartItemsChecked] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [localEmail, setLocalEmail] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("id");
      const userEmail = localStorage.getItem("email");
      setLocalId(userId ? userId : "");
      setLocalEmail(userEmail ? userEmail : "");
    }
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get<CartItem[]>(
          `/customer/get-cart/${localId}`
        );
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    if (localId) {
      fetchCartItems();
    }
  }, [localId]);

  const handleCheckboxChange = (itemId: number) => {
    setSelectedCheckbox((prevSelected) => {
      if (prevSelected.includes(itemId)) {
        return prevSelected.filter((id) => id !== itemId);
      } else {
        return [...prevSelected, itemId];
      }
    });

    setSelectedItems((prevSelectedItems) => {
      const selected = cartItems.find((item) => item.id === itemId);
      if (selected) {
        if (prevSelectedItems.some((item) => item.id === itemId)) {
          return prevSelectedItems.filter((item) => item.id !== itemId);
        } else {
          return [...prevSelectedItems, selected];
        }
      }
      return prevSelectedItems;
    });
  };
  const handleCheckout = async (selectedItems: CartItem[]) => {
    setUploading(true);
    try {
      console.log("Selected Items:", selectedItems);
      const response = await api.post(`/customer/checkout-order/${localId}`, {
      selectItems: selectedItems,
      });
      console.log(response);
      
      window.alert("Order Placed Successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error placing order:", error);
    }
    setUploading
  };

  const handleSelectAll = () => {
    const allItemIds = cartItems.map((item) => item.id);
    setSelectedCheckbox(allItemIds);
    setCartItemsChecked(true);
    setSelectedItems(cartItems);
  };

  const handleDeselectAll = () => {
    setSelectedCheckbox([]);
    setCartItemsChecked(false);
  };

  const handleDeleteCartItem = async (itemId: number) => {
    try {
      const response = await api.delete(`/customer/remove-from-cart`, {
        data: {
          productId: +itemId,
        },
      });
      console.log(response);
      window.alert("Product Removed from Cart");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const computeTotal = () => {
    const selectedItems = cartItems.filter((item) =>
      selectedCheckbox.includes(item.id)
    );
    return selectedItems.reduce((acc, item) => acc + +item.total, 0);
  };

  return (
    <div className="flex h-auto align-middle justify-center mt-10">
      <div className="card bg-base-100 w-full max-w-[60%] shrink-0 flex flex-col justify-center">
        <div className="overflow-x-auto ml-[1px]">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={
                      cartItemsChecked ? handleDeselectAll : handleSelectAll
                    }
                    className="checkbox"
                  />
                </th>
                <th>Product Images</th>
                <th>
                  <span className="ml-10">Product Name</span>
                </th>
                <th>Price</th>
                <th>
                  <span>Quantity</span>
                </th>
                <th>
                  <span className="ml-[-200px]">Total Amount</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedCheckbox.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                      className="checkbox"
                    />
                  </td>
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
                  <td>
                    <span className="ml-5">{item.quantity}</span>
                  </td>
                  <td>
                    <div className="ml-[-160px]">
                      {item.total}
                      <span>
                        <button
                          className="btn btn-m ml-[80px] bg-red-400 text-white w-[5rem]"
                          onClick={() => handleDeleteCartItem(item.id)}
                        >
                          Delete
                        </button>
                      </span>
                    </div>
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
                  {computeTotal()}
                  <button
                    className="btn ml-10 bg-red-400 text-white"
                    onClick={() => handleCheckout(selectedItems)}
                    disabled={uploading}
                    style={{ opacity: uploading ? 0.5 : 1 }}
                  >
                    {uploading ? "Processing..." : "Checkout"} <br />
                    <span>({selectedCheckbox.length})</span>
                  </button>
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
