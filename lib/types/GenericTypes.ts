/**
 * @typedef HTTPMethod
 *
 * Represents the HTTP methods used for API requests.
 * This type is used to specify the type of HTTP request in the API helper hook.
 *
 * @value {string} 'GET' - Fetches data from the server.
 * @value {string} 'POST' - Sends data to the server to create a resource.
 * @value {string} 'PUT' - Sends data to the server to update an existing resource.
 * @value {string} 'PATCH' - Sends data to the server to partially update an existing resource.
 * @value {string} 'DELETE' - Deletes a resource from the server.
 *
 * @example
 * // Example of using the HTTPMethod type:
 * const method: HTTPMethod = 'GET'; // GET request
 * const postMethod: HTTPMethod = 'POST'; // POST request
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods} for more information on HTTP methods.
 */
export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
