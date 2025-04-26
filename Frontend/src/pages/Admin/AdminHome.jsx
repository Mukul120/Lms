import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TotalStudent from '../../Components/adminComponents/TotalStudent';
import TotalEducator from '../../Components/adminComponents/TotalEducator';
import TotalCourse from '../../Components/adminComponents/Totalcourse';
import { Mail, User } from 'lucide-react';
import { motion } from "framer-motion"

const AdminHome = () => {
    const { authuser } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        // console.log("user:", authuser);
        if (!authuser) {
            navigate('/');
        }
    }, []);

    const [activeTab, setActiveTab] = useState('Total-Student');

    const renderComponent = () => {
        switch (activeTab) {
            case 'Total-Student':
                return <TotalStudent />;
            case 'Total-Educator':
                return <TotalEducator />;
            case 'Total-Course':
                return <TotalCourse />;
            default:
                return <TotalStudent />;
        }
    };


    return (
        <div className='w-full h-full flex '>
            <motion.div className="w-[15vw]  h-full  border-r-2 border-purple-900 rounded-2xl overflow-hidden "
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <div className="w-full h-full flex flex-col gap-2">

                    <div className="bg-purple-200 w-full py-5 px-2 space-y-2">
                        <h1 className='text-lg font-semibold flex items-center gap-1'>
                            <User size={25} />
                            {authuser.name}</h1>
                        <p className='text-sm font-light flex items-center gap-1' >
                            <Mail size={20} />
                            {authuser.email} </p>
                    </div>

                    <div
                        className={`w-full flex  p-3  cursor-pointer ${activeTab === "Total-Student" ? "bg-purple-500 text-white" : "hover:bg-purple-500 hover:text-white"} `}
                        onClick={() => setActiveTab('Total-Student')}
                    >

                        <h2 className="capitalize ">Total Student</h2>
                    </div>
                    <div
                        className={`w-full flex p-3  cursor-pointer ${activeTab === "Total-Educator" ? "bg-purple-500 text-white" : "hover:bg-purple-500 hover:text-white"} `}
                        onClick={() => setActiveTab('Total-Educator')}
                    >

                        <h2 className="capitalize ">Total Educator</h2>
                    </div>
                    <div
                        className={`w-full flex p-3  cursor-pointer ${activeTab === "Total-Course" ? "bg-purple-500 text-white" : "hover:bg-purple-500 hover:text-white"} `}
                        onClick={() => setActiveTab('Total-Course')}
                    >

                        <h2 className="capitalize ">Total Course</h2>
                    </div>
                </div>

            </motion.div>

            <motion.div className="w-[85vw] h-full  "
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                {renderComponent()}
            </motion.div>
        </div>
    )
}

export default AdminHome