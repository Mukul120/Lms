const CourseModel = require("../Models/CourseModel");
const Usermodel = require("../Models/Usermodel");

module.exports.getCourses = async (req, res) => {
    try {
        const courses = await CourseModel.find().populate("createdBy", "name");
        if (!courses) return res.status(404).json({ message: "Courses Not Found" });
        res.status(200).json(courses)

    } catch (error) {
        console.log("Error in getCourse Route:", error);
        res.status(500).json({ message: "internal servet error" })
    }
}

module.exports.enrollCourse = async (req, res) => {
    try {
        const studentId = req.user._id;
        const { courseId } = req.body;

        const student = await Usermodel.findById(studentId);
        const alreadyEnrolled = student.enrolledCourses.find(c => c.courseId == courseId);

        if (!alreadyEnrolled) {
            student.enrolledCourses.push({ courseId, progress: 0 });
            await student.save();
            console.log("Updated enrolledCourses:", student.enrolledCourses);

            res.json({ success: true });
        } else {
            res.status(400).json({ message: 'Already enrolled' });
        }

    } catch (error) {
        console.log("Error in enrolled Route:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.getEnrolledCourse = async (req, res) => {
    try {
        const userId = req.user._id;
        const student = await Usermodel.findById(userId).populate("enrolledCourses.courseId")
        if (!student) res.status(404).json({ message: "not found" });

        res.status(200).json(student.enrolledCourses)

    } catch (error) {
        console.error("Error fetching enrollments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.progress = async (req, res) => {
    try {
        const { courseId, progress } = req.body;
        const userId = req.user._id;

        const updated = await Usermodel.findOneAndUpdate(
            {
                _id: userId,
                "enrolledCourses.courseId": courseId
            },
            {
                $set: {
                    "enrolledCourses.$.progress": progress
                }
            },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Enrollment not found" });
        }

        res.status(200).json({ courseId, progress });
    } catch (err) {
        console.error("Progress Update Error", err);
        res.status(500).json({ message: "Internal server error" });
    }
};



// module.exports.searchCourse = async (req, res) => {
//     try {
//         const search = req.query.search || '';
//         const courses = await CourseModel.find({
//             title: { $regex: search, $options: 'i' }
//         });
//         res.json(courses);

//     } catch (error) {
//         console.log("error in search course route:", error);
//         res.status(500).json({ message: "internal serer error" })
//     }
// }