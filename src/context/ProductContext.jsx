/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import config from "../libs/config.json";

const AuthContext = createContext(undefined);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [bundles, setBundles] = useState([]);
  //   const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchBundles();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/api/products`);
      setProducts(res.data.data);
    } catch (err) {
      throw err;
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/api/orders`);
      setOrders(res.data.data);
    } catch (err) {
      throw err;
    }
  };

    const fetchBundles = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/api/bundles`);
      setBundles(res.data.data);
    } catch (err) {
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ products, orders, bundles }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
};
