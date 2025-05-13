import NavBar from "./HomePageComponent/navBar";
import SideMenu from "./HomePageComponent/sideMenu";
import RegistrationForm from "./HomePageComponent/RegistrationForm";
import { useState } from "react";
export default function Register() {
    const [visible, setVisible] = useState(false)
    function handleSideMenuVisibility(data){
        
        setVisible(data)
     }    
     return (
        <div className="Main-registration-page">
                    <NavBar sendState={handleSideMenuVisibility}/>

        <div className="registration-page">
        <h1>
            This is Registration page
 
        </h1>
        <RegistrationForm />
        { visible? <SideMenu />: null}
        
        </div>
        </div>
    );
}