import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import SignUpPage from './pages/SignUp'
import "./App.css"
import LoginPage from './pages/LoginPage'
import UserHome from './pages/Students/UserHome'
import { useDispatch, useSelector } from "react-redux"
import { getAuthUser } from "./Store/Slices/AuthSlice"
import ProtectedRoute from './pages/Protected'
import Navbar from './Components/Navbar'
import { Toaster } from "react-hot-toast"
import EducatorHome from './pages/Educator/Educator'
import AdminHome from './pages/Admin/AdminHome'
import { motion } from "framer-motion";
import { Loader } from 'lucide-react'
import EnrolledCourse from './pages/Students/EnrolledCourse'
import CourseDetails from './pages/Students/CourseDetails'


const App = () => {
  const dispatch = useDispatch();
  const { authuser, isLoading } = useSelector(state => state.auth);
  const nav = useNavigate()

  useEffect(() => {
    dispatch(getAuthUser())
  }, [])

  useEffect(() => {
    if (authuser) {
      if (authuser.role === "student") {
        nav("/studenHome")
      }
      else if (authuser.role === "Admin") {
        nav("/admin")
      }
      else {
        nav("/educatorHome")
      }
    }
  }, [authuser])

  if (isLoading && !authuser) {
    <div className="">
      <Loader className='size-30' />
    </div>
  }




  return (
    <>
      <div><Toaster /></div>

      <div className="h-[92vh] w-screen">
        {/* <Navbar />  */}
        {authuser && (
          <motion.div
            className=" flex"
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >

            <Navbar />
          </motion.div>
        )}

        <Routes>
          <Route path='/' element={!authuser && <LoginPage />} />
          <Route path='/signup' element={!authuser && <SignUpPage />} />
          <Route path='/educatorHome' element={<ProtectedRoute><EducatorHome /></ProtectedRoute>} />
          {/* <Route path='/updatecourse' element={<ProtectedRoute><UpatedCourse /></ProtectedRoute>} /> */}
          <Route path='/admin' element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
          <Route path='/studenHome' element={<ProtectedRoute><UserHome /></ProtectedRoute>} />
          <Route path='/getEnrolled' element={<ProtectedRoute><EnrolledCourse /></ProtectedRoute>} />
          {/* <Route path='/setting' element={authuser && <Settings />} /> */}
          <Route path="/course/:id" element={<ProtectedRoute><CourseDetails /> </ProtectedRoute> } />


        </Routes>
      </div>
    </>
  )
}

export default App