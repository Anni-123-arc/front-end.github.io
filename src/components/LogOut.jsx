import ClickButton from "./HomePageComponent/Buttons/clickButton";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
    
    const navigate = useNavigate();
   function handleClick() {
    if(localStorage.length === 0){
        alert("You are not logged in!");
        navigate('/login')
       
        return;
    }

      localStorage.clear();
      
      alert("Logged out successfully!");
      navigate('/');
   }
    return (
        <ClickButton onClick={handleClick} button_name="log-out" width="50%" height="40px" />
    );
}