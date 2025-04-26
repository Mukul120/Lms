const { addCourse, myCourse, deleteCourse, updateCourse } = require("../Controllers/courseController")
const { protectedRoute, roleMiddleware } = require("../MIddlewares/auth.middleware");
const express = require("express");
const upload = require("../MIddlewares/upload");

const router = express.Router();


router.post("/add-course", protectedRoute, roleMiddleware(["Educator"]), upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'pdf', maxCount: 1 },
    { name: 'video', maxCount: 1 },
]), addCourse)

router.get("/my-course", protectedRoute, roleMiddleware(["Educator"]), myCourse)

router.delete("/delete-course/:id", protectedRoute, roleMiddleware(["Educator"]), deleteCourse)

// router.put("/update-course/:id", protectedRoute, roleMiddleware(["Educator"]), upload.fields([
//     { name: 'image', maxCount: 1 },
//     { name: 'pdf', maxCount: 1 },
//     { name: 'video', maxCount: 1 }
// ]), updateCourse);



module.exports = router;