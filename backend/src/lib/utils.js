import jwt from 'jsonwebtoken';
export const generateToken = (userId, res) => {

    // yaha token generate kr rhe hai

    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })

    res.cookie("jwt", token, {
        maxage: 30 * 24 * 60 * 60 * 1000, // ms
        httpOnly: true,  // prevent cookie from being accessed by client side js
        sameSite: "strict",// cookie will only be sent in a first-party context
        secure: process.env.NODE_ENV !== "development"
    })
    return token;
}