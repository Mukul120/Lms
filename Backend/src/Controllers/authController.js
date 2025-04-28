const bcrypt = require("bcryptjs");
const Usermodel = require("../Models/Usermodel");
const { generateToken } = require("../config/generateToken");
const EducatorModel = require("../Models/EducatorModel");
const AdminModel = require("../Models/AdminModel")

module.exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        if (!name || !email) {
            return res.status(400).json({ message: "enter every field" })
        }

        if (password.length < 5) {
            return res.status(400).json({ message: "password must be 5 charcter long" })
        }
        const hashedpassword = await bcrypt.hash(password, 10)
        // console.log(hashedpassword);


        if (password === "admin10999" && email === "adminex@gmail.com") {

        }

        if (role === "student") {
            const user = await Usermodel.findOne({ email })
            if (user) return res.status(401).json({ message: "student email already exists" })

            const newUser = await Usermodel.create({
                name,
                email,
                password: hashedpassword,
                role
            })
            if (newUser) {
                generateToken(newUser._id, newUser.role, res);
                // console.log(generateToken);
                await newUser.save();
                res.status(201).json(newUser)
            }
            else {
                res.status(400).json({ message: "invalid user" })

            }
        }
        else if (role === "Educator") {
            const eductor = await EducatorModel.findOne({ email })
            if (eductor) return res.status(401).json({ message: "eductor email Already exists" })
            const neweducator = await EducatorModel.create({
                name,
                email,
                password: hashedpassword,
                role
            })

            if (neweducator) {
                generateToken(neweducator._id, neweducator.role, res);

                await neweducator.save();
                res.status(201).json(neweducator)
            }
            else {
                res.status(400).json({ message: "invalid user" })

            }

        }
        else if (role === "Admin") {
            user = await AdminModel.findOne({ role })
            if (user) return res.status(400).json({ message: "Access Denied " });
            const admin = await AdminModel.create({
                name,
                email,
                password: hashedpassword,
                role
            })

            if (admin) {
                generateToken(admin._id, admin.role, res);

                await admin.save();
                res.status(201).json(admin)
            }
            else {
                res.status(400).json({ message: "Access Denied " })

            }

        }

    } catch (error) {
        console.log("errorn in register route", error);// for dubugging 
        res.status(500).json({ message: "internal server error " })
    }

}



module.exports.login = async (req, res) => {
    const { email, password, role } = req.body;
    try {

        if (!email) {
            return res.status(400).json({ message: "enter every field" })
        }

        if (password.length < 5) {
            return res.status(400).json({ message: "password must be 5 character long" })
        }

        let user;


        if (role === "student") {
            user = await Usermodel.findOne({ email })
            if (!user) return res.status(404).json({ message: "User NOt Found" })
            const correctUser = await bcrypt.compare(password, user.password)

            if (!correctUser) {
                return res.status(403).json({ message: "invalid credentials" })
            }

            generateToken(user._id, user.role, res);
            console.log(generateToken);
            res.status(200).json(user)

        }
        else if (role === "Educator") {
            user = await EducatorModel.findOne({ email })
            if (!user) return res.status(404).json({ message: "user not found" })
            const correctUser = await bcrypt.compare(password, user.password)

            if (!correctUser) {
                return res.status(403).json({ message: "invalid credentials" })
            }
            generateToken(user._id, user.role, res);
            // console.log(generateToken);
            res.status(200).json(user)
        }
        else if (role === "Admin") {
            user = await AdminModel.findOne({ email })
            if (!user) return res.status(404).json({ message: " not found" });
            const correctUser = await bcrypt.compare(password, user.password)

            if (!correctUser) {
                return res.status(403).json({ message: "invalid credentials" })
            }

            generateToken(user._id, user.role, res);
            console.log(generateToken);
            res.status(200).json(user)

        }



    } catch (error) {
        console.log("errorn in login route", error);// for dubugging 
        res.status(500).json({ message: "internal server error " })
    }

}

module.exports.logout = async (req, res) => {
    res.cookie("jwt", "", { maxAge: 0 })
    res.status(200).json({ message: "Logged out successfully" });
}

module.exports.checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user)

    } catch (error) {
        console.log("error in checkauth route: ", error.message);
        res.status(500).json({ message: "internal server error" })
    }
}




