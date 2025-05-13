
import NavBar from "./HomePageComponent/navBar";
import SideMenu from './HomePageComponent/sideMenu';
import ElectionPage from "./HomePageComponent/electionPage";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
 
import axios from "axios";



export default function Election() {

  const navigate = useNavigate();

  const [visible, setVisible] = useState(false)
  
  function handleSideMenuVisibility(data) {
    setVisible(data)
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not authorize to access this page. Please login first.");
      navigate('/login');
      return;
    }


    axios.get("/accessElectionPage", {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the Authorization header,
      }
    })
      .then(res => {
        alert(res.data.message);
        
        localStorage.setItem("voterID", res.data.voterID); // Store voterID in local storage
       
      })
      .catch(err => {
        console.error(err);
      });
  });

  return (

    <div className="Main-ELection-Container">
      <NavBar sendState={handleSideMenuVisibility} />

      <div className="election-page">
        <h1>election page</h1>



        <ElectionPage />

      </div>
      {visible ? <SideMenu /> : null}
    </div>
  );
}