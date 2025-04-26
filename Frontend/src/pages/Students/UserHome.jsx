import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CourseList from '../../Components/StudentComponents/CourseList';

const UserHome = () => {

  const { authuser } = useSelector(state => state.auth);
  const navigate = useNavigate()


  useEffect(() => {
    if (!authuser) {
      navigate("/")
    }
  }, [authuser])

  console.log(authuser);




  return (
    <>
      <div className='w-full h-full '>
        <CourseList />
      </div>
    </>
  )
}

export default UserHome