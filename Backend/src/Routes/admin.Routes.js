const express = require("express")
const router = express.Router();
const { protectedRoute, roleMiddleware } = require("../MIddlewares/auth.middleware");
const { totalCourse, totalEducator, totalStudent, deleteUsers, deleteCourse } = require("../Controllers/adminController");



router.get("/total-course", protectedRoute, roleMiddleware(["Admin"]), totalCourse);
router.get("/total-educator", protectedRoute, roleMiddleware(["Admin"]), totalEducator);
router.get("/total-student", protectedRoute, roleMiddleware(["Admin"]), totalStudent);
router.delete("/deleteusers/:role/:id", protectedRoute, roleMiddleware(["Admin"]), deleteUsers);
router.delete("/delete/:id", protectedRoute, roleMiddleware(["Admin"]), deleteCourse);


module.exports = router;