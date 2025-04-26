import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance";
import toast from "react-hot-toast";



export const getStudent = createAsyncThunk("admin/getStudent", async (_, thunkAPI) => {
    try {
        const response = await axiosInstance.get("admin/total-student")
        // console.log(response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message || "error in getStudent")
    }
})

export const getEducator = createAsyncThunk("admin/getEducator", async (_, thunkAPI) => {
    try {
        const response = await axiosInstance.get("admin/total-educator")
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message || "error in getEducator")
    }
})


export const getCourse = createAsyncThunk("admin/getCourse", async (_, thunkAPI) => {
    try {
        const response = await axiosInstance.get("admin/total-course")
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message || "error in getCourse")
    }
})

export const deleteusers = createAsyncThunk("admin/deleteusers", async ({ role, id }, thunkAPI) => {
    try {
        const response = await axiosInstance.delete(`admin/deleteusers/${role}/${id}`)
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message || "error in getCourse")
    }
})
export const deletedCourse = createAsyncThunk("admin/deletedCourse", async (id, thunkAPI) => {
    try {
        const response = await axiosInstance.delete(`admin/delete/${id}`)
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message || "error in getCourse")
    }
})


const initialState = {
    Students: [],
    Educator: [],
    Course: [],
    isloading: false,
    isError: false
}

export const AdminSlice = createSlice({
    name: "AdminSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getStudent.pending, (state) => {
                state.isloading = true;
            })
            .addCase(getStudent.fulfilled, (state, action) => {
                state.isloading = false;
                state.Students = action.payload;
            })
            .addCase(getStudent.rejected, (state, action) => {
                state.isloading = false;
                toast.error(action.payload);
            });

        builder
            .addCase(getEducator.pending, (state) => {
                state.isloading = true;
            })
            .addCase(getEducator.fulfilled, (state, action) => {
                state.isloading = false;
                state.Educator = action.payload;
            })
            .addCase(getEducator.rejected, (state, action) => {
                state.isloading = false;
                toast.error(action.payload);
            });

        builder
            .addCase(getCourse.pending, (state) => {
                state.isloading = true;
            })
            .addCase(getCourse.fulfilled, (state, action) => {
                state.isloading = false;
                state.Course = action.payload;
            })
            .addCase(getCourse.rejected, (state, action) => {
                state.isloading = false;
                toast.error(action.payload);
            });
        builder
            .addCase(deleteusers.pending, (state) => {
                state.isloading = true;
            })
            .addCase(deleteusers.fulfilled, (state, action) => {
                state.isloading = false;
                // state.Course = action.payload;
            })
            .addCase(deleteusers.rejected, (state, action) => {
                state.isloading = false;
                toast.error(action.payload);
            });
        builder
            .addCase(deletedCourse.pending, (state) => {
                state.isloading = true;
            })
            .addCase(deletedCourse.fulfilled, (state, action) => {
                state.isloading = false;
                toast.success("Course Deleted Successfully")
                // state.Course = action.payload;
            })
            .addCase(deletedCourse.rejected, (state, action) => {
                state.isloading = false;
                toast.error(action.payload);
            });

    }
})

export const { } = AdminSlice.actions;

export default AdminSlice.reducer;