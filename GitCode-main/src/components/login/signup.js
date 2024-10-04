import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCheckbox, MDBIcon } from "mdb-react-ui-kit"

function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const [dob, setDob] = useState("")
  const signup = async e => {
    try {
      e.preventDefault()
      const response = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          name: name,
          email: email,
          password: password,
          dob: dob,
          address: address,
        }),
      })
      if (response.ok) {
        console.log("Successfully Registered")
        navigate("/login")
      } else {
        console.log("Something went wrong")
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="lo">
      <MDBContainer fluid className="p-4 background-radial-gradient overflow-hidden">
        <MDBRow>
          <MDBCol md="6" className="text-center text-md-start d-flex flex-column justify-content-center">
            <h1 className="my-4 display-3 fw-bold ls-tight px-3" style={{ color: "hsl(218, 81%, 95%)", position: "relative", right: "400px" }}>
              Unlock Coding Potential with GitCode:
              <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}> Unleash Collaboration!</span>
            </h1>

            <p className="px-3" style={{ color: "hsl(218, 81%, 85%)" }}>
              Welcome back to GitCode! Log in to access your account and dive into a world of coding challenges, tutorials, and collaborative coding projects. Join a community of passionate developers and enhance your coding skills with GitCode
            </p>
          </MDBCol>

          <MDBCol md="6" className="position-relative">
            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

            <MDBCard className="my-5 bg-glass">
              <MDBCardBody className="p-5">
                <MDBRow>
                  <MDBCol col="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Name"
                      id="form1"
                      type="text"
                      onChange={e => {
                        setName(e.target.value)
                      }}
                    />
                  </MDBCol>

                  <MDBCol col="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="User name"
                      id="form2"
                      type="text"
                      onChange={e => {
                        setUsername(e.target.value)
                      }}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  id="form3"
                  type="email"
                  onChange={e => {
                    setEmail(e.target.value)
                  }}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="form4"
                  type="password"
                  onChange={e => {
                    setPassword(e.target.value)
                  }}
                />

                {/* <div className="d-flex justify-content-center mb-4">
                                    <MDBCheckbox name="flexCheck" value="" id="flexCheckDefault" label="Subscribe to our newsletter" />
                                </div> */}

                <MDBBtn className="w-100 mb-4" size="md" onClick={signup} style={{ maxWidth: "600px", height: "40px" }}>
                  Signup
                </MDBBtn>

                <Link className="nav-link active" aria-current="page" to="/login">
                  Login
                </Link>
                {/* <div className="text-center">
                                    <p>or</p>
                                    <div className="button-lo">
                                        <button type="button" className="btn btn-primary w-100 mb-4">
                                            Login
                                        </button>
                                    </div>
                                </div> */}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  )
}

export default Signup
