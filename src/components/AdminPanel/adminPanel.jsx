import MainSection from './mainSection.jsx'
import NavBar from '../HomePageComponent/navBar.jsx'
import SideMenu from '../HomePageComponent/sideMenu.jsx';
import { useState  } from 'react';




export default function AdminPanel() {

    const [visible, setVisible] = useState(false)
  
    function handleSideMenuVisibility(data) {
      setVisible(data)
    }
  

    return (
        <div className="Main-admin-cantainer">
            <NavBar sendState={handleSideMenuVisibility}/>
            <div className="Main-container">
                 <h1>Admin panel</h1>
                 <MainSection/>
            </div>

            
         {visible ? <SideMenu/>:null}    

        </div>
    );
}