import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/register/', {
        username,
        email,
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error registering user');
      console.error('Error registering user:', error);
    }
  };
  const getUsers = async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8000/students/');
      console.log(response.data);
    } catch (error) {
      setMessage('Error getting user');
      console.error('Error getting user:', error);
    }
  }

  const studentDeatils = async (e)=>{
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8000/student/1');
      console.log(response.data);
    } catch (error) {
      setMessage('Error getting student details');
      console.error('Error getting student deatils:', error);
    }
  }

  const assignFac = async (e)=>{
    e.preventDefault();
    try {
        let studentId = 2
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMxOTQzNDY4LCJpYXQiOjE3MzE5NDMxNjgsImp0aSI6IjBkMWZjMzIwY2EzMTRkZDM5OWZkMDJjYTc4MDU3ZmJlIiwidXNlcl9pZCI6MX0.4cLk926FqtyPBDuHVkqiJN7lS33b8DUfkaXN6F3PldI'
      const response = await axios.post('http://localhost:8000/assign-faculty-to-student/',{ student_id: studentId },
        {   
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
      console.log(response.data);
    } catch (error) {
      setMessage('Error assiging faculty to student');
      console.error('Error assiging faculty to student:', error);
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={getUsers}>click me</button>
      <button onClick={studentDeatils}>get student details</button>
      <button onClick={assignFac}>Assign</button>

    </div>
  );
};

export default RegisterForm;
