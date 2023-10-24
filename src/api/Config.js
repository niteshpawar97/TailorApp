// config.js

const API_BASE_URL = 'http://host.niketgroup.in:3000/api';  // Replace with your API base URL
const BASE_CUSTOMER_API = `${API_BASE_URL}/customer`; // Example customer API 


const LOGIN_API = `${API_BASE_URL}/login`; // Example login API 
const CUSTOMER_API = `${BASE_CUSTOMER_API}/search`; // Example login API 

export default {
  LOGIN_API,
  CUSTOMER_API,
};
