import React,{ useEffect,useState } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Compiler=props => {
  const notifysuccess=msg => toast.success(msg)
  const notifyerror=error => toast.error(error)
  const prob_id=props.prob_id
  const [code,setCode]=useState("import sys\n# Input format is x=sys.argv[i]\n# Enter your code here\n")
  const [expectedOutput,setExpectedOutput]=useState([4,6])
  const [output,setOutput]=useState("")
  const [passed,setPassed]=useState(0)
  const [input,setInput]=useState([2,1,3,2,4])
  const [result,setResult]=useState("");
  // const [input_in_firstline,setFirstline]=useState(0);
  const func1=async () => {
    try {
      setPassed(0)
      const response=await fetch("http://localhost:5000/api/compiling/runit",{
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Auth-Token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          code: code,
          probid: prob_id,
        }),
      })
      const data=await response.json()
      console.log(data)
      if (!data.compiled) {
        console.log("Compilation Error")
        console.log(data.error)
      } else {
        console.log("Compilation Successful")
        let count=1
        let str="";
        data.output.forEach(element => {
          if (element) {
            console.log(`Test case ${count} passed`)
            str=str+`Test case ${count} passed\n`;
          } else {
            console.log(`Wrong answer on Test case ${count}`)
            str=str+`Wrong answer on Test case ${count}\n`;
          }
          count+=1
        })
        setResult(str);
        if (data.passed) {
          console.log("All test cases passed")
          notifysuccess("All Test cases Passed");
          setPassed(1)
        }
        else {
          notifyerror("Wrong Submission");
        }
        if (data.rank_changed) {
          notifysuccess("Congratulations!! Your rank is updated")
        }
      }
      // const out=await data.output;
      // const err=await data.err;
      // // console.log(out);
      // // console.log(err);
      // if (err) {
      //     setOutput("Error: \n"+err)
      // }
      // else {
      //     setOutput(out);
      //     // setPassed(1);
      //     // console.log(output);
      //     // console.log(expectedOutput);
      //     const x=JSON.stringify(expectedOutput);
      //     const y=JSON.stringify(out);
      //     if (x===y) {
      //         console.log("Test case Passed");
      //         setPassed(1);
      //     }
      // }
      // console.log("ended");
    } catch (error) {
      console.log("Error occured while compiling")
    }
  }
  return (
    <div className="p" style={{ height: "100vh" }}>
      <div className="flex" style={{ display: "flex",flexDirection: "row",alignItems: "center" }}>
        <div className="form-group">
          <label for="exampleFormControlTextarea1" style={{ marginLeft: "95px",marginTop: "30px",font: "1.2rem" }}>
            Write Your code here
          </label>
          <textarea
            className="form-control"
            id="textarea"
            rows="19"
            style={{ marginLeft: "95px",width: "610px" }}
            onChange={e => {
              setCode(e.target.value)
            }}
            value={code}></textarea>
        </div>
        <div className="form-group">
          <label for="exampleFormControlTextarea1" style={{ marginLeft: "95px",marginTop: "30px",font: "1.2rem" }}>
            Results
          </label>
          <textarea
            className="form-control"
            id="textarea"
            rows="19"
            style={{ marginLeft: "95px",width: "610px" }}
            onChange={e => {
              setCode(e.target.value)
            }}
            value={result}></textarea>
        </div>
      </div>
      <button className="button2" onClick={func1} style={{ marginLeft: "325px",marginTop: "30px",borderRadius: "12px",border: "none",cursor: "pointer",outline: "none",height: "auto",width: "100px",height: "40px",fontSize: "1.1rem" }}>
        Submit
      </button>
      {/* <p style={passed? { color: "green" }:{ color: "red" }}>{passed? "Test Case Passed":"Test Case Failed"}</p> */}
    </div>
  )
}

export default Compiler
