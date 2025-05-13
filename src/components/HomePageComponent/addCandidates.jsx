import { useState, useEffect } from "react";
import axios from "axios";
import Button from './Buttons/SubmitButton';
import '../../css/addCandidates.css'

export default function AddCandidateForm() {
    const [options, setOptions] = useState([]);
    const [formData, setFormData] = useState({
        cadName: '',
        electionID: '',
        age: '',
        email: '',
        image: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/getAllElectionInfo')
            .then((response) => {
                setOptions(response.data.result);
            })
            .catch((error) => {
                console.error("Error fetching election options:", error);
                setError("Failed to load elections");
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            image: e.target.files[0]
        })); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('cadName', formData.cadName);
            formDataToSend.append('electionID', formData.electionID);
            formDataToSend.append('age', formData.age);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('image', formData.image);

            const response = await axios.post('/addCandidate', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            alert(response.data.message);
            // Reset form after successful submission
            setFormData({
                cadName: '',
                electionID: '',
                age: '',
                email: '',
                image: null
            });
        } catch (err) {
            console.error("Submission error:", err);
            setError(err.response?.data?.message || "Failed to add candidate");
        } finally {
            setIsSubmitting(false);
        } 
    };

    return (
        <div className="candidate-form-container">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {error && <div className="error-message">{error}</div>}
                
                <div className="form-group">
                    <label htmlFor="cadName">Name of Candidate</label>
                    <input
                        type="text"
                        id="cadName"
                        name="cadName"
                        value={formData.cadName}
                        onChange={handleChange}
                        placeholder="Candidate Name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="electionID">Election</label>
                    <select
                        name="electionID"
                        id="electionID"
                        value={formData.electionID}
                        onChange={handleChange}

                        required
                    >
                        <option value="">Choose election</option>
                        {options.map((option) => (
                            <option key={option.electionID} value={option.electionID}>
                                {option.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input 
                        type="number" 
                        name="age" 
                        id="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Age"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Photo</label>
                    <input 
                        type="file"
                        name="image"
                        id="image"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                    />
                </div>

                <Button 
                    button_name={isSubmitting ? "Adding..." : "Add candidate"} 
                    width="50%" 
                    height="50px"
                    disabled={isSubmitting}
                />
            </form>
        </div>
    );
}