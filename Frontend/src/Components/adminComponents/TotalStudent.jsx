import { Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { deleteusers, getStudent } from "../../Store/Slices/AdminSlice";
import { useSelector, useDispatch } from "react-redux";

const TotalStudent = () => {
    const dispatch = useDispatch();
    const { Students, isloading } = useSelector(state => state.admin);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        dispatch(getStudent());
    }, [dispatch]);

    // Filtered students based on search
    const filteredStudents = Students?.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id, role) => {
        dispatch(deleteusers({ id, role }))
            .then(() => dispatch(getStudent()));
    };

    return (
        <div className='w-full h-full p-5 space-y-7'>
            <h1 className='text-xl font-semibold text-purple-500'>Total Students</h1>

            <input
                type="text"
                placeholder="Search Student..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border-2 border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="w-full h-[70vh] border-2 p-2 flex flex-col gap-3 overflow-y-auto">
                {isloading ? (
                    <p className="text-center text-purple-700 mt-10">Loading students...</p>
                ) : filteredStudents.length > 0 ? (
                    filteredStudents.map((student, index) => (
                        <div key={index} className="w-full h-auto bg-purple-500 flex justify-between p-3 items-center text-white rounded-md">
                            <div>
                                <h1 className="font-medium">{student.name}</h1>
                                <p className="text-sm text-gray-200">{student.email}</p>
                            </div>
                            <button
                                className="p-2 rounded-full hover:bg-purple-700"
                                onClick={() => handleDelete(student._id, student.role)}
                            >
                                <Trash2 />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-purple-700 mt-10">No students found.</p>
                )}
            </div>
        </div>
    );
};

export default TotalStudent;
