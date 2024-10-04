import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link, useLocation } from "react-router-dom"
import { useContext } from "react"
import MyContext from "../context/Mycontext"

function Navbar(props) {
  const location = useLocation()
  const [login, setLogin] = useState(0)
  const sharedData = useContext(MyContext)
  const check_login = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/profile", {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Auth-Token": localStorage.getItem("authToken"),
        },
      })
      if (response.ok) {
        setLogin(1)
      } else {
        setLogin(0)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    check_login()
  }, [sharedData.loggedIn])
  return (
    <div className="n" style={{}}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href="/"
            style={{
              marginLeft: "80px",
              marginRight: "60px",
              fontSize: "2.4rem",
            }}>
            <b>GitCode</b>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="12" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12" y2="22" />
              <line x1="7" y1="20" x2="17" y2="20" />
            </svg>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item mx-5">
                <Link className={`nav-link ${location.pathname === "/" && "active"}`} aria-current="page" to="/" style={{ marginLeft: "30px", marginRight: "30px" }}>
                  Home
                </Link>
              </li>
              <li className="nav-item mx-5">
                <Link className={`nav-link ${location.pathname === "/practice" && "active"}`} aria-current="page" to="/practice" style={{ marginLeft: "30px", marginRight: "20px" }}>
                  Practice
                </Link>
              </li>
              <li className="nav-item mx-5">
                <Link className={`nav-link ${location.pathname === "/contact" && "active"}`} aria-current="page" to="/contact" style={{ marginLeft: "30px", marginRight: "20px", width: "107px" }}>
                  Contact Us
                </Link>
              </li>
              <li className="nav-item mx-5">
                <Link className={`nav-link ${location.pathname === "/about" && "active"}`} aria-current="page" to="/about" style={{ marginLeft: "30px", marginRight: "20px" }}>
                  About
                </Link>
              </li>
              {/* <li className="nav-item mx-5">
                                <Link className={`nav-link ${location.pathname==="/login"&&"active"}`} aria-current="page" to="/login" style={{ marginLeft: "24px",marginRight: "40px" }}>
                                    Login
                                </Link>
                            </li> */}
              {!login ? (
                <>
                  <li className="nav-item mx-5">
                    <Link className={`nav-link ${location.pathname === "/login" && "active"}`} aria-current="page" to="/login" style={{ marginLeft: "90px" }}>
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown ms-auto">
                    <Link className="nav-link dropdown-toggle" to="/profile" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ marginLeft: "120px" }}>
                      You
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/problems">
                          Problems
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/addproblem">
                          AddProblem
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/leaderboard">
                          Leaderboard
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

Navbar.propTypes = {}

export default Navbar
