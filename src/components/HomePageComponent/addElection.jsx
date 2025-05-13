import { useState } from "react";
import SubmitButton from './Buttons/SubmitButton'
import   './../../css/addElection.css'
import axios from "axios";
import { useEffect } from "react";


export default function AddElection() {
 
    const [title , setTitle] = useState();
    const [startDate ,setStartDate] = useState();
    const [endDate , setEndDate] = useState();
    const [message , setMessage] = useState()
    const [status, setStatus] = useState(false)


    useEffect(()=>{

        const timer = setTimeout(()=>{
            setStatus(!status)
            setMessage("")
        } , 5000)
        return ()=>{
            clearTimeout(timer)
        }
    } , [status])

    function handleSubmit(e){

        e.preventDefault()

        const electionInfo = {
            "title" :title ,
            "startDate" :startDate , 
            "endDate" :endDate
        }

        axios.post('/election' , electionInfo).then((response)=>{
            console.log(response)
            setMessage(response.data.message)
            setStatus(response.data.status)
            alert(response.data.message)
        }).catch((error)=>{
            console.log("Error----->" , error)
        })
    }


    return (
        <div className="main-addElection-Container">
          
           <form onSubmit={handleSubmit}>
           {status? <div className="notification-block">
                {message}
            </div>:<div style={{color:"red"}} className="notification-block">
                {message}
            </div>}
           <div className="add-election-form-group">
                <label htmlFor="title">Title</label>
                <input type="text" 
                id="title" 
                name="title" 
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
                 required
                />
            </div>
            <div className="add-election-form-group">
                <label htmlFor="startDate">Satrt Date</label>
                <input type="date"
                 id="startDate" 
                 name="startDate" 
                 value={startDate}
                onChange={(e)=>{setStartDate(e.target.value)}} required
                 />
            </div>
            <div className="add-election-form-group">
                <label htmlFor="endDate">End Date</label>
                <input type="date"
                 id="endDate" 
                 name="endDate" 
                 value={endDate}
                onChange={(e)=>{setEndDate(e.target.value)}} required
                 
                 />
            </div>
            <SubmitButton button_name = "add election" height="50px" width="50%"/>
           </form>
        </div>
    );

}

