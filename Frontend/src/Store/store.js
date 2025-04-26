import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './Slices/AuthSlice'
import CourseSlice from "./Slices/CourseSlice"
import StudentSlice from "./Slices/StudentSlice"
import AdminSlice from "./Slices/AdminSlice"

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        course: CourseSlice,
        student: StudentSlice,
        admin: AdminSlice
    },
})