import React, { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import MyContext from "../../context/Mycontext"
import prof from "../Images/Profile_logo/profile.png"

const Comments = () => {
  const navigate = useNavigate()
  const sharedData = useContext(MyContext)
  const prob_id = sharedData.probid
  const [comment, setComment] = useState("")
  const [data, setData] = useState([])
  const fetch_comments = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/userproblems/allcomments", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Auth-Token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          probid: prob_id,
        }),
      })
      const res = await response.json()
      console.log(res)
      setData(res)
    } catch (error) {
      console.log("failed to fetch comments")
      console.log(error)
    }
  }
  const add_comment = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/userproblems/addcomment", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Auth-Token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          probid: prob_id,
          comment: comment,
        }),
      })
      const res = await response.json()
      console.log(res)
      // window.location.reload(false);
      // navigate("/comments");
      setComment("")
      fetch_comments()
    } catch (error) {
      console.log("failed to add comment")
      console.log(error)
    }
  }
  const user_profile = async userid => {
    navigate(`/user/${userid}`)
  }
  useEffect(() => {
    fetch_comments()
  }, [])
  return (
    <div className="p" style={{ height: "140vh" }}>
      <div className="form-group3" style={{ marginLeft: "95px", width: "1250px" }}>
        {/* <label for="exampleFormControlTextarea1"></label> */}
        <label for="exampleFormControlTextarea1" style={{ marginLeft: "3px", marginTop: "10px", font: "1.2rem" }}>
          Enter comment here
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Enter your message"
          onChange={e => {
            setComment(e.target.value)
          }}
          value={comment}></textarea>
        <button type="button" class="button2" onClick={add_comment} style={{ marginLeft: "3px", marginTop: "10px", borderRadius: "12px", border: "none", cursor: "pointer", outline: "none", height: "auto", width: "80px", height: "30px", fontSize: "0.6rem" }}>
          Add comment
        </button>
      </div>
      <div style={{ backgroundColor: "#eee", marginLeft: "95px", width: "1250px", marginTop: "20px", borderRadius: "15px" }}>
        <ol className="list-group list-group-numbered">
          {data &&
            data.length > 0 &&
            data.map(item => (
              <li key={item._id}>
                {/* <div className="card">
                            <div className="card-header">
                                {item.author}
                            </div>
                            <div className="card-body">
                                <blockquote className="blockquote mb-0">
                                    <p>{item.message}</p>
                                </blockquote>
                            </div>
                        </div> */}
                <button
                  className="navbar-brand"
                  onClick={() => {
                    user_profile(item.author_id)
                  }}
                  style={{ display: "inline-block", marginLeft: "2px" }}>
                  <img src={prof} width="25" height="25" alt="" />
                </button>
                <h4 style={{ display: "inline-block" }}>{item.author}</h4>
                <p>{item.message}</p>
              </li>
            ))}
        </ol>
      </div>
    </div>
  )
}

export default Comments
