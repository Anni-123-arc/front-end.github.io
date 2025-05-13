import "../../css/ElectionPage.css";
import ClickButton from "../HomePageComponent/Buttons/clickButton";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function ElectionCard({ electionId, userName, title, startDate, endDate }) {
    const navigate = useNavigate();
    function handleClick() {
        console.log(`You clicked election ID: ${electionId}`);
        navigate("/election/candidates", { state: { electionId } });
    }
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const DateInString = date.toISOString();

    const [msg , setMsg] = useState('')
    console.log(endDate)
    console.log(startDate)
    

    console.log(DateInString); // Output: 2025-05-06T06:01:35.254Z



    useEffect(()=>{
       
      if(DateInString>endDate){
        setMsg("Election has ended")
        return ; 
      }
      setMsg("Election has started")
    },[DateInString , endDate])

 

    return (
        <div className="Election-Card">
            <div className="election-title">
                <h2>{title} {userName}</h2>
            </div>
            <div className="time-line">

                <span className="St-date">STARTING DATE: {startDate}</span>
                <span className="End-date">ENDING DATE: {endDate}</span>
            </div>
            <div className="message" style={{color:"green",fontSize:"25px" , fontWeight:"bold" }}>
                 {msg}
            </div>
            <ClickButton
                onClick={handleClick}
                button_name="view election"
                width="50%"

                isDisabled={DateInString > endDate}
            />
        </div>
    );
}

