import { Tabs } from 'antd'
import React from 'react'
import Test from './Test';

const FacultyDashboard = () => {
    const onChange = (key) => {
        console.log(key);
      };
      const items = [
        {
          key: '1',
          label: 'Tab 1',
          children: <Test/>,
        },
        {
          key: '2',
          label: 'Tab 2',
          children: 'Content of Tab Pane 2',
        },
        {
          key: '3',
          label: 'Tab 3',
          children: 'Content of Tab Pane 3',
        },
      ];
  return (
    <div>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange}/>
    </div>
  )
}

export default FacultyDashboard