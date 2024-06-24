
import React, { useEffect, useState } from 'react'
import { Breadcrumb, CustomSelectBox, FileUpload, InputBox, Loader } from '../../../components'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import useLocationHook from '../../../Hooks/locationHooks/useLocationHook';
import TypeConst from '../../../Enum/TypeConst';
import { fileUpload, setEmptyfile } from '../../../store/action/CommonRedux';
import { createVendorAction, getVendorDetailsById, resetUserDetails, updateVendorAction } from '../../../store/action/Vendors';
import UserTypeCont from '../../../Enum/UserType';

function VendorsAddEdit() {
    const methods = useForm()
    const params = useParams()
    const vendorsReducer = useSelector((state) => state.vendors)
    const { vendorFlag, loading, vendorDetails } = vendorsReducer
    const commonReducer = useSelector((state) => state.common)
    const { loading: commonLoading, file } = commonReducer
    const [previewImage, setPreviewImage] = useState("");

    const { control, formState: { errors }, register, handleSubmit, setValue, clearErrors } = methods
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [selectedState, setSelectedState] = useState(null)
    const [selectedCity, setSelectedCity] = useState(null)
    const { getCountry, getState, getCityList, countryOpt, statueOpt, cityOpt, loading: loactionLoading } = useLocationHook()
    const [imageWithData, setImageWithData] = useState(null)


    register('vendor.city', { required: true })
    register('vendor.state', { required: true })
    register('vendor.country', { required: true })

    useEffect(() => {
        if (vendorDetails) {
            // setValue('vendor', vendorDetails)
            setValue('vendor.name', vendorDetails?.name)
            setValue('vendor.phone', vendorDetails?.phone)
            setValue('vendor.email', vendorDetails?.email)
            setValue('vendor.business_name', vendorDetails?.business_name)
            setValue('vendor.city', vendorDetails?.city)
            setValue('vendor.state', vendorDetails?.state)
            setValue('vendor.country', vendorDetails?.country)
            setValue('vendor.pin_code', vendorDetails?.pin_code?.toString())
            setValue('vendor.state', vendorDetails?.state)
            setValue('vendor.occupation', vendorDetails?.occupation)
            setValue('vendor.id', vendorDetails?.id)
            setValue('vendor.status', vendorDetails?.status === '1' ? true : false)
            setSelectedCountry({ label: vendorDetails?.country_name, value: vendorDetails?.country, })
            setSelectedState({ label: vendorDetails?.state_name, value: vendorDetails?.state, })
            setSelectedCity({ label: vendorDetails?.city_name, value: vendorDetails?.city, })
            getCityList(vendorDetails?.state)
            getState(vendorDetails?.country)
            setPreviewImage(vendorDetails?.profile_image)
        }else{
            dispatch(resetUserDetails())
        }

        return () => {

        }
    }, [vendorDetails])


    useEffect(() => {
        getCountry()
        setValue('vendor.user_type', UserTypeCont.VENDOR)
        return () => { }
    }, [])

    useEffect(() => {
        if (params.id) {
            dispatch(getVendorDetailsById(params.id))
        } else {
            setValue('vendor.status', true)
        }
        return () => { }
    }, [params])


    const onSave = (data) => {
        if (params.id) {
            dispatch(updateVendorAction(data))
        } else {
            dispatch(createVendorAction(data))
        }
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
        return () => { }
    }, [file])

    const onSubmit = (data) => {
        data = {
            ...data.vendor,
            status: data.vendor.status ? "1" : "0",
        }
        if (data?.profile_image_file) {
            const formData = new FormData();
            formData.append('myfiles', data?.profile_image_file[0]);
            formData.append('type', TypeConst.Profile);
            dispatch(fileUpload(formData))
            delete data?.profile_image_file
            setImageWithData(data)
        } else {
            // create 
            onSave(data)
        }
        // if (selectedOption === "categoryWise") {

        // } else {
        //     delete data?.offer_image
        //     onSave(data)
        // }
        console.log(data)
    }

    useEffect(() => {
        if (vendorFlag) {
            navigate('/vendors/vendors-list')
        }
        return () => { }
    }, [vendorFlag])

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const isImage = files[0].type.startsWith('image/');
            if (isImage) {
                setValue('vendor.profile_image_file', files);
                setPreviewImage(URL.createObjectURL(files[0]))
                clearErrors('vendor.profile_image_file')
            } else {
                setValue('vendor.profile_image_file', null);
                setPreviewImage('')
            }
        }
    };


    return (
        <div>
            {(loading || commonLoading) && <Loader />}
            <Breadcrumb name={'Vendors'} menuItem={[{ name: 'Vendors' }, { name: params?.id ? 'Update' : 'Create' }]} />
            <div className="col-12 col-md-12 col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h3>Vendors {params?.id ? 'Update' : 'Create'}</h3>
                    </div>
                    <FormProvider {...methods}>
                        <div className=" row card-body">
                            <div className="col-xl-3 ">
                                <FileUpload
                                    control={control}
                                    name={'offer.offer_image_file'}
                                    label={"Profile Image"}
                                    // rules={{ required: previewImage ? false : true }}
                                    className={errors?.offer?.offer_image_file ? 'upload-error' : ''}
                                    handleFileChange={handleFileChange}
                                    previewImage={previewImage}
                                    accept={'image/*'}
                                />
                            </div>
                            <div className="col-xl-9">
                                <div className='row'>
                                    <div className='col-xl-6'>
                                        <InputBox
                                            control={control}
                                            label={"Name"}
                                            type={'text'}
                                            name={'vendor.name'}
                                            rules={{ required: true }}
                                            className={errors?.vendor?.name ? 'error' : ''}
                                        />

                                        <InputBox
                                            control={control}
                                            label={"Phone"}
                                            type={'text'}
                                            name={'vendor.phone'}
                                            rules={{ required: true }}
                                            className={errors?.vendor?.phone ? 'error' : ''}
                                        />

                                        <InputBox
                                            control={control}
                                            label={"Email"}
                                            type={'email'}
                                            name={'vendor.email'}
                                            rules={{
                                                required: true, pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: '',
                                                }
                                            }}
                                            className={errors?.vendor?.email ? 'error' : ''}
                                        />
                                        {!params.id && <InputBox
                                            control={control}
                                            label={"Password"}
                                            type={'password'}
                                            name={'vendor.password'}
                                            rules={{
                                                required: true
                                            }}
                                            className={errors?.vendor?.password ? 'error' : ''}
                                        />}
                                        <InputBox
                                            control={control}
                                            label={"Business Name"}
                                            type={'text'}
                                            name={'vendor.business_name'}
                                            rules={{ required: true }}
                                            className={errors?.vendor?.business_name ? 'error' : ''}
                                        />

                                    </div>
                                    <div className='col-xl-6'>

                                        <CustomSelectBox
                                            options={countryOpt}
                                            value={selectedCountry}
                                            onChange={(e) => {
                                                setValue('vendor.country', e.value)
                                                setSelectedCountry(e)
                                                getState(e.value)
                                                clearErrors('vendor.country')
                                            }}
                                            label={"Country"}
                                            required={true}
                                            isLoading={loactionLoading}
                                            className={errors?.vendor?.country ? "error" : ""}
                                        />
                                        <CustomSelectBox
                                            options={statueOpt}
                                            value={selectedState}
                                            onChange={(e) => {
                                                setValue('vendor.state', e.value)
                                                setSelectedState(e)
                                                getCityList(e.value)
                                                clearErrors('vendor.state')
                                            }}
                                            label={"State"}
                                            required={true}
                                            isLoading={loactionLoading}
                                            className={errors?.vendor?.state ? "error" : ""}
                                        />
                                        <CustomSelectBox
                                            options={cityOpt}
                                            value={selectedCity}
                                            onChange={(e) => {
                                                setValue('vendor.city', e.value)
                                                setSelectedCity(e)
                                                clearErrors('vendor.city')
                                            }}
                                            label={"City"}
                                            required={true}
                                            isLoading={loactionLoading}
                                            className={errors?.vendor?.city ? "error" : ""}
                                        />
                                        <InputBox
                                            control={control}
                                            label={"Pin Code"}
                                            type={'text'}
                                            name={'vendor.pin_code'}
                                            rules={{
                                                required: true, pattern: {
                                                    value: /^\d{6}$/,
                                                    message: 'Invalid PIN code. Please enter a 6-digit PIN.',
                                                }
                                            }}
                                            className={errors?.vendor?.pin_code ? 'error' : ''}
                                        />
                                        <InputBox
                                            control={control}
                                            label={"Occupation"}
                                            type={'text'}
                                            name={'vendor.occupation'}
                                            rules={{ required: true }}
                                            className={errors?.vendor?.occupation ? 'error' : ''}
                                        />
                                        <div className="form-group" >
                                            <div>
                                                <input
                                                    type='checkbox'
                                                    placeholder='February'
                                                    {...register('vendor.status')}
                                                    className=''
                                                    id='status'
                                                />
                                                <label className='ml-2' htmlFor='status'>Active</label>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer text-right">
                            <button type="button" className="btn btn-primary" onClick={handleSubmit(onSubmit)}>Save changes</button>
                            <button type="button" className="btn btn-secondary ml-2" onClick={() => navigate("/vendors/vendors-list")}>Cansel</button>
                        </div>

                    </FormProvider>
                </div>
            </div>
        </div>
    )
}

export default VendorsAddEdit