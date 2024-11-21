// import React, { useState, useEffect } from 'react';
// import { fetchFacultyStudents, createStudent } from '../services/api';

// function FacultyDashboard() {
//   const [students, setStudents] = useState([]);
//   const [newStudent, setNewStudent] = useState({});

//   useEffect(() => {
//     fetchFacultyStudents().then((res) => setStudents(res.data));
//   }, []);

//   const handleCreateStudent = () => {
//     createStudent(newStudent).then(() => {
//       fetchFacultyStudents().then((res) => setStudents(res.data));
//     });
//   };

//   return (
//     <div>
//       <h1>Faculty Dashboard</h1>
//       <ul>
//         {/* {students.map((student) => (
//           <li key={student.id}>{student.user.first_name} {student.user.last_name}</li>
//         ))} */}
//       </ul>
//       <button onClick={handleCreateStudent}>Add Student</button>
//     </div>
//   );
// }

// export default FacultyDashboard;
