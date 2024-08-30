const express = require('express')
const fs=require('fs');
const app=express();
app.use(express.json());

app.get('/getdata',function(req,res){
    fs.readFile('data.json','utf-8',(err,data)=>{

        if(err){
            console.log("ERRROR");
        }
        else{
            console.log(JSON.stringify(data));
            res.send(data);
        }
    })
})

app.get("/databyid/:id", (req, res) => {
    fs.readFile('data.json','utf-8',(err,data)=>{
        const jsonparse=JSON.parse(data);
        const newdata = jsonparse.filter((i) => 
         i.id === parseInt(req.params.id)
    )
    console.log(newdata);
    res.send(newdata);
    })
  
})


app.get("/datasearch/", (req, res) => {
    fs.readFile('data.json','utf-8',(err,data)=>{
        
        const jsonData = JSON.parse(data);
        const name = req.query.name;
        const res = jsonData.filter((i) => i.name === name);
  
    console.log(res);
    res.send(res);
    })
  
})


  
app.post("/adddata",(req,res)=>{

    fs.readFile('data.json','utf-8',(err,data)=>{

        if(err){
            console.log("ERRROR");
        }
        const newdta=JSON.parse(data);  
const name=req.query.name;
const id=parseInt(req.query.id);
const description=req.query.description;

const neww={
    "id": id,
    "name": name,
    "description": description
    }
newdta.push(neww);

fs.writeFile("data.json",JSON.stringify(newdta),(err,data)=>{

console.log((newdta));
res.send(newdta);

})
      
    })


})


app.delete("/deletebyid/:id",(req,res)=>{
    fs.readFile('data.json','utf-8',(err,data)=>{

        if(err){
            console.log("ERRROR");
        }
        const newdta=JSON.parse(data);  
const id=parseInt(req.params.id);

const index = newdta.findIndex(i => i.id === id);
newdta.splice(index,1);

fs.writeFile("data.json",JSON.stringify(newdta),(err,data)=>{

console.log((newdta));
res.send(newdta);

})
      
    })
})


app.put("/updatebyid/:id",(req,res)=>{
    fs.readFile('data.json','utf-8',(err,data)=>{

        if(err){
            console.log("ERRROR");
        }
        const newdta=JSON.parse(data);  
const id=req.params.id;

const index = newdta.findIndex(i => i.id === id);


fs.writeFile("data.json",JSON.stringify(newdta),(err,data)=>{

console.log(JSON.stringify(newdta));
res.send(newdta);

})
      
    })

})



app.listen(8000,()=>{
    console.log("Server Started");
    });
    
