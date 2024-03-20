import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import webfont from "webfontloader";
import React, { useState, useEffect } from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignup from "./component/User/LoginSignup.js";
import store from "./store.js";
import { loadUser } from "./actions/userActions.js";
import UserOptions from "./component/layout/Header/UserOptions.js";
import Profile from "./component/User/Profile.js";
import axios from "axios";
import { useSelector } from "react-redux";
import UpdateProfile from "./component/User/UpdateProfile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js";
import NewProduct from "./component/admin/NewProduct.js";
import UpdateProduct from "./component/admin/UpdateProduct.js";
import OrderList from "./component/admin/OrderList.js";
import ProcessOrder from "./component/admin/ProcessOrder.js";
import UsersList from "./component/admin/UsersList.js";
import UpdateUser from "./component/admin/UpdateUser.js";
import ProductReviews from "./component/admin/ProductReviews.js";
import About from "./component/layout/About/About.js";
import Contact from "./component/layout/Contact/Contact.js";
import NotFound from "./component/layout/NotFound/NotFound.js";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setstripeApiKey] = useState(null);
  async function getStripeApiKey() {
    try {
      // Make a GET request to fetch the Stripe API key
      const response = await axios.get("/api/v1/stripeapikey");

      // Extract the Stripe API key from the response data
      const stripeApiKey = response.data.stripeApiKey;

      // Set the Stripe API key in your application (e.g., state or context)
      setstripeApiKey(stripeApiKey);
    } catch (error) {
      // Handle errors
      if (error.response && error.response.status === 401) {
        // Unauthorized (user is not authenticated)
        console.error("Unauthorized access");
      } else {
        // Other errors
        console.error("Error:", error.message);
      }
    }
  }
  useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route
          exact
          path="/process/payment"
          element={
            stripeApiKey && (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute component={Payment} />{" "}
              </Elements>
            )
          }
        />
        <Route exact path="/" Component={Home} />
        <Route exact path="/product/:id" Component={ProductDetails} />
        <Route exact path="/products" Component={Products} />
        <Route path="/products/:keyword" Component={Products} />
        <Route exact path="/about" Component={About} />
        <Route exact path="/contact" Component={Contact} />
        <Route exact path="/Search" Component={Search} />
        <Route
          exact
          path="/me/update"
          element={<ProtectedRoute component={UpdateProfile} />}
        />
        <Route
          exact
          path="/password/update"
          element={<ProtectedRoute component={UpdatePassword} />}
        />
        <Route
          exact
          path="/account"
          element={<ProtectedRoute component={Profile} />}
        />
        <Route exact path="/password/forgot" Component={ForgotPassword} />
        <Route exact path="/password/reset/:token" Component={ResetPassword} />
        <Route exact path="/login" Component={LoginSignup} />
        <Route exact path="/cart" Component={Cart} />
        <Route
          exact
          path="/login/shipping"
          element={<ProtectedRoute component={Shipping} />}
        />
        <Route
          exact
          path="/success"
          element={<ProtectedRoute component={OrderSuccess} />}
        />
        <Route
          exact
          path="/orders"
          element={<ProtectedRoute component={MyOrders} />}
        />
        <Route
          exact
          path="/order/confirm"
          element={<ProtectedRoute component={ConfirmOrder} />}
        />{" "}
        <Route
          exact
          path="/order/:id"
          element={<ProtectedRoute component={OrderDetails} />}
        />
        <Route
          exact
          path="/admin/dashboard"
          element={<ProtectedRoute isAdmin={true} component={Dashboard} />}
        />
        <Route
          exact
          path="/admin/products"
          element={<ProtectedRoute isAdmin={true} component={ProductList} />}
        />
        <Route
          exact
          path="/admin/product"
          element={<ProtectedRoute isAdmin={true} component={NewProduct} />}
        />
        <Route
          exact
          path="/admin/product/:id"
          element={<ProtectedRoute isAdmin={true} component={UpdateProduct} />}
        />
        <Route
          exact
          path="/admin/orders"
          element={<ProtectedRoute isAdmin={true} component={OrderList} />}
        />
        <Route
          exact
          path="/admin/order/:id"
          element={<ProtectedRoute isAdmin={true} component={ProcessOrder} />}
        />
        <Route
          exact
          path="/admin/users"
          element={<ProtectedRoute isAdmin={true} component={UsersList} />}
        />
        <Route
          exact
          path="/admin/user/:id"
          element={<ProtectedRoute isAdmin={true} component={UpdateUser} />}
        />
        <Route
          exact
          path="/admin/reviews"
          element={<ProtectedRoute isAdmin={true} component={ProductReviews} />}
        />
        <Route exact path="*" Component={NotFound} />
      </Routes>
    </Router>
  );
}

export default App;
