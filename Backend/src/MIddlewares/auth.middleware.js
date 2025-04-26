const AdminModel = require("../Models/AdminModel");
const EducatorModel = require("../Models/EducatorModel");
const Usermodel = require("../Models/Usermodel");
const jwt = require("jsonwebtoken");

module.exports.protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.status(404).json({ message: "Unauthorized - token not found" })
        }

        const VerifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!VerifiedToken) {
            return res.status(400).json({ message: "Unauthorized - invalid token" })
        }
        let user;
        if (VerifiedToken.role === "student") {
            user = await Usermodel.findById(VerifiedToken.userId).select("-password")
        }
        else if (VerifiedToken.role === "Educator") {
            user = await EducatorModel.findById(VerifiedToken.userId).select("-password")
        }
        else if (VerifiedToken.role === "Admin") {
            user = await AdminModel.findById(VerifiedToken.userId).select("-password")
        }
        if (!user) {
            return res.status(400).json({ message: "Unauthorized - user not found" })
        }

        req.user = user
        req.role = VerifiedToken.role
        next();

    } catch (error) {
        console.log("error in protect route in middlwware", error);
        res.status(500).json({ message: "internal server error" })

    }
}

module.exports.roleMiddleware = (roles) => (req, res, next) => {
    try {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden: Access Denied" });
        }
        next();

    } catch (error) {
        console.log('error in roleMiddleware', error);
        res.status(500).json({ message: "internal server error" })

    }

}