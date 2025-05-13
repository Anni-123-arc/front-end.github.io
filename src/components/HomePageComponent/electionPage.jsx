import '../../css/ElectionPage.css';
import ElectionCard from '../ElectionPageComponents/ElectionCard';
import React, { useEffect , useState} from 'react';
import axios from 'axios';

export default function ElectionPage({userName}) {
    const [electionData, setElectionData] = useState([]);
    
    
   useEffect(() => {
     axios.get('/getAllElectionInfo')
.then((response)=>{
    console.log(response.data.result);
    setElectionData(response.data.result);
}).catch((error)=>{
    console.log("Error in fetching election data",error);
})
     
   }, [])
   


    // useEffect(() => {
    //     const fakeData = [
    //         {
    //             electionID: 1,
    //             title: "Mock Election",
    //             startDate: "2025-01-01",
    //             endDate: "2025-01-05"
    //         }
    //     ];
    //     setElectionData(fakeData);
    // }, []);
    

    return (
        <div className='inner-election-page'>
            {electionData.map((data) => (
                <ElectionCard 
                    key={data.electionID}
                    title={data.title}
                    startDate={data.startDate}
                    endDate={data.endDate}
                    electionId={data.electionID}
                    
                />
            ))}
        </div>
    );
}
