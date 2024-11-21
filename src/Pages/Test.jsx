import React from 'react'
import RegisterForm from '../components/RegisterForm'
import LoginPage from '../components/Login'
import StudentForm from '../components/StudentForm'

const Test = () => {
  return (
    <>
     <h1>Register Student</h1>
    <RegisterForm/>
      <h1>Login Page</h1>
      <LoginPage />
      <StudentForm studentId={1}/>
    </>
  )
}

export default Test