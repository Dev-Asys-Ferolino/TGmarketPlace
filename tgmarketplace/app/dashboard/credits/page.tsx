'use client';
import { sampleImage } from "@/images";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/lib/api/api";

interface Orders {
  id: number;
  status: string;
  delivery_status: string;
  payment_method: string;
  payment_status: string;
  cancelled: boolean;
  vendor_id: number;
  total: number;
  productimage: { image_url: string; id: number };
  OrderItem: {
    product_name: string;
    quantity: number;
    product_price: number;
  }[];
}


export default function CreditsPage() {

  const [orders, setOrders] = useState<Orders[]>([]);
  const [localId, setLocalId] = useState("");
  // const [userId, setUserId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("id");
      setLocalId(userId ? userId : "");
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get<Orders[]>(`/customer/get-unpaid-orders/${localId}`);
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    if (localId) {
      fetchOrders();
    }
  }, [localId]);

  return (
    <div className="flex h-auto align-middle justify-center mt-10">
      <div className="card bg-base-100 w-full max-w-[70%] shrink-0 items-center">
        <form className="card-body">
          <div className="overflow-x-auto card h-auto w-[1000px]">
            <table className="table">
              {/* head */}
              <thead className="*:text-center">
                <th></th>
                  <th>Order/Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th><span className="ml-4">Delivery Status</span></th>
                  <th>Payment Status</th>
              </thead>
              {orders.map((order,index) => (
                <tbody key={order.id} className="*:text-center">
                  <tr>
                    <td>{index + 1 +'.'}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="h-[150px] w-[150px]">
                            <Image
                            key={order.productimage.image_url}
                              width={800}
                              height={800}
                              src={order.productimage.image_url}
                              alt="product"
                            />
                          </div>
                        </div>
                          <div>
                            {order.OrderItem.map((item) => (
                              <div className="font-bold">
                                {item.product_name}
                              </div>
                            ))}
                          </div>
                      </div>
                    </td>
                    <td>                          
                      <div>
                        {order.OrderItem.map((item) => (
                          <div className="font-bold">
                            {item.product_price}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div>
                        {order.OrderItem.map((item) => (
                          <div className="font-bold">
                            {item.quantity}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div>
                        {order.OrderItem.map((item) => (
                          <div className="font-bold">
                            {item.product_price * item.quantity}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span className="ml-8">  
                        {order.delivery_status.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <span className="ml-5">
                        {order.payment_status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                </tbody>
              ))}
              <tfoot className="border-t-2 border-black *:text-center">
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <td><b className="text-black">Grand Total:</b></td>
                  <td><span className="text-black">{orders.reduce((acc, order) => acc + +order.total, 0)}</span></td>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </form>
      </div>
    </div>
  );
}
