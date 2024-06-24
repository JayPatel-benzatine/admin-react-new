import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";
import { errorMessage } from "../../constant/const";
import { toastError, toastSuccess } from "../../utils/toastify";

const initialState = {
    couponsList: null,
    loading: false,
    couponFlag: false,
    couponsDetails: null
}
export const getCouponsList = createAsyncThunk('Coupons/getCouponsList', async (data) => {
    try {
        const response = await axiosInstance.get(`/coupan`)
        return response.data?.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        console.log('Error', error)
        throw error.response ? error.response.data : error.message;
    }
});

export const getCouponsDetailsById = createAsyncThunk('Coupons/getCouponsDetailsById', async (id) => {
    try {
        const response = await axiosInstance.get(`/coupan/${id}`)
        return response.data?.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        console.log('Error', error)
        throw error.response ? error.response.data : error.message;
    }
});

export const createCouponAction = createAsyncThunk('Coupons/createCouponAction', async (data) => {
    try {
        const response = await axiosInstance.post(`/coupan`, data)
        toastSuccess(response?.data?.message || "Coupons Created!!")
        return response.data?.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        console.log('Error', error)
        throw error.response ? error.response.data : error.message;
    }
});

export const updateCouponAction = createAsyncThunk('Coupons/updateCouponAction', async (data) => {
    try {
        const response = await axiosInstance.put(`/coupan/${data.id}`, data)
        toastSuccess(response?.data?.message || "Coupons Updated!!")
        return response.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        console.log('Error', error)
        throw error.response ? error.response.data : error.message;
    }
});

export const deleteCouponACtion = createAsyncThunk('Coupons/deleteCouponACtion', async (pId) => {
    try {
        const response = await axiosInstance.delete(`/coupan/${pId}`)
        toastSuccess(response?.data?.message || "Deleted Coupons!")
        return response.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        console.log('Error', error)
        throw error.response ? error.response.data : error.message;
    }
});

const CouponsSlice = createSlice({
    name: "Coupons",
    initialState,
    reducers: {
        resetCouponsDetailsData: (state) => {
            state.couponsDetails = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCouponsList.pending, (state) => {
                state.loading = true;
                state.couponsList = null;
                state.couponsDetails = null;
                state.couponFlag = false;
            })
            .addCase(getCouponsList.fulfilled, (state, action) => {
                state.loading = false;
                state.couponsList = action.payload;
                state.couponsDetails = null;
                state.couponFlag = false;
            })
            .addCase(getCouponsList.rejected, (state) => {
                state.loading = false;
                state.couponsList = null;
                state.couponsDetails = null;
            })
            .addCase(createCouponAction.pending, (state) => {
                state.loading = true;
                state.couponFlag = false;
            })
            .addCase(createCouponAction.fulfilled, (state) => {
                state.loading = false;
                state.couponFlag = true;
            })
            .addCase(createCouponAction.rejected, (state) => {
                state.loading = false;
                state.couponFlag = false;
            })
            .addCase(getCouponsDetailsById.pending, (state) => {
                state.loading = true;
                state.couponsDetails = null;
            })
            .addCase(getCouponsDetailsById.fulfilled, (state, action) => {
                state.loading = false;
                state.couponsDetails = action.payload;
            })
            .addCase(getCouponsDetailsById.rejected, (state) => {
                state.loading = false;
                state.couponsDetails = null;
            })
            .addCase(updateCouponAction.pending, (state) => {
                state.loading = true;
                state.couponFlag = false;
            })
            .addCase(updateCouponAction.fulfilled, (state) => {
                state.loading = false;
                state.couponFlag = true;
            })
            .addCase(updateCouponAction.rejected, (state) => {
                state.loading = false;
                state.couponFlag = false;
            })
            .addCase(deleteCouponACtion.pending, (state) => {
                state.loading = true;
                state.couponFlag = false;
            })
            .addCase(deleteCouponACtion.fulfilled, (state) => {
                state.loading = false;
                state.couponFlag = true;
            })
            .addCase(deleteCouponACtion.rejected, (state) => {
                state.loading = false;
                state.couponFlag = false;
            })
    },
});

export const { resetCouponsDetailsData } = CouponsSlice.actions;
export default CouponsSlice.reducer;
