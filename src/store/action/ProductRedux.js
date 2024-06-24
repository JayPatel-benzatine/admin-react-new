import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toastError, toastSuccess } from "../../utils/toastify";
import axiosInstance from "../../utils/axiosConfig";
import { errorMessage } from "../../constant/const";

const initialState = {
    productList: null,
    loading: false,
    productFlag: false,
    productData: null,
    addProduct: false,
    deleteProductImage: false
}

export const getProductList = createAsyncThunk('Product/getProductList', async (data) => {
    try {
        const queryString = new URLSearchParams(data).toString();
        const response = await axiosInstance.get(`/product?${queryString}`)
        return response.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        console.log('Error', error)
        throw error.response ? error.response.data : error.message;
    }
});
export const deleteProduct = createAsyncThunk('Product/deleteProduct', async (pId) => {
    try {
        const response = await axiosInstance.delete(`/product/${pId}`)
        toastSuccess(response?.data?.message || "Deleted Product!")
        return response.data?.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        console.log('Error', error)
        throw error.response ? error.response.data : error.message;

    }
});

export const getByIdProductDetails = createAsyncThunk('Product/getByIdProductDetails', async (pId) => {
    try {
        const response = await axiosInstance.get(`/product/${pId}`)
        return response.data?.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        console.log('Error', error)
        throw error.response ? error.response.data : error.message;

    }
});

export const addProductAction = createAsyncThunk('Product/addProductAction', async (data) => {
    try {
        const response = await axiosInstance.post(`/product`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        })
        toastSuccess(response?.data?.message || "Product Created!!")
        return response.data?.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        console.log('Error', error)
        throw error.response ? error.response.data : error.message;

    }
});
export const updateProductAction = createAsyncThunk('Product/updateProductAction', async (data) => {
    try {
        const response = await axiosInstance.post(`/product_update/${data.id}`, data.formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        })
        toastSuccess(response?.data?.message || "Product Created!!")
        return response.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        console.log('Error', error)
        throw error.response ? error.response.data : error.message;

    }
});

export const deleteProductImageById = createAsyncThunk('Product/deleteProductImageById', async (pId) => {
    try {
        const response = await axiosInstance.delete(`/product-image/${pId}`)
        toastSuccess(response?.data?.message || "Deleted Product image!")
        return response.data?.data;
    } catch (error) {
        toastError(error?.response?.data?.message || errorMessage)
        console.log('Error', error)
        throw error.response ? error.response.data : error.message;

    }
});
const ProductSlice = createSlice({
    name: "Product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductList.pending, (state) => {
                state.loading = true;
                state.productList = null;
                state.addProduct = false
            })
            .addCase(getProductList.fulfilled, (state, action) => {
                state.loading = false;
                state.productList = action.payload;
                state.addProduct = false
            })
            .addCase(getProductList.rejected, (state) => {
                state.loading = false;
                state.productList = null;
                state.addProduct = false
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.productFlag = false;
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.loading = false;
                state.productFlag = true;
            })
            .addCase(deleteProduct.rejected, (state) => {
                state.loading = false;
                state.productFlag = false;
            })
            .addCase(getByIdProductDetails.pending, (state) => {
                state.loading = true;
                state.productData = null;
            })
            .addCase(getByIdProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.productData = action.payload;
            })
            .addCase(getByIdProductDetails.rejected, (state) => {
                state.loading = false;
                state.productData = null;
            })
            .addCase(addProductAction.pending, (state) => {
                state.loading = true;
                state.addProduct = false;
            })
            .addCase(addProductAction.fulfilled, (state) => {
                state.loading = false;
                state.addProduct = true
            })
            .addCase(addProductAction.rejected, (state) => {
                state.loading = false;
                state.addProduct = false;
            })
            .addCase(updateProductAction.pending, (state) => {
                state.loading = true;
                state.addProduct = false;
            })
            .addCase(updateProductAction.fulfilled, (state) => {
                state.loading = false;
                state.addProduct = true;
            })
            .addCase(updateProductAction.rejected, (state) => {
                state.loading = false;
                state.addProduct = false;
            })
            .addCase(deleteProductImageById.pending, (state) => {
                state.loading = true;
                state.deleteProductImage = false;
            })
            .addCase(deleteProductImageById.fulfilled, (state) => {
                state.loading = false;
                state.deleteProductImage = true
            })
            .addCase(deleteProductImageById.rejected, (state) => {
                state.loading = false;
                state.deleteProductImage = false;
            })
    }

})
// export const { } = ProductSlice.actions;
export default ProductSlice.reducer;