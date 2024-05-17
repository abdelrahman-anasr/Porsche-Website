import "bootstrap/dist/css/bootstrap.css";
import ReactDOM from 'react-dom/client';
import './index.css';
import React from'react';
import reportWebVitals from './reportWebVitals';
import ProductDetails from "./PorscheDetails";
import OrderList from "./Orders";
import CustPost from "./AddProduct";
import ProdPage from "./ProductsPage";
import AdminCustomerList from "./AdminCustomerList";
import Order from "./Orders";
import AdminPage from "./AdminPage";
import App from "./App";
import Login from "./Login.jsx";
import AdminLogin from "./AdminLogin.jsx";
import AboutPage from "./AboutPage.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Car from "./cars";
import ProductUpdate from "./ProductUpdate";
import RegistrationForm from "./Register";
import HomePage from "./index.jsx";
import Locations from "./Locations.jsx";
import ContactPage from "./Contact.jsx";
import Car1 from "./car1.jsx";
import Car2 from "./car2.jsx";
import Car3 from "./car3.jsx";
import Car4 from "./car4.jsx";
import Car5 from "./car5.jsx";
import Car6 from "./car6.jsx";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Router>
                <Routes>
                    {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
                    <Route
                        exact
                        path="/adminlogin"
                        element={<AdminLogin />}
                    />
                    <Route
                        exact
                        path="/"
                        element={<HomePage />}
                    />
                    <Route
                        exact
                        path="/adminpage"
                        element={<AdminPage />}
                    />
                    <Route
                        exact
                        path="/cars"
                        element={<Car />}
                    />
                    <Route
                        exact
                        path="/register"
                        element={<RegistrationForm />}
                    />
                    <Route
                        exact
                        path="/about"
                        element={<AboutPage />}
                    />
                    <Route
                        exact
                        path="/locations"
                        element={<Locations />}
                    />
                    <Route
                        exact
                        path="/contact"
                        element={<ContactPage />}
                    />
                    <Route
                        exact
                        path="/car1"
                        element={<Car1 />}
                    />
                    <Route
                        exact
                        path="/car2"
                        element={<Car2 />}
                    />
                    <Route
                        exact
                        path="/car3"
                        element={<Car3 />}
                    />
                    <Route
                        exact
                        path="/car4"
                        element={<Car4 />}
                    />
                    <Route
                        exact
                        path="/car5"
                        element={<Car5 />}
                    />
                    <Route
                        exact
                        path="/car6"
                        element={<Car6 />}
                    />
                    {/* This route is for about component 
          with exact path "/about", in component 
          props we passes the imported component*/}
                    <Route
                        path="/products"
                        element={<ProdPage />}
                    />
 
                    {/* This route is for contactus component
          with exact path "/contactus", in 
          component props we passes the imported component*/}
                    <Route
                        path="/contactus"
                        element={<ProductUpdate />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />
 
                    {/* If any route mismatches the upper 
          route endpoints then, redirect triggers 
          and redirects app to home component with to="/" */}
                    {/* <Redirect to="/" /> */}
                    <Route
                        path="*"
                        element={<Navigate to="/" />}
                    />
                </Routes>
            
            </Router>
    </>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
