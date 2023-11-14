// src/api/Config.js

const API_BASE_URL = 'http://64.226.115.230:3000/api';  // Replace with your API base URL

const LOGIN_API = `${API_BASE_URL}/login`; // Example login API 
const LOGOUT_API = `${API_BASE_URL}/logout`; // Example login API 
const USER_CHECK_API = `${API_BASE_URL}/user`; // Example login API 

const BASE_CLIENT_API = `${API_BASE_URL}/client`; // Example customer API 

const CUSTOMER_SEARCH = `${BASE_CLIENT_API}/customers`; // Example login API 
const ORDER_CREATE_API = `${BASE_CLIENT_API}/order`; // Example ORDER_CREATE_API 
const ALL_PRODUCT_API = `${BASE_CLIENT_API}/allproducts`; // Example login API 
const ORDER_HISTORY_API =  `${BASE_CLIENT_API}/orderhistory`; // Example ORDER_CREATE_API 
const ORDER_DETAILS_API =  `${BASE_CLIENT_API}/orderdetails`; // Example ?oid=32 
const CUSTOMER_LIST_API =  `${BASE_CLIENT_API}/customerlist`; // Example ORDER_CREATE_API 

export default {
  LOGIN_API, LOGOUT_API, USER_CHECK_API,
  CUSTOMER_SEARCH, CUSTOMER_LIST_API,
  ORDER_CREATE_API, ORDER_HISTORY_API, ORDER_DETAILS_API,
  ALL_PRODUCT_API,
};
