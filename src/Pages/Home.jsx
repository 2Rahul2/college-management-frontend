import React, { useEffect, useState } from 'react';
import {
  LogoutOutlined,

} from '@ant-design/icons';
import { Layout, Menu, message, theme } from 'antd';
import TabsComponent from '../components/MainTabs/FacultyTab';
import axiosInstance from '../services/axiosInstance';
import StudentTab from '../components/MainTabs/StudentTab';
import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { deleteStorage } from '../services/userService';
const { Header, Content, Footer, Sider } = Layout;
const siderStyle = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

const Home = () => {
  // const {logout} = useAuth()
  const navigate = useNavigate();
  const handleLogout = async () => {
    console.log("Logout clicked");
    try{
      const response = await axiosInstance.post("/api/logout/")
      // logout()
      // deleteStorage()
      navigate("/")
      console.log(response)
    }catch(error){
      console.error("Could not logout:", error.response?.data || error.message);
      message.error('Failed to Logout. Please Refresh.');

      // navigate("/")
    }
  };
  const items = [
    {
      key: "1",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout, // Attach your click handler here
    },
  ]
  const [faculty, setFaculty] = useState(null);
  const [student ,setStudent] = useState(null)

  const getRole = async () => {
    try {
        const role = await axiosInstance.get("role/");
        if (role.data.is_faculty) {
            setFaculty(true);
            setStudent(false)
        } else {
            setFaculty(false);
            setStudent(true)
        }
    } catch (error) {
      console.log("getRole request canceled");
    }
  };

  useEffect(() => {

    getRole();
  }, []);
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
      return (
        <Layout hasSider>
          <Sider style={siderStyle}>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}} className="demo-logo-vertical" >
              <img style={{ width:"40px" , height:"40px" ,margin:"20px 10px 25px 20px"}} src="/images/programming.png" alt="" />
              <h2 style={{color:"white"}}>Assessment</h2>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
          </Sider>
          <Layout
            style={{
              marginInlineStart: 200,
            }}
          >
            {/* <Header
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
            /> */}
            <Content
              style={{
                margin: '24px 16px 0',
                overflow: 'initial',
              }}
            >
              <div
                style={{
                  padding: 24,
                  textAlign: 'center',
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                {faculty && (
                  <TabsComponent/>
                )}
                {student &&(
                  <StudentTab/>
                )}

                {/* <p>long content</p> */}
                {/* {faculty ? 
                  <TabsComponent/>
                  :
                  <StudentTab/>
                } */}
              </div>
            </Content>
            <Footer
              style={{
                textAlign: 'center',
              }}
            >
              Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      );
}

export default Home