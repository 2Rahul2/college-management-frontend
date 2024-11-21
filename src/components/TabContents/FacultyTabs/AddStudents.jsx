import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import axiosInstance from '../../../services/axiosInstance';
const AddStudents = ({notification}) => {
    
    const onFinish = (values) => {
      console.log('Success:', values);
      const create_student = async () => {
          try{

            function getCookie(name) {
              let cookieValue = null;
              if (document.cookie && document.cookie !== '') {
                  var cookies = document.cookie.split(';');
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
          
            var csrfToken = getCookie('csrftoken');

            
            const response_data = await axios.post("https://college-management-backend-3eww.onrender.com/register/", values, {
            headers: {
                'X-CSRFToken': csrfToken, // Include the CSRF token in the request
            }
        });

        console.log(response_data.data);
            notification(false ,"Student added successfully")
          }catch{
            console.log("error during creation of user")
            notification(false ,"Error adding student")
          }
      }
      create_student()
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  return (
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
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your Email!',
        },
        {
            type: 'email',
            message: 'Please enter a valid Email!',
        },
      ]}
    >
      <Input />
    </Form.Item>
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


    {/* <Form.Item name="remember" valuePropName="checked" label={null}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item> */}

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Add
      </Button>
    </Form.Item>
  </Form>
  )
}

export default AddStudents