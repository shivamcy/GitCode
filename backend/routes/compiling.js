const express = require("express")
const router = express.Router()
var fs = require("fs")
const Problem = require("../models/Problem")
const authenticateToken = require("../middlewares/authenticate")
const User = require("../models/User")

router.post("/runit", authenticateToken, async (req, res) => {
  try {
    // console.log(req.body.code);
    const code = req.body.code
    // const input=req.body.input;
    const prob_id = req.body.probid
    const user_id = req.userId
    const user = await User.findById(user_id)
    let rank_changed = 0
    console.log(prob_id)
    // save the code in python file first
    fs.writeFile("./temp.py", code, function (err) {
      // console.log(err);
      if (err) throw err
      console.log("Saved!")
    })

    let problem = await Problem.findById(prob_id)
    await problem.updateOne({
      Total_Submissions: problem.Total_Submissions + 1,
    })
    const testcases = problem.Test_cases

    const util = require("util")
    const exec = util.promisify(require("child_process").exec)
    // console.log("hi")
    const Output = [] //will contain 1 or 0 to show that ith test case passed or not
    let passed = 1
    const ls = async (input, output) => {
      // use sys.argv[1]=> to acces input for code from terminal

      // now i need to know how many inputs and how many lines
      let command = "python3 temp.py "
      input.forEach(element => {
        element.forEach(element2 => {
          command += element2 + " "
        })
      })
      // for (let i=0;i<input.length;i++) {
      //     command+=input[i]+' '
      // }
      // command+='`';
      console.log(command)
      const { stdout, stderr } = await exec(command)
      console.log("stdout:", stdout)
      console.log("stderr:", stderr)
      if (stderr) {
        await user.updateOne({
          Wrong_submissions: user.Wrong_submissions + 1,
        })
        res.status(200).json({ passed: 0, compiled: 0, message: "Error while running a test case", error: stderr })
      }
      const out = stdout
      const output_array = out.split("\n")
      let final_output_array = []
      output_array.forEach(element => {
        // const ele=element+'0';
        const ele = element.replace("\r", "")
        temp = ele.split("\r")
        final_output_array.push(temp)
        // temp.forEach(element2 => {
        //     final_output_array.push(element2);
        // })
      })
      console.log(final_output_array)
      let f = 1
      for (let i = 0; i < output.length; i++) {
        // console.log(output[i]);
        // console.log(final_output_array[i]);
        if (JSON.stringify(output[i]) != JSON.stringify(final_output_array[i])) {
          f = 0
          passed = 0
          break
        }
      }
      // console.log(f);
      Output.push(f)
      // res.json({ output: stdout,error: stderr });
    }
    for (let i = 0; i < testcases.length; i++) {
      await ls(testcases[i].input, testcases[i].output)
    }
    console.log(Output)

    // if test cases passed then increment correct submissions and also insert this problem id in solved problems of user
    if (passed) {
      await problem.updateOne({
        Correct_Submissions: problem.Correct_Submissions + passed,
      })
      await user.updateOne({
        Correct_submissions: user.Correct_submissions + 1,
      })
      await user.updateOne({
        $addToSet: {
          Questions_solved: prob_id,
        },
      })

      // if total problems solved exceed 3,6,9,12 or 15 then title increased by 1

      const updatedUser = await User.findById(user_id)
      const solved = updatedUser.Questions_solved.length
      const title = updatedUser?.Title
      if ((solved >= 3 && title < 1) || (solved >= 6 && title < 2) || (solved >= 9 && title < 3) || (solved >= 12 && title < 4) || (solved >= 15 && title < 5)) {
        await user.updateOne({
          Title: user.Title + 1,
        })
        rank_changed = 1
      }
    } else {
      await user.updateOne({
        Wrong_submissions: user.Wrong_submissions + 1,
      })
    }
    fs.writeFile("./temp.py", "", function (err) {
      // console.log(err);
      if (err) throw err
      console.log("Saved!")
    })
    res.status(200).send({ passed: passed, compiled: 1, message: "All test cases compiled succesfully", output: Output, rank_changed: rank_changed })
  } catch (error) {
    console.log("Error in compiling(Backend)")
    console.log(error)
    res.status(500).send("Internal Server Error!!")
  }
})

module.exports = router
