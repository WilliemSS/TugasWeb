const express=require("express");
const app = express();
const connection=require('./config/models/mydb.js')
const cors=require('cors')
const auth=require('./middleware/mw.js')


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
})

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

app.get('/todo',auth,async(req,res)=>{
    try{
        let result = await loadAll();
        res.status(200).json(result)
    }
    catch (err){
        res.status(500).send(err);
    }
})
app.post('/todo',auth,(req,res)=>{
    connection.query("INSERT INTO todo (description) VALUES (?)",req.body.description,(err,result)=>{
        if(err){
            console.log(err);
        }else {
            res.json(result);
        }
    })
})

app.delete('/todo/:id',auth,(req,res)=>{
    connection.query('DELETE FROM todo where id = ${req.params.id}',
    (err,res)=>{
        if(err){
            console.log(err)
        }
        var json={
            message : "delete succeed"
        }
        res.json(json);
    })
})
app.post('/user',(req,res,next)=>{
    connection.query('SELECT COUNT(*) as jumlah FROM user',(err,result)=>{
        if(result[0].jumlah > 0){
            auth(req,res,next);
        }
        else{
            next();
        }
    })
},(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    connection.query('INSERT INTO user(username,password) VALUES (?,?)',[username,password],(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json({
                id:result.insertId,
                username:username
            })
        }
    })
});
app.get('/user',auth,(req,res)=>{
    connection.query("SELECT * FROM user",(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(result)
        }
    })
})
app.delete('/user/:id',auth,(req,res,next)=>{
    connection.query('SELECT COUNT(*) as jumlah FROM user',(err,result)=>{
        if(result[0].jumlah===1){
            res.sendStatus(401);
        }
        else{
            next()
        }
    })
},(req,res)=>{
    connection.query("DELETE FROM user where id=(?)",req.params.id,(err,result)=>{
        if(err){
            console.log(err)
        }
    })
    res.end();
})
app.listen(3000,()=>console.log('Server running at http://localhost:3000'));