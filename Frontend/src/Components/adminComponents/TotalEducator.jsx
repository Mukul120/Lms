import { Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { deleteusers, getEducator } from '../../Store/Slices/AdminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';


const TotalEducator = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEducator());
    }, [dispatch]);

    const { Educator, isloading } = useSelector(state => state.admin);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter educators based on search
    const filteredEducators = Educator.filter(educator =>
        educator.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleDelete = (id, role) => {
        dispatch(deleteusers({ id, role }))
            .then(() => dispatch(getStudent()));
    };

    return (
        <motion.div className='w-full h-full p-5 space-y-7'
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <h1 className='text-xl font-semibold text-purple-500'>Total Educators</h1>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search Educator..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border-2 border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {/* Educator List */}
            <div className="w-full h-[70vh] border-2 p-2 flex flex-col gap-3 overflow-y-auto">
                {filteredEducators.length > 0 ? (
                    filteredEducators.map((educator, index) => (
                        <div key={index} className="w-full h-auto bg-purple-500 flex justify-between p-3 items-center text-white rounded-md">
                            <div>
                                <h1 className="font-medium">{educator.name}</h1>
                                <p className="text-sm text-gray-200">{educator.email}</p>
                            </div>
                            <button className="p-2 rounded-full hover:bg-purple-700"
                                onClick={() => handleDelete(educator._id, educator.role)}
                            >
                                <Trash2 />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-purple-700 mt-10">No educators found.</p>
                )}
            </div>
        </motion.div>
    );
};

export default TotalEducator;
