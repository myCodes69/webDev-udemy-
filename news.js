const express=require('express')
const app=express()
const https=require('https')
const bodyParser=require('body-parser')
const request = require('request')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('util'))
app.listen(process.env.PORT || 3000,()=>{console.log('server started')})
app.get('/',(req,res)=>{
res.sendFile(__dirname+'/sign-up.html')
}) 
app.post('/',(req,res)=>{
    // res.send('success')
    var fName=req.body.fname
    var lName=req.body.lname
    var email=req.body.email
    const data={
        members:[
            {
                email_address:email,
                status:'subscribed',
                merge_fields:{
                    FNAME:fName,
                    LNAME:lName
                }
            }
        ]
    }
    var jsonData=JSON.stringify(data)
    const url="https://us18.api.mailchimp.com/3.0/lists/30b7defe47"
    const options={
        method:'POST',
        auth:'Soumya01:dba5008c6cd90e6f03005acc920c90f8-us18'
    }
const request =  https.request(url,options,(resPonse)=>{
    if(resPonse.statusCode === 200 ){
        res.sendFile(__dirname+'/success.html')
    }
    else{
        res.sendFile(__dirname+'/faliure.html')
    }
         resPonse.on("data",(d)=>{
            console.log(JSON.parse(d));
            console.log(resPonse.statusCode);
            console.log(resPonse.statusMessage);
         })
    })
    request.write(jsonData)
    request.end()

})
app.post('/faliure',(req,res)=>{
    res.redirect('/')
})

// dba5008c6cd90e6f03005acc920c90f8-us18 - api key
// 30b7defe47 - listId