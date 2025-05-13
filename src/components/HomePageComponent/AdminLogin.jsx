import React from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import Button from "./Buttons/SubmitButton";
import ClickButton from "./Buttons/clickButton";
import '../../css/LoginForm.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
export default function AdminLogin() {


   

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [isTrue, setIsTrue] = React.useState(false);
    const [otp, setOtp] = React.useState('');
    //const [token, setToken] = React.useState('');
    const [formData, setFormData] = React.useState({
        voterID: '',
        email: '',
        password: '',
        otp: ''
    });

    

    function handleOTP(event) {


        const { value } = event.target;
        setOtp(value);
        setFormData((prev) => ({ ...prev, otp: value }));
        console.log("Form data:", formData);
        //console.log("OTP:", value);
    }


    function handleEyeClick() {
        setShowPassword(!showPassword);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const Data = new FormData(event.target);
        const data = Object.fromEntries(Data.entries());
        setFormData((prev) => ({ ...prev, ...data }));
        console.log("Form data:", formData);

        axios.post('/adminLogin', data).then((response) => {
            setMessage(response.data.message);
            setIsTrue(response.data.status);

        }).catch((error) => {
            console.log("Error in Login submission", error);
            alert("Account doesn't exist or password is incorrect!!");
        })

    }

    function handleOTPSubmit(event) {
        const Data = formData;

        axios.post('/adminLogin-verify', Data).then((response) => {
            console.log(response);
            setMessage(response.data.message);
            setIsTrue(response.data.status);
            const receivedToken = response.data.token;
            const user = response.data.user;
            console.log("user" , user)
          
            
            localStorage.setItem('user', JSON.stringify(user)); // Store the user data in local storage
            localStorage.setItem('token', receivedToken); // Store the token in local storage
            navigate('/admin/adminLogin/adminPanel'); // Navigate to the home page on successful login

        }).catch((error) => {
            setMessage("Invalid OTP or OTP expired , Try again!!");
            //console.log("Error in OTP submission", error);
        })
    }

    return (
             <div className="Login-container">
                <h1 className="Login-header">{{ isTrue } ? message : message}</h1>
                <form className="Main-Login-form" onSubmit={handleSubmit} >
                    <div className="Login-form-group">
                        <label htmlFor="voterID">Voter ID</label>
                        <input type="text" id="voterID" name="voterID" required />
                    </div>
                    <div className="Login-form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="Login-form-group">
                        <label htmlFor="password">Password</label>
                        <input type={showPassword ? "password" : "text"} id="password" name="password" required />
                        <span className="password-eye-icon">
                            {showPassword ? <HiEyeOff onClick={handleEyeClick} /> : <HiEye onClick={handleEyeClick} />}
                        </span>
                    </div>
                    {isTrue && <div className="Login-form-group">
                        <label htmlFor="otp">OTP</label>
                        <input type="text" id="otp" value={otp} name="otp" onChange={handleOTP} required />
                    </div>}
                    {isTrue && <ClickButton onClick={handleOTPSubmit} button_name="submit otp" width="50%" height="40px" />}

                    <Button button_name="Login" width="50%" height="40px" />
                </form >
            </div >
     );
}