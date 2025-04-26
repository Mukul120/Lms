import { Book, Mail, Plus, Settings, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // <-- Import motion
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MyCourse from '../../Components/EducatorComponents/MyCourse';
import AddCourse from '../../Components/EducatorComponents/AddCourse';


const EducatorHome = () => {
  const { authuser } = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authuser) {
      navigate('/');
    }
  }, [authuser]);

  const [activeTab, setActiveTab] = useState('course');

  const renderComponent = () => {
    switch (activeTab) {
      case 'my-course':
        return <MyCourse />;
      case 'add-course':
        return <AddCourse />;
      // case 'setting':
      //   navigate('/setting');
      //   return null;
      default:
        return <MyCourse />;
    }
  };

  return (

    <div className="w-full h-full flex   ">
      {/* Sidebar */}
      <motion.div
        className="h-full flex"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="w-[15vw]   h-full flex flex-col border-r-2 border-r-purple-800   rounded-2xl   overflow-hidden">
          {/* <div className="w-full   gap-2 p-3"> */}
            <div className="w-full flex flex-col gap-1 bg-purple-100 p-5  border-b border-b-purple-600">
              <h1 className="capitalize flex gap-1 text-purple-600 text-lg items-center"><User size={20}  />{authuser?.name}</h1>
              <p className=" text-xs flex gap-1 text-purple-600 items-center"> <Mail size={20} /> {authuser?.email}</p>
            </div>
          {/* </div> */}

          <div className="mt-5 flex flex-col gap-2 text-purple-900">
            <div
              className={`w-full flex gap-3 p-3  cursor-pointer ${activeTab === "my-course" ? "bg-purple-500 text-white" : "hover:bg-purple-500 hover:text-white"}`}
              onClick={() => setActiveTab('my-course')}
            >
              <Book />
              <h2 className="capitalize">My courses</h2>
            </div>

            <div
              className={`w-full flex gap-3 p-3  cursor-pointer ${activeTab === "add-course" ? "bg-purple-500 text-white" : "hover:bg-purple-500 hover:text-white"}`}
              onClick={() => setActiveTab('add-course')}
            >
              <Plus />
              <h2>Add courses</h2>
            </div>

            {/* <div
              className="w-full flex gap-3 p-3 hover:bg-purple-500 hover:text-white cursor-pointer"
              onClick={() => setActiveTab('setting')}
            >
              <Settings />
              <h2>Settings</h2>
            </div> */}

          </div>
        </div>
      </motion.div>


      {/* Main Content */}
      <motion.div
        className="h-full flex"
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >

        <div className="w-[85vw]  h-full bg-purple-100 rounded-2xl flex justify-center items-center">{renderComponent()}</div>
      </motion.div>

    </div>
  );
};

export default EducatorHome;
