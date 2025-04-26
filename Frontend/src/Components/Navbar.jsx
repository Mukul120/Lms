import { Home, LogOut, Mail, User, User2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../Store/Slices/AuthSlice';

const Navbar = () => {
    const { authuser } = useSelector(state => state.auth);
    const [showAccount, setShowAccount] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!authuser) {
            navigate("/")
        }
    }, [authuser, navigate])

    const handleLogout = () => {
        dispatch(logout())
        console.log("clicked");
    }

    const handleAccountClick = () => {
        setShowAccount(prev => !prev)
    }

    const closeSidebar = () => setShowAccount(false)

    return (
        <>
            <nav className='bg-purple-200 flex items-center justify-between px-2 md:px-10 lg:px-12 text-purple-900 py-2 md:py-4 w-full h-[8vh] shadow-xl relative'>
                <h1 className='font-bungee text-2xl text-shadow-lg text-shadow-purple-300'>Coursly</h1>
                <div className="flex gap-2 text-md md:text-lg">
                    <Link to={"/studenHome"}>  <ul className='hover:bg-purple-500 hover:text-white px-2 md:px-4 rounded-full py-1'><Home /></ul></Link>

                    {authuser?.role === "student" && (
                        <ul
                            className='hover:bg-purple-500 hover:text-white px-2 md:px-4 rounded-full py-1 cursor-pointer'
                            onClick={handleAccountClick}
                        >
                            <User />
                        </ul>
                    )}

                    {authuser?.role === "Educator" && (
                        <Link to={"/educatorHome"}> <ul
                            className='hover:bg-purple-500 hover:text-white px-2 md:px-4 rounded-full py-1 cursor-pointer'

                        >
                            <User />
                        </ul></Link>
                    )}
                    {authuser?.role === "Admin" && (
                        <Link to={"/admin"}> <ul
                            className='hover:bg-purple-500 hover:text-white px-2 md:px-4 rounded-full py-1 cursor-pointer'

                        >
                            <User />
                        </ul></Link>
                    )}
                    <ul
                        className='hover:bg-purple-500 hover:text-white px-2 md:px-4 rounded-full py-1 cursor-pointer'
                        onClick={handleLogout}
                    >
                        <LogOut />
                    </ul>
                </div>
            </nav>

            {/* Overlay */}
            {showAccount && (
                <div
                    className="fixed  bg-opacity-50 z-40"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-[250px] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${showAccount ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="p-5 flex flex-col gap-4 text-purple-700 font-semibold text-lg ">
                    <div className="flex flex-col bg-purple-200 px-2 py-3 rounded-2xl">
                        <h1 className=" flex gap-1"
                        >
                            <User2 />  {authuser.name}
                        </h1>
                        <h2 className='text-sm flex gap-1'> <Mail size={20}/> {authuser.email}</h2>
                    </div>
                    <Link to={"/getEnrolled"}
                        onClick={() => {
                            // handle my enrollments
                            // console.log("My Enrollments clicked");
                            closeSidebar();
                        }}
                        className="hover:text-purple-900 transition flex justify-center items-center"
                    >
                        My Enrollments
                    </Link>
                    <button
                        onClick={closeSidebar}
                        className="text-sm text-gray-500 hover:text-purple-500 mt-10"
                    >
                        Close
                    </button>
                </div>
            </div>
        </>
    )
}

export default Navbar
