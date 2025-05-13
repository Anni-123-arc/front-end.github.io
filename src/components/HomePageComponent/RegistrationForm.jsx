import React from 'react';
import Button from './Buttons/SubmitButton';
import ClickButton from './Buttons/clickButton';
import axios from 'axios';
import '../../css/RegistrationForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ CORRECT


 

export default function RegistrationForm() {

    //navigation instance
    const navigate = useNavigate();

    //useState hook to manage form data
    const [formData, setFormData] = useState({
        voterID: '',
        name: '',
        password: '',
        DOB: '',
        age: '',
        email: '',
        address: '',
        gender: '',
        otp: '', 
    });
    
    //useState hook to manage message and status from server
    const [message, setMessage] = useState('');
    const [isTrue, setIsTrue] = useState(false);
    const [showLogin, setShowLogin] = useState(false);


    


    //Event handler for form submission sets state ON CHanGE
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }
    

    //Event handler for OTP submission
    function handleOtpSubmit(e) {
        // e.preventDefault(); // stop any default behavior

        console.log("Sending OTP data:", formData);

        axios.post('/verify-otp', formData).then((response)=>{
            console.log(response.data.message);
            setIsTrue(response.data.status);
            setShowLogin(response.data.status);
            
        }).catch((error)=>{
            console.log("Error in OTP submission", error);
        })
    }

    //Event handler for form submission and registration
    function handleSubmit(e) {
        e.preventDefault();
        const Data = new FormData(e.target);
        const data = Object.fromEntries(Data.entries());
        setFormData((prev) => ({ ...prev, ...data }));

        axios.post('/Register', data).then((response) => {
            setMessage(response.data.message);
            setIsTrue(response.data.status);

        }).catch((error) => {
            console.error('There was an error!', error);
        });

        console.log(formData);
    }



    //Event handler for navigating to login page
    function handleLogin() {
        navigate('/login')
    }

    //Actual rendering of the component
    return (
        <div className="registration-form">
            <h3>{message}</h3>
            <form className='Main-Form' onSubmit={handleSubmit}>

                <div className="form-items">
                    <div className="form-groups">
                        <label htmlFor="voterID">Voter ID</label>
                        <input type="text" id="voterID" name="voterID" required />
                    </div>

                    <div className="form-groups">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                </div>
                <div className="form-items">
                    <div className="form-groups">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <div className="form-groups">
                        <label htmlFor="DOB">Date of birth</label>
                        <input type="date" id="DOB" name="DOB" required />
                    </div>
                </div>
                <div className="form-items">
                    <div className="form-groups">
                        <label htmlFor="age">age</label>
                        <input type="number" id="age" name="age" required />
                    </div>
                    <div className="form-groups">
                        <label htmlFor="email">email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                </div>
                <div className="form-items">
                    <div className="form-groups">
                        <label htmlFor="address">Address</label>
                        <input type="text" id="address" name="address" required />
                    </div>
                    <div className="form-groups-radio">

                        <label htmlFor="male">Male</label>
                        <input type="radio" id="male" name="gender" value="male" required />

                        <label htmlFor="female">Female</label>
                        <input type="radio" id="female" name="gender" value="female" required />
                    </div>
                </div>

                {isTrue && (
                    <div className="form-groups">
                        <label htmlFor="otp">OTP</label>
                        <input
                            type="number"
                            id="otp"
                            name="otp"
                            value={formData.otp || ''}
                            onChange={handleChange}
                            required
                        />
                        <ClickButton
                            type="button" // ⬅️ this is the key
                            button_name="Submit OTP"
                            width="50%"
                            height="40px"
                            onClick={handleOtpSubmit}
                        />
                    </div>

                )}

                < Button button_name="Register" width="50%" height="40px" />
                {showLogin && < ClickButton button_name="Go To Login" width="50%" height="40px" onClick={handleLogin} />}

            </form>

        </div>
    );
}