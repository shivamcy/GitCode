import React,{ useEffect,useState } from 'react'

const Testcase_item=(props) => {
    const input=props.input;
    const output=props.output;
    const [input_to_print,setInputToPrint]=useState([]);
    const [output_to_print,setOutputToPrint]=useState("");
    const print=async () => {
        let input_string=[];
        input.forEach(element => {
            input_string.push(element.join(' '));
        });
        setInputToPrint(input_string);

        let output_string=[];
        output.forEach(element => {
            output_string.push(element.join(' '));
        });
        setOutputToPrint(output_string);
    }
    useEffect(() => { print() },[])
    return (
        <>
            <div class="card">
                <h4>Input</h4>
                <ol className="list-group list-group-numbered">
                    {input_to_print&&input_to_print.length>0&&input_to_print.map((item) => (
                        <li>
                            {item}
                        </li>
                    ))}
                </ol>
            </div>
            <div class="card">
                <h4>output</h4>
                <ol className="list-group list-group-numbered">
                    {output_to_print&&output_to_print.length>0&&output_to_print.map((item) => (
                        <li>
                            {item}
                        </li>
                    ))}
                </ol>
            </div>
        </>
    )
}

export default Testcase_item
