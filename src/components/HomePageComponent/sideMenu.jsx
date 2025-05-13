import { Link } from "react-router-dom";

export default function SideMenu({userName}) {
    return (
        <div className="Sidebar">
            <h2>{userName}</h2>
           <Link to='/'>Home</Link>
           <Link to='/admin'>Addmin</Link>
           <Link to='/Registration'>Register</Link>
           <Link to='/election'>election</Link>
           <Link to='/Login'>Login</Link>
         </div>
    );
}