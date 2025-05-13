import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../HomePageComponent/navBar';
import SideMenu from '../HomePageComponent/sideMenu';
import "../../css/Candidate.css";
import CandidateCard from './candidateCard';
import axios from 'axios';

export default function Candidates() {
    const location = useLocation();
    const [visible, setVisible] = useState(false);
    const [candidates, setCandidates] = useState([]);
    const [electionID, setElectionID] = useState({ electionId: '' });

    function handleSideMenuVisibility(data) {
        setVisible(data);
    }

    const { electionId } = location.state || {};

    // ✅ Only set election ID once, when location.state is ready
    useEffect(() => {
        if (electionId) {
            setElectionID({ electionId });
        }
    }, [electionId]);

    useEffect(() => {
        if (electionID.electionId) {
            axios.post('/fetchCandidates', electionID)
                .then((response) => {
                    setCandidates(response.data.result);
                    console.log(response.data.message);
                }).catch((error) => {
                    console.error("Error fetching candidates:", error);
                });
        }
    }, [electionID]);

    return (
        <div className="Main-Candidate-Container">
            <NavBar sendState={handleSideMenuVisibility} />

            <div className="candidate-page">
                {candidates.map((candidate, index) => (
                    <CandidateCard key={index} 
                        name={candidate.cadName}
                        age={candidate.age}
                        email={candidate.email}
                        electionId={candidate.electionID}
                        candidateId={candidate.candidateID}
                        image_url = {candidate.image_url} // Assuming candidateId is a property in the candidate object
                    />
                ))}
            </div>

            {visible && <SideMenu />}
        </div>
    );
}
