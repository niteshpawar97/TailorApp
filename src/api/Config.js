// config.js

const API_BASE_URL = 'http://host.niketgroup.in:3000/api';  // Replace with your API base URL
const BASE_CUSTOMER_API = `${API_BASE_URL}/customer`; // Example customer API 
const BASE_PRODUCT_API = `${API_BASE_URL}/product`; // Example customer API 


const LOGIN_API = `${API_BASE_URL}/login`; // Example login API 
const CUSTOMER_SEARCH = `${BASE_CUSTOMER_API}/search`; // Example login API 
const CUSTOMER_CREATE = `${BASE_CUSTOMER_API}/create`; // Example CUSTOMER_CREATE API 
const PRODUCT_SEARCH = `${BASE_PRODUCT_API}/search`; // Example login API 
// /api/product/search?store_id=niket1234&type=ReadyMade

export default {
  LOGIN_API,
  CUSTOMER_SEARCH,
  CUSTOMER_CREATE,
  PRODUCT_SEARCH,
};
