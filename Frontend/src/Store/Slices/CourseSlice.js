import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance";
import toast from "react-hot-toast";

export const addCourse = createAsyncThunk("course/addCourse", async (formdata, thunkAPI) => {
    try {
        const resonse = await axiosInstance.post("/course/add-course", formdata)
        return resonse.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message || "erro in addCourse")
    }
})


export const deleteCourse = createAsyncThunk("course/deleteCourse", async (courseId, thunkAPI) => {
    try {
        const response = await axiosInstance.delete(`/course/delete-course/${courseId}`);
        toast.success("Course deleted successfully");
        return courseId; // return ID to filter it from state
    } catch (error) {
        toast.error(error.response?.data?.message || "Error in deleting course");
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Error in deleting course");
    }
});


export const myCourse = createAsyncThunk("course/myCourse", async (_, thunkAPI) => {
    try {
        const resonse = await axiosInstance.get("/course/my-course")
        return resonse.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message || "erro in MyCourse")
    }
})


const initialState = {
    course: null,
    isEditCourse: null,
    isLoading: false,
    myCourses: []
}

const CourseSlice = createSlice({
    name: "Course",
    initialState,
    reducers: {
        setEditCourse: (state, action) => {
            state.isEditCourse = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(addCourse.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addCourse.fulfilled, (state, action) => {
                state.course = action.payload;
                toast.success("course Created SuccessFully")
                state.isLoading = false
            })
            .addCase(addCourse.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload || "Something went wrong");
            })

        builder
            .addCase(myCourse.pending, (state) => {
                state.isLoading = true
            })
            .addCase(myCourse.fulfilled, (state, action) => {
                state.myCourses = action.payload;
                state.isLoading = false
            })
            .addCase(myCourse.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload || "Something went wrong");
            })

        builder
            .addCase(deleteCourse.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.myCourses = state.myCourses.filter(course => course._id !== action.payload);
                state.isLoading = false;
            })
            .addCase(deleteCourse.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload || "Failed to delete course");
            });




    }




})


export const { setEditCourse } = CourseSlice.actions;

export default CourseSlice.reducer;