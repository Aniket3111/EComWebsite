import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts } from "../../actions/productActions";
import { Link } from "react-router-dom";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut, Line } from "react-chartjs-2";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userActions.js";
const Dashboard = () => {
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  let outofstock = 0;
  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outofstock += 1;
      }
    });
  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllUsers());
    dispatch(getAllOrders());
  }, [dispatch]);
  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgoundColor: ["rgb(197,72,49)"],
        data: [0, totalAmount],
      },
    ],
  };
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A684", "#6800B4"],
        hoverBackgoundColor: ["#4B5000", "#35014F"],
        data: [outofstock, products.length - outofstock],
      },
    ],
  };
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashoardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> {totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
