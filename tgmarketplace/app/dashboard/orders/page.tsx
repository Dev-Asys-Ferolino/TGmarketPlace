"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/lib/api/api";

interface Order {
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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [localId, setLocalId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("id");
      setLocalId(userId ? userId : "");
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get<Order[]>(
          `/customer/view-order/${localId}`
        );
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    if (localId) {
      fetchOrders();
    }
  }, [localId]);

  return (
    <div>
      <div className="flex w-full flex-col lg:flex-row mt-10 justify-center">
        <div className="card h-auto w-[60%]">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Order/Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th><span className="ml-4">Delivery Status</span></th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              {orders.map((order,index) => (
                <tbody>
                  {order.OrderItem.map((item) => (
                    <tr key={order.id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className=" h-[150px] w-[150px]">
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
                      <td>{item.product_price}</td>
                      <td>{item.quantity}</td>
                      <td>{item.product_price * item.quantity}</td>
                      <td><span className="ml-8">  
                        {order.delivery_status.toUpperCase()}</span>
                      </td>
                      <td><span className="ml-5">{order.payment_status.toUpperCase()}</span></td>
                    </tr>
                  ))}
                </tbody>
              ))}
              <tfoot className="border-t-2 border-black">
                <tr>
                  <td></td>
                  <td></td>
                  <td><b className="text-black">TOTAL :</b></td>
                  <td><span className="text-black">{orders.reduce((acc, order) => acc + +order.total, 0)}</span></td>
                  <td></td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
