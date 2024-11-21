import axios from 'axios';

// Function to get the CSRF token from cookies
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrfToken = getCookie('csrftoken');

// Create the Axios instance
// baseURL: 'http://localhost:8000'
// baseURL:'https://college-management-backend-3eww.onrender.com'
const axiosInstance = axios.create({
    baseURL: 'https://college-management-backend-3eww.onrender.com', // Set your base API URL
    headers: {
        'X-CSRFToken':getCookie('csrftoken'), // Automatically include CSRF token
    },
    
    withCredentials: true, // Include cookies in cross-origin requests
    
});

export default axiosInstance;
