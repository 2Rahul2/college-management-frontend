import axios from 'axios';

// Function to get the CSRF token from cookies
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrfToken = getCookie('csrftoken');

// Create the Axios instance
// baseURL: 'http://localhost:8000'
// baseURL:'https://college-management-backend-3eww.onrender.com'
const axiosInstance = axios.create({
    baseURL: 'https://college-management-backend-3eww.onrender.com', // Set your base API URL
     // Include cookies in cross-origin requests
});
    
    
// Interceptor to dynamically set CSRF token in request headers
axiosInstance.interceptors.request.use((config) => {
    const csrfToken = getCookie('csrftoken');
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken; // Set CSRF token header
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
