import NavBar from "./HomePageComponent/navBar";
import SideMenu from "./HomePageComponent/sideMenu";
import LoginForm from "./HomePageComponent/LoginForm";
import { useState } from "react";
//import { data } from "react-router-dom";
 
export default function Login() {


    
    const [visible, setVisible] = useState(false)

    // const [user , setUser] = useState('')

 

    function handleSideMenuVisibility(data) {

        setVisible(data)
    }

    // function setUserID(data) {
    //     setUser(data);  // this updates the 'user' state
    //     console.log(data);
    //  }
    //  console.log({user});

    return (
          <div className="Main-LoginPage-container">
            <NavBar sendState={handleSideMenuVisibility}   />

            <h1>
                This is Login page
            </h1>
            <div className="div-login-center">

            <LoginForm  />

            </div>
            {visible ? <SideMenu /> : null}

        </div>
     );
}