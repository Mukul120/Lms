const express = require("express")
const router = express.Router();
const { protectedRoute, roleMiddleware } = require("../MIddlewares/auth.middleware");
const { getCourses, enrollCourse, getEnrolledCourse, progress } = require("../Controllers/userController")

router.get("/course", protectedRoute, roleMiddleware(["student", "Educator","Admin"]), getCourses);
router.post('/enroll', protectedRoute, roleMiddleware(["student", "Educator", "Admin"]), enrollCourse);
router.get('/getenrollcourse', protectedRoute, roleMiddleware(["student", "Educator", "Admin"]), getEnrolledCourse);
router.put('/progress', protectedRoute, roleMiddleware(["student", "Educator", "Admin"]), progress);
// router.get('/searchCourse', protectedRoute, roleMiddleware(["student", "Educator", "admin"]), searchCourse);




module.exports = router;