import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../css/adminForm.css';
import Button from './Buttons/SubmitButton'
import ClickButton from './Buttons/SubmitButton'

const AdminRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    voterID: '',
    name: '',
    email: '',
    password: '',
    image: null
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    console.log(e.target.f)
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.voterID) newErrors.voterID = 'Admin ID is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.image && !otpSent) newErrors.image = 'Image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      if (!otpSent) {
        // First step: Check admin and request OTP
        const checkResponse = await axios.post('http://localhost:5000/check_b4_upload', formData);
        if (checkResponse.data.status) {
          setOtpSent(true);
        } else {
          alert(checkResponse.data.message || 'Admin already exists');
        }
      } else {
        // Second step: Verify OTP and complete registration
        const data = new FormData();
        data.append('voterID', formData.voterID);
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('otp', otp);
        data.append('image', formData.image);

        const registerResponse = await axios.post('http://localhost:5000/upload', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (registerResponse.data.status) {
          alert('Registration successful!');
          navigate('/admin/adminPanel'); // Redirect to login page
        } else {
          alert(registerResponse.data.message || 'Registration failed');
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert(error.response?.data?.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-register-container">
      <h2>Admin Registration</h2>
      <form onSubmit={handleSubmit} className="admin-register-form">
        <div className="form-group">
          <label>Admin ID</label>
          <input
            type="text"
            name="voterID"
            value={formData.voterID}
            onChange={handleChange}
            disabled={otpSent}
          />
          {errors.voterID && <span className="error">{errors.voterID}</span>}
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={otpSent}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={otpSent}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={otpSent}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        {!otpSent && (
          <div className="form-group">
            <label>Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {errors.image && <span className="error">{errors.image}</span>}
            {previewImage && (
              <div className="image-preview">
                <img src={previewImage} alt="Preview" />
              </div>
            )}
          </div>
        )}

        {otpSent && (
          <div className="form-group">
            <label>OTP (Check your email)</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        )}

         

        <Button button_name= {loading ? 'Processing...' : otpSent ? 'Complete Registration' : 'Register'} width="50%" height = "50px"/>
        {!otpSent && (
           <ClickButton button_name ="Login" onClick={() => navigate('/admin/adminLogin')}
            width="50%" 
            height="50px"
           />
          
        )}
        {otpSent && (
           <ClickButton button_name ="Back" onClick={() => setOtpSent(false)}
            width="50%" 
            height="50px"
           />
          
        )}
     
      </form>
    </div>
  );
};

export default AdminRegister;