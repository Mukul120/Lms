import React, { useState } from 'react';

import { Eye, EyeOff } from "lucide-react"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Store/Slices/AuthSlice';



const LoginPage = () => {

    const dispatch = useDispatch()
    const { isloading } = useSelector(state => state.auth)

    const [formData, setFormData] = useState({

        email: '',
        password: '',
        role: 'student'
    });

    // const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData));

        setFormData({

            email: '',
            password: '',
            role: 'student'
        })


    };

    return (
        <div className="bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4 overflow-y-hidden bg-amber-600 h-screen">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md transform transition-all duration-300 hover:scale-105">
                <div className="bg-purple-500 py-6">
                    <h2 className="text-center text-3xl font-bold text-white">Learning Management System</h2>
                </div>

                <form onSubmit={handleSubmit} className="p-8">


                    <div className="mb-6 opacity-0 animate-fade-in" style={{ animation: 'fadeIn 0.6s 0.1s forwards' }}>
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            className="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            required
                        />
                    </div>

                    <div className="relative mb-6 opacity-0 animate-fade-in" style={{ animation: 'fadeIn 0.6s 0.2s forwards' }}>
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className=" appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                            id="password"
                            type={showPass ? "text" : "password"}
                            name="password"
                            minLength={5}
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required


                        />
                        <span className='absolute top-10 right-3 text-black'
                            onClick={() => setShowPass(!showPass)}
                        > {showPass ? <EyeOff /> : <Eye />}</span>
                    </div>

                    <div className="mb-8 opacity-0 animate-fade-in text-black" style={{ animation: 'fadeIn 0.6s 0.3s forwards' }}>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Role
                        </label>
                        <div className="flex gap-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={formData.role === 'student'}
                                    onChange={handleChange}
                                    className="form-radio text-purple-600"
                                />
                                <span className="ml-2">Student</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="Educator"
                                    checked={formData.role === 'Educator'}
                                    onChange={handleChange}
                                    className="form-radio text-purple-600"
                                />
                                <span className="ml-2">Educator</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="Admin"
                                    checked={formData.role === 'Admin'}
                                    onChange={handleChange}
                                    className="form-radio text-purple-600"
                                />
                                <span className="ml-2">Admin</span>
                            </label>
                        </div>
                    </div>

                    <div className="opacity-0 animate-fade-in" style={{ animation: 'fadeIn 0.6s 0.4s forwards' }}>
                        <button
                            className="w-full bg-purple-500 hover:bg-purple-500 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
                            type="submit"
                            disabled={isloading}
                        >
                            {isloading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : "Login"}
                        </button>
                    </div>

                    <div className="text-center mt-6 text-sm opacity-0 animate-fade-in" style={{ animation: 'fadeIn 0.6s 0.5s forwards' }}>
                        <Link to={"signup"} className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
                            Don't Have An Account? Sign Up
                        </Link>
                    </div>
                </form>
            </div>

            <style >{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};

export default LoginPage; 