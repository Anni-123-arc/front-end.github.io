import ClickButton from '../HomePageComponent/Buttons/clickButton'
import { useNavigate } from 'react-router-dom';
export default function MainSection() {

    const navigate = useNavigate()


    function handleCLickElection(){
        console.log("add Election")
        navigate('/admin/adminLogin/adminPanel/addElection')
    }
    
    function handleCLickCandidate(){
        console.log("redirecting to candidate page")
        navigate('/admin/adminLogin/adminPanel/addCandidates');
    }
    
    return (
        <>
           <div className="add-election">
           <ClickButton button_name = "add election" onClick={handleCLickElection} height = "50px" width ="50%"/>

           </div>
           <div className="add-candidates">
                <ClickButton button_name = "add candidates" onClick={handleCLickCandidate} height = "50px" width ="50%"/>
           </div>

           
        </>
    );
}