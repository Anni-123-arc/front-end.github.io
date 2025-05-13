import React from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import Button from "./Buttons/SubmitButton";
import ClickButton from "./Buttons/clickButton";
import '../../css/LoginForm.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ handleUserID }) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [isTrue, setIsTrue] = React.useState(false);
    const [formData, setFormData] = React.useState({
        voterID: '',
        email: '',
        password: '',
        otp: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEyeClick = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (localStorage.getItem("token")) {
            alert("Cannot login while you are already logged in");
            return;
        }

        axios.post('/login', formData)
            .then((response) => {
                setMessage(response.data.message);
                setIsTrue(response.data.status);
            })
            .catch((error) => {
                console.error("Error in Login submission", error);
                alert("Account doesn't exist or password is incorrect!!");
            });
    };

    const handleOTPSubmit = () => {
        axios.post('/loginOTP-verify', formData)
            .then((response) => {
                setMessage(response.data.message);
                setIsTrue(response.data.status);

                const { token, user } = response.data;
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', token);
                navigate('/');
            })
            .catch(() => {
                setMessage("Invalid OTP or OTP expired, try again!");
            });
    };

    return (
        <div className="Login-container">
            <h1 className="Login-header">{message}</h1>
            <form className="Main-Login-form" onSubmit={handleSubmit}>
                <div className="Login-form-group">
                    <label htmlFor="voterID">Voter ID</label>
                    <input
                        type="text"
                        id="voterID"
                        name="voterID"
                        value={formData.voterID}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="Login-form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="Login-form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <span className="password-eye-icon">
                        {showPassword ? <HiEyeOff onClick={handleEyeClick} /> : <HiEye onClick={handleEyeClick} />}
                    </span>
                </div>
                {isTrue && (
                    <div className="Login-form-group">
                        <label htmlFor="otp">OTP</label>
                        <input
                            type="text"
                            id="otp"
                            name="otp"
                            value={formData.otp}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}
                {isTrue && <ClickButton onClick={handleOTPSubmit} button_name="Submit OTP" width="50%" height="40px" />}
                <Button button_name="Login" width="50%" height="40px" />
            </form>
        </div>
    );
}
