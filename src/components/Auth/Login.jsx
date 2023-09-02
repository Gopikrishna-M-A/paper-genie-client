import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Button, Divider, Form, Input, message, Typography } from 'antd';
import { GoogleOutlined } from '@ant-design/icons'
import axios from 'axios';
import baseURL from '../baseURL'

const { Text, Link } = Typography;


export default function Login({ user, setUser}) {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)

  const nav = ()=> {
    navigate("/signup")
}

  const onFinish = async(values) => {
    setLoading(true)
    try {
      const response = await axios.post(`${baseURL}/auth/login`, values, {
        withCredentials: true, // Include cookies in the request
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) { 
        message.success('Login successful.');
        axios
        .get(`${baseURL}/auth/check-auth`, { withCredentials: true })
        .then((response) => {
          if (response.data.isAuthenticated) {
            // User is authenticated
            setUser(response.data.user);
          } else {
            // User is not authenticated
            setUser(null);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
        navigate('/');
      } else {
        message.error('Login failed. Please try again.');
      }
  
      const responseData = response.data;
      console.log('Response from login:', responseData);
    } catch (error) {
      message.error('Login failed. Please try again.');
      console.error('Error:', error);
    } finally{
      setLoading(false)
    }
  }; 
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
       <div className='Login-page'>

         <div className="login-head">Hey,Hello</div>
         <div className="login-para">Enter the information you entered while registering.</div>
         <Form
            className='login-form'
            name="basic"

            initialValues={{
            remember: true,
            }}

            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
            hasFeedback
            name="username"
            rules={[
                {
                required: true,
                message: 'Please input your username!',
                },
            ]}
            >
            <Input placeholder='Username'/>
            </Form.Item>

            <Form.Item
            hasFeedback
            name="password"
            rules={[
                {
                required: true,
                message: 'Please input your password!',
                },
            ]}
            >
            <Input.Password placeholder='password'/>
            </Form.Item>


            <Form.Item>
            <Button loading={loading} block type="primary" htmlType="submit">
            Sign in
            </Button>
            </Form.Item>

            <Divider id='login-line' plain>or</Divider>

            <Form.Item>
            <Button icon={<GoogleOutlined />} block  >
                Sign in with Google
            </Button>
            </Form.Item>

            <Text type="secondary">Don't have an account? <Link onClick={nav} >Sign up</Link></Text> 

        </Form>
       </div>
  )
}
