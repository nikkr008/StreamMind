import axios, { AxiosResponse, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API Response interface
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}

// HTTP Methods type
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Configuration interface
interface ApiConfig {
  baseURL?: string;
  timeout?: number;
  defaultHeaders?: Record<string, string>;
}

// Default configuration
const defaultConfig: ApiConfig = {
  baseURL: '',
  timeout: 10000,
  defaultHeaders: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: defaultConfig.baseURL,
  timeout: defaultConfig.timeout,
  headers: defaultConfig.defaultHeaders,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // You can add other headers here
      const userAgent = await AsyncStorage.getItem('userAgent');
      if (userAgent) {
        config.headers['User-Agent'] = userAgent;
      }

      // Add device info or other custom headers
      config.headers['X-Platform'] = 'mobile';
      
      return config;
    } catch (error) {
      console.warn('Error getting auth token:', error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Handle token expiration
    if (error.response?.status === 401) {
      // Clear stored token
      await AsyncStorage.removeItem('authToken');
      // You can add navigation to login screen here if needed
      console.warn('Authentication token expired');
    }
    return Promise.reject(error);
  }
);

/**
 * Main API function to handle all HTTP requests
 * @param payload - Data to send (null for GET/DELETE)
 * @param url - API endpoint URL
 * @param method - HTTP method (GET, POST, PUT, DELETE, PATCH)
 * @param customHeaders - Additional headers for this specific request
 * @returns Promise<ApiResponse>
 */
export const fetchData = async <T = any>(
  payload: any = null,
  url: string,
  method: HttpMethod = 'GET',
  customHeaders?: Record<string, string>
): Promise<ApiResponse<T>> => {
  try {
    // Validate inputs
    if (!url) {
      throw new Error('URL is required');
    }

    // Prepare request config
    const config: any = {
      method: method.toLowerCase(),
      url: url,
      headers: {
        ...defaultConfig.defaultHeaders,
        ...customHeaders,
      },
    };

    // Add payload for POST, PUT, PATCH methods
    if (['POST', 'PUT', 'PATCH'].includes(method.toUpperCase()) && payload) {
      config.data = payload;
    }

    // Add query params for GET requests if payload contains params
    if (method.toUpperCase() === 'GET' && payload) {
      config.params = payload;
    }

    console.log(`🚀 API Request: ${method} ${url}`, {
      payload,
      headers: config.headers,
    });

    // Make the API call
    const response: AxiosResponse<T> = await apiClient(config);

    console.log(`✅ API Response: ${method} ${url}`, {
      status: response.status,
      data: response.data,
    });

    return {
      success: true,
      data: response.data,
      statusCode: response.status,
    };

  } catch (error) {
    console.error(`❌ API Error: ${method} ${url}`, error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      
      // Network error
      if (!axiosError.response) {
        return {
          success: false,
          error: 'Network error. Please check your internet connection.',
          statusCode: 0,
        };
      }

      // Server responded with error status
      const { status, data } = axiosError.response;
      let errorMessage = 'An error occurred';

      // Extract error message from response
      if (typeof data === 'object' && data !== null) {
        const errorData = data as any;
        errorMessage = errorData.message || 
                      errorData.error || 
                      errorData.detail || 
                      `Server error (${status})`;
      } else if (typeof data === 'string') {
        errorMessage = data;
      } else {
        errorMessage = `Server error (${status})`;
      }

      return {
        success: false,
        error: errorMessage,
        statusCode: status,
        data: data as T,
      };
    }

    // Non-axios error
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      statusCode: 0,
    };
  }
};

/**
 * Convenience methods for different HTTP verbs
 */

// GET request
export const getData = async <T = any>(
  url: string,
  params?: any,
  customHeaders?: Record<string, string>
): Promise<ApiResponse<T>> => {
  return fetchData<T>(params, url, 'GET', customHeaders);
};

// POST request
export const postData = async <T = any>(
  url: string,
  payload: any,
  customHeaders?: Record<string, string>
): Promise<ApiResponse<T>> => {
  return fetchData<T>(payload, url, 'POST', customHeaders);
};

// PUT request
export const putData = async <T = any>(
  url: string,
  payload: any,
  customHeaders?: Record<string, string>
): Promise<ApiResponse<T>> => {
  return fetchData<T>(payload, url, 'PUT', customHeaders);
};

// DELETE request
export const deleteData = async <T = any>(
  url: string,
  customHeaders?: Record<string, string>
): Promise<ApiResponse<T>> => {
  return fetchData<T>(null, url, 'DELETE', customHeaders);
};

// PATCH request
export const patchData = async <T = any>(
  url: string,
  payload: any,
  customHeaders?: Record<string, string>
): Promise<ApiResponse<T>> => {
  return fetchData<T>(payload, url, 'PATCH', customHeaders);
};

/**
 * Utility functions for token management
 */

// Set auth token
export const setAuthToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('authToken', token);
  } catch (error) {
    console.error('Error saving auth token:', error);
  }
};

// Get auth token
export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('authToken');
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

// Remove auth token
export const removeAuthToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('authToken');
  } catch (error) {
    console.error('Error removing auth token:', error);
  }
};

/**
 * Update base URL for the API client
 */
export const setBaseURL = (baseURL: string): void => {
  apiClient.defaults.baseURL = baseURL;
};

/**
 * Set default headers for all requests
 */
export const setDefaultHeaders = (headers: Record<string, string>): void => {
  apiClient.defaults.headers.common = {
    ...apiClient.defaults.headers.common,
    ...headers,
  };
};

export default {
  fetchData,
  getData,
  postData,
  putData,
  deleteData,
  patchData,
  setAuthToken,
  getAuthToken,
  removeAuthToken,
  setBaseURL,
  setDefaultHeaders,
}; 