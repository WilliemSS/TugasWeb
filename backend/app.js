const express=require("express");
const app = express();
const connection=require('./config/models/mydb.js')
const cors=require('cors')

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors());



app.get("/",(req,res)=>{
    res.send(`
        <html>
            <body>
                <form action='/todo' method='post'>
                    <input name='description'/>
                    <button>Add</button>
                </form>
            </body>
        </html>
    `)
});

function loadAll(){
    return new Promise((resolve,reject)=>{
        connection.query("SELECT * FROM todo",(err,result)=>{
            if(err){
                reject(err);
                console.log(err);
            }
            resolve(result);
        })
    })
}

app.get("/todo",async(req,res)=>{
    try{
        let result = await loadAll();
        res.status(200).json(result)
    }
    catch (err){
        res.status(500).send(err);
    }
});
app.post("/todo",(req,res)=>{
    connection.query("INSERT INTO todo (description) VALUES (?)",req.body.description,(err,result)=>{
        if(err){
            console.log(err);
        }else {
            res.json(result);
        }
    })
});

app.delete('/todo/:id',(req,res)=>{
    connection.query('DELETE FROM todo where id =?',[req.params.id]),
    (err,res)=>{
        if(err){
            console.log(err)
        }
        var json={
            message : "delete succeed"
        }
        res.json(json);
    }
})
app.listen(8000,()=>console.log('Server running at http://localhost:8000'));