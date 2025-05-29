import { motion } from 'framer-motion'
import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getenrolledCourses } from '../../Store/Slices/StudentSlice';

const EnrolledCourse = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { getEnrolledCourses, isloading } = useSelector(state => state.student);
    const { authuser } = useSelector(state => state.auth);


    useEffect(() => {
        if (!authuser) {
            navigate("/")
        }
    }, [authuser])

    useEffect(() => {
        dispatch(getenrolledCourses());

    }, [dispatch]);

    if (isloading) return <div className="p-4">Loading...</div>;

    return (
        <motion.div
            className='w-full h-full'
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}> <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">My Enrolled Courses</h2>
                { getEnrolledCourses?.length===0 ? (
                    <p >No courses enrolled yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {getEnrolledCourses.map((enrollment, index) => (
                            <div key={index}
                                onClick={() => navigate(`/course/${enrollment.courseId._id}`)}
                                className="cursor-pointer border rounded p-4 shadow hover:shadow-lg transition"
                            >
                                <img src={enrollment.courseId?.courseImage} alt={enrollment.courseId?.courseName} className="w-full h-40 object-cover object-right-top rounded mb-2" />
                                <h3 className="text-lg font-semibold">{enrollment.courseId?.courseName}</h3>
                                {/* <p className="text-sm mb-2">{enrollment.courseId.courseDescription}</p> */}
                                <div className="flex justify-between">
                                    <div className="text-blue-600 font-semibold">Progress: {enrollment.progress}%</div>
                                    {enrollment.progress === 100 && <button className='px-5 bg-purple-500 text-white py-1 flex justify-center items-center rounded-2xl outline-none'>Completed</button>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div></motion.div>
    )
}

export default EnrolledCourse
