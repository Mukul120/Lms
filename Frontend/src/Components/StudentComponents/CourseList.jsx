
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses, enrolledCourses } from '../../Store/Slices/StudentSlice';
import { X } from 'lucide-react';
import { motion } from "framer-motion"

const CourseList = () => {
    const dispatch = useDispatch();
    const { courses, isloading } = useSelector(state => state.student);
    const { authuser } = useSelector(state => state.auth);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [filteredCourses, setFilteredCourses] = useState([]);

    useEffect(() => {
        dispatch(getCourses());
    }, [dispatch]);

    useEffect(() => {
        setFilteredCourses(courses);
    }, [courses]);

    const handleSearch = () => {
        const filtered = courses.filter(course =>
            course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCourses(filtered);
    };
    if (isloading) <div>loading....</div>

    return (
        <motion.div
            className='w-full h-full'
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className='h-full w-full bg-purple-100 overflow-y-auto '>
                {/* Search Bar */}
                <div className="flex justify-center items-center gap-2 p-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleSearch();
                            }
                        }}
                        placeholder="Search course..."
                        className="px-4 py-2 w-[40%] rounded-lg border border-purple-400 outline-none"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
                    >
                        Search
                    </button>
                </div>

                {/* Course Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-10 w-full text-white  ">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((elm) => (
                            <div
                                onClick={() => setSelectedCourse(elm)}
                                key={elm._id}
                                className=" bg-purple-600 h-[70%] rounded-xl flex flex-col gap-3 overflow-hidden p-2 hover:scale-110 transition-transform duration-300 cursor-pointer "
                            >
                                <div className="h-2/3  rounded-2xl overflow-hidden">
                                    <img src={elm.courseImage} alt="" className="object-cover object-top w-full h-full" />
                                </div>

                                <div className="h-1/3 p-1 flex flex-col bg-green-0 relative py-2">
                                    <h1 className="font-semibold text-xl ">{elm?.courseName}</h1>
                                    <h2 className="font-light text-sm">Creator: {elm.createdBy?.name}</h2>


                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center col-span-full text-purple-700 text-lg font-semibold">
                            No courses found.
                        </div>
                    )}
                </div>

                {selectedCourse && (
                    <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-purple-500 p-6 rounded-xl w-[80%] flex gap-5 h-[60%] ">
                            <img src={selectedCourse.courseImage} className="w-1/2 h-full object-cover object-top mt-2 rounded" />
                            <div className=" p-3">
                                <h1 className="text-3xl font-bold">{selectedCourse.courseName}</h1>
                                <p className=" mt-2 font-semibold text-lg text-white">Creator: {selectedCourse.createdBy?.name}</p>
                                <div className="h-60 overflow-auto">
                                    <p className="mt-3 text-xl">{selectedCourse.courseDescription}</p>
                                </div>
                                {authuser.role === "student" && <button className=' px-5 bg-white text-purple-700  py-2 rounded-2xl '
                                    onClick={() => dispatch(enrolledCourses({ courseId: selectedCourse._id }))}

                                >Enroll Now</button>}
                            </div>
                            <button className="absolute top-4 right-4 text-purple  hover:text-white hover:bg-purple-600 p-2 rounded-full" onClick={() => setSelectedCourse(null)}><X /></button>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default CourseList;
