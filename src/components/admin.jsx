import { useState } from "react";
import SideMenu from "./HomePageComponent/sideMenu";
import NavBar from "./HomePageComponent/navBar";
import AdminRegister from "./HomePageComponent/adminForm";  
export default function Admin() {
     const [visible, setVisible] = useState(false)
        function handleSideMenuVisibility(data){
            setVisible(data)
        }
        return ( 
            <div>
                <NavBar sendState={handleSideMenuVisibility}/>
                 <h1>Admin page</h1>
                 <div>
                    <AdminRegister />
                 </div>
               { visible? <SideMenu />: null}
                
            </div>
        );
}