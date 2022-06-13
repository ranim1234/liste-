const express = require('express') ; 
const mongoose = require('mongoose') ; 
const cors = require('cors')
const User = require('./models/user') ;  
const db = "mongodb+srv://ranim:Ranim1234@cluster0.bvh2c.mongodb.net/users?retryWrites=true&w=majority" ; 

const app = express() ; 

mongoose.connect(db,{useNewUrlParser:true ,useCreateIndex:true, useUnifiedTopology:true}) 
.then(()=>console.log("connected")) 
.catch((err)=>console.log(err)) ; 
app.use(express.static('public')) ;  
app.use(cors()) ; 
app.use(express.json());

app.use(express.urlencoded({extended:false})) ; 
app.listen(3400) ;  

app.set('view engine','ejs') ; 

// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});

app.post('/users', (req, res) => {
    // User sign up
    const email = req.body.email ; 
    const password = req.body.password;
    const newUser = new User({email:email,password:password});
console.log(newUser.email); 
console.log(newUser.password) ; 
    newUser.save().then(() => {
        return newUser.createSession();
    }).then((refreshToken) => {
        // Session created successfully - refreshToken returned.
        // now we geneate an access auth token for the user

        return newUser.generateAccessAuthToken().then((accessToken) => {
            // access auth token generated successfully, now we return an object containing the auth tokens
            return { accessToken, refreshToken }
        });
    }).then((authTokens) => {
        // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser);
    }).catch((e) => {
        res.status(400).send(e);
    })
})


/**
 * POST /users/login
 * Purpose: Login
 */
app.post('/on', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            // Session created successfully - refreshToken returned.
            // now we geneate an access auth token for the user

            return user.generateAccessAuthToken().then((accessToken) => {
                // access auth token generated successfully, now we return an object containing the auth tokens
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
                
        })
    }).catch((e) => {
        console.log(e) ;
        //res.status(400).send(e);
    });
})