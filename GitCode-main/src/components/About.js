import PropTypes from "prop-types"
import React, { useContext, useEffect, useState } from "react"
import imag1 from "./akash.jpg"
import imag2 from "./nupur.jpg"
import imag3 from "./sparsh2.jpg"
function About(props) {
  const [imag, setImag] = useState(imag1)
  return (
    <>
      <div className="card4" style={{ backgroundColor: "white", height: "100%" }}>
        <div className="about-section" style={{ marginLeft: "10px", marginRight: "10px" }}>
          <h3 style={{ fontSize: "2.3rem" }}>Welcome to GitCode</h3>
          <p style={{ textAlign: "center" }}>GitCode is more than just a coding platform; it's your gateway to a world of learning, collaboration, and recognition.</p>
          <p style={{ textAlign: "center" }}> Whether you're a seasoned coder or just starting your journey, GitCode offers a range of features designed to enhance your coding experience and propel your skills to new heights.</p>
          {/* </div> */}
          {/* <div className="badges"> */}
          <hr />
          <p style={{ textAlign: "center" }}>
            <h3 style={{ textAlign: "center" }}>What We Offer</h3>
            Solve/Practice Problems Dive into our extensive collection of coding problems covering various topics and difficulty levels. Sharpen your skills, tackle challenges, and track your progress as you solve each problem. See Others' Solutions Gain insights and learn from the best by exploring
            solutions shared by other users. Compare approaches, discover new techniques, and expand your coding repertoire. Contribute Problems and Test Cases Be a part of the community and contribute your own coding problems and test cases. Share your creativity, challenge fellow coders, and help
            build a diverse and engaging platform. Receive Titles on Basis of Performances Showcase your coding prowess and earn titles based on your performance. From "Rising Star" to "Coding Maestro," unlock new titles as you achieve milestones and excel in coding challenges.
          </p>
          <hr />
          <p style={{ textAlign: "center" }}>
            <h3 style={{ textAlign: "center" }}>Our Mission </h3>
            At GitCode, we are committed to fostering a vibrant and supportive coding community. Our mission is to empower coders of all levels to learn, collaborate, and thrive. Whether you're here to practice, learn, or contribute, GitCode is your platform for growth and achievement. Join us on
            GitCode and embark on an exciting coding journey. Let's code, learn, and inspire together!
          </p>
          <hr />
          <h5 className="badges" style={{ textAlign: "center" }}>
            We give different badges to the coders based on the number of questions they solve in order to encourage them.
          </h5>
          {/* <p>
            <img src="img.jpg" alt="i" style={{ height: "40px", width: "100px" }} />
          </p> */}
        </div>
        <h2 style={{ textAlign: "center", marginTop: "10px" }}>Our Team</h2>
        <div className="row">
          <div className="column3">
            <div className="card3">
              <center>
                <img src={imag3} alt="akash" style={{ width: "100px", height: "150px", alignContent: "center" }} />
              </center>
              <div className="container3">
                <h2>Sparsh</h2>
                <p>Computer Science Engineering Student.</p>
                <p>Jaypee Institute of Information Technology</p>
                <p>
                  <button
                    className="button3"
                    onClick={() => {
                      window.location.href = "mailto:sparshrajput92@gmail.com"
                    }}>
                    Contact
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div className="column3">
            <div className="card3">
              <center>
                <img src={imag} alt="akash" style={{ width: "100px", height: "150px", alignContent: "center" }} />
              </center>
              <div className="container3">
                <h2>Akash Sharma</h2>
                <p>Computer Science Engineering Student.</p>
                <p>Jaypee Institute of Information Technology</p>
                <p>
                  <button
                    className="button3"
                    onClick={() => {
                      window.location.href = "mailto:akash.sharma251202@gmail.com"
                    }}>
                    Contact
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div className="column3">
            <div className="card3">
              <center>
                <img src={imag2} alt="akash" style={{ width: "100px", height: "150px", alignContent: "center" }} />
              </center>
              <div className="container3">
                <h2>Nupur Tiwari</h2>
                <p>Computer Science Engineering Student.</p>
                <p>Jaypee Institute of Information Technology</p>
                <p>
                  <button
                    className="button3"
                    onClick={() => {
                      window.location.href = "mailto:ntiffco@gmail.com"
                    }}>
                    Contact
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  )
}

About.propTypes = {}

export default About
