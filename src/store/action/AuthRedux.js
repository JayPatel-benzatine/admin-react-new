import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";
import { errorMessage, goozzyUser } from "../../constant/const";
import { toastError, toastSuccess } from "../../utils/toastify";

const initialState = {
    user: null,
    loading: false
}

export const loginAction = createAsyncThunk('Auth/loginAction', async (data) => {
    try {
        const response = await axiosInstance.post(`/admin_login`, data)
        toastSuccess(response?.data?.message)
        window.location.reload()
        return response.data?.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        throw error.response ? error.response.data : error.message;

    }
});

const AuthSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        setLoginUserData: (state, action) => {
            state.user = action.payload;
        },
        logoutAction: (state) => {
            state.user = null;
            localStorage.removeItem(goozzyUser)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAction.pending, (state) => {
                state.loading = true;
                state.user = null;
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.loading = false;
                localStorage.setItem(goozzyUser, JSON.stringify(action.payload))
                state.user = action.payload;
            })
            .addCase(loginAction.rejected, (state) => {
                state.loading = false;
                state.user = null;
            });
    },
});

export const { setLoginUserData, logoutAction } = AuthSlice.actions;
export default AuthSlice.reducer;
