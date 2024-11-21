import React, { useState } from 'react'
import { Space, Table, Tag } from 'antd';

import StudentPagination from '../../Pagination/StudentPagination';
const StudentsList = ({activeTab}) => {

  const [updatedFaculty, setUpdatedFaculty] = useState({});
  const [studentList  , setStudentList] = useState([])
  const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Contact',
        dataIndex: 'contact',
        key: 'contact',
      },
      {
        title: 'Faculty',
        dataIndex: 'faculty',
        key: 'faculty',
      },
    ];

      
      const handleRowClick = (record) => {
        console.log("Row clicked:", record);
        // Navigate or perform actions here
        // alert(`Clicked on ${record.name}`);
      };
  return (
    <div>
        <Table
        
        onRow={(record) => ({
          onClick: () => handleRowClick(record), // Make row clickable
          style: { cursor: "pointer" },
        })}
        pagination={false} columns={[
          { title: "Name", dataIndex: "name" },
          { title: "Contact", dataIndex: "contact" },
          { title: "Faculty", dataIndex: "faculty", render: (text, record) => {
            // If the faculty has been updated, show the new faculty name
            return updatedFaculty[record.key] || text;
          }},
        ]} dataSource={studentList} />;
        <StudentPagination setUpdatedFaculty={setUpdatedFaculty} activeTab={activeTab} setStudentList={setStudentList}/>
    </div>
  )
}

export default StudentsList