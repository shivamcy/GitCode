import React,{ useEffect,useState } from 'react'
import Problem_list from './Problem_list';

function Problems() {
    const [Data,setData]=useState("");

    const func1=async () => {
        try {
            const response=await fetch("http://localhost:5000/api/userproblems/allproblems",{
                method: "GET",
                mode: "cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Auth-Token': localStorage.getItem('authToken')
                }
            });
            const dat=await response.json();
            console.log(dat);
            setData(dat);
            if (response.ok) {
                console.log("Data is recieved");
            }
        } catch (error) {
            console.log("Coudn't fetch User Problems");
            console.log(error);
        }
    }
    useEffect(() => {
        func1();
    },[])
    return (
        <div>
            <h1>Problems</h1>
            <ol className="list-group list-group-numbered">
                {Data&&Data.length>0&&Data.map((item) => (
                    // <li key={item._id}>{item.playlist}-----{item.user}</li>
                    <Problem_list id={item.id} code={item.code} hiddencases={item.hiddencases} title={item.title} total_submissions={item.totalsubmissions} correct_submissions={item.correctsubmissions} tag={item.tag} problem_statement={item.statement} test_cases={item.testcases} verified={item.verified} />
                ))}
            </ol>
        </div>
    )
}

export default Problems
