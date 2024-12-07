/**
 * an Array of routes that are accessible to the public
 * These routes do not required authentication
 * @type {string[]}
 */
export const publicRoutes = ['/'];

/**
 * an Array of routes that are used for authentication
 * These routes will redirect logged in users to /admin
 * @type {string[]}
 */
export const authRoutes = ['/login', '/register'];

/**
 * The prefix for API authentication routes
 * Route that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/admin';
