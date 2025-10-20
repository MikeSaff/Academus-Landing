// ==================== //
// Editorum API Configuration
// ==================== //

/**
 * Configuration for Editorum API integration
 * 
 * IMPORTANT: This is a template configuration file.
 * Update the values below with actual API credentials and endpoint
 * when the API documentation is available.
 * 
 * To use the API:
 * 1. Uncomment the EDITORUM_API_CONFIG object below
 * 2. Fill in the correct endpoint URL
 * 3. Add any required authentication headers or API keys
 * 4. Update the parseAPIResponse function in script.js to match the actual API response structure
 */

// Uncomment and configure when API documentation is available:
/*
const EDITORUM_API_CONFIG = {
    // API endpoint URL
    // Example: 'https://academuspub.com/api/books' or 'https://api.editorum.ru/v1/books'
    endpoint: 'YOUR_API_ENDPOINT_HERE',
    
    // HTTP headers for API requests
    headers: {
        'Content-Type': 'application/json',
        // Add authentication if required:
        // 'Authorization': 'Bearer YOUR_API_KEY',
        // 'X-API-Key': 'YOUR_API_KEY',
    },
    
    // Optional: Additional parameters
    params: {
        // Example parameters:
        // limit: 20,
        // language: 'en',
        // status: 'published',
    }
};
*/

// ==================== //
// Mock Data Configuration
// ==================== //

/**
 * While the API is not configured, the carousel will use mock data
 * defined in the script.js file.
 * 
 * To disable mock data and show a loading message instead,
 * set USE_MOCK_DATA to false.
 */
const USE_MOCK_DATA = true;

// ==================== //
// API Response Structure Reference
// ==================== //

/**
 * Expected API response structure (update based on actual API documentation):
 * 
 * Option 1: Direct array of books
 * [
 *   {
 *     "id": 1,
 *     "title": "Book Title",
 *     "author": "Author Name",
 *     "cover_url": "https://example.com/cover.jpg",
 *     "url": "https://example.com/book/1"
 *   },
 *   ...
 * ]
 * 
 * Option 2: Object with books array
 * {
 *   "books": [...],
 *   "total": 10,
 *   "page": 1
 * }
 * 
 * Option 3: Nested structure
 * {
 *   "data": {
 *     "items": [...],
 *     "meta": {...}
 *   }
 * }
 * 
 * Update the parseAPIResponse function in script.js accordingly.
 */

// ==================== //
// Development Notes
// ==================== //

/**
 * Reference to similar implementation on https://academuspub.com/en/nauka/
 * 
 * When configuring the API:
 * 1. Check the network tab on the reference page to see actual API calls
 * 2. Note the request headers, parameters, and response structure
 * 3. Update this config file accordingly
 * 4. Test the integration thoroughly
 * 
 * Common API patterns to look for:
 * - REST API with JSON responses
 * - Pagination (page, limit, offset)
 * - Filtering (category, language, status)
 * - Sorting (sort_by, order)
 * - Authentication (API key, Bearer token, Basic auth)
 */

// ==================== //
// CORS Configuration
// ==================== //

/**
 * If you encounter CORS errors when testing locally:
 * 
 * 1. Use a local development server (not file://)
 *    - Python: python -m http.server 8000
 *    - Node.js: npx http-server
 *    - PHP: php -S localhost:8000
 * 
 * 2. If the API doesn't support CORS, you may need to:
 *    - Use a proxy server
 *    - Fetch data server-side instead of client-side
 *    - Contact the API provider to enable CORS
 * 
 * 3. For production, ensure the API allows requests from your domain
 */

console.log('Config loaded. API integration:', typeof EDITORUM_API_CONFIG !== 'undefined' ? 'Configured' : 'Using mock data');


