import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const IS_DEV = import.meta.env.DEV || process.env.NODE_ENV === 'development';

// Disable logging for API calls - we don't want to see these in the console
const ENABLE_LOGGING = false;

// Simple logging utility - now disabled by default
const logApiCall = (method, endpoint, success = true) => {
  if (IS_DEV && ENABLE_LOGGING) {
    const style = success ? 'color: green; font-weight: bold' : 'color: red; font-weight: bold';
    console.log(`%c${method} ${endpoint}: ${success ? 'SUCCESS' : 'FAILED'}`, style);
  }
};

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Prevent HTTP errors from being thrown for non-2xx responses
  validateStatus: (status) => status >= 200 && status < 500,
  // Set timeout to prevent hanging requests
  timeout: 15000
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (IS_DEV && ENABLE_LOGGING) console.error('Request error');
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log minimized error info
    if (IS_DEV && ENABLE_LOGGING) {
      console.error(`API Error (${error.code || 'UNKNOWN'}): ${error.message || 'Unknown error'}`);
    }
    
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({ 
        message: 'Request timed out. Please try again.',
        code: 'TIMEOUT'
      });
    }
    
    if (error.code === 'ERR_NETWORK') {
      return Promise.reject({ 
        message: 'Network error - Unable to connect to server',
        code: 'NETWORK'
      });
    }
    
    // Certificate errors
    if (error.code === 'CERT_AUTHORITY_INVALID' || 
        error.code === 'ERR_CERT_AUTHORITY_INVALID') {
      return Promise.reject({ 
        message: 'Secure connection failed. SSL certificate issue.',
        code: 'SSL_ERROR'
      });
    }
    
    const { response } = error;
    
    // Handle session expiration
    if (response && response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Helper functions for API requests
const ApiRequest = {
  /**
   * Make a GET request
   * @param {string} endpoint - API endpoint
   * @param {Object} params - Query parameters
   * @returns {Promise} - Response promise
   */
  get: (endpoint, params = {}) => {
    logApiCall('GET', endpoint);
    return apiClient.get(endpoint, { params })
      .then(response => {
        if (response.status >= 400) {
          logApiCall('GET', endpoint, false);
          throw new Error(response.data?.message || 'Error during GET request');
        }
        return response;
      });
  },

  /**
   * Make a POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body
   * @returns {Promise} - Response promise
   */
  post: (endpoint, data = {}) => {
    logApiCall('POST', endpoint);
    return apiClient.post(endpoint, data)
      .then(response => {
        if (response.status >= 400) {
          logApiCall('POST', endpoint, false);
          throw new Error(response.data?.message || 'Error during POST request');
        }
        return response;
      });
  },

  /**
   * Make a PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body
   * @returns {Promise} - Response promise
   */
  put: (endpoint, data = {}) => {
    logApiCall('PUT', endpoint);
    return apiClient.put(endpoint, data)
      .then(response => {
        if (response.status >= 400) {
          logApiCall('PUT', endpoint, false);
          throw new Error(response.data?.message || 'Error during PUT request');
        }
        return response;
      });
  },

  /**
   * Make a DELETE request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body
   * @returns {Promise} - Response promise
   */
  delete: (endpoint, data = {}) => {
    logApiCall('DELETE', endpoint);
    return apiClient.delete(endpoint, { data })
      .then(response => {
        if (response.status >= 400) {
          logApiCall('DELETE', endpoint, false);
          throw new Error(response.data?.message || 'Error during DELETE request');
        }
        return response;
      });
  },
};

export default ApiRequest; 