// import React,{ useState } from 'react'

// function AddProblem() {
//     const [title,setTitle]=useState("");
//     const [code,setCode]=useState("");
//     const [statement,setStatement]=useState("");
//     // const [testcases,setTestcases]=useState("");
//     // const [hiddentestcases,setHiddenTestcases]=useState("");
//     const [tag,setTag]=useState("Math");
//     const add=async () => {
//         try {
//             const token=localStorage.getItem("authtoken");
//             if (token=="") {
//                 console.log("User need to be logged in first"); //need to add pop up for this
//             }
//             else {
//                 const response=await fetch("http://localhost:5000/api/userproblems/addproblem",{
//                     method: "POST",
//                     mode: "cors",
//                     headers: {
//                         'Accept': 'application/json',
//                         'Content-Type': 'application/json',
//                         'Auth-Token': localStorage.getItem('authToken')
//                     },
//                     body: JSON.stringify({
//                         "code": code,
//                         "title": title,
//                         "statement": statement,
//                         // "testcases": testcases,
//                         // "hiddencases": hiddentestcases,
//                         "tag": tag
//                     })
//                 });
//                 console.log(response)
//                 if (response.ok) {
//                     console.log("Problem successfully added!!");
//                     window.location.reload(false);
//                 }
//                 else {
//                     console.log("Couldn't add the Problem!!")
//                 }
//             }
//         } catch (error) {
//             console.log("Error in adding problem!!");
//             console.log(error);
//         }
//     }
//     return (
//         <div>
//             <form>
//                 <div className="form-group">
//                     <label htmlFor="title">Problem code</label>
//                     <textarea className="form-control" id="code" rows="3" onChange={(e) => { setCode(e.target.value) }} value={code}></textarea>
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="title">Problem Title</label>
//                     <textarea className="form-control" id="title" rows="3" onChange={(e) => { setTitle(e.target.value) }} value={title}></textarea>
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="statement">Problem Statement</label>
//                     <textarea className="form-control" id="statement" rows="3" onChange={(e) => { setStatement(e.target.value) }} value={statement}></textarea>
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="exampleFormControlSelect1">Problem Tag</label>
//                     <select className="form-control" id="tag" onChange={(e) => { setTag(e.target.value) }} >
//                         <option>Math</option>
//                         <option>Linked List</option>
//                         <option>Stack/Queue</option>
//                         <option>Tree/Graph</option>
//                         <option>DP</option>
//                     </select>
//                 </div>
//                 <div className="form-group">
//                     <button type="button" className="btn btn-primary" onClick={add}>Add Problem</button>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default AddProblem
import React,{ useState } from "react"

function AddProblem() {
    const [title,setTitle]=useState("")
    const [code,setCode]=useState("")
    const [statement,setStatement]=useState("")
    const [testcases,setTestcases]=useState("")
    const [hiddentestcases,setHiddenTestcases]=useState("")
    const [tag,setTag]=useState("Math")
    const add=async () => {
        try {
            const token=localStorage.getItem("authtoken")
            if (token=="") {
                console.log("User need to be logged in first") //need to add pop up for this
            } else {
                const response=await fetch("http://localhost:5000/api/userproblems/addproblem",{
                    method: "POST",
                    mode: "cors",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Auth-Token": localStorage.getItem("authToken"),
                    },
                    body: JSON.stringify({
                        code: code,
                        title: title,
                        statement: statement,
                        testcases: testcases,
                        hiddencases: hiddentestcases,
                        tag: tag,
                    }),
                })
                console.log(response)
                if (response.ok) {
                    console.log("Problem successfully added!!")
                    window.location.reload(false)
                } else {
                    console.log("Couldn't add the Problem!!")
                }
            }
        } catch (error) {
            console.log("Error in adding problem!!")
            console.log(error)
        }
    }
    return (
        <div>
            <div className="p" style={{ height: "100vh" }}>
                <form>
                    <div className="flex" style={{ display: "flex",flexDirection: "row",alignItems: "center" }}>
                        <div className="form-group" style={{}}>
                            <label htmlFor="title" style={{ marginLeft: "95px",marginTop: "80px",fontSize: "1.2rem" }}>
                                Problem code
                            </label>
                            <textarea
                                className="form-control"
                                id="code"
                                rows="2"
                                style={{ marginLeft: "95px",width: "610px" }}
                                onChange={e => {
                                    setCode(e.target.value)
                                }}
                                value={code}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="title" style={{ marginLeft: "30px",marginTop: "80px",fontSize: "1.2rem" }}>
                                Problem Title
                            </label>
                            <textarea
                                className="form-control"
                                id="title"
                                rows="2"
                                style={{ marginLeft: "30px",width: "610px" }}
                                onChange={e => {
                                    setTitle(e.target.value)
                                }}
                                value={title}></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="statement" style={{ marginLeft: "95px",marginTop: "20px",fontSize: "1.2rem" }}>
                            Problem Statement
                        </label>
                        <textarea
                            className="form-control"
                            id="statement"
                            rows="6"
                            style={{ marginLeft: "95px",width: "1250px" }}
                            onChange={e => {
                                setStatement(e.target.value)
                            }}
                            value={statement}></textarea>
                    </div>
                    {/* <div className="form-group">
            <label htmlFor="testcases" style={{ marginLeft: "95px", marginTop: "10px", fontSize: "1.2rem" }}>
              Test Cases
            </label>
            <textarea
              className="form-control"
              id="testcases"
              rows="2"
              style={{ marginLeft: "95px", width: "1250px" }}
              onChange={e => {
                setTestcases(e.target.value)
              }}
              value={testcases}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="testcases" style={{ marginLeft: "95px", marginTop: "10px", fontSize: "1.2rem" }}>
              Hidden Test Cases
            </label>
            <textarea
              className="form-control"
              id="hiddentestcases"
              rows="2"
              style={{ marginLeft: "95px", width: "1250px" }}
              onChange={e => {
                setHiddenTestcases(e.target.value)
              }}
              value={hiddentestcases}></textarea>
          </div> */}
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1" style={{ marginLeft: "95px",marginTop: "20px",fontSize: "1.2rem" }}>
                            Problem Tag
                        </label>
                        <select
                            className="form-control"
                            id="tag"
                            style={{ marginLeft: "95px",width: "1250px" }}
                            onChange={e => {
                                setTag(e.target.value)
                            }}>
                            <option>Math</option>
                            <option>Linked List</option>
                            <option>Stack/Queue</option>
                            <option>Tree/Graph</option>
                            <option>DP</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <button type="button" className="button2" onClick={add} style={{ marginLeft: "650px",marginTop: "60px",borderRadius: "12px",border: "none",cursor: "pointer",outline: "none",height: "auto",width: "150px",height: "50px",fontSize: "1.1rem" }}>
                            Add Problem
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProblem