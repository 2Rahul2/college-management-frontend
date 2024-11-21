import React, { useState } from 'react';
import axios from 'axios';
import { loginUser } from '../services/userService';

const LoginPage = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);
      console.log('Login successful:', data);

      // const response = await axios.post(
      //   'http://localhost:8000/api/login/',
      //   { username, password },
      //   {
      //       headers: {
      //           'X-CSRFToken': csrftoken, // Include CSRF token in headers
      //       },
      //       withCredentials: true, // Ensure cookies are included
      //   }
    // );
      // console.log('Login successful:', response.data);
      // console.log(response.data.access)
      // console.log(response.data.refresh)
      
      // setToken(response.data.access);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
