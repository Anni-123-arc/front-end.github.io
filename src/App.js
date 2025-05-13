// App.jsx
import './App.css';
import Home from './components/home';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Admin from './components/admin';
import Election from './components/elections';
import Register from './components/registration';
import OTP from './components/otp';
import LogOut from './components/LogOut';
import Candidates from './components/ElectionPageComponents/candidates';
//import AddCandidateForm from './components/HomePageComponent/addCandidates';
import AdminLogin from './components/HomePageComponent/AdminLogin';
import AdminPanel from './components/AdminPanel/adminPanel'
import AddCandidateForm from './components/HomePageComponent/addCandidates';
import AddElection from './components/HomePageComponent/addElection'
import Result from './components/HomePageComponent/result.jsx';
import Contact from './components/HomePageComponent/contact.jsx';
import FAQ from './components/HomePageComponent/FAQ.jsx';


function App() {
  return (
    <div className="App" >
      {/* ✅ Wrap the route tree in the UserProvider */}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/adminLogin' element={<AdminLogin />} />

        <Route path='/admin/adminLogin/adminPanel' element={<AdminPanel />} />
        <Route path='/admin/adminLogin/adminPanel/addCandidates' element={<AddCandidateForm />} />
        <Route path='/admin/adminLogin/adminPanel/addElection' element={<AddElection />} />
        <Route path='/election' element={<Election />} />
        <Route path='/election/candidates' element={<Candidates />} />
        <Route path='/result' element={<Result />} />

        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<LogOut />} />
        <Route path='/registration' element={<Register />} />
        <Route path='/otp' element={<OTP />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/faq' element={<FAQ />} />
      </Routes>

    </div>
  );
}

export default App;
