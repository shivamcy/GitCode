import React from "react"
import "./style.css"

const Contact = () => {
  const iconSizeClass = "social-icon"
  return (
    <div className="m" style={{ height: "90vh" }}>
      <div className="container" style={{ marginTop: "20px" }}>
        <div className="content">
          <div className="left-side">
            <div className="address details">
              <i className="fas fa-map-marker-alt"></i>
              <div class="icon">
                <img src="https://img.icons8.com/bubbles/100/000000/map-marker.png" />
              </div>
              <div className="topic">Address</div>
              <div className="text-one">JIIT</div>
              <div className="text-two">Noida</div>
            </div>
            <div className="phone details">
              <i className="fas fa-phone-alt"></i>
              <div class="icon">
                <img src="https://img.icons8.com/bubbles/100/000000/phone.png" />
              </div>
              <div className="topic">Phone</div>
              <div className="text-one">+0098 9893 5647</div>
              <div className="text-two">+0096 3434 5678</div>
            </div>
            <div className="email details">
              <i className="fas fa-envelope"></i>
              <div class="icon">
                <img src="https://img.icons8.com/bubbles/100/000000/new-post.png" />
              </div>
              <div className="topic">Email</div>
              <div className="text-one">akash@gmail.com</div>
              <div className="text-two">gitcode@gmail.com</div>
            </div>
          </div>
          <div className="right-side">
            <div className="topic-text">Send us a message</div>
            <p>If you have any queries, you can send me a message from here. It's my pleasure to help you.</p>
            <form action="#">
              <div className="input-box">
                <input type="text" placeholder="Enter your name" />
              </div>
              <div className="input-box">
                <input type="text" placeholder="Enter your email" />
              </div>
              <div className="input-box">
                <input type="text" placeholder="Enter your message" />
              </div>
              <div className="button">
                <input type="button" value="Send Now" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div></div>
      {/* <footer className="foot">
                <center>
                    <div className="so my-3 mx-1">
                        <br></br>
                        <br></br>
                        <p>
                            <h3>Follow for more details:</h3>
                        </p>
                        <a href="https://www.facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} className={iconSizeClass} />
                        </a>
                        <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} className={iconSizeClass} />
                        </a>
                        <a href="https://www.linkedin.com/in/akash-sharma-1b4560220/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} className={iconSizeClass} />
                        </a>
                    </div>
                </center>
            </footer> */}
    </div>
  )
}

export default Contact
