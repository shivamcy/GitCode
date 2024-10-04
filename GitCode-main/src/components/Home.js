import React from "react"
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"
import Compiler from "./compiler/Compiler"

function Home(props) {
  const navigate = useNavigate()
  const getStarted = async () => {
    try {
      navigate("/profile")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="m">
      <div className="home my-3 mx-3">
        <header>
          <h1 className="heading">
            Welcome to <br></br>GITCODE
          </h1>
        </header>
        {/* <div className="content my-5">
          <main>
            <section class="mx-1 my-3">
              <h2>
                <h2>Learn to Code</h2>
                <p>Start your coding journey with our tutorials and resources.</p>
              </h2>
            </section>
            <section class="mx-1 my-3">
              <h2>
                <h2>Practice Coding</h2>
                <p>Test your skills with coding challenges and exercises.</p>
              </h2>
            </section>
            <section class="mx-1 my-3">
              <h2>
                <h2>Connect with Developers</h2>
                <p>Join our community to collaborate and learn from others.</p>
              </h2>
            </section>
          </main>
        </div> */}
        <center>
          <div className="button">
            <button type="button" class="btn btn-secondary" onClick={getStarted}>
              Get Started
            </button>
          </div>
        </center>
      </div>
      //{" "}
      {/* <footer>
    //     <center>
    //       <div className="testimonials mx-3 my-3">
    //         <section className="testimonials">
    //           <h2>What Our Users Say</h2>
    //           <div className="testimonial">
    //             <p>"This website has been a game-changer for me in my coding journey."</p>
    //             <p className="author">- John Doe</p>
    //           </div>
    //           <div className="testimonial">
    //             <p>"I've learned so much from the tutorials and the supportive community here."</p>
    //             <p className="author">- Jane Smith</p>
    //           </div>
    //         </section>
    //       </div>
    //       <div className="footer-bottom">
    //         <p>&copy; {new Date().getFullYear()} Coding Website</p>
    //       </div>
    //     </center>
    //   </footer> */}
    </div>
  )
}

Home.propTypes = {}

export default Home
