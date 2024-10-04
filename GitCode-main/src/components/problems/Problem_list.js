import React,{ useContext } from 'react'
import PropTypes from 'prop-types'
import { Link,useNavigate } from 'react-router-dom';
import MyContext from '../../context/Mycontext';


function Problem_list(props) {
    const navigate=useNavigate();
    const sharedData=useContext(MyContext);
    const title=props.title;
    const total=props.total_submissions;
    const correct=props.correct_submissions;
    const tag=props.tag;
    const statement=props.problem_statement;
    const code=props.code;
    const verified=props.verified;
    const id=props.id;
    const func1=() => {
        sharedData.set_statement(statement);
        sharedData.set_verified(verified);
        sharedData.setProbid(id);
    }
    const goto_comments=async () => {
        sharedData.setProbid(id);
        navigate("/comments");
    }
    return (
        <>
            <div>
                <li className="list-group-item d-flex justify-content-between align-items-start mx-3 my-2" style={{ borderRadius: '15px' }}>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">
                            <Link onClick={func1} to="/problem_statement">
                                {title}
                            </Link>
                        </div>
                        {/* <br /> */}
                        {tag}
                        <br />
                        {/* {verified? "verified":"Not verified"} */}
                        {/* <button type="button" className="btn btn-danger" onClick={delete_it}>Delete</button>
        <button type="button" className="btn btn-primary" onClick={update_it}>Update</button>
        <button type="button" className="btn btn-success" onClick={test_cases}>Edit TestCases</button> */}
                        <button type="button" className="btn btn-warning" onClick={goto_comments}>Comments</button>
                    </div>
                    <span className="badge bg-primary rounded-pill">{correct}</span>
                </li>
            </div>
        </>
    )
}

Problem_list.propTypes={

}

export default Problem_list
