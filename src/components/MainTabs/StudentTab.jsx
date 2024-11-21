import { Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import ProfileDetails from '../TabContents/StudentTabs/ProfileDetails';
import ViewSubjects from '../TabContents/StudentTabs/ViewSubjects';
import axiosInstance from '../../services/axiosInstance';
import { saveStudentId } from '../../utils/storage';
import axios from 'axios';
import EnrollSubjects from '../TabContents/StudentTabs/EnrollSubjects';

const StudentTab = () => {
    const [studentId, setStudentId] = useState(() => localStorage.getItem("student_id"));

    const getUserId = async () => {
        try {
            if (studentId) {
                console.log("Student ID already set:", studentId);
                return;
            }

            const responseData = await axiosInstance.get("userid");

            if (responseData.data.user_id) {
                console.log("Setting student ID from API:", responseData.data.user_id);
                saveStudentId(responseData.data.user_id);
                setStudentId(responseData.data.user_id);
            }
        } catch (error) {
            console.log("Request canceled");
        }
    };

    useEffect(() => {
        getUserId();

      
    }, [studentId]);


    const onChange = (key) => {
        console.log(key);
        if(key==="1"){
        //   setActiveTab("list")
        }else if(key === "2"){
        //   setActiveTab("add")
        }
      };
      const items = [
        {
          key: '1',
          label: 'Profile Details',
          children: <ProfileDetails studentId={studentId}/>, 
        },
        {
          key: '2',
          label: 'View Subjects',
          children: <ViewSubjects/>,
        },
        {
          key: '3',
          label: 'Enroll Subjects',
          children: <EnrollSubjects/>,
        },
      ];
  return (
    <>
        <Tabs 
            defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  )
}

export default StudentTab