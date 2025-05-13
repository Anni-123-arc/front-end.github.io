import { useEffect, useState } from 'react';
import './../../css/result.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function Result() {
  const [electionData, setElectionData] = useState([]);
  const [electionResult, setElectionResult] = useState([]);
  const [electionID, setElectionID] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {

    axios.get('/getAllElectionInfo')
      .then((response) => {
        console.log(response.data.result);
        setElectionData(Array.isArray(response.data.result) ? response.data.result : []);
      })
      .catch((error) => {
        console.log("Error in fetching election data", error);
      });
  }, []);

  useEffect( () => {
     const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not authorize to access this page. Please login first.");
      navigate('/login');
      return;
    }
    if (electionID) {
      setIsLoading(true);
       axios.get(`/result/${electionID}`)
        .then((response) => {
          console.log("Result API response:", response.data);
          const data = response.data.data; // because backend sends { data: [...] }
          console.log(data);
          setElectionResult(Array.isArray(data) ? data : []);
        })
        .catch((err) => {
          setError("Error fetching election results.");
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [electionID,navigate]);

  function handleChange(e) {
    setElectionID(e.target.value);
    console.log(e.target.value);
  }

  return (
    <div className="main-result-page">
      <div className="result-filter">
        <select
          name="electionID"
          id="electionID"
          value={electionID}
          onChange={handleChange}
          required
        >
          <option value="">Choose election</option>
          {Array.isArray(electionData) && electionData.map((option) => (
            <option key={option.electionID} value={option.electionID}>
              {option.title}
            </option>
          ))}
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="result-container">
        {isLoading ? (
          <p>Loading results...</p>
        ) : (
          Array.isArray(electionResult) && electionResult.length > 0 ? (
            electionResult.map((data, index) => (
              <div className="result-card" key={index}>
                <div className="candidate-image">
                  <img src={data.image_url} alt={`Candidate ${index + 1}`} />
                </div>
                <div className="count-votes">
                   <p>{data.vote_count} votes</p>
                </div>
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )
        )}
      </div>
    </div>
  );
}
