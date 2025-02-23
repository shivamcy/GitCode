import React,{ useEffect,useState } from 'react'
import { useContext } from 'react';
import MyContext from '../../context/Mycontext';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const Verify=() => {
    const [data,setData]=useState([]);
    const sharedData=useContext(MyContext);
    const notifysuccess=msg => toast.success(msg)
    const notifyerror=error => toast.error(error)
    const fetch_all=async () => {
        try {
            const response=await fetch("http://localhost:5000/api/problems/all",{
                method: "POST",
                mode: "cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Auth-Token': localStorage.getItem('authToken')
                },
                body: JSON.stringify({
                    'verified': false
                })
            })
            console.log(response);
            if (response.ok) {
                const res=await response.json();
                console.log(res);
                setData(res.data);
            }
        } catch (error) {
            console.log("Error in fetching problems");
            console.log(error);
        }
    }
    const func1=(id,statement) => {
        sharedData.set_statement(statement);
        sharedData.setProbid(id);
    }
    const verify_it=async (probid) => {
        try {
            if (sharedData.admin) {
                const response=await fetch("http://localhost:5000/api/userproblems/verify",{
                    method: "POST",
                    mode: "cors",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Auth-Token': localStorage.getItem('authToken')
                    },
                    body: JSON.stringify({
                        "probid": probid
                    })
                })
                if (response.ok) {
                    const res=await response.json();
                    notifysuccess("Problem successfully verified!!");
                    fetch_all();
                }
                else {
                    notifyerror("Something went Wrong!!")
                }
            }
            else {
                notifyerror("Only Admin can verify Problems");
            }
        } catch (error) {
            console.log("Error in verifying the problem");
            console.log(error);
        }
    }
    useEffect(() => { fetch_all() },[]);
    return (
        <>
            <h3>Problems to Verify</h3>
            <ol class="list-group list-group-numbered">
                {data&&data.length>0&&data.map((item) => (
                    <li className="list-group-item d-flex justify-content-between align-items-start mx-3 my-2 ">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">
                                <Link onClick={async () => { func1(item._id,item.Statement) }} to="/problem_statement">
                                    {item.P_title}
                                </Link>
                            </div>
                            <br />
                            <button type="button" class="btn btn-success" onClick={async () => { await verify_it(item._id) }}>Verify</button>
                        </div>
                    </li>
                ))}
            </ol>
        </>
    )
}

export default Verify
