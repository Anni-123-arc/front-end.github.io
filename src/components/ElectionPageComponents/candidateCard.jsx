import '../../css/Candidate.css';
import ClickButton from '../HomePageComponent/Buttons/clickButton';
import axios from 'axios';
import { useState } from 'react';
export default function CandidateCard(props) {
 
 
    const [set ,Setset] = useState(false)
    const [btnClick , setBtnClick] = useState(false)
    async function handleClick() {
          const data = {
            electionID: props.electionId,
            candidateID: props.candidateId,
            voterID: localStorage.getItem('voterID')
        };
        setBtnClick(true)
        console.log(data);
        await axios.post('/addVote', data).then((response) => {
            console.log(response.data.message);
            alert(response.data.message);
            Setset(response.data.status)
        }).catch((error) => {
            console.error("Error adding vote:", error);
            alert("Error adding vote. Please try again.");
        });
       
    }
    return(
        <div className='candidate-card'>
            <div className="candidate-group">
               <p>{props.name}</p>

            </div>
            <div className="person-photo">
                <img src={`http://localhost:5000${props.image_url}`}  alt="No-image" />
            </div>
            <div className="candidate-group">
                <p>{props.age}</p>
            </div>
            <div className="candidate-group">
                <p>{props.email}</p>
            </div>
            <div className="candidate-group">
                  <ClickButton onClick={handleClick} button_name={set&&btnClick ?"Voted":"Vote"} width="100%" height="50px"/>
            </div>

        </div>
    );
}