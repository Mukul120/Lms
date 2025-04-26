import { Download, Edit, Play, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCourse, myCourse, setEditCourse } from '../../Store/Slices/CourseSlice'
import { Link } from 'react-router-dom'
import AddCourse from './AddCourse'

const MyCourse = () => {

  // const [editCourse, setEditCourse] = useState(null)

  const { myCourses, isEditCourse } = useSelector(state => state.course)
  const dispatch = useDispatch()
  console.log(myCourse[0]);

  useEffect(() => {
    dispatch(myCourse())
  }, [])

  const handleDelete = (courseid) => {
    dispatch(deleteCourse(courseid))
  }


  return (

    <div className="h-full w-full overflow-y-auto p-4 bg-purple-100 relative">
      <div className="flex flex-col gap-10">
        {myCourses.map((elm, id) => (
          <div key={elm._id} className="w-2/3 flex rounded-2xl border-2   overflow-hidden">
            <div className="w-1/3 ">
              <img
                src={elm.courseImage || "./public/user.png"}
                className="w-full h-50 object-top"
                alt=""
              />
            </div>
            <div className="w-2/3 p-2 relative">
              <h1 className="text-xl font-semibold mb-1">{elm.courseName}</h1>
              <h2 className="text-sm font-light mb-2">{elm.coursePrice}</h2>
              <p className="mb-5 font-medium">{elm.courseDescription}</p>
              {/* <div className={`flex ${elm.coursePdf ? "justify-between" : "justify-center "} px-20  `}>
                {elm.coursePdf && <a href={elm.coursePdf} className="flex items-center gap-1 px-4 bg-purple-400 rounded-2xl text-white hover:bg-white hover:text-purple-800 ">
                  <Download /> Download Pdf
                </a>}

                <button className="flex items-center gap-1 py-2 px-4 bg-purple-400 rounded-2xl text-white hover:bg-white hover:text-purple-800">
                  <Play /> Play Video
                </button>
              </div> */}
              <div className="flex absolute top-2 right-2 gap-2 text-purple-800">

                {/* <Edit onClick={() => dispatch(setEditCourse(elm))} /> */}
                <Trash2 onClick={() => handleDelete(elm._id)} />
              </div>
            </div>
          </div>
        ))}


      </div>
    </div>

  )
}

export default MyCourse

