const CourseModel = require("../Models/CourseModel");
const EducatorModel = require("../Models/EducatorModel");
const Usermodel = require("../Models/Usermodel")


module.exports.totalStudent = async (req, res) => {
    try {
        // Assuming role is stored as 'student' in the DB
        const totalStudent = await Usermodel.find({ role: "student" });

        if (!totalStudent) {
            return res.status(404).json({ message: "Students Not Found" });
        }

        res.status(200).json(totalStudent);
    } catch (error) {
        console.log("Error in TotalStudent Route:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports.totalEducator = async (req, res) => {
    try {
        const totalEducator = await EducatorModel.find();
        if (!totalEducator) return res.status(404).json({ message: "Educator Not Found" });

        res.status(200).json(totalEducator)

    } catch (error) {
        console.log("error in TotalEducator Route,", error);
        res.status(500).json({ message: "internal Server Error" })

    }

}
module.exports.totalCourse = async (req, res) => {
    try {
        const totalCourse = await CourseModel.find();
        if (!totalCourse) return res.status(404).json({ message: "Course Not Found" });

        res.status(200).json(totalCourse)

    } catch (error) {
        console.log("error in TotalCourse Route,", error);
        res.status(500).json({ message: "internal Server Error" })

    }

}

module.exports.deleteUsers = async (req, res) => {
    const { role, id } = req.params;

    try {
        let deleteUser;

        if (role === "student") {

            deleteUser = await Usermodel.findOneAndDelete({ _id: id, role });

            if (!deleteUser) {
                return res.status(404).json({ message: `${role} not found` });
            }

            res.status(200).json({ message: `${role} deleted successfully`, deleteUser });
        }
        else if (role === "Educator") {

            deleteUser = await EducatorModel.findOneAndDelete({ _id: id, role });

            if (!deleteUser) {
                return res.status(404).json({ message: `${role} not found` });
            }

            res.status(200).json({ message: `${role} deleted successfully`, deleteUser });
        }

    } catch (error) {
        console.error("Error in deleteUserByRole:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports.deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCourse = await CourseModel.findOneAndDelete({ _id: id })
        if (!deletedCourse) return res.status(400).json({ message: "course not found" });

        res.status(201).json(deletedCourse)
    } catch (error) {
        console.log("error in delete coursr route,", error);
        res.status(500).json({ message: "internal server error" })
    }

}