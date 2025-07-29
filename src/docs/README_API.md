# API Service Documentation

## Overview
This API service provides a unified way to handle HTTP requests in your React Native app using Axios. It includes automatic token management, error handling, and request/response logging.

## Features

✅ **All HTTP Methods**: GET, POST, PUT, DELETE, PATCH  
✅ **Automatic Token Management**: Auto-adds Bearer tokens from AsyncStorage  
✅ **Error Handling**: Comprehensive error handling with status codes  
✅ **Request/Response Logging**: Automatic logging for debugging  
✅ **Network Error Detection**: Handles offline/network issues  
✅ **Token Expiration Handling**: Auto-clears expired tokens  
✅ **TypeScript Support**: Full type safety  
✅ **Convenience Methods**: Simple wrapper functions for common operations  

## Installation
The following packages were installed:
```bash
npm install axios @react-native-async-storage/async-storage
```

## Basic Usage

### Main Function
```typescript
import { fetchData } from '../services/apiService';

// Basic syntax
const response = await fetchData(payload, url, method);
```

### Examples

#### GET Request (with null payload)
```typescript
const response = await fetchData(null, '/api/users', 'GET');
```

#### GET Request with query parameters
```typescript
const params = { page: 1, limit: 10 };
const response = await fetchData(params, '/api/users', 'GET');
```

#### POST Request (create data)
```typescript
const userData = { name: 'John', email: 'john@example.com' };
const response = await fetchData(userData, '/api/users', 'POST');
```

#### PUT Request (update data)
```typescript
const updateData = { name: 'John Updated' };
const response = await fetchData(updateData, '/api/users/123', 'PUT');
```

#### DELETE Request (with null payload)
```typescript
const response = await fetchData(null, '/api/users/123', 'DELETE');
```

## Convenience Methods

Instead of using `fetchData` directly, you can use these simpler methods:

```typescript
import { getData, postData, putData, deleteData, patchData } from '../services/apiService';

// GET request
const users = await getData('/api/users');

// POST request  
const newUser = await postData('/api/users', userData);

// PUT request
const updatedUser = await putData('/api/users/123', updateData);

// DELETE request
const result = await deleteData('/api/users/123');

// PATCH request
const patchedUser = await patchData('/api/users/123', partialData);
```

## Response Format

All API calls return a standardized response:

```typescript
interface ApiResponse<T = any> {
  success: boolean;        // Whether the request was successful
  data?: T;               // Response data (if successful)
  error?: string;         // Error message (if failed)
  statusCode?: number;    // HTTP status code
}
```

### Success Response
```typescript
{
  success: true,
  data: { id: 1, name: "John" },
  statusCode: 200
}
```

### Error Response
```typescript
{
  success: false,
  error: "User not found",
  statusCode: 404
}
```

## Authentication

### Set Token (after login)
```typescript
import { setAuthToken } from '../services/apiService';

await setAuthToken('your-jwt-token-here');
```

### Get Current Token
```typescript
import { getAuthToken } from '../services/apiService';

const token = await getAuthToken();
```

### Remove Token (on logout)
```typescript
import { removeAuthToken } from '../services/apiService';

await removeAuthToken();
```

### Automatic Token Handling
The service automatically:
- Adds `Authorization: Bearer {token}` header to all requests
- Clears token on 401 (Unauthorized) responses
- Retrieves token from AsyncStorage on each request

## Configuration

### Set Base URL
```typescript
import { setBaseURL } from '../services/apiService';

// Set once at app startup
setBaseURL('https://api.yourdomain.com');
```

### Set Default Headers
```typescript
import { setDefaultHeaders } from '../services/apiService';

setDefaultHeaders({
  'X-App-Version': '1.0.0',
  'X-Platform': 'mobile'
});
```

### Custom Headers for Specific Requests
```typescript
const customHeaders = {
  'Content-Type': 'multipart/form-data'
};

const response = await fetchData(formData, '/api/upload', 'POST', customHeaders);
```

## Error Handling

### Check Response Success
```typescript
const response = await fetchData(data, '/api/endpoint', 'POST');

if (response.success) {
  console.log('Success:', response.data);
} else {
  console.error('Error:', response.error);
  console.log('Status Code:', response.statusCode);
}
```

### Handle Different Error Types
```typescript
if (!response.success) {
  switch (response.statusCode) {
    case 400:
      // Bad Request - show validation errors
      Alert.alert('Validation Error', response.error);
      break;
    case 401:
      // Unauthorized - redirect to login
      navigation.navigate('Login');
      break;
    case 404:
      // Not Found
      Alert.alert('Not Found', response.error);
      break;
    case 500:
      // Server Error
      Alert.alert('Server Error', 'Please try again later');
      break;
    case 0:
      // Network Error
      Alert.alert('Network Error', 'Check your internet connection');
      break;
    default:
      Alert.alert('Error', response.error);
  }
}
```

## Real-World Example (SignUp Integration)

```typescript
import { fetchData, setAuthToken } from '../services/apiService';

const handleSignUp = async () => {
  setIsLoading(true);
  
  try {
    const signupData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      mobileNumber: formData.mobileNumber,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
    };

    const response = await fetchData(signupData, '/api/auth/signup', 'POST');
    
    if (response.success) {
      // Save token if returned
      if (response.data?.token) {
        await setAuthToken(response.data.token);
      }
      
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Dashboard');
    } else {
      Alert.alert('Signup Failed', response.error);
    }
  } catch (error) {
    Alert.alert('Error', 'Something went wrong');
  } finally {
    setIsLoading(false);
  }
};
```

## File Structure

```
src/services/
├── apiService.ts          # Main API service
├── apiUsageExample.ts     # Comprehensive usage examples
└── README_API.md         # This documentation
```

## Important Notes

1. **Set Base URL**: Remember to set your API base URL at app startup
2. **Token Storage**: Tokens are automatically stored in AsyncStorage
3. **Network Handling**: The service handles network errors gracefully
4. **Logging**: All requests/responses are logged for debugging
5. **TypeScript**: Full TypeScript support with proper types
6. **Error Handling**: Always check `response.success` before using data

## Need Help?

Check `apiUsageExample.ts` for comprehensive examples of every feature! 