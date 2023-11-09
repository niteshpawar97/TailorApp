// config.js

// const API_BASE_URL = 'http://host.niketgroup.in:3000/api';  // Replace with your API base URL
// const BASE_CUSTOMER_API = `${API_BASE_URL}/customer`; // Example customer API 
// const BASE_PRODUCT_API = `${API_BASE_URL}/product`; // Example customer API 


// const LOGIN_API = `${API_BASE_URL}/login`; // Example login API 
// const CUSTOMER_SEARCH = `${BASE_CUSTOMER_API}/search`; // Example login API 
// const CUSTOMER_CREATE = `${BASE_CUSTOMER_API}/create`; // Example CUSTOMER_CREATE API 
// const PRODUCT_SEARCH = `${BASE_PRODUCT_API}/search`; // Example login API 
// /api/product/search?store_id=niket1234&type=ReadyMade


const API_BASE_URL = 'http://64.226.115.230:3000/api';  // Replace with your API base URL

const BASE_CLIENT_API = `${API_BASE_URL}/client`; // Example customer API 
const BASE_PRODUCT_API = `${API_BASE_URL}/product`; // Example customer API 


const LOGIN_API = `${API_BASE_URL}/login`; // Example login API 
const LOGOUT_API = `${API_BASE_URL}/logout`; // Example login API 
const USER_CHECK_API = `${API_BASE_URL}/user`; // Example login API 

///api/client/customers?q=search&m=1234
const CUSTOMER_SEARCH = `${BASE_CLIENT_API}/customers`; // Example login API 
const ORDER_CREATE_API = `${BASE_CLIENT_API}/order`; // Example ORDER_CREATE_API 
const ALL_PRODUCT_API = `${BASE_CLIENT_API}/allproducts`; // Example login API 

// http://64.226.115.230:3000/api/client/allproducts

export default {
  LOGIN_API, LOGOUT_API, USER_CHECK_API,
  CUSTOMER_SEARCH, ORDER_CREATE_API,
  ALL_PRODUCT_API,

};
