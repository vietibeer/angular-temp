const User = require('../models/user');
const { handleError } = require('./common');
const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Function user login
 * @param {any} req 
 * @param {any} res 
 */
const auth = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(422).send({ errors: [{ title: 'User Error', detail: "Username or Email don\'t empty" }] });

    User.findOne({ email }, async(err, user) => {
        if (err) return res.status(422).send({ errors: handleError() });

        if (!user) return res.status(422).send({ errors: [{ title: 'User Error', detail: "Email don\'t exist!" }] });

        const isMatch = await user.isSamePassword(password);
        if (isMatch) {
            const userToken = jwt.sign({
                userId: user.id,
                username: user.username
            }, config.SECRET, { expiresIn: '1h' });
            return res.json(userToken);

        } else {
            return res.status(422).send({ errors: [{ title: 'User Error', detail: "Wrong Email or Password !" }] });
        }
    });
}

/**
 * Function user register
 * @param {any} req 
 * @param {any} res 
 */
const register = (req, res) => {
    const { username, email, password, passwordConfirm } = req.body;

    if (!username || !email) return res.status(422).send({ errors: [{ title: 'User Error', detail: "Username or Email don\'t empty" }] });

    if (password !== passwordConfirm) return res.status(422).send({ errors: [{ title: 'User Error', detail: "Password don\'t match" }] });

    User.findOne({ email: email }, (err, existedEmail) => {

        if (err) return res.status(422).send({ errors: handleError(err.errors) });
        if (existedEmail) return res.status(422).send({ errors: [{ title: 'User Error', detail: "Email already existed" }] });

        const user = new User({ email, username, password });
        user.save((err) => {
            if (err) return res.status(422).send({ errors: handleError(err.errors) });
            res.json({ register: "success" });
        })
    })
}

/**
 * Function user auth middleware
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        const user = parseToken(token);

        User.findById(user.userId, (err, user) => {
            if (err) return res.status(422).send({ errors: handleError(err.errors) });

            if (user) {
                res.locals.user = user;
                next();
            } else {
                return res.status(422).send({ errors: [{ title: 'Not Authorization', detail: "You need to login to get access!!!" }] });
            }
        });

    } else {
        return res.status(422).send({ errors: [{ title: 'Not Authorization', detail: "You need to login to get access!" }] });
    }
}

/**
 * Function parse token
 * @param {string} token 
 */
function parseToken(token) {
    return jwt.verify(token.split(' ')[1], config.SECRET);
}

module.exports = {
    auth: auth,
    register: register,
    authMiddleware: authMiddleware
}