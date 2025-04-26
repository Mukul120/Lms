import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance";
import { toast } from "react-hot-toast"

export const getCourses = createAsyncThunk("/getCourses", async (_, thunkAPI) => {
    try {
        const response = await axiosInstance.get("/student/course");
        return response.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "erro in getCourse")
    }
})
export const enrolledCourses = createAsyncThunk("/enrolledCourses", async (data, thunkAPI) => {
    try {
        console.log("courseid", data);
        const response = await axiosInstance.post("/student/enroll", data);
        return response.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "erro in EnrolledCourse")
    }
})

export const getenrolledCourses = createAsyncThunk("/getenrolledCourses", async (_, thunkAPI) => {
    try {
        const response = await axiosInstance.get("/student/getenrollcourse");
        console.log("enrolled ourss", response.data);
        return response.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "erro in getEnrolledCourse")
    }
})
export const updateCourseProgress = createAsyncThunk("/updateCourseProgress", async ({ courseId, progress }, thunkAPI) => {
    try {
        const response = await axiosInstance.put("/student/progress", { courseId, progress });
        return response.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "erro in updateCourseProgress ")
    }
})






const initialState = {
    courses: [],
    searchCourses: [],
    getEnrolledCourses: [],
    isloading: false,

}

const studentSlice = createSlice({
    name: "Student",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getCourses.pending, (state) => {
                state.isloading = true;

            })
            .addCase(getCourses.fulfilled, (state, action) => {
                state.isloading = false;
                state.courses = action.payload;
            })
            .addCase(getCourses.rejected, (state, action) => {
                state.isloading = false;
            })

        builder
            .addCase(enrolledCourses.pending, (state) => {
                state.isloading = true;

            })
            .addCase(enrolledCourses.fulfilled, (state, action) => {
                state.isloading = false;
                toast.success("done")

            })
            .addCase(enrolledCourses.rejected, (state, action) => {
                state.isloading = false;
                toast.error(action.payload)

            })

        builder
            .addCase(getenrolledCourses.pending, (state) => {
                state.isloading = true;

            })
            .addCase(getenrolledCourses.fulfilled, (state, action) => {
                state.isloading = false;
                state.getEnrolledCourses = action.payload;

            })
            .addCase(getenrolledCourses.rejected, (state, action) => {
                state.isloading = false;
                toast.error(action.payload)

            })

        builder
            .addCase(updateCourseProgress.fulfilled, (state, action) => {
                const { courseId, progress } = action.payload;
                const course = state.getEnrolledCourses.find(e => e.courseId._id === courseId);
                if (course) {
                    course.progress = progress;
                }
            });
    }

})

export const { } = studentSlice.actions;

export default studentSlice.reducer;