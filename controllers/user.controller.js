const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const check = require('../lib/checkLib');
const response = require('./../lib/responseLib');
const passwordLib = require('./../lib/generatePassword');
const logger = require('./../lib/loggerLib');
const token = require('../lib/tokenLib');
const AuthModel = mongoose.model('Auth');
const time = require('./../lib/timeLib');



/* Models */
const UserModel = mongoose.model('User');

let helloWorldFunc = (req, res) => res.send('Hello World');




let signUpFunction = (req, res) => {

    let validateUserInput = () => {
        return new Promise ((resolve, reject) => {
            if (req.body.username) {
                if(check.isEmpty(req.body.password)) {
                    let apiResponse = response.generate(true, '"password" parameter is missing"', 400, null);
                    reject(apiResponse);
                } else {
                    resolve(req);
                }
            } else {
                logger.error('Field Missing During User Creation', 'userController: createUser()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    } // end validate user input

    let createUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ username: req.body.username })
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        logger.error(err.message, 'userController: createUser', 10);
                        let apiResponse = response.generate(true, 'Failed To Create User', 500, null);
                        reject(apiResponse);
                    } else if (check.isEmpty(retrievedUserDetails)) {
                        console.log(req.body);
                        let newUser = new UserModel({
                            user_id: shortid.generate(),
                            first_name: req.body.first_name,
                            last_name: req.body.last_name || '',
                            username: req.body.username,
                            password: passwordLib.hashpassword(req.body.password),
                            created_on: time.now()
                        })
                        newUser.save((err, newUser) => {
                            if (err) {
                                console.log(err);
                                logger.error(err.message, 'userController: createUser', 10);
                                let apiResponse = response.generate(true, 'Failed to create new User', 500, null);
                                reject(apiResponse);
                            } else {
                                let newUserObj = newUser.toObject();
                                res.status(201).send(newUserObj);
                            }
                        })
                    } else {
                        logger.error('User Cannot Be Created.User Already Present', 'userController: createUser', 4);
                        let apiResponse = response.generate(true, 'User Already Present With this username', 403, null);
                        reject(apiResponse);
                    }
                })
        })
    }  // end of create user function

    validateUserInput(req, res)
        .then(createUser)
        .then((resolve) => {
            delete resolve.password;
            let apiResponse = response.generate(false, 'User created', 200, resolve);
            res.send(apiResponse);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
}  // end user signup function 





// start of login function 
let loginFunction = (req, res) => {
    let findUser = () => {
        console.log("findUser");
        return new Promise((resolve, reject) => {
            if (req.body.username) {
                console.log("req body username is there");
                console.log(req.body);
                UserModel.findOne({ username: req.body.username}, (err, userDetails) => {
                    /* handle the error here if the User is not found */
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        /* generate the error message and the api response message here */
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                        /* if User Details is not found */
                    } else if (check.isEmpty(userDetails)) {
                        /* generate the response and the console error message here */
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                        reject(apiResponse)
                    } else {
                        /* prepare the message and the api response here */
                        logger.info('User Found', 'userController: findUser()', 10);
                        resolve(userDetails);
                    }
                });
               
            } else {
                let apiResponse = response.generate(true, '"username" parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    }
    let validatePassword = (retrievedUserDetails) => {
        console.log("validatePassword");
        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.password, retrievedUserDetails.password, (err, isMatch) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Login Failed', 500, null)
                    reject(apiResponse)
                } else if (isMatch) {
                    let retrievedUserDetailsObj = retrievedUserDetails.toObject()
                    delete retrievedUserDetailsObj.password
                    delete retrievedUserDetailsObj._id
                    delete retrievedUserDetailsObj.__v
                    delete retrievedUserDetailsObj.createdOn
                    delete retrievedUserDetailsObj.modifiedOn
                    resolve(retrievedUserDetailsObj)
                } else {
                    logger.info('Login Failed Due To Invalid Password', 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Wrong Password.Login Failed', 400, null)
                    reject(apiResponse)
                }
            })
        })
    }

    let generateToken = (userDetails) => {
        console.log("generate token");
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    }
    let saveToken = (tokenDetails) => {
        console.log("save token");
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    console.log(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new AuthModel({
                        user_id: tokenDetails.user_id,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = time.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                            res.send(responseBody);
                        }
                    })
                }
            })
        })
    }

    findUser(req,res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Login Successful', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })
}



// end of the login function 









let logoutFunction = (req, res) => {

}


module.exports = {
    helloWorldFunc,
    signUpFunction,
    loginFunction,
    logoutFunction
}