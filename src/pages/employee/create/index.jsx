import React, { useEffect, useState } from "react"
import {
    Breadcrumb,
    FileUpload,
    InputBox,
    PhoneNumberInputBox,
} from "../../../components"
import { useNavigate, useParams } from "react-router-dom"
import { FormProvider, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { fileUpload, setEmptyfile } from "../../../store/action/CommonRedux"
import {
    createVendorAction,
    getVendorDetailsById,
    resetUserDetails,
    updateVendorAction,
} from "../../../store/action/Vendors"
import TypeConst from "../../../Enum/TypeConst"
import UserTypeCont from "../../../Enum/UserType"

function EmployeesAddEdit() {
    const methods = useForm()
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const vendorsReducer = useSelector((state) => state.vendors)
    const { vendorFlag, loading, vendorDetails } = vendorsReducer
    const commonReducer = useSelector((state) => state.common)
    const { loading: commonLoading, file } = commonReducer
    const [imageWithData, setImageWithData] = useState(null)
    const {
        control,
        formState: { errors },
        handleSubmit,
        setValue,
        clearErrors,
        register,
        reset,
        unregister,
    } = methods
    const [previewImage, setPreviewImage] = useState("")

    useEffect(() => {
        if (params.id) {
            dispatch(getVendorDetailsById(params.id))
        } else {
            setValue("employee.status", true)
        }
        return () => {}
    }, [params])

    useEffect(() => {
        if (vendorDetails) {
            setValue("employee.name", vendorDetails?.name)
            setValue("employee.phone", vendorDetails?.phone)
            setValue("employee.email", vendorDetails?.email)
            setValue("employee.id", vendorDetails?.id)
            setValue(
                "employee.status",
                vendorDetails?.status === "1" ? true : false
            )
            setPreviewImage(vendorDetails?.profile_image)
        } else {
            reset()
            unregister()
            dispatch(resetUserDetails())
        }

        return () => {}
    }, [vendorDetails])

    const handleFileChange = (e) => {
        const files = e.target.files
        if (files && files.length > 0) {
            const isImage = files[0].type.startsWith("image/")
            if (isImage) {
                setValue("employee.profile_image_file", files)
                setPreviewImage(URL.createObjectURL(files[0]))
                clearErrors("employee.profile_image_file")
            } else {
                setValue("employee.profile_image_file", null)
                setPreviewImage("")
            }
        }
    }

    const onSave = (data) => {
        if (params.id) {
            dispatch(updateVendorAction(data))
        } else {
            dispatch(createVendorAction(data))
        }
        reset()
        dispatch(resetUserDetails())
    }

    const onSaveDataWithFile = (image) => {
        let data = { ...imageWithData, profile_image: image }
        onSave(data)
        dispatch(setEmptyfile())
    }

    useEffect(() => {
        if (file) {
            onSaveDataWithFile(file)
        }
        return () => {}
    }, [file])

    const onSubmit = (data) => {
        data = {
            ...data.employee,
            status: data.employee.status ? "1" : "0",
        }
        if (data?.profile_image_file) {
            const formData = new FormData()
            formData.append("myfiles", data?.profile_image_file[0])
            formData.append("type", TypeConst.Profile)
            dispatch(fileUpload(formData))
            delete data?.profile_image_file
            setImageWithData(data)
        } else {
            // create
            onSave(data)
        }
        console.log(data)
    }

    useEffect(() => {
        if (vendorFlag) {
            navigate("/employee/employee-list")
        }
        return () => {}
    }, [vendorFlag])

    useEffect(() => {
        setValue("employee.user_type", UserTypeCont.EMPLOYEE)
        return () => {}
    }, [])

    return (
        <div>
            <Breadcrumb
                name={"Employee"}
                menuItem={[
                    { name: "Employee" },
                    { name: params?.id ? "Update" : "Create" },
                ]}
            />
            <div className="col-12 col-md-12 col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h3>Employee {params?.id ? "Update" : "Create"}</h3>
                    </div>
                    <FormProvider {...methods}>
                        <div className=" row card-body">
                            <div className="col-xl-3 ">
                                <FileUpload
                                    control={control}
                                    name={"employee.offer_image_file"}
                                    label={"Profile Image"}
                                    // rules={{ required: previewImage ? false : true }}
                                    className={
                                        errors?.offer?.offer_image_file
                                            ? "upload-error"
                                            : ""
                                    }
                                    handleFileChange={handleFileChange}
                                    previewImage={previewImage}
                                    accept={"image/*"}
                                />
                            </div>
                            <div className="col-xl-9">
                                <div className="row">
                                    <div className="col-xl-6">
                                        <InputBox
                                            control={control}
                                            label={"Name"}
                                            type={"text"}
                                            name={"employee.name"}
                                            rules={{ required: true }}
                                            className={
                                                errors?.employee?.name
                                                    ? "error"
                                                    : ""
                                            }
                                        />
                                        <PhoneNumberInputBox
                                            control={control}
                                            label={"phone"}
                                            name={"employee.phone"}
                                            rules={{ required: true }}
                                            className={
                                                errors?.employee?.phone
                                                    ? "error"
                                                    : ""
                                            }
                                        />
                                        {/* <div className="form-group">
                                            <label className="text-capitalize lable-wrap">
                                                Phone
                                            </label>
                                            <Controller
                                                name={"employee.phone"}
                                                control={control}
                                                rules={{
                                                    required: true,
                                                    validate: (value) => {
                                                        return isValidPhoneNumber(
                                                            value
                                                        )
                                                    },
                                                }}
                                                render={({ field }) => (
                                                    <PhoneInput
                                                        international
                                                        defaultCountry="IN"
                                                        numberInputProps={{
                                                            className: `form-control ${
                                                                errors?.employee
                                                                    ?.phone
                                                                    ? "error"
                                                                    : ""
                                                            }`,
                                                        }}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        </div> */}

                                        {/* <InputBox
                                            control={control}
                                            label={"Phone"}
                                            type={"text"}
                                            name={"employee.phone"}
                                            rules={{ required: true }}
                                            className={
                                                errors?.employee?.phone
                                                    ? "error"
                                                    : ""
                                            }
                                        /> */}
                                    </div>
                                    <div className="col-xl-6">
                                        <InputBox
                                            control={control}
                                            label={"Email"}
                                            type={"email"}
                                            name={"employee.email"}
                                            rules={{
                                                required: true,
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "",
                                                },
                                            }}
                                            className={
                                                errors?.employee?.email
                                                    ? "error"
                                                    : ""
                                            }
                                        />
                                        {!params.id && (
                                            <InputBox
                                                control={control}
                                                label={"Password"}
                                                type={"password"}
                                                name={"employee.password"}
                                                rules={{
                                                    required: true,
                                                }}
                                                className={
                                                    errors?.employee?.password
                                                        ? "error"
                                                        : ""
                                                }
                                            />
                                        )}
                                        <div className="form-group">
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    placeholder="February"
                                                    {...register(
                                                        "employee.status"
                                                    )}
                                                    className=""
                                                    id="status"
                                                />
                                                <label
                                                    className="ml-2"
                                                    htmlFor="status"
                                                >
                                                    Active
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer text-right">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSubmit(onSubmit)}
                            >
                                Save changes
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary ml-2"
                                onClick={() => {
                                    navigate("/employee/employee-list")
                                    reset()
                                }}
                            >
                                Cansel
                            </button>
                        </div>
                    </FormProvider>
                </div>
            </div>
        </div>
    )
}

export default EmployeesAddEdit
