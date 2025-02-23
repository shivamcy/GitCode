import React,{ useEffect,useState } from 'react'

const Leaderboard=() => {
    const [data,setData]=useState([]);
    const [rank,setRank]=useState(1);
    const fetch_data=async () => {
        try {
            const response=await fetch("http://localhost:5000/api/user/leaderboard",{
                method: 'GET',
                mode: 'cors',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            if (response.ok) {
                const res=await response.json();
                console.log(res);
                setData(res);
                setRank(1);
            }
        } catch (error) {
            console.log("Error in fetching leaderboard details!!")
            console.log(error);
        }
    }
    useEffect(() => {
        fetch_data();
    },[])
    return (
        <div style={{ backgroundColor: '#eee',height: '100vh' }}>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Questions Solved</th>
                        {/* <th scope="col">Handle</th> */}
                    </tr>
                </thead>
                <tbody>
                    {data.length>0&&data.map((item,index) => (
                        <tr key={item._id}>
                            <th scope="row">{index+1}</th>
                            <td>{item.Username}</td>
                            <td>{item.questionsSolvedCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Leaderboard
