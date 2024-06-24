import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";
import { errorMessage } from "../../constant/const";
import { toastError, toastSuccess } from "../../utils/toastify";

const initialState = {
    OfferList: null,
    loading: false,
    offerFlag: false,
    offerDetails: null
}
export const getOfferListAction = createAsyncThunk('Offer/getOfferListAction', async (data) => {
    try {
        const response = await axiosInstance.get(`/offer`)
        return response.data?.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        console.log('Error', error)
        throw error.response ? error.response.data : error.message;
    }
});

export const getOfferDetailsById = createAsyncThunk('Coupons/getOfferDetailsById', async (id) => {
    try {
        const response = await axiosInstance.get(`/offer/${id}`)
        return response.data?.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        console.log('Error', error)
        throw error.response ? error.response.data : error.message;
    }
});

export const createOfferAction = createAsyncThunk('Coupons/createOfferAction', async (data) => {
    try {
        const response = await axiosInstance.post(`/offer`, data)
        toastSuccess(response?.data?.message || "Offer Created!!")
        return response.data?.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        console.log('Error', error)
        throw error.response ? error.response.data : error.message;
    }
});

export const updateCouponAction = createAsyncThunk('Coupons/updateCouponAction', async (data) => {
    try {
        const response = await axiosInstance.put(`/offer/${data.id}`, data)
        toastSuccess(response?.data?.message || "Offer Updated!!")
        return response.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        console.log('Error', error)
        throw error.response ? error.response.data : error.message;
    }
});

export const deleteOfferACtion = createAsyncThunk('Offer/deleteOfferACtion', async (oId) => {
    try {
        const response = await axiosInstance.delete(`/offer/${oId}`)
        toastSuccess(response?.data?.message || "Deleted Offer!")
        return response.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        console.log('Error', error)
        throw error.response ? error.response.data : error.message;
    }
});

const OfferSlice = createSlice({
    name: "Offer",
    initialState,
    reducers: {
        resetCouponsDetailsData: (state) => {
            state.offerDetails = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOfferListAction.pending, (state) => {
                state.loading = true;
                state.OfferList = null;
                state.offerDetails = null;
                state.offerFlag = false;
            })
            .addCase(getOfferListAction.fulfilled, (state, action) => {
                state.loading = false;
                state.OfferList = action.payload;
                state.offerDetails = null;
                state.offerFlag = false;
            })
            .addCase(getOfferListAction.rejected, (state) => {
                state.loading = false;
                state.OfferList = null;
                state.offerDetails = null;
            })
            .addCase(createOfferAction.pending, (state) => {
                state.loading = true;
                state.offerFlag = false;
            })
            .addCase(createOfferAction.fulfilled, (state) => {
                state.loading = false;
                state.offerFlag = true;
            })
            .addCase(createOfferAction.rejected, (state) => {
                state.loading = false;
                state.offerFlag = false;
            })
            .addCase(getOfferDetailsById.pending, (state) => {
                state.loading = true;
                state.offerDetails = null;
            })
            .addCase(getOfferDetailsById.fulfilled, (state, action) => {
                state.loading = false;
                state.offerDetails = action.payload;
            })
            .addCase(getOfferDetailsById.rejected, (state) => {
                state.loading = false;
                state.offerDetails = null;
            })
            .addCase(updateCouponAction.pending, (state) => {
                state.loading = true;
                state.offerFlag = false;
            })
            .addCase(updateCouponAction.fulfilled, (state) => {
                state.loading = false;
                state.offerFlag = true;
            })
            .addCase(updateCouponAction.rejected, (state) => {
                state.loading = false;
                state.offerFlag = false;
            })
            .addCase(deleteOfferACtion.pending, (state) => {
                state.loading = true;
                state.offerFlag = false;
            })
            .addCase(deleteOfferACtion.fulfilled, (state) => {
                state.loading = false;
                state.offerFlag = true;
            })
            .addCase(deleteOfferACtion.rejected, (state) => {
                state.loading = false;
                state.offerFlag = false;
            })
    },
});

export const { resetCouponsDetailsData } = OfferSlice.actions;
export default OfferSlice.reducer;
