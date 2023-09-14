import React, { useEffect, useState } from "react";
import getOrders from "../../hooks/getOrders";
import classes from "./myorders.module.css";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Skeleton from "react-loading-skeleton";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a GET request to /api/orders/my
    (async () => {
      setOrders([]);
      let orders = await getOrders();
      if (!orders) return setLoading(false);
      //console.log(orders);
      setLoading(false);
      setOrders(orders);
    })(); //
  }, []);
  return (
    <div>
      {loading ? (
        <p className={classes.skeletonContainer}>
          <Skeleton height={100} count={5} />
        </p>
      ) : (
        <div>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <ul className={classes.container}>
              <h1>All Orders</h1>
              {orders.map((order) => (
                <li key={order.orderId} className={classes.orderContainer}>
                  <p className={classes.order_status}>
                    {order.completed ? "✅" : "❌"}
                  </p>
                  <div className={classes.order_info}>
                    <p>
                      Order Created At:{" "}
                      {timeAgo.format(new Date(order.createdAt))}
                    </p>
                    <p>
                      Customer:
                      <b> {order.userName}</b>
                    </p>
                    <p>Shipping Address: {order.shippingAddress}</p>
                    <p>
                      Paid Amount: <b>{order.paidAmount / 100}</b> $
                    </p>

                    <h3>Items:</h3>
                    <ul>
                      {order.basket.map((item, index) => (
                        <li key={index}>
                          <p>
                            {item.quantity} X{" "}
                            {item.price_data.product_data.name.split("_")[0]}
                            <b>
                              {" "}
                              Total:{" "}
                              {(item.quantity * item.price_data.unit_amount) /
                                100}{" "}
                              $
                            </b>
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
