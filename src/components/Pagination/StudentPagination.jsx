import React, { useEffect, useState } from 'react'
import { Pagination ,Button } from 'antd';
import axiosInstance from '../../services/axiosInstance';
import axios from 'axios';


const StudentPagination = ({setStudentList , activeTab,setUpdatedFaculty}) => {
  const [total_count , setTotalCount] = useState(0)
  function create_student_list(data) {
    const stud_list = data.results.map((student, index) => ({
        key: student.id,
        name: `${student.first_name} ${student.last_name}`,
        contact: student.contact_number,
        faculty: student.faculties.length > 0
            ? `${student.faculties[0].first_name} ${student.faculties[0].last_name}`
            : <Button onClick={async()=>{
              try{
                const response = await axiosInstance.post("/assign-faculty-to-student/" ,{student_id:student.id})
                console.log(response.data)
                setUpdatedFaculty((prev) => ({
                  ...prev,
                  [student.id]: response.data.name // Assume response.data contains the faculty name
                }));

              }catch{
                console.log("error assinging")
              }

            }}>Assign</Button>,
    }));
    console.log(stud_list);
    setStudentList(stud_list);
  }

  const Getdata = async () => {
      try {
          const response_data = await axiosInstance.get('/student-count/');
          const total_count = response_data.data.total_count;
          setTotalCount(Math.ceil(total_count / 1));
      } catch (error) {
        console.log("Getdata request canceled");
      }
  };

  const getStudentsData = async () => {
      try {
          const response_data = await axiosInstance.get('/students/');
          console.log(response_data.data);
          create_student_list(response_data.data);
      } catch (error) {
        console.log("getStudentsData request canceled");
          
      }
  };

  useEffect(() => {

      if (activeTab === "list") {
          Getdata();
          getStudentsData();
      }

  }, [activeTab]);
    const itemRender = (_, type, originalElement) => {
        if (type === 'prev') {
          return <a>Previous</a>;
        }
        if (type === 'next') {
          return <a>Next</a>;
        }
        return originalElement;
      };
    const pageChange = async (page)=>{
      const student_data = await axiosInstance.get(`/students/?page=${page}`)
      console.log(student_data.data)
      create_student_list(student_data.data)
      
    }

  return (
    <div>
      {/* <p>{page_size}</p> */}
        <Pagination onChange={pageChange} showSizeChanger={false} total={total_count} pageSize={5} itemRender={itemRender} />;
    </div>
  )
}

export default StudentPagination