import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";
import { toastError, toastSuccess } from "../../utils/toastify";
import { errorMessage } from "../../constant/const";


const initialState = {
    orderList: null,
    loading: false,
    orderProductsList: null,
    transactionsList: null,
    updateOrderStatus: false,
}

export const getOrderListAction = createAsyncThunk('Sales/getOrderListAction', async () => {
    try {
        const response = await axiosInstance.get(`/order`)
        return response.data?.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        // console.log('Error', error)
        throw error.response ? error.response.data : error.message;

    }
});
export const getOrderDetailsListByIdAction = createAsyncThunk('Sales/getOrderDetailsListByIdAction', async (opId) => {
    try {
        const response = await axiosInstance.get(`/orderProducts/${opId}`)
        return response.data?.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        // console.log('Error', error)
        throw error.response ? error.response.data : error.message;

    }
});
export const getTransactionsListAction = createAsyncThunk('Sales/getTransactionsListAction', async () => {
    try {
        const response = await axiosInstance.get(`/payment`)
        return response.data?.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        // console.log('Error', error)
        throw error.response ? error.response.data : error.message;

    }
});
export const updateOrderItemStatusAction = createAsyncThunk('Sales/updateOrderItemStatusAction', async (data) => {
    try {
        const response = await axiosInstance.put(`/order-item/${data.id}`, { product_status: data.product_status })
        toastSuccess("Order status updated...")
        return response.data?.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        // console.log('Error', error)
        throw error.response ? error.response.data : error.message;

    }
});

const SalesSlice = createSlice({
    name: "Sales",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrderListAction.pending, (state) => {
                state.loading = true;
                state.orderList = null;
            })
            .addCase(getOrderListAction.fulfilled, (state, action) => {
                state.loading = false;
                state.orderList = action.payload;
            })
            .addCase(getOrderListAction.rejected, (state) => {
                state.loading = false;
                state.orderList = null;
            })
            .addCase(getOrderDetailsListByIdAction.pending, (state) => {
                state.loading = true;
                state.orderProductsList = null;
            })
            .addCase(getOrderDetailsListByIdAction.fulfilled, (state, action) => {
                state.loading = false;
                state.orderProductsList = action.payload;
            })
            .addCase(getOrderDetailsListByIdAction.rejected, (state) => {
                state.loading = false;
                state.orderProductsList = null;
            })
            .addCase(getTransactionsListAction.pending, (state) => {
                state.loading = true;
                state.transactionsList = null;
            })
            .addCase(getTransactionsListAction.fulfilled, (state, action) => {
                state.loading = false;
                state.transactionsList = action.payload;
            })
            .addCase(getTransactionsListAction.rejected, (state) => {
                state.loading = false;
                state.transactionsList = null;
            })

            .addCase(updateOrderItemStatusAction.pending, (state) => {
                state.loading = true;
                state.updateOrderStatus = false;
            })
            .addCase(updateOrderItemStatusAction.fulfilled, (state) => {
                state.loading = false;
                state.updateOrderStatus = true;
            })
            .addCase(updateOrderItemStatusAction.rejected, (state) => {
                state.loading = false;
                state.updateOrderStatus = false;
            })
    }
});
// export const { } = SalesSlice.actions;
export default SalesSlice.reducer;