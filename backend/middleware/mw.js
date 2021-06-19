const db=require('../config/models/mydb.js')
module.exports=function(req,res,next){
    const username = req.headers.username
    const password = req.headers.password
    db.query('SELECT * FROM user WHERE username=? and password=? ',[username,password],(err,rows)=>{
        if(rows.length === 0){
            res.sendStatus(401)
        }else{
            next()
        }
    })
}