import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../utils/axiosConfig"
import { toastError, toastSuccess } from "../../utils/toastify"
import { errorMessage } from "../../constant/const"
import UserTypeCont from "../../Enum/UserType"

const initialState = {
    loading: false,
    vendorFlag: false,
    vendorDetails: null,
}

export const deleteVendorsACtion = createAsyncThunk(
    "vendors/deleteVendorsACtion",
    async (vId) => {
        try {
            const response = await axiosInstance.delete(`/user/${vId}`)
            toastSuccess(response?.data?.message || "Vendors Deleted!")
            return response.data
        } catch (error) {
            toastError(error?.response?.data?.message || errorMessage)
            console.log("Error", error)
            throw error.response ? error.response.data : error.message
        }
    }
)

export const createVendorAction = createAsyncThunk(
    "vendors/createVendorAction",
    async (data) => {
        try {
            const response = await axiosInstance.post(`/user`, data)
            toastSuccess(
                response?.data?.message ||
                    `${
                        data.user_type === UserTypeCont.EMPLOYEE
                            ? "Employee Created!!"
                            : "Vendor Created!!"
                    }`
            )
            return response.data?.data
        } catch (error) {
            toastError(error?.response?.data?.message || errorMessage)
            console.log("Error", error)
            throw error.response ? error.response.data : error.message
        }
    }
)

export const updateVendorAction = createAsyncThunk(
    "vendors/updateVendorAction",
    async (data) => {
        try {
            const response = await axiosInstance.put(`/user/${data.id}`, data)
            toastSuccess(
                response?.data?.message ||
                    `${
                        data.user_type === UserTypeCont.EMPLOYEE
                            ? "Employee Updated!!"
                            : "Vendor Updated!!"
                    }`
            )
            return response.data
        } catch (error) {
            toastError(error?.response?.data?.message || errorMessage)
            console.log("Error", error)
            throw error.response ? error.response.data : error.message
        }
    }
)

export const getVendorDetailsById = createAsyncThunk(
    "vendors/getVendorDetailsById",
    async (id) => {
        try {
            const response = await axiosInstance.get(`/user/${id}`)
            return response.data?.data
        } catch (error) {
            toastError(error?.response?.data?.message || errorMessage)
            console.log("Error", error)
            throw error.response ? error.response.data : error.message
        }
    }
)

const VendorsSlice = createSlice({
    name: "vendors",
    initialState,
    reducers: {
        resetVendorFlag(state) {
            state.vendorFlag = false
        },
        resetUserDetails(state){
            state.vendorDetails = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteVendorsACtion.pending, (state) => {
                state.loading = true
                state.vendorFlag = false
                state.vendorDetails = null
            })
            .addCase(deleteVendorsACtion.fulfilled, (state) => {
                state.loading = false
                state.vendorFlag = true
                state.vendorDetails = null
            })
            .addCase(deleteVendorsACtion.rejected, (state) => {
                state.vendorFlag = false
                state.loading = false
                state.vendorDetails = null
            })
            .addCase(createVendorAction.pending, (state) => {
                state.loading = true
                state.vendorFlag = false
            })
            .addCase(createVendorAction.fulfilled, (state) => {
                state.loading = false
                state.vendorFlag = true
            })
            .addCase(createVendorAction.rejected, (state) => {
                state.loading = false
                state.vendorFlag = false
            })
            .addCase(updateVendorAction.pending, (state) => {
                state.loading = true
                state.vendorFlag = false
            })
            .addCase(updateVendorAction.fulfilled, (state) => {
                state.loading = false
                state.vendorFlag = true
            })
            .addCase(updateVendorAction.rejected, (state) => {
                state.loading = false
                state.vendorFlag = false
            })
            .addCase(getVendorDetailsById.pending, (state) => {
                state.loading = true
                state.vendorDetails = null
            })
            .addCase(getVendorDetailsById.fulfilled, (state, action) => {
                state.loading = false
                state.vendorDetails = action.payload
            })
            .addCase(getVendorDetailsById.rejected, (state) => {
                state.loading = false
                state.vendorDetails = null
            })
    },
})

export const { resetVendorFlag, resetUserDetails } = VendorsSlice.actions
export default VendorsSlice.reducer
