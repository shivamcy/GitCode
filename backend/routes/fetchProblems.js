const express=require('express');
const router=express.Router();
const Problem=require('../models/Problem');

// Router 1:getting all problems stored in database
router.post('/all',async (req,res) => {
    try {
        const verified=req.body.verified;
        console.log("i am in all problems api");
        const data=await Problem.find();
        // console.log("hi");
        console.log(data);
        const Dat=[];
        await Promise.all(data?.map(async element => {
            if (element.Is_official==verified) {
                Dat.push(element);
            }
        }));
        console.log("here");
        console.log(Dat);
        res.status(200).json({ message: "Successfulluy fetched",data: Dat });
    } catch (error) {
        res.status(500).send('Internal Server Error!!!');
    }
})

// router.get('/cf',async (req,res) => {
//     try {
//         console.log("hi i am fetching api of cf");
//         const response=await fetch('https://codeforces.com/api/problemset.problems',{
//             method: 'Get'
//         }
//         );
//         const problems=await response.json();
//         // probs,stats=problems;
//         // x=problems.result.problems();
//         const x=[]
//         problems.result.problems.map((prob) => {
//             x.push(prob)
//         })
//         console.log(problems)
//         console.log(x);
//         // console.log(probs)
//         res.send({});
//     } catch (error) {
//         res.status(500).send('Internal Server Error!!!');
//     }
// })

// router.get('/lc',async (req,res) => {
//     try {
//         const url='https://leetcode-api.p.rapidapi.com/leetcode/top-100?skip=3&limit=10';
//         const options={
//             method: 'GET',
//             headers: {
//                 'X-RapidAPI-Key': '9f796b9440msh13385eb300a5028p134eefjsna0ee21949930',
//                 'X-RapidAPI-Host': 'leetcode-api.p.rapidapi.com'
//             }
//         };

//         try {
//             const response=await fetch(url,options);
//             const result=await response.text();
//             console.log(result);
//         } catch (error) {
//             console.error(error);
//         }
//         // console.log(probs)
//         res.send({});
//     } catch (error) {
//         res.status(500).send('Internal Server Error!!!');
//     }
// })

// router.get('/lc',async (req,res) => {
//     try {
//         const response=await fetch(`https://leetcode.com/api/problems/two-sum`,{
//             method: 'GET'
//         });
//         console.log(response.json());
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Internal Server Error!!!');
//     }
// })

//codewars
router.get('/codewars',async (req,res) => {
    try {
        console.log('1')
        const page=0;
        const user='g964';
        const ques=await fetch(`https://www.codewars.com/api/v1/users/${user}/code-challenges/completed?page=${page}`,{
            method: 'GET'
        });
        const q=await ques.json();
        console.log("Reached here 1");
        const Data=[];
        await Promise.all(q.data.map(async (item) => {
            const challenge=item.id;
            const ques2=await fetch(`https://www.codewars.com/api/v1/code-challenges/${challenge}`,{
                method: 'GET'
            });
            const q2=await ques2.json();
            console.log(q2);
            const temp={ 'P_title': q2['name'],'Statement': q2['description'] };
            Data.push(temp);
        }));
        console.log("Request done 1");
        // console.log(Data[0]);
        res.send(Data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error!!!');
    }
})

router.post('/save',async (req,res) => {
    try {
        // console.log("hi")
        const entry=new Problem({
            "P_code": "215",
            "P_title": "sum of 2n numbers",
            "Statement": "take n as input and print <Hello World!!!!> and sum upto 2n integers",
            "Tag": "Maths",
            "Test_cases": [1,2,3,4,5],
            "Hidden_Test_Cases": [6,7,8,10],
            "Total_Submissions": 13,
            "Correct_Submissions": 7,
            "Is_official": true
        });
        const savedData=await entry.save();
        console.log(savedData);
        res.send(savedData);
    } catch (error) {
        res.status(500).send('Internal Server Error!!!');
    }
})

module.exports=router;