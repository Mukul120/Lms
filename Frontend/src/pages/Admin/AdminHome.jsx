import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TotalStudent from '../../Components/adminComponents/TotalStudent';
import TotalEducator from '../../Components/adminComponents/TotalEducator';
import TotalCourse from '../../Components/adminComponents/Totalcourse';

const AdminHome = () => {
    const { authuser } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("user:", authuser);
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
        <div className='w-full h-full flex'>
            <div className="w-[15vw]  h-full  border-r-2 border-purple-900 rounded-2xl overflow-hidden  ">
                <div className="w-full h-full flex flex-col space-y-3">
                    <div
                        className={`w-full flex  p-3  cursor-pointer ${activeTab === "Total-Student" ? "bg-purple-500 text-white" : "hover:bg-purple-500 hover:text-white"} mt-10`}
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
            </div>

            <div className="w-[85vw] h-full  ">
                {renderComponent()}
            </div>
        </div>
    )
}

export default AdminHome