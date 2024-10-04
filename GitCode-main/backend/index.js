const connectToMongo=require('./db');
const express=require('express');
var cors=require('cors')
var bodyParser=require('body-parser');
connectToMongo();
const app=express()
const port=5000

// for destructuring body of request in api's
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))


// signup was giving problem so added this
const corsOptions={
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
//

app.use('/api/problems/',require('./routes/fetchProblems'));
app.use('/api/user/',require('./routes/user'));
app.use('/api/userproblems/',require('./routes/userProblems'));
app.use('/api/compiling/',require('./routes/compiling'));

app.listen(port,() => {
    console.log(`Example app listening on port ${port}`)
})