const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { body, validationResult } = require("express-validator") // to validate details entered by user
const authenticateToken = require("../middlewares/authenticate")
require("dotenv").config()
// Router 1 for signup of a user
router.post("/signup", [body("email", "Enter a valid Email!!").isEmail(), body("password", "Enter a strong password!!").isLength({ min: 8 }), body("username", "Enter a valid username!!").isLength({ min: 5 })], async (req, res) => {
  try {
    // validate entered req details
    const err = validationResult(req)
    if (!err.isEmpty()) {
      // used 'return' because we didn't used 'send' here as we needed to return 'json' data
      return res.status(400).json(err)
    }
    const { username, name, email, password, dob, address } = req.body

    console.log(username)
    // Check that user already exists or not
    let user = await User.findOne({ Email: email })
    if (user) {
      res.status(400).send("Sorry!! Email already exists")
    }

    user = await User.findOne({ Username: username })
    if (user) {
      res.status(400).send("Sorry!! Username already Exists")
    }
    console.log(username)

    // salting the password and getting secured password
    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(password, salt)

    // Registering the user
    user = await User.create({
      Name: name,
      Email: email,
      Password: secPass,
      Username: username,
      DOB: dob,
      Address: address,
    })

    // Returning the authToken to user by signing it through jwt
    const data = {
      user: {
        id: user.id,
      },
    }

    const signature = process.env["SIGNATURE"]
    const authToken = jwt.sign(data, signature)

    res.send({ authToken })
  } catch (error) {
    console.log("here")
    console.log(error)
    res.status(500).send("Internal Server Error")
  }
})

// Router 2 for login user
router.post("/login", async (req, res) => {
  try {
    console.log("In login")
    const { email, password } = req.body

    // search the user by email
    let user = await User.findOne({ Email: email })
    // console.log(user);
    // console.log("api req reached backend 1");
    if (!user) {
      // console.log("api req reached backend 3");
      return res.status(400).send("No such Email Exists!!")
    }
    // compare the password entered by user and the encrypted password stored in database
    // console.log("api req reached backend 2");

    const passCompare = await bcrypt.compare(password, user.Password)
    if (!passCompare) {
      // console.log("api req reached backend 4");
      return res.status(400).send("Invalid Password!!")
    }
    // Now that the user is verified
    // generate the authToken and return it to user
    const data = {
      user: {
        id: user.id,
      },
    }
    // console.log("api req reached backend 5");
    const signature = process.env["SIGNATURE"]
    const authToken = jwt.sign(data, signature, { expiresIn: "2h" })

    console.log(authToken)
    res.status(200).json({ authToken, admin: user.Admin })
  } catch (error) {
    console.log(error)
    res.status(500).send("Internal Server Error")
  }
})

// Router 3 for fetch profile of logged in user
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const id = req.userId
    const user = await User.findById(id)
    // console.log(user)
    res.send(user)
  } catch (error) {
    console.log(error)
    res.status(500).send("Internal server error!!")
  }
})

router.post("/othersprofile", async (req, res) => {
  try {
    const id = req.body.user_id
    console.log(id)
    const user = await User.findById(id)
    // console.log(user)
    res.send(user)
  } catch (error) {
    console.log(error)
    res.status(500).send("Internal server error!!")
  }
})

router.get("/leaderboard", async (req, res) => {
  try {
    const sortedData = await User.aggregate([
      {
        $project: {
          Username: 1,
          _id: 1,
          questionsSolvedCount: { $size: "$Questions_solved" },
        },
      },
      { $sort: { questionsSolvedCount: -1 } }, // Sorting by Questions_solved array length in descending order
    ])
    console.log(sortedData)
    res.status(200).json(sortedData)
  } catch (error) {
    console.log(error)
    res.status(500).send("Internal server error!!")
  }
})

module.exports = router
