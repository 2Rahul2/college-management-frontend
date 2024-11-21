import React, { useState } from 'react'
import { Tabs } from 'antd';
import StudentsList from '../TabContents/FacultyTabs/StudentsList';
import AddStudents from '../TabContents/FacultyTabs/AddStudents';
import { Button, notification, Space } from 'antd';

const TabsComponent = () => {
  const [api, contextHolder] = notification.useNotification();
  const [activeTab , setActiveTab] = useState("list")

  const openNotification =(pauseOnHover , text) => {
      api.open({
      message: 'Student Status',
      description:
          text,
      showProgress: true,
      pauseOnHover,
      });
  };
    const onChange = (key) => {
        console.log(key);
        if(key==="1"){
          setActiveTab("list")
        }else if(key === "2"){
          setActiveTab("add")
        }
      };
      const items = [
        {
          key: '1',
          label: 'View All Students',
          children: <StudentsList activeTab={activeTab} />, 
        },
        {
          key: '2',
          label: 'Add Student',
          children: <AddStudents notification={openNotification}/>,
        },
        // {
        //   key: '3',
        //   label: 'Tab 3',
        //   children: 'Content of Tab Pane 3',
        // },
      ];
  return (
    <>
      {contextHolder}
        <Tabs 
        defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  )
}

export default TabsComponent