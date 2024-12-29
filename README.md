# React API Helper

A utility library for simplifying API requests in React applications. Built on top of **React Query** and **Axios**, it provides a seamless way to manage API calls and caching with an intuitive context-based setup.

## Features

- 🌐 **Axios Integration**: Customize API calls with ease.
- ⚡ **React Query**: Automatic caching, refetching, and stale data management.
- 📦 **Async Storage Support**: Persisted caching for React Native or browser-based environments.
- 🛠️ **TypeScript Ready**: Fully typed for better developer experience.

## Installation

```bash
npm install react-api-helper
# or
yarn add react-api-helper
```

## Usage

### Setup Provider

Wrap your application with the `ApiHelperProvider` to set up the context and configuration.

```tsx
import React from "react";
import { ApiHelperProvider } from "react-api-helper";

const App = () => (
  <ApiHelperProvider baseURL="https://api.example.com">
    <YourApp />
  </ApiHelperProvider>
);

export default App;
```

### Using `useApiHelper`

Leverage the `useApiHelper` hook to perform API requests effortlessly.

```tsx
import { useApiHelper } from "react-api-helper";

const MyComponent = () => {
  const { data, isLoading, isError } = useApiHelper({
    url: "/endpoint",
    method: "GET",
    queryKey: ["endpoint-data"],
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
```

## API

### `ApiHelperProvider`

| Prop       | Type                 | Default         | Description                                      |
|------------|----------------------|-----------------|--------------------------------------------------|
| `baseURL`  | `string`             | `undefined`     | Base URL for all Axios requests.                |
| `axiosConfig` | `AxiosRequestConfig` | `{}`           | Custom Axios configuration.                     |
| `queryClientConfig` | `QueryClientConfig` | `{}`       | React Query client configuration.               |

### `useApiHelper`

| Option       | Type                 | Description                                          |
|--------------|----------------------|------------------------------------------------------|
| `url`        | `string`             | API endpoint to fetch data from.                     |
| `method`     | `'GET' , 'POST' , 'PUT' , 'DELETE'` | HTTP method for the request.          |
| `queryKey`   | `Array<string>`      | Unique key for React Query's cache management.       |

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.
