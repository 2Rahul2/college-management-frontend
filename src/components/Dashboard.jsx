import React from 'react';
import axios from 'axios';

const Dashboard = ({ token }) => {
  const [studentDetails, setStudentDetails] = useState(null);
  
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/students/me/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudentDetails(response.data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    fetchDetails();
  }, [token]);

  return (
    <div>
      {studentDetails && (
        <div>
          <h2>{studentDetails.first_name} {studentDetails.last_name}</h2>
          <img src={studentDetails.profile_pic} alt="Profile" />
          <p>{studentDetails.dob}</p>
          <p>{studentDetails.address}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
