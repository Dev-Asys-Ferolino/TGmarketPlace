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
        <div className="card h-auto w-[50%]">
          <div >
            <table className="table">
              <thead className=" *:text-center">
                <tr>
        
                  <th><span className="">Order/Product</span></th>
                  <th ><span className="">Price</span></th>
                  <th ><span className="">Quantity</span></th>
                  <th ><span className="">Total</span></th>
                  <th ><span className="">Delivery Status</span></th>
                  <th ><span className="">Payment Status</span></th>
                </tr>
              </thead>
              <tbody className="max-h-[60vh] overflow-y-auto  w-full ">
                {orders.map((order, index) => (
                  <React.Fragment key={order.id}>
                    {order.OrderItem.map((item) => (
                      <tr key={item.product_name} className="*:text-center">
                     
                        <td className="flex items-center gap-3 w-fit">
                          {index + 1 + '.'}
                              <div className="h-[100px] w-[100px]">
                                <Image
                                  width={100}
                                  height={100}
                                  src={order.productimage.image_url}
                                  alt="product"
                                />
                              </div>
                              <div className="font-bold">
                                {item.product_name}
                              </div>
                        </td>
                        <td className=""><span className="">{item.product_price}</span></td>
                        <td className=""><span className="">{item.quantity}</span></td>
                        <td className=""><span className="">{item.product_price * item.quantity}</span></td>
                        <td className=""><span className="">{order.delivery_status.toUpperCase()}</span></td>
                        <td className=""><span className="">{order.payment_status.toUpperCase()}</span></td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
              <tfoot className=" border-t-2 border-black *:text-center ">
                <tr className="">
                  <td className="w-1/12"></td>
                  <td className="w-3/12"></td>
                  <td className="w-2/12"><b className="text-black">TOTAL :</b></td>
                  <td className="w-2/12"><span className="text-black">{orders.reduce((acc, order) => acc + +order.total, 0)}</span></td>
                  <td className="w-3/12"></td>
                  <td className="w-3/12"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
