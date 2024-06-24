import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";
import { errorMessage } from "../../constant/const";
import { toastError } from "../../utils/toastify";

const initialState = {
    dashboardStatics: null,
    loading: false
}

export const getDashboardStatics = createAsyncThunk('Dashboard/getDashboardStatics', async () => {
    try {
        const response = await axiosInstance.get(`/dashboard_statics`)
        return response.data?.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        console.log('Error', error)
        throw error.response ? error.response.data : error.message;

    }
});

const DashboardSlice = createSlice({
    name: "Dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDashboardStatics.pending, (state) => {
                state.loading = true;
                state.usdashboardStaticser = null;
            })
            .addCase(getDashboardStatics.fulfilled, (state, action) => {
                state.loading = false;
                state.dashboardStatics = action.payload;
            })
            .addCase(getDashboardStatics.rejected, (state) => {
                state.loading = false;
                state.dashboardStatics = null;
            });
    },
});

// export const {  } = DashboardSlice.actions;
export default DashboardSlice.reducer;
