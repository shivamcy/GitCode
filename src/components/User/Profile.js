import imag1 from "../Images/Ranks/1.svg"
import imag2 from "../Images/Ranks/2.svg"
import imag3 from "../Images/Ranks/3.svg"
import imag4 from "../Images/Ranks/4.svg"
import imag5 from "../Images/Ranks/5.svg"
import imag6 from "../Images/Ranks/6.svg"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { PieChart } from "@mui/x-charts/PieChart"
import MyContext from "../../context/Mycontext"

function Profile() {
  const [data, setData] = useState([
    { id: 0, value: 10, label: "Correct" },
    { id: 1, value: 15, label: "Wrong" },
  ])
  const sharedData = useContext(MyContext)
  const [imag, setImag] = useState(imag1)
  const titles = { 0: "Bronze", 1: "Silver", 2: "Golden", 3: "Crystal", 4: "Champion", 5: "Titan" }
  const navigate = useNavigate()
  const [name, setName] = useState("none")
  const [username, setUsername] = useState("none")
  const [title, setTitle] = useState(0)
  const [email, setEmail] = useState("")
  const [admin, setAdmin] = useState("")
  const [backColor, setBackColor] = useState("#eee")
  const [textDecor, setTextDecor] = useState("")
  const [prob_solved, setProb_solved] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0)
  const fetchDetails = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/profile", {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Auth-Token": localStorage.getItem("authToken"),
        },
      })
      if (response.ok) {
        const userData = await response.json()
        console.log(userData)
        setName(userData?.Name)
        setUsername(userData?.Username)
        setEmail(userData?.Email)
        setTitle(userData?.Title)
        if (userData?.Admin) {
          // setBackColor("#87CEFA");
          setAdmin("ADMIN")
          setTextDecor("2px 2px 5px red")
        }
        const rank = userData?.Title
        setProb_solved(userData?.Questions_solved.length)
        setCorrect(userData?.Correct_submissions)
        setWrong(userData?.Wrong_submissions)
        // setData([
        //     { id: 0,value: correct,label: "Correct" },
        //     { id: 1,value: wrong,label: "Wrong" }
        // ]);
        console.log(data)
        console.log(wrong)
        switch (rank) {
          case 0: {
            setImag(imag1)
            break
          }
          case 1: {
            setImag(imag2)
            break
          }
          case 2: {
            setImag(imag3)
            break
          }
          case 3: {
            setImag(imag4)
            break
          }
          case 4: {
            setImag(imag5)
            break
          }
          case 5: {
            setImag(imag6)
            break
          }
        }
      } else {
        console.log("Failed to fetch user!!")
        navigate("/login")
      }
    } catch (error) {
      console.error(error)
    }
  }
  const logout = () => {
    try {
      localStorage.setItem("authToken", "")
      localStorage.setItem("timeStamp", "")
      localStorage.setItem("admin", 0)
      sharedData.setLoggedIn(0)
      console.log("Logout Successful!!")
      navigate("/login")
    } catch (error) {
      console.error("Logout Failed!!!")
    }
  }
  useEffect(() => {
    // to fetch details of current user
    setData([
      { id: 0, value: correct, label: "Correct" },
      { id: 1, value: wrong, label: "Wrong" },
    ])
    fetchDetails()
  }, [correct, wrong])
  return (
    <section style={{ backgroundColor: `${backColor}` }}>
      <div className="container py-5" style={{ marginTop: "10px" }}>
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" className="rounded-circle img-fluid" style={{ width: "150px" }} />
                <h5 className="my-3">{username}</h5>
                <h5 className="text-muted mb-1" style={{ "text-shadow": `${textDecor}` }}>
                  {admin}
                </h5>
              </div>
            </div>
            <div className="card mt-3">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe mr-2 icon-inline">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    Website
                  </h6>
                  <span className="text-secondary">https://bootdey.com</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github mr-2 icon-inline">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    Github
                  </h6>
                  <span className="text-secondary">bootdey</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter mr-2 icon-inline text-info">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                    Twitter
                  </h6>
                  <span className="text-secondary">@bootdey</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram mr-2 icon-inline text-danger">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    Instagram
                  </h6>
                  <span className="text-secondary">bootdey</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook mr-2 icon-inline text-primary">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                    Facebook
                  </h6>
                  <span className="text-secondary">bootdey</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{name}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Username</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{username}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Title</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{titles[title]}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Problems Solved</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{prob_solved}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4 mb-md-0">
                  <div className="card-body">
                    <PieChart
                      series={[
                        {
                          data,
                          highlightScope: { faded: "global", highlighted: "item" },
                          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
                        },
                      ]}
                      height={200}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4 mb-md-0">
                  <div className="card-body" style={{ display: "flex", justifyContent: "center" }}>
                    {/* <p>Champion</p> */}
                    <img src={imag} alt="avatar" style={{ width: "146px" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-outline-primary" onClick={logout} style={{ marginLeft: "1000px", marginTop: "20px" }}>
          Logout
        </button>
      </div>
    </section>
  )
}

export default Profile
