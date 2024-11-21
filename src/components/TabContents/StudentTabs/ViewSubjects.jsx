import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../services/axiosInstance'
import { Table } from 'antd'

const ViewSubjects = () => {
  const [enrollments, setEnrollments] = useState([]); 

  useEffect(()=>{
    const getStudentSubjects = async()=>{
      try{
        const response = await axiosInstance("/student/enrollments/")
        console.log(response.data)
        setEnrollments(response.data.enrollments)
      }catch{
        console.log("error getting data")
      }
    }

    getStudentSubjects()
  },[])

  const columns = [
    {
      title: "Subject Name",
      dataIndex: "subject_name",
      key: "subject_name",
    },
    {
      title: "Faculty Name",
      dataIndex: "faculty_name",
      key: "faculty_name",
    },
    {
      title: "Enrollment Date",
      dataIndex: "enrolled_on",
      key: "enrolled_on",
    },
  ];


  return (
    <div>
      <Table 
      columns={columns}
      dataSource={enrollments}
      pagination={false}
      rowKey={(record) => record.id} 
     />;
    </div>
  )
}

export default ViewSubjects