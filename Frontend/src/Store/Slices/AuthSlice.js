import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance";
import toast from "react-hot-toast";


export const getAuthUser = createAsyncThunk("auth/getAuthUser", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get("/auth/check");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "error in getAuthiuser");
  }
});


export const SignUp = createAsyncThunk("auth/signup", async (formdata, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/auth/register", formdata)
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message || "error in sigup")
  }
});


export const login = createAsyncThunk("auth/login", async (formdata, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/auth/login", formdata)
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "error in sigup")
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Logout failed');
  }
}
);


const initialState = {
  authuser: null,
  isloading: false,
  error: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // check users
    builder
      .addCase(getAuthUser.pending, (state) => {
        state.error = null;
      })
      .addCase(getAuthUser.fulfilled, (state, action) => {
        state.isloading = false;
        state.authuser = action.payload;
        console.log("payload", action.payload);
      })
      .addCase(getAuthUser.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload;
      });


    // signup
    builder.addCase(SignUp.pending, (state) => {
      state.isloading = true;
    })
      .addCase(SignUp.fulfilled, (state, action) => {
        state.authuser = action.payload;
        state.isloading = false;
      })
      .addCase(SignUp.rejected, (state, action) => {
        state.isloading = false
        toast.error(action.payload)
        state.error = action.payload
      })

    // login 
    builder.addCase(login.pending, (state) => {
      state.isloading = true;
    })
      .addCase(login.fulfilled, (state, action) => {
        state.authuser = action.payload;
        toast.success("Login SuccessFull")
        state.isloading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isloading = false
        toast.error(action.payload)
        state.error = action.payload
      })


    // logout
    builder.addCase(logout.pending, (state) => {
      state.isloading = true;
    })
      .addCase(logout.fulfilled, (state) => {
        state.authuser = null;
        toast.success("LogOut SuccessFull")
        state.isloading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload;
      })

  },
});

export const { } = AuthSlice.actions;

export default AuthSlice.reducer;
