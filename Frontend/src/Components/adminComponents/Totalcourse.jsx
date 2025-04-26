import { Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletedCourse, getCourse } from '../../Store/Slices/AdminSlice';

const TotalCourse = () => {


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCourse());
    }, [dispatch]);


    const { Course, isloading } = useSelector(state => state.admin);

    const [searchTerm, setSearchTerm] = useState('');

    // Filter courses based on name
    const filteredCourses = Course.filter(course =>
        course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleDelete = (id) => {
        dispatch(deletedCourse(id))
            .then(() => dispatch(getCourse()));

    };

    return (
        <div className='w-full h-full p-5 space-y-7'>
            <h1 className='text-xl font-semibold text-purple-500'>Total Courses</h1>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search Course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border-2 border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {/* Course List */}
            <div className="w-full h-[70vh] border-2 p-2 flex flex-col gap-3 overflow-y-auto">
                {filteredCourses.length > 0 ? (
                    filteredCourses.map((course, index) => (
                        <div key={index} className="w-full bg-purple-500 flex justify-between items-center p-3 text-white rounded-md">
                            <div className="flex items-center gap-4">
                                <img
                                    src={course.courseImage}
                                    alt={course.courseName}
                                    className="w-[60px] h-[60px] rounded-md object-cover border-2 border-white"
                                />
                                <h1 className="text-lg font-medium">{course.courseName}</h1>
                            </div>
                            <button className="p-2 rounded-full hover:bg-purple-700"
                                onClick={() => handleDelete(course._id)}
                            >
                                <Trash2 />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-purple-700 mt-10">No courses found.</p>
                )}
            </div>
        </div>
    );
};

export default TotalCourse;
