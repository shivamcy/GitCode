import React,{ useEffect,useState } from 'react'
import PropTypes from 'prop-types'
import Compiler from '../compiler/Compiler'

function Problem_statement(props) {
    const prob_id=props.prob_id;
    return (
        <div>
            <div class="card">
                Statement
                <div class="card-body">
                    {props.Problem_statement1}
                </div>
            </div>
            <Compiler prob_id={prob_id} />
        </div>
    )
}

Problem_statement.propTypes={

}

export default Problem_statement