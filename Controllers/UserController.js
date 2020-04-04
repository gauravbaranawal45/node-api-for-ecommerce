const User = require('../model/User.js')
const UserToken = require('../model/UserToken.js')
const jwt = require('jsonwebtoken');
const SECRET_KEY = "@@gaurav@@";

exports.updateuser = (req, res) => {
    console.log('userdata', req.userData)
    res.send("user update")
}

exports.signup = (req, res) => {
    const user = new User();
    user.name = req.body.name;
    user.email_number = req.body.email_number;
    user.password = req.body.password;
    user.save({}, (err, val) => {
        res.send(val._id)
    })
}

exports.signin = (req, res) => {
    const { loginemail, loginpass } = req.body;
    User.findOne({ email_number: loginemail }, (err, response) => {
        if (loginpass === response.password) {
            let user = { loginemail, uid: response._id }
            jwt.sign(user, SECRET_KEY, (err, token) => {
                if (err) {
                    res.sendStatus(403)
                } else {
                    res.status(200).send({ code: 200, token: token, name: response.name })
                }
            })
        } else {
            res.sendStatus(403)
        }
    })
}