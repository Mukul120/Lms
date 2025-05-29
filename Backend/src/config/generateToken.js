const jwt = require("jsonwebtoken");


module.exports.generateToken = (userId, role, res) => {
    const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        httpOnly: true, // Prevents access from client-side JavaScript
        secure: true, // Use secure cookies in production
        sameSite: "None", // Prevents CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });
};
