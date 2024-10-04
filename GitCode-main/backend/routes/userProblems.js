const express=require("express")
const authenticateToken=require("../middlewares/authenticate")
const Problem=require("../models/Problem")
const User=require("../models/User")
const router=express.Router()

router.post("/addproblem",authenticateToken,async (req,res) => {
  try {
    // Fetch user by userid
    const id=req.userId
    console.log(id)
    if (!id) {
      res.status(404).send("Not logged In!!!")
    }
    const user=await User.findById(id)

    // Need to add problem to problems table
    console.log("In Adding problems")
    const { code,title,statement,testcases,hiddencases,tag }=req.body
    // console.log(req.body)
    let prob=await Problem.findOne({ P_title: title,P_code: code })
    if (prob) {
      console.log("Same code or title already exisits")
      res.status(400).send("Same code or title exists!!")
    } else {
      prob=await Problem.create({
        P_code: code,
        P_title: title,
        Statement: statement,
        Tag: tag,
        Author: id, //added user's id as auther
      })

      //add problem's id in questions created by user
      await user.updateOne({
        $push: {
          Questions_Created: prob.id,
        },
      })
      console.log("Adding Done")
      res.status(200).send("Problems is done")
      // const filter={ _id: id };
      // const update={ Username: "Sihdg" };
      // await User.findOneAndUpdate(filter,update);

      // console.log("Updation Done");
    }
  } catch (error) {
    console.log("error in adding problem")
    console.log(error)
    res.status(500).send("Internal Server Error!!!")
  }
})

router.post("/addtestcase",authenticateToken,async (req,res) => {
  try {
    console.log("yes here it is")
    const prob_id=req.body.prob_id
    const input=req.body.input
    const output=req.body.output
    console.log(prob_id)
    console.log(output)
    console.log(input)
    const input_array=input.split("\n")
    let final_input_array=[]
    input_array.forEach(element => {
      temp=element.split(" ")
      final_input_array.push(temp)
      // temp.forEach(element2 => {
      //     final_input_array.push(element2);
      // })
    })
    console.log(final_input_array)

    const output_array=output.split("\n")
    let final_output_array=[]
    output_array.forEach(element => {
      temp=element.split(" ")
      final_output_array.push(temp)
      // temp.forEach(element2 => {
      //     final_output_array.push(element2);
      // })
    })
    console.log(final_output_array)
    // res.status(200).json("done");
    let problem=await Problem.findById(prob_id)
    await problem.updateOne({
      $push: {
        Test_cases: { input: final_input_array,output: final_output_array },
      },
    })
    res.status(200).json("done")
  } catch (error) {
    console.log("Error in adding test case")
    console.log(error)
    res.status(500).send("Internal Server Error!!")
  }
})

router.post("/addcomment",authenticateToken,async (req,res) => {
  try {
    const prob_id=req.body.probid;
    console.log(prob_id);
    const comment=req.body.comment;
    const user_id=req.userId;
    const problem=await Problem.findById(prob_id);
    if (!problem) {
      res.status(400).json({ message: "Problem not found" });
    }
    await problem.updateOne({
      $push: {
        Comments: { message: comment,author: user_id }
      }
    })
    res.status(200).json({ message: "Comment added successfully!!" });

  } catch (error) {
    console.log("Error in adding Comment")
    console.log(error)
    res.status(500).send("Internal Server Error!!")
  }
})

router.get("/allproblems",authenticateToken,async (req,res) => {
  try {
    console.log("In fetching all Problems")
    const id=req.userId
    const user=await User.findById(id)
    console.log(user)
    const probs=user.Questions_Created
    console.log(probs)
    const Data=[]
    await Promise.all(
      probs?.map(async item => {
        const prob=await Problem.findById(item)
        const temp={
          id: prob["_id"],
          code: prob["P_code"],
          title: prob["P_title"],
          statement: prob["Statement"],
          tag: prob["Tag"],
          testcases: prob["Test_cases"],
          hiddencases: prob["Hidden_Test_cases"],
          totalsubmissions: prob["Total_Submissions"],
          correctsubmissions: prob["Correct_Submissions"],
          verified: prob["Is_Official"],
          author: user.Username,
          verified: probs["Is_official"],
        }
        Data.push(temp)
      })
    )
    // console.log(Data);
    res.send(Data)
  } catch (error) {
    console.log("Coudn't fetch user problems(backend)")
    console.log(error)
    res.status(500).send("Internal Server Error!!!")
  }
})

