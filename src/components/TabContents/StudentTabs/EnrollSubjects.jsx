import React, { useEffect, useState } from 'react'
import { Checkbox } from 'antd';
import { Button ,message  } from 'antd';
import { Dropdown, Space } from 'antd';
import axiosInstance from '../../../services/axiosInstance';
const EnrollSubjects = () => {
    const [subfacData , setSubFacData] = useState(null)
    const [enrolledSubjects, setEnrolledSubjects] = useState({}); 
    const [selectedSubjects, setSelectedSubjects] = useState({});


    useEffect(() => {
        const fetchSubjects = async () => {
          try {
            // Fetch subjects with faculties
            const response = await axiosInstance.get("/subject-with-faculties/") // Replace with actual API
            setSubFacData(response.data);
    
            // Fetch enrolled subjects (student's enrolled subjects)
            const enrolledResponse = await axiosInstance.get("/student/enrollments/"); // Replace with actual API
            const enrolledSubjectsData = enrolledResponse.data.enrollments.reduce((acc, enrollment) => {
              acc[enrollment.subject_name] = true;
              return acc;
            }, {});
            setEnrolledSubjects(enrolledSubjectsData);
          } catch (error) {
            console.error("Error fetching subjects:", error);
          }
        };
    
        fetchSubjects();
      }, []);

    const handleSubjectSelect = (subjectId, facultyId) => {
        setSelectedSubjects((prev) => ({
            ...prev,
            [subjectId]: facultyId,
        }));
    };
    const handleCheckboxChange = (subjectId, checked) => {
        setSelectedSubjects((prev) => {
            if (!checked) {
                const { [subjectId]: _, ...rest } = prev;
                return rest;
            }
            return prev;
        });
    };

    const handleSubmit = async () => {
        const payload = {
            selectedSubjects: Object.entries(selectedSubjects).map(([subjectId, facultyId]) => ({
                subject: parseInt(subjectId),
                faculty: facultyId,
            })),
        };

        try {
            const response = await axiosInstance.post('/enroll/', payload);
            message.success('Enrollment successful!');
        } catch (error) {
            console.error(error);
            message.error('Failed to enroll. Try again later.');
        }
    };


    const getSubjectFaculties = async ()=>{
        const data = await axiosInstance.get("subject-with-faculties")
        console.log(data.data)
        setSubFacData(data.data)
    }
    const onChange = (e) => {
      console.log(`checked = ${e.target.checked}`);
    };
  return (
    <div className='enroll-container'>
        <h2>Enroll to subjects</h2>
        <div className="subjects">
      {subfacData && subfacData.subjects.map((subject) => {
        if (enrolledSubjects[subject.name]) {
          return null;
        }

        const items = subject.faculties.map((faculty) => ({
          key: faculty.id,
          label: (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleSubjectSelect(subject.id, faculty.id);
              }}
            >
              {faculty.first_name} {faculty.last_name}
            </a>
          ),
        }));

        return (
          <Checkbox
            className="check-box"
            key={subject.id}
            checked={!!selectedSubjects[subject.id]}
            onChange={(e) => handleCheckboxChange(subject.id, e.target.checked)}
          >
            <Dropdown
              menu={{
                items,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {subject.name}
                </Space>
              </a>
            </Dropdown>
          </Checkbox>
        );
      })}
    </div>
        <div>
            <Button  onClick={handleSubmit} className='enroll-btn'>Enroll</Button>

        </div>
    </div>
  )
}

export default EnrollSubjects