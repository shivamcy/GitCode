import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Add_Test_case=(probs) => {
    const navigate=useNavigate();
    const [input,setInput]=useState("");
    const [output,setOutput]=useState("");
    const add_test_case=async () => {
        try {
            const response=await fetch("http://localhost:5000/api/userproblems/addtestcase",{
                method: "POST",
                mode: "cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Auth-Token': localStorage.getItem('authToken')
                },
                body: JSON.stringify({
                    'prob_id': probs.prob_id,
                    'input': input,
                    'output': output
                })
            })
            const res=await response.json();
            console.log(res);
            setOutput("");
            setInput("");
        } catch (error) {
            console.log("Error in adding test case");
            console.log(error);
        }
    }
    return (
        <div>
            <div className="form-group">
                <label htmlFor="title">Input</label>
                <textarea className="form-control" id="code" rows="3" onChange={(e) => { setInput(e.target.value) }} value={input}></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="title">Output</label>
                <textarea className="form-control" id="title" rows="3" onChange={(e) => { setOutput(e.target.value) }} value={output}></textarea>
            </div>
            <button type="button" class="btn btn-primary" onClick={add_test_case}>Add Test_case</button>
        </div>
    )
}

export default Add_Test_case
