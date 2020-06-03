const process = require('process')
const express = require('express');

const mongoose = require('mongoose')
const cors = require('cors')
const fetch = require('node-fetch');


const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || 5000
app.use(bodyParser.json())  //Body Parser MiddleWare
app.use(express.json())
app.use(cors())
app.use(express.static('uploads'))
const OTP = require('./models/otp')

const url = 'mongodb://taha:taha123@ds361998.mlab.com:61998/foodappamw'


mongoose.connect(url, { useNewUrlParser: true }) //MongoDB connection using Mongoose
var db = mongoose.connection //Mongo Connection Instance
db.on('open', () => console.log('database connected'))
// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }

}
function handleErr(err) {
    if (err) return {
        message: "Failed",
        err
    }
}
function handleSuccess(data) {
    if (data) return {
        message: "Success",
        doc: data
    }
}
function sendOtp(req, res, next) {
        const randomNumber = Math.floor(100000 + Math.random() * 900000)
        let message = 'Your verification code is: ' + randomNumber
        fetch(`https://sendpk.com/api/sms.php?username=923352183153&password=taha123&sender=FoodApp&mobile=92${req.body.phone}&message=${message}`)
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                            OTP.create({
                                code:randomNumber
                            }, (error, doc) => {
                                if (error)return res.json(handleErr(error))
                                else {
                                next()
                                }
                            })
                        
                    
                }
                else{
                      handleErr("Quota complete")
                }
            })
    
}


//Verify OTP

app.post('/api/verifyOTP', (req, res) => {
        
        OTP.findOne({ code:req.body.otp }, (err, doc) => {
            if (err) return res.json(handleErr(err))
            else {
            
                        return res.json(handleSuccess(doc))
                 
            }
        })
})
app.post('/api/sendOtp', sendOtp, (req, res) => {
    return res.json(handleSuccess('Ok'))

})





app.listen(port, () => console.log('Server started on port ' + port));