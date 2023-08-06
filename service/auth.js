const jwt = require("jsonwebtoken")
const secret = "12345"

function setUser(user){
    // console.log(user);
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role,
    }

    return jwt.sign(payload, secret);
}

function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}