import React, { useState } from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { loginUser } from '../services/userService';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
const Login = () => {
  // const { login } = useAuth();
  const [errorMessage , setErrorMessage] = useState("")
  const [errorColor , setErrorColor] = useState("")
  const navigate = useNavigate()
  const onFinish = async (values) => {
    console.log('Success:', values)
    try{
      setErrorColor("green")
      setErrorMessage("Loading...")
      const data = await loginUser(values.username , values.password)
      console.log(data)
      setErrorColor("green")
      setErrorMessage("Logged in successfully")
      // login()
      navigate("/home")
    }catch(error){
      console.log("could not log in" , error)
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error
        setErrorColor("red")
        setErrorMessage(`Could not log in: ${errorMessage}`)
      } else {
        setErrorColor("red")
        setErrorMessage("Could not log in: An unknown error occurred.")
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    
  };
  return (
    <div style={{height:"100vh" ,width:"100vw" ,display:"flex",justifyContent:"center" ,alignItems:"center",backgroundColor:"white",flexDirection:'column',gap:"20px"}}>
      <h2>Login</h2>
       <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>


    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  <p style={{color:errorColor}}>{errorMessage}</p>
    </div>
  )
}

export default Login