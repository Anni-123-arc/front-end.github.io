import { HiMenu } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ClickButton from './Buttons/clickButton';
import logo from '../../images/ElectraVote Logo Design.png';

export default function NavBar() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  function handleMenu() {
    setVisible(!visible);
  }

  function handleLogOut() {
    if (localStorage.length === 0) {
      alert("You are not logged in!");
      navigate('/login');
      return;
    }
    localStorage.clear();
    alert("Logged out successfully!");
    navigate('/');
  }

  return (
    <>
      <div className="Navbar">
        <div className="Nav-Logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="Nav-Items">
          <ul className="Nav-List">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/election">Elections</Link></li>
            <li><Link to="/result">Result</Link></li>
            <li><Link to="/admin">Admin</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/registration">Register</Link></li>
            <Link to="/contact" onClick={handleMenu}>Contact</Link>
            <Link to="/faq" onClick={handleMenu}>FAQ</Link>
            <li><ClickButton onClick={handleLogOut} bg_color="red" button_name="logout" width="100%" height="40px" /></li>
          </ul>
        </div>



        {visible
          ? <AiOutlineClose className="Nav-Menu" onClick={handleMenu} />
          : <HiMenu className="Nav-Menu" onClick={handleMenu} />}
      </div>

      {visible && (
        <div className="Sidebar">
          <Link to="/" onClick={handleMenu}>Home</Link>
          <Link to="/election" onClick={handleMenu}>Elections</Link>
          <Link to="/result" onClick={handleMenu}>Result</Link>
          <Link to="/admin" onClick={handleMenu}>Admin</Link>
          <Link to="/login" onClick={handleMenu}>Login</Link>
          <Link to="/registration" onClick={handleMenu}>Register</Link>
          <Link to="/contact" onClick={handleMenu}>Contact</Link>
          <Link to="/faq" onClick={handleMenu}>FAQ</Link>
          <ClickButton onClick={() => { handleLogOut(); handleMenu(); }} bg_color="red" button_name="logout" width="100%" height="40px" />
        </div>
      )}
    </>
  );
}
