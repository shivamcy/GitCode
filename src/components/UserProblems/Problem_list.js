import React, { useContext } from "react"
import PropTypes from "prop-types"
import { Link, useNavigate } from "react-router-dom"
import MyContext from "../../context/Mycontext"

function Problem_list(props) {
  const navigate = useNavigate()
  const sharedData = useContext(MyContext)
  const title = props.title
  const total = props.total_submissions
  const correct = props.correct_submissions
  const tag = props.tag
  const statement = props.problem_statement
  const cases = props.test_cases
  const code = props.code
  const hiddencases = props.hiddencases
  const verified = props.verified
  const id = props.id
  const func1 = () => {
    sharedData.set_statement(statement)
    // sharedData.set_cases(cases);
    // sharedData.set_hiddencases(hiddencases);
    sharedData.set_verified(verified)
    sharedData.setProbid(id)
  }
  const delete_it = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/userproblems/deleteproblem", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Auth-Token": localStorage.getItem("authToken"),
          "prob-id": id,
        },
      })
      if (response.ok) {
        console.log("Deletion is Successful!!")
        window.location.reload(false)
      }
    } catch (error) {
      console.log("failed in delete_It")
      console.log(error)
    }
  }
  const update_it = async () => {
    try {
      sharedData.set_statement(statement)
      sharedData.set_cases(cases)
      sharedData.set_hiddencases(hiddencases)
      sharedData.set_verified(verified)
      sharedData.setTag(tag)
      sharedData.setTitle(title)
      sharedData.setCode(code)
      sharedData.setId(id)
      navigate("/updateproblem")
    } catch (error) {
      console.log("Error in updating!!")
      console.log(error)
    }
  }
  const test_cases = async () => {
    sharedData.setProbid(id)
    navigate("/testcases")
  }
  const goto_comments = async () => {
    sharedData.setProbid(id)
    navigate("/comments")
  }
  return (
    <>
      <div>
        <li className="list-group-item d-flex justify-content-between align-items-start mx-3 my-2 " style={{ borderRadius: "15px" }}>
          <div className="ms-2 me-auto">
            <div className="fw-bold">
              <Link onClick={func1} to="/problem_statement">
                {title}
              </Link>
            </div>
            {tag}
            <br />
            <button type="button" className="btn btn-danger" onClick={delete_it} style={{ marginRight: "10px" }}>
              Delete
            </button>
            <button type="button" class="btn btn-primary" onClick={update_it} style={{ marginRight: "10px" }}>
              Update
            </button>
            <button type="button" class="btn btn-success" onClick={test_cases} style={{ marginRight: "10px" }}>
              Edit TestCases
            </button>
            <button type="button" class="btn btn-warning" onClick={goto_comments} style={{ marginRight: "10px" }}>
              Comments
            </button>
          </div>
          <span className="badge bg-primary rounded-pill">{correct}</span>
        </li>
      </div>
    </>
  )
}

Problem_list.propTypes = {}

export default Problem_list
