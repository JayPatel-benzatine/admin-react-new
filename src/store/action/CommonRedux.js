import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";
import { errorMessage } from "../../constant/const";
import { toastError } from "../../utils/toastify";

const initialState = {
    file: null,
    loading: false,
    userList: null,
    variantList: null,
    allCategory: null,
    allProductByCategoryList: null,
    countryList:null,
    stateList: null,
    cityList: null,
}

export const fileUpload = createAsyncThunk('Common/fileUpload', async (data) => {
    try {
        const response = await axiosInstance.post(`/file_upload`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
        return response.data?.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        throw error.response ? error.response.data : error.message;
    }
});
export const getUserList = createAsyncThunk('Common/getUserList', async (type) => {
    try {
        const response = await axiosInstance.get(`/user?type=${type}`)
        return response.data?.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        throw error.response ? error.response.data : error.message;
    }
});

export const getVariantList = createAsyncThunk('Common/getVariantList', async () => {
    try {
        const response = await axiosInstance.get(`/variant`)
        return response.data?.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        throw error.response ? error.response.data : error.message;
    }
});

export const getAllCategory = createAsyncThunk('Common/getAllCategory', async (type) => {
    try {
        const response = await axiosInstance.get(`/allCategory`)
        return response.data?.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        throw error.response ? error.response.data : error.message;
    }
});

export const getAllProductByCategory = createAsyncThunk('Common/getAllProductByCategory', async (cid) => {
    try {
        const response = await axiosInstance.get(`/productByCategory/${cid}`)
        response.data?.data.length === 0 && toastError("Product not found!")
        return response.data?.data;
    } catch (error) {
        console.log("er", error)
        toastError(error?.response?.data?.message || errorMessage)
        throw error.response ? error.response.data : error.message;
    }
});
export const getCountryList = createAsyncThunk('Common/getCountryList', async () => {
    try {
        const response = await axiosInstance.get(`/get_countries`)
        return response.data?.data;
    } catch (error) {
        console.log("er", error)
        toastError(error?.response?.data?.message || errorMessage)
        throw error.response ? error.response.data : error.message;
    }
});

export const getStateList = createAsyncThunk('Common/getStateList', async (cId) => {
    try {
        const response = await axiosInstance.get(`/get_states/${cId}`)
        return response.data?.data;
    } catch (error) {
        console.log("er", error)
        toastError(error?.response?.data?.message || errorMessage)
        throw error.response ? error.response.data : error.message;
    }
});
export const getCityByStateIdList = createAsyncThunk('Common/getCityByStateIdList', async (sId) => {
    try {
        const response = await axiosInstance.get(`/get_cities/${sId}`)
        return response.data?.data;
    } catch (error) {
        console.log("er", error)
        toastError(error?.response?.data?.message || errorMessage)
        throw error.response ? error.response.data : error.message;
    }
});


const CommonSlice = createSlice({
    name: "Common",
    initialState,
    reducers: {
        setEmptyfile: (state) => {
            state.file = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fileUpload.pending, (state) => {
                state.loading = true;
                state.file = null;
            })
            .addCase(fileUpload.fulfilled, (state, action) => {
                state.loading = false;
                state.file = action.payload;
            })
            .addCase(fileUpload.rejected, (state) => {
                state.loading = false;
                state.file = null;
            })
            .addCase(getUserList.pending, (state) => {
                state.loading = true;
                state.userList = null;
            })
            .addCase(getUserList.fulfilled, (state, action) => {
                state.loading = false;
                state.userList = action.payload;
            })
            .addCase(getUserList.rejected, (state) => {
                state.loading = false;
                state.userList = null;
            })
            .addCase(getVariantList.pending, (state) => {
                state.loading = true;
                state.variantList = null;
            })
            .addCase(getVariantList.fulfilled, (state, action) => {
                state.loading = false;
                state.variantList = action.payload;
            })
            .addCase(getVariantList.rejected, (state) => {
                state.loading = false;
                state.variantList = null;
            })
            .addCase(getAllCategory.pending, (state) => {
                state.loading = true;
                state.allCategory = null;
            })
            .addCase(getAllCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.allCategory = action.payload;
            })
            .addCase(getAllCategory.rejected, (state) => {
                state.loading = false;
                state.allCategory = null;
            })
            .addCase(getAllProductByCategory.pending, (state) => {
                state.loading = true;
                state.allProductByCategoryList = null;
            })
            .addCase(getAllProductByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.allProductByCategoryList = action.payload;
            })
            .addCase(getAllProductByCategory.rejected, (state) => {
                state.loading = false;
                state.allProductByCategoryList = null;
            })
            .addCase(getStateList.pending, (state) => {
                state.loading = true;
                state.stateList = null;
            })
            .addCase(getStateList.fulfilled, (state, action) => {
                state.loading = false;
                state.stateList = action.payload;
            })
            .addCase(getStateList.rejected, (state) => {
                state.loading = false;
                state.stateList = null;
            })
            .addCase(getCityByStateIdList.pending, (state) => {
                state.loading = true;
                state.cityList = null;
            })
            .addCase(getCityByStateIdList.fulfilled, (state, action) => {
                state.loading = false;
                state.cityList = action.payload;
            })
            .addCase(getCityByStateIdList.rejected, (state) => {
                state.loading = false;
                state.cityList = null;
            })
            .addCase(getCountryList.pending, (state) => {
                state.loading = true;
                state.countryList = null;
            })
            .addCase(getCountryList.fulfilled, (state, action) => {
                state.loading = false;
                state.countryList = action.payload;
            })
            .addCase(getCountryList.rejected, (state) => {
                state.loading = false;
                state.countryList = null;
            })
    },
});

export const { setEmptyfile } = CommonSlice.actions;
export default CommonSlice.reducer;
