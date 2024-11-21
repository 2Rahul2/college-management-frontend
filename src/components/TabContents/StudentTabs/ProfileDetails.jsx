import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../services/axiosInstance'
import axios from 'axios'
// import { Switch } from 'antd';
    import { PlusOutlined } from '@ant-design/icons';
    import {
    Button,
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Rate,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Upload,
    } from 'antd';
import moment from 'moment';

const ProfileDetails = ({studentId}) => {
    const [serverData , setServerData] = useState(null)
    const [form] = Form.useForm(); 
    const [componentDisabled, setComponentDisabled] = useState(true)
    const [profile , setProfile] = useState(null)
    const getData =async ()=>{
        try{
            const responseData = await axiosInstance.get(`student/${studentId}/`)
            console.log(responseData.data)
            setServerData(responseData.data)
        }catch(error){
          console.log("getProfileDetails request canceled");
        }
    }
    useEffect(()=>{
        if (!studentId) return; 
        getData()
        
    },[studentId])


    useEffect(() => {
        if (serverData) {
          // Update form fields with serverData when it's fetched
          form.setFieldsValue({
            firstName: serverData.first_name || '',
            lastName: serverData.last_name || '',
            bloodGroup: serverData.blood_group || '',
            gender: serverData.gender || '',
            birthDate: serverData.dob ? moment(serverData.dob) : null, // Handle empty or invalid dates
            contact: serverData.contact_number || '',
            address: serverData.address || '',
            profilePic: serverData.profile_pic ? [{ url: serverData.profile_pic }] : [], // Handle null or missing profile pic
          });
          setProfile(serverData.profile_pic ? [{ url: serverData.profile_pic }] : [])
        }
      }, [serverData, form]); 
        
    const { RangePicker } = DatePicker;
    const { TextArea } = Input;
    // const normFile = (e) => {
    // if (Array.isArray(e)) {
    //     return e;
    // }
    // return e?.fileList;
    // };
    const normFile = (e) => {
        console.log('Upload event:', e); // Check the structure of the event
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    
    
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
        setComponentDisabled(!checked)
      };


      const onFinish = async (values) => {
        console.log(values)
        console.log(values.profilePic[0].originFileObj); // Check if the file is there

        const formData = new FormData();
      
        // Append form fields
        const dob = new Date(values.birthDate).toISOString().split('T')[0];
        // formData.append('id' , studentId)
        formData.append('first_name', values.firstName);
        formData.append('last_name', values.lastName);
        formData.append('gender', values.gender);
        formData.append('blood_group', values.bloodGroup);
        // formData.append('dob', values.birthDate);
        formData.append('dob', dob);
        formData.append('contact_number', values.contact);
        formData.append('address', values.address);
      
        // Check if a profile picture was uploaded
        if (values.profilePic && values.profilePic[0] && values.profilePic[0].originFileObj) {
            console.log("Adding profile pic");
            formData.append('profile_pic', values.profilePic[0].originFileObj); // Append the file
        }
      
        // Send the request with formData to update the student
        try {
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]); // Print form data key-value pairs
            }
            const response = await axiosInstance.putForm(`/student/${studentId}/`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
        //   const data = await response.json();
          console.log(response.data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  return (
    <>
    <div style={{display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap:"10px"
    }}>
        <Switch defaultChecked={!componentDisabled}  onChange={onChange}/>
        <p>Edit Details</p>
    </div>
    <div className='profile-details'>
     
    <Form
  form={form}
  style={{
    width: "100%",
    maxWidth: 600,
  }}
  labelCol={{
    span: 4,
  }}
  wrapperCol={{
    span: 14,
  }}
  layout="horizontal"
  disabled={componentDisabled}
  onFinish={onFinish}
>
  <Form.Item
    label="First Name"
    name="firstName"
    rules={[{ required: true, message: "First Name is required" }]}
  >
    <Input placeholder="First Name" />
  </Form.Item>

  <Form.Item
    label="Last Name"
    name="lastName"
    rules={[{ required: true, message: "Last Name is required" }]}
  >
    <Input placeholder="Last Name" />
  </Form.Item>

  <Form.Item
    label="Blood Group"
    name="bloodGroup"
    rules={[{ required: true, message: "Please select your blood group" }]}
  >
    <Select placeholder="Select blood group">
      <Select.Option value="A+">A+</Select.Option>
      <Select.Option value="A-">A-</Select.Option>
      <Select.Option value="B+">B+</Select.Option>
      <Select.Option value="B-">B-</Select.Option>
      <Select.Option value="AB+">AB+</Select.Option>
      <Select.Option value="AB-">AB-</Select.Option>
      <Select.Option value="O+">O+</Select.Option>
      <Select.Option value="O-">O-</Select.Option>
    </Select>
  </Form.Item>

  <Form.Item
    label="Gender"
    name="gender"
    rules={[{ required: true, message: "Please select your gender" }]}
  >
    <Select placeholder="Select Gender">
      <Select.Option value="Male">Male</Select.Option>
      <Select.Option value="Female">Female</Select.Option>
      <Select.Option value="Other">Other</Select.Option>
    </Select>
  </Form.Item>

  <Form.Item
    label="Birth Date"
    name="birthDate"
    rules={[{ required: true, message: "Please select your birth date" }]}
  >
    <DatePicker />
  </Form.Item>

  <Form.Item
    label="Contact"
    name="contact"
    rules={[
      { required: true, message: "Contact number is required" },
      { pattern: /^[0-9]{10}$/, message: "Please enter a valid 10-digit contact number" },
    ]}
  >
    <Input placeholder="Enter your contact number" type="tel" maxLength={10} />
  </Form.Item>

  <Form.Item
    label="Address"
    name="address"
    rules={[{ required: true, message: "Address is required" }]}
  >
    <TextArea rows={4} />
  </Form.Item>

  <Form.Item
    label="Profile"
    name="profilePic"
    valuePropName="fileList"
    getValueFromEvent={normFile}
    rules={[{ required: true, message: "Please upload your profile picture" }]}
  >
    <Upload
      beforeUpload={() => false}
      listType="picture-card"
      maxCount={1} // Restricting to 1 image
    >
      <button
        style={{
          border: 0,
          background: "none",
        }}
        type="button"
      >
        <PlusOutlined />
        <div
          style={{
            marginTop: 8,
          }}
        >
          Upload
        </div>
      </button>
    </Upload>
  </Form.Item>

  <Form.Item>
    <Button htmlType="submit">Save Changes</Button>
  </Form.Item>
</Form>


                <div>
                    {serverData &&(
                        <img className='profile-image' style={{objectFit:"cover"}} src={serverData.profile_pic} alt="profile picture" />
                    )}

                </div>
    </div>
    </>
  )
}

export default ProfileDetails