import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";
import { errorMessage } from "../../constant/const";
import { toastError, toastSuccess } from "../../utils/toastify";
import { setEmptyfile } from "./CommonRedux";

const initialState = {
    categoryList: null,
    loading: false,
    categoryFlag: false,
    categoryData: null,
    subCat: false,
}

export const getCategoryList = createAsyncThunk('Category/getCategoryList', async () => {
    try {
        const response = await axiosInstance.get(`/category`)
        return response.data?.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        console.log('Error', error)
        throw error.response ? error.response.data : error.message;

    }
});
export const getCategory = createAsyncThunk('Category/getCategory', async (categoryId) => {
    try {
        const response = await axiosInstance.get(`/category/${categoryId}`)
        return response.data?.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        console.log('Error', error)
        throw error.response ? error.response.data : error.message;

    }
});
export const addCategory = createAsyncThunk('Category/addCategory', async (data, thunkAPI) => {
    try {
        const response = await axiosInstance.post(`/category`, data)
        thunkAPI.dispatch(setEmptyfile())
        toastSuccess(response?.data?.message || "Category Created!!")
        return response.data?.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        console.log('Error', error)
        throw error.response ? error.response.data : error.message;

    }
});
export const updateCategory = createAsyncThunk('Category/updateCategory', async (data, thunkAPI) => {
    try {
        const response = await axiosInstance.put(`/category/${data.categoryId}`, data)
        thunkAPI.dispatch(setEmptyfile())
        toastSuccess(response?.data?.message || "Category Updated!!")
        return response.data?.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        console.log('Error', error)
        throw error.response ? error.response.data : error.message;

    }
});
export const deleteCategory = createAsyncThunk('Category/deleteCategory', async (categoryId) => {
    try {
        const response = await axiosInstance.delete(`/category/${categoryId}`)
        toastSuccess(response?.data?.message || "Deleted Category!")
        return response.data?.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        console.log('Error', error)
        throw error.response ? error.response.data : error.message;

    }
});
export const getSubCategoryList = createAsyncThunk('Category/getSubCategoryList', async (id) => {
    try {
        const response = await axiosInstance.get(`/subcate/${id}`)
        console.log(response)
        return response.data
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        console.log('Error', error)
        throw error.response ? error.response.data : error.message;

    }
});
const CategorySlice = createSlice({
    name: "Category",
    initialState,
    reducers: {
        setEmptyCatogery: (state) => {
            state.categoryData = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoryList.pending, (state) => {
                state.loading = true;
                state.categoryList = null;
            })
            .addCase(getCategoryList.fulfilled, (state, action) => {
                state.loading = false;
                state.categoryList = action.payload;
                state.subCat = true;
            })
            .addCase(getCategoryList.rejected, (state) => {
                state.loading = false;
                state.categoryList = null;
            })
            .addCase(addCategory.pending, (state) => {
                state.loading = true;
                state.categoryFlag = false;
            })
            .addCase(addCategory.fulfilled, (state) => {
                state.loading = false;
                state.categoryFlag = true;
            })
            .addCase(addCategory.rejected, (state) => {
                state.loading = false;
                state.categoryFlag = false;
            })
            .addCase(getCategory.pending, (state) => {
                state.loading = true;
                state.categoryData = null;
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categoryData = action.payload;
            })
            .addCase(getCategory.rejected, (state) => {
                state.loading = false;
                state.categoryData = null;
            }).addCase(updateCategory.pending, (state) => {
                state.loading = true;
                state.categoryFlag = false;
            })
            .addCase(updateCategory.fulfilled, (state) => {
                state.loading = false;
                state.categoryFlag = true;
            })
            .addCase(updateCategory.rejected, (state) => {
                state.loading = false;
                state.categoryFlag = false;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.categoryFlag = false;
            })
            .addCase(deleteCategory.fulfilled, (state) => {
                state.loading = false;
                state.categoryFlag = true;
            })
            .addCase(deleteCategory.rejected, (state) => {
                state.loading = false;
                state.categoryFlag = false;
            })
            .addCase(getSubCategoryList.pending, (state) => {
                state.loading = true;
                state.categoryList = null;
                state.subCat = false;
            })
            .addCase(getSubCategoryList.fulfilled, (state, action) => {
                state.loading = false;
                state.categoryList = action.payload.data;
                state.subCat = action.payload.subCat;
            })
            .addCase(getSubCategoryList.rejected, (state) => {
                state.loading = false;
                state.categoryList = null;
                state.subCat = false;
            })
    },
});

export const { setEmptyCatogery } = CategorySlice.actions;
export default CategorySlice.reducer;
