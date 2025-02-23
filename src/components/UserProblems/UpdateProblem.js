import React,{ useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';

function UpdateProblem(props) {
    const navigate=useNavigate();
    const [title,setTitle]=useState(props.title);
    const [code,setCode]=useState(props.code);
    const [statement,setStatement]=useState(props.statement);
    const [testcases,setTestcases]=useState(props.testcases);
    const [hiddentestcases,setHiddenTestcases]=useState(props.hiddencases);
    const [tag,setTag]=useState(props.tag);
    const update=async () => {
        try {
            const token=localStorage.getItem("authtoken");
            if (token=="") {
                console.log("User need to be logged in first"); //need to add pop up for this
            }
            else {
                const response=await fetch("http://localhost:5000/api/userproblems/updateproblem",{
                    method: "POST",
                    mode: "cors",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Auth-Token': localStorage.getItem('authToken')
                    },
                    body: JSON.stringify({
                        "code": code,
                        "title": title,
                        "statement": statement,
                        "testcases": testcases,
                        "hiddencases": hiddentestcases,
                        "tag": tag,
                        "verified": props.verified,
                        "prob_id": props.id
                    })
                });
                console.log(response)
                if (response.ok) {
                    console.log("Problem successfully Updated!!");
                    navigate("/problems");
                }
                else {
                    console.log("Couldn't Update the Problem!!")
                }
            }
        } catch (error) {
            console.log("Error in Updating problem!!");
            console.log(error);
        }
    }
    return (
        <div>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Problem code</label>
                    <textarea className="form-control" id="code" rows="3" onChange={(e) => { setCode(e.target.value) }} value={code}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="title">Problem Title</label>
                    <textarea className="form-control" id="title" rows="3" onChange={(e) => { setTitle(e.target.value) }} value={title}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="statement">Problem Statement</label>
                    <textarea className="form-control" id="statement" rows="3" onChange={(e) => { setStatement(e.target.value) }} value={statement}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="testcases">Test Cases</label>
                    <textarea className="form-control" id="testcases" rows="3" onChange={(e) => { setTestcases(e.target.value) }} value={testcases}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="testcases">Hiddem Test Cases</label>
                    <textarea className="form-control" id="hiddentestcases" rows="3" onChange={(e) => { setHiddenTestcases(e.target.value) }} value={hiddentestcases}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Problem Tag</label>
                    <select className="form-control" id="tag" onChange={(e) => { setTag(e.target.value) }} >
                        <option>Math</option>
                        <option>Linked List</option>
                        <option>Stack/Queue</option>
                        <option>Tree/Graph</option>
                        <option>DP</option>
                    </select>
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-success" onClick={update}>Update</button>
                </div>
            </form>
        </div>
    )
}
UpdateProblem.propTypes={

}

export default UpdateProblem
