// import React from 'react'
import PropTypes from "prop-types"
import React, { useEffect, useState, useContext } from "react"
import Problem_list from "./problems/Problem_list"
import MyContext from "../context/Mycontext"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function Practice(props) {
  const [Data, setData] = useState([])
  const sharedData = useContext(MyContext)
  const navigate = useNavigate("")
  const notifysuccess = msg => toast.success(msg)
  const notifyerror = error => toast.error(error)

  const goto_verify = async () => {
    if (sharedData.admin == 1 && localStorage.getItem("admin") == 1) {
      navigate("/verifyproblems")
    } else {
      notifyerror("Only admin can verify Problems")
    }
  }
  const fetchData = async () => {
    // console.log("hi");
    // return await fetch("http://localhost:5000/api/problems/lc")
    //     .then((response) => response.json())
    //     .then((dat) => setData(dat));
    // return await fetch("http://localhost:5000/api/problems/all")
    //     .then((response) => response.json())
    //     .then((dat) => setData(dat));
    try {
      const response = await fetch("http://localhost:5000/api/problems/all", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Auth-Token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          verified: true,
        }),
      })
      console.log(response)
      if (response.ok) {
        const res = await response.json()
        console.log(res)
        setData(res.data)
      }
    } catch (error) {
      console.log("Error in fetching problems")
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className="p" style={{ height: "100%" }}>
        <h1 style={{ color: "white" }}>Problems</h1>
        {sharedData.admin == 1 && localStorage.getItem("admin") == 1 ? (
          <button type="button" className="btn btn-info" onClick={goto_verify}>
            Verify Problems
          </button>
        ) : (
          <></>
        )}
        <ol class="list-group list-group-numbered">
          <li>
            {Data &&
              Data.length > 0 &&
              Data.map(item => (
                // <li key={item._id}>{item.playlist}-----{item.user}</li>
                <Problem_list title={item.P_title} total_submissions={item.Total_Submissions} correct_submissions={item.Correct_Submissions} tag={item.Tag} problem_statement={item.Statement} test_cases={item.Test_cases} id={item._id} />
              ))}
          </li>
        </ol>
      </div>
    </>
  )
}

Practice.propTypes = {}

export default Practice
