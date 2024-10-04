import React,{ useEffect,useState,useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import MyContext from '../../context/Mycontext';

const Test_cases=(probs) => {
    const navigate=useNavigate();
    const [data,setData]=useState([]);
    const [input,setInput]=useState([]);
    const [output,setOuput]=useState([]);
    const sharedData=useContext(MyContext);
    const add_case=async () => {
        navigate("/addtestcase");
    }
    const all_cases=async () => {
        try {
            console.log(probs.prob_id);
            const response=await fetch("http://localhost:5000/api/userproblems/alltestcases",{
                method: "POST",
                mode: "cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Auth-Token': localStorage.getItem('authToken')
                },
                body: JSON.stringify({
                    'probid': probs.prob_id
                })
            })
            const res=await response.json();
            console.log(res);
            const temp=res.testcases;
            setData(temp);
            console.log(data);
            // console.log(res.input)
            // console.log(res.output)
            // const input=res.input;
            // const output=res.output;
        } catch (error) {
            console.log("Error in fetching test cases");
            console.log(error)
        }
    }
    useEffect(() => {
        all_cases();
    },[]);
    return (
        <>
            <div>
                <button type="button" class="btn btn-primary" onClick={add_case}>Add Test_case</button>
            </div>
            <ol className="list-group list-group-numbered">
                {data&&data.length>0&&data.map((item) => (
                    <li key={item._id}>
                        <button type="button" class="btn btn-success" onClick={() => { sharedData.setInput(item.input); sharedData.setOutput(item.output); navigate("/testcaseitem") }}>Testcase</button>
                        <button type="button" class="btn btn-danger" onClick={async () => {
                            const response=await fetch("http://localhost:5000/api/userproblems/deletetestcase",{
                                method: "POST",
                                mode: "cors",
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'Auth-Token': localStorage.getItem('authToken')
                                },
                                body: JSON.stringify({
                                    'probid': probs.prob_id,
                                    'testid': item._id
                                })
                            })
                            navigate("/problems")
                        }}>x</button>
                    </li>
                ))}
            </ol>
        </>
    )
}

export default Test_cases
