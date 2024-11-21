import React, { useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
// import axiosInstance from "./axiosInstance";

const StudentForm = ({ studentId }) => {
  const [student, setStudent] = useState({});
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    dob: '',
    gender: '',
    blood_group: '',
    contact_number: '',
    address: '',
    profile_pic: null, // File object for the image
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch student data
    const fetchStudent = async () => {
      try {
        const response = await axiosInstance.get(`/student/${studentId}/`);
        console.log(response.data);
        setStudent(response.data);
        setFormData({
          ...response.data,
          profile_pic: null, // Reset file on initial load
        });
      } catch (error) {
        setMessage("Error fetching student data.");
      }
    };

    fetchStudent();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_pic") {
      setFormData({
        ...formData,
        profile_pic: files[0], // Save the file object
      });
      const reader = new FileReader();
      reader.onloadend = () =>   {
        setStudent({
          ...student,
          profile_pic: reader.result, // Store the preview URL in student state
        });
      };
      if (files[0]) {
        reader.readAsDataURL(files[0]); // Read the selected file as a data URL
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData(); // Create FormData object

      // Append all fields to FormData
      for (const key in formData) {
        if (key === "profile_pic") {
          // Only append if it's a file
          if (formData[key] instanceof File) {
            data.append(key, formData[key]);
          }
        } else {
          data.append(key, formData[key]);
        }
      }

      const response = await axiosInstance.put(`/student/${studentId}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Student details updated successfully.");
    } catch (error) {
      console.error(error.response?.data);
      setMessage("Error updating student details.");
    }
  };

  return (
    <div>
      <h1>Edit Student Details</h1>
      {message && <p>{message}</p>}
      {student.profile_pic ? (
        <img
          src={student.profile_pic}
          alt="Profile"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      ) : (
        <p>Loading profile picture...</p>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            value={formData.first_name || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={formData.last_name || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dob"
            value={formData.dob || ""}
            onChange={handleChange}
          />
        </label>
        <label>Blood Group:</label>
        <input
          type="text"
          name="blood_group"
          value={formData.blood_group || ""}
          onChange={handleChange}
        />
        <label>
          Gender:
          <select
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <label>
          Contact Number:
          <input
            type="text"
            name="contact_number"
            value={formData.contact_number || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Address:
          <textarea
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
          />
        </label>
        <label>Profile Picture:</label>
        <input type="file" name="profile_pic" onChange={handleChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default StudentForm;