router.post("/alltestcases",authenticateToken,async (req,res) => {
  try {
    const prob_id=req.body.probid
    const problem=await Problem.findById(prob_id)
    if (!problem) {
      res.status(400).send("Failed to fetch test cases")
    }
    const testcases=problem.Test_cases
    // console.log(testcases[0].input);
    res.status(200).json({ testcases })
  } catch (error) {
    console.log("Coudn't fetch test cases")
    console.log(error)
    res.status(500).send("Internal Server Error!!!")
  }
})

router.post("/allcomments",authenticateToken,async (req,res) => {
  try {
    const prob_id=req.body.probid;
    const problem=await Problem.findById(prob_id);
    if (!problem) {
      res.status(400).send("Failed to fetch problems details")
    }
    // console.log(problem);
    const comments=problem.Comments;
    // console.log(comments);
    let Data=[];
    await Promise.all(comments?.map(async element => {
      // console.log("here");
      const user=await User.findById(element.author);
      let temp={ message: element.message,author: user.Username,author_id: element.author,_id: element._id };
      Data.push(temp);
    }));
    res.status(200).json(Data);
  } catch (error) {
    console.log("Coudn't fetch comments")
    console.log(error)
    res.status(500).send("Internal Server Error!!!")

  }
})

router.post("/deleteproblem",authenticateToken,async (req,res) => {
  try {
    console.log("In Deleting problem")
    const id=req.userId
    const user=await User.findById(id)
    // console.log(id);
    const prob_id=req.headers["prob-id"]
    // console.log(prob_id);

    // Deleteing problem in problem tables
    const response=await Problem.deleteOne({ _id: prob_id })
    // Deleting problems entry from user's table
    const response2=await user.updateOne({
      $pull: {
        Questions_Created: prob_id,
      },
    })
    console.log(response)
    console.log(response2)
    res.status(200).send("Problems is successfully deleted!!!")
  } catch (error) {
    console.log("Couldn't delete problems")
    console.log(error)
    console.status(500).send("Internal Server Error")
  }
})

router.post("/deletetestcase",authenticateToken,async (req,res) => {
  try {
    const prob_id=req.body.probid
    const test_id=req.body.testid
    const problem=await Problem.findById(prob_id)
    if (!problem) {
      res.status(400).send("Failed to fetch test case")
    }
    console.log(test_id)
    const response=await problem.updateOne({
      $pull: {
        Test_cases: { _id: test_id },
      },
    })
    console.log(response)
    res.status(200).json({ message: "Test case deletion is done" })
  } catch (error) {
    console.log("Couldn't delete testcase")
    console.log(error)
    console.status(500).send("Internal Server Error")
  }
})

router.post("/updateproblem",authenticateToken,async (req,res) => {
  try {
    // Fetch user by userid
    const id=req.userId
    console.log(id)
    if (!id) {
      res.status(404).send("Not logged In!!!")
    }
    const user=await User.findById(id)

    console.log("In Updating problem")
    const { code,title,statement,testcases,hiddencases,tag,verified,prob_id }=req.body
    // console.log(req.body)
    console.log(prob_id)
    let prob=await Problem.findById(prob_id)
    console.log(prob)
    const response=await prob.updateOne({
      P_code: code,
      P_title: title,
      Statement: statement,
      Tag: tag,
      Hidden_Test_cases: hiddencases,
      Test_cases: testcases,
    })

    console.log("Updating Done")
    res.status(200).send("Updation is done")
    // const filter={ _id: id };
    // const update={ Username: "Sihdg" };
    // await User.findOneAndUpdate(filter,update);

    // console.log("Updation Done");
  } catch (error) {
    console.log("Error in updating problem")
    console.log(error)
    res.status(500).send("Internal Server Error")
  }
})

router.post("/verify",authenticateToken,async (req,res) => {
  try {
    const userid=req.userId;
    const probid=req.body.probid;
    const user=await User.findById(userid);
    const problem=await Problem.findById(probid);
    if (!user||!problem) {
      res.status(400).json({ message: "Not found" });
    }
    if (!user.Admin) {
      res.status(404).json({ message: "User is not allowed to verify problems" })
    }
    await problem.updateOne({
      Is_official: 1
    });
    res.status(200).json({ message: "Problem is now verified" });
  } catch (error) {
    console.log("Error in verifying problem")
    console.log(error)
    res.status(500).send("Internal Server Error")
  }
})

module.exports=router
