// src/api/Config.js

const API_BASE_URL      = 'https://antaryami.xyz/api';  // Replace with your API base URL
// const API_BASE_URL      = 'http://64.226.115.230:3000/api';  // Replace with your API base URL

const LOGIN_API         = `${API_BASE_URL}/login`; //POST
const LOGOUT_API        = `${API_BASE_URL}/logout`; //get
const USER_CHECK_API    = `${API_BASE_URL}/user`; //get
const PWD_CHANGE_API    = `${API_BASE_URL}/changepwd`; //post data: // {"oldpassword":"asdfg","newpassword":"asdf"}

const BASE_CLIENT_API   = `${API_BASE_URL}/client`; // Sub use client

const CUSTOMER_SEARCH   = `${BASE_CLIENT_API}/customers`; // 
const ORDER_CREATE_API  = `${BASE_CLIENT_API}/order`; // 
const ALL_PRODUCT_API   = `${BASE_CLIENT_API}/allproducts`; // 
const ORDER_HISTORY_API =  `${BASE_CLIENT_API}/orderhistory`; // 
const ORDER_DETAILS_API =  `${BASE_CLIENT_API}/orderdetails`; // 
const CUSTOMER_LIST_API =  `${BASE_CLIENT_API}/customerlist`; // 
const STOCK_LIST_API    =  `${BASE_CLIENT_API}/stocks`; // 
const PAY_HISTORY_API =  `${BASE_CLIENT_API}/payhistory`; // 
const CUSTOMER_MP_LIST_API =  `${BASE_CLIENT_API}/mp`; //USE /api/client/mp?q=search&m=1234543456



export default {
  LOGIN_API, LOGOUT_API, USER_CHECK_API, PWD_CHANGE_API,
  CUSTOMER_SEARCH, CUSTOMER_LIST_API, CUSTOMER_MP_LIST_API,
  ORDER_CREATE_API, ORDER_HISTORY_API, ORDER_DETAILS_API,
  ALL_PRODUCT_API, STOCK_LIST_API, PAY_HISTORY_API, 
  
};
