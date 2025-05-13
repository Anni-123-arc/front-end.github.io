
import NavBar from "./HomePageComponent/navBar";
import SideMenu from './HomePageComponent/sideMenu';
import { useState } from "react";
import dVOte from './../images/istockphoto-1316050037-1024x1024-removebg-preview.png'
import './../css/hero.css'
import ClickButton from './HomePageComponent/Buttons/clickButton'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useEffect } from "react";

//https://api.api-ninjas.com/v1/quotes
//BHtto04iD8KwZ/80kN6J8Q==mBiFN0OdEWaDl2I9


export default function Home() {
    const [visible, setVisible] = useState(false)
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('')
    const navigate = useNavigate()
    function handleSideMenuVisibility(data) {
        setVisible(data)
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.api-ninjas.com/v1/quotes', {
                    headers: { 'X-Api-Key': 'BHtto04iD8KwZ/80kN6J8Q==mBiFN0OdEWaDl2I9' }
                });
                console.log(response.data); // This is an array

                if (response.data.length > 0) {
                    setQuote(response.data[0].quote);
                    setAuthor(response.data[0].author);
                }
            } catch (error) {
                console.error('Error fetching quote:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="main-main">
            <NavBar sendState={handleSideMenuVisibility} />



            <div className="main-hero-container">
                <div className="main-hero-sub-container">
                    <q>
                        {quote}
                    </q>
                    -{author}
                    <div className="main-hero-container-btn">
                        <ClickButton onClick={() => { navigate('/registration') }} className="btn-h" button_name="sign up" width="45%" height="50px" />
                        <ClickButton onClick={() => { navigate('/login') }} className="btn-h" button_name="login" width="45%" height="50px" />
                    </div>
                </div>
                <div className="main-hero-sub-container">
                    <img src={dVOte} alt="img" />
                </div>
            </div>


            {visible ? <SideMenu /> : null}

        </div>
    );
}