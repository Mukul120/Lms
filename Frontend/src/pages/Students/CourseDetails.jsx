import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { updateCourseProgress } from '../../Store/Slices/StudentSlice';

const CourseDetails = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const { getEnrolledCourses } = useSelector(state => state.student);
    const [enrolledCourse, setEnrolledCourse] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const videoRef = useRef(null);
    const lastProgressRef = useRef(0);

    const dispatch = useDispatch();

    useEffect(() => {
        const enrolled = getEnrolledCourses.find(e => e.courseId._id === id);
        if (enrolled) {
            setEnrolledCourse(enrolled); // store full enrolled object
        }
    }, [id, getEnrolledCourses]);

    const handleVideoProgress = () => {
        const video = videoRef.current;
        if (!video || !enrolledCourse) return;

        const progressPercent = Math.floor((video.currentTime / video.duration) * 100);

        // Avoid sending duplicate progress
        if (progressPercent >= lastProgressRef.current + 5) {
            lastProgressRef.current = progressPercent;
            dispatch(updateCourseProgress({
                courseId: enrolledCourse.courseId._id,
                progress: progressPercent
            }));
            // Update local state
            setEnrolledCourse(prev => ({
                ...prev,
                progress: progressPercent
            }));
        }
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleVideoEnded = () => {
            if (enrolledCourse) {
                dispatch(updateCourseProgress({
                    courseId: enrolledCourse.courseId._id,
                    progress: 100
                }));
                // Update local state
                setEnrolledCourse(prev => ({
                    ...prev,
                    progress: 100
                }));
            }
        };

        video.addEventListener('ended', handleVideoEnded);

        return () => {
            video.removeEventListener('ended', handleVideoEnded);
        };
    }, [enrolledCourse]);


    const handlePDFDownload = () => {
        if (enrolledCourse?.courseId?.coursePdf) {
            const link = document.createElement("a");
            link.href = enrolledCourse.courseId.coursePdf;
            link.download = "course.pdf"; // You can dynamically set the name too
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };


    if (!enrolledCourse) return <div>Loading course...</div>;

    const course = enrolledCourse.courseId;

    return (
        <div className="p-6 h-full w-full flex gap-6">
            {/* Left Side: Course Info */}
            <div className="w-1/2 rounded-2xl overflow-hidden space-y-2 bg-purple-100 p-3">
                <img
                    src={course.courseImage}
                    alt="Course"
                    className="w-full h-64 object-cover object-top rounded-xl"
                />
                <h1 className="text-3xl font-bold">{course.courseName}</h1>
                {/* <h2 className="text-2xl font-semibold text-gray-800">₹{course.createdBy}</h2> */}
                <div className="h-[15%] overflow-y-auto">
                    <p className="mt-2 text-gray-700">{course.courseDescription}</p>
                </div>

                <div className={`flex ${course.coursePdf ? "justify-between" : "justify-center"} px-10`}>
                    {course.courseVideo && (
                        <button
                            onClick={() => setIsEnrolled(true)}
                            className="px-5 py-2 bg-purple-600 text-white rounded-xl"
                        >
                            Play Video
                        </button>
                    )}
                    {course.coursePdf && (
                        <button
                            onClick={handlePDFDownload}
                            className="px-5 py-2 bg-purple-600 text-white rounded-xl"
                        >
                            Download PDF
                        </button>
                    )}
                </div>

                <button
                    onClick={() => nav("/getEnrolled")}
                    className="text-purple-700 mt-10 hover:underline"
                >
                    Go to My Enrollments
                </button>
                {/* Progress Bar */}
                {enrolledCourse?.progress !== undefined && (<>
                    <div className="w-full bg-gray-300 rounded-full h-4">
                        <div
                            className="bg-green-500 h-4 rounded-full transition-all duration-300"
                            style={{ width: `${enrolledCourse.progress}%` }}
                        />
                    </div>
                    <p className="text-sm text-center text-gray-700 mt-1">
                        {enrolledCourse.progress}% completed
                    </p></>
                )}
            </div>

            {/* Right Side: Video Section */}
            <div className="w-1/2 h-full">
                {isEnrolled ? (
                    <div className="relative h-full">
                        <button
                            className="absolute top-2 right-2 text-purple-600 bg-white shadow p-1 rounded-full z-10"
                            onClick={() => setIsEnrolled(false)}
                        >
                            <X />
                        </button>
                        <div className="w-full h-[80%]">
                            <video
                                ref={videoRef}
                                controls
                                className="w-full h-full object-cover rounded-xl"
                                onTimeUpdate={handleVideoProgress}
                            >
                                <source src={course.courseVideo} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                        </div>
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center  text-center">
                        <p className="text-purple-500 font-semibold text-xl">
                            Tap "Play Video" to watch the course video.
                        </p>
                    </div>
                )}
            </div>




        </div>
    );
};

export default CourseDetails;
