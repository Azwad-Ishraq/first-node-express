const express = require('express');
const cors = require('cors');
const { json } = require('express');

const app = express()
const port = 5000;

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('response from node server')
});


const users = [
    {id:0,name:'name0'},
    {id:1,name:'name1'},
    {id:2,name:'name2'},
    {id:3,name:'name3'},
    {id:4,name:'name4'},
    {id:5,name:'name5'},
]

app.get('/users',(req,res)=>{
    const search = req.query.search;
    if(search){
        const searchResult = users.filter(user => user.name.toLocaleLowerCase().includes(search));
        res.send(searchResult)
    }else{
        res.send(users)
    }
    
   
})

app.post('/users',(req,res)=>{
    const newUser = req.body;
    newUser.id = users.length;
    users.push(newUser)
    console.log('post',req.body)
    res.json(newUser)
})

app.get('/users/:id',(req,res)=>{
    const id = req.params.id;
    const user = users[id];
    res.send(user)
})



app.listen(port,()=>{
    console.log('listening to port',port)
})