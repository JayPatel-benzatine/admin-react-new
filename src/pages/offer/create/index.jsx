import React, { useEffect, useState } from 'react'
import { Breadcrumb, CustomDatePicker, CustomSelectBox, FileUpload, InputBox, Loader } from '../../../components'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useCategoryHook, useGetProductByCategoryHook } from '../../../Hooks';
import DiscountType from '../../../Enum/DiscountType';
import moment from 'moment';
import { fileUpload, setEmptyfile } from '../../../store/action/CommonRedux';
import TypeConst from '../../../Enum/TypeConst';
import { createOfferAction, getOfferDetailsById, updateCouponAction } from '../../../store/action/OfferRedux';

function OfferAddEdit() {
    const methods = useForm()
    const params = useParams()
    const offerReducer = useSelector((state) => state.offer)
    const { offerFlag, loading, offerDetails } = offerReducer
    const commonReducer = useSelector((state) => state.common)
    const { loading: commonLoading, file } = commonReducer
    const [selectedOption, setSelectedOption] = useState('productWise');
    const [previewImage, setPreviewImage] = useState("");

    const { control, formState: { errors }, register, handleSubmit, setValue, clearErrors, setError, reset, unregister } = methods
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { categoryList, loading: loadingCategory } = useCategoryHook()
    const { productByCategoryOpt, setCategoryId, loading: productByCategoryLoader } = useGetProductByCategoryHook()
    const discountTypeOpt = [
        { label: DiscountType.FIXED, value: DiscountType.FIXED },
        { label: DiscountType.PERCENT, value: DiscountType.PERCENT }
    ]
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedDiscountType, setSelectedDiscountType] = useState(null)
    const [selectedPRoduct, setSelectedPRoduct] = useState(null)
    const selectedEndDateWatch = useWatch({ control, name: 'offer.select_end_date' });
    const [imageWithData, setImageWithData] = useState(null)

    register('offer.category_id', { required: true })
    register('offer.product_id', { required: selectedOption === 'productWise' ? true : false })
    register('offer.offer_type', { required: true })

    useEffect(() => {
        if (!params.id) {
            setValue('offer.status', true)
        } else {
            dispatch(getOfferDetailsById(params.id))
        }

        return () => { }
    }, [params])

    useEffect(() => {
        if (offerDetails) {
            setValue('offer', offerDetails)
            setValue('offer.select_end_date', new Date(offerDetails?.end_date))
            setValue('offer.status', offerDetails?.status === '1' ? true : false)
            setSelectedDiscountType({ label: offerDetails?.offer_type, value: offerDetails?.offer_type })
            if (offerDetails?.product_id) {
                setSelectedPRoduct({ label: offerDetails?.product_name, value: offerDetails?.product_id })
                setSelectedOption('productWise')
                setCategoryId(offerDetails?.category_id)
            } else {
                setSelectedOption('categoryWise')
            }
            setSelectedCategory({ label: offerDetails?.category_name, value: offerDetails?.category_id })
           
            offerDetails?.offer_image && setPreviewImage(offerDetails?.offer_image)

        }
        return () => {}
    }, [offerDetails])

    useEffect(() => {
        if (selectedEndDateWatch) {
            setValue('offer.end_date', moment(selectedEndDateWatch).format('YYYY-MM-DD'))
        }
        return () => { }
    }, [selectedEndDateWatch])

    const handleRadioChange = (e) => {
        if (e.target.value === "productWise" && selectedCategory) {
            setCategoryId(selectedCategory?.value)
        }
        setSelectedOption(e.target.value);
    };

    useEffect(() => {
        if (file) {
            onSaveDataWithFile(file)
        }
        return () => {}
    }, [file])

    const onSaveDataWithFile = (image) => {
        let data = { ...imageWithData, offer_image: image }
        onSave(data)
        dispatch(setEmptyfile())
    }

    const onSave = (data) => {
        if (params.id) {
            dispatch(updateCouponAction(data))
        } else {
            dispatch(createOfferAction(data))
        }
    }

    useEffect(() => {
        if (offerFlag) {
            navigate('/offer/offer-list')
        }
        return () => { }
    }, [offerFlag])


    const onSubmit = (data) => {
        data = {
            ...data.offer,
            status: data.offer.status ? "1" : "0",
        }
        if (selectedOption === "categoryWise") {
            if (data?.offer_image_file) {
                const formData = new FormData();
                formData.append('myfiles', data?.offer_image_file[0]);
                formData.append('type', TypeConst.Offer);
                dispatch(fileUpload(formData))
                delete data?.offer_image_file
                setImageWithData(data)
            } else {
                // create 
                onSave(data)
            }
        } else {
            delete data?.offer_image
            onSave(data)
        }
    }
    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const isImage = files[0].type.startsWith('image/');
            if (isImage) {
                setValue('offer.offer_image_file', files);
                setPreviewImage(URL.createObjectURL(files[0]))
                clearErrors('offer.offer_image_file')
            } else {
                setError('offer.offer_image_file', { type: 'required' })
                setValue('offer.offer_image_file', null);
                setPreviewImage('')
            }
        }
    };


    return (
        <div>
            {(loading || commonLoading) && <Loader />}
            <Breadcrumb name={'offer'} menuItem={[{ name: 'offer' }, { name: params?.id ? 'Update' : 'Create' }]} />
            <div className="col-12 col-md-12 col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h3>Offer {params?.id ? 'Update' : 'Create'}</h3>
                    </div>
                    <div className=" row card-body">
                        <FormProvider {...methods}>
                            <div className='col-12'>
                                <div className='col-12 col-xl-6'>
                                    <div className="form-group radio-group">
                                        <div className="form-check">

                                            <label className="form-check-label" htmlFor="productWise">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="productWise"
                                                    id="productWise"
                                                    value={'productWise'}
                                                    checked={selectedOption === 'productWise'}
                                                    onChange={handleRadioChange}
                                                />
                                                Product wise
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <label className="form-check-label" htmlFor="categoryWise">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="categoryWise"
                                                    id="categoryWise"
                                                    value={"categoryWise"}
                                                    checked={selectedOption === 'categoryWise'}
                                                    onChange={handleRadioChange}
                                                />
                                                Category wise
                                            </label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='col-12 col-xl-6'>
                                <CustomSelectBox
                                    options={categoryList}
                                    isLoading={loadingCategory}
                                    value={selectedCategory}
                                    onChange={(e) => {
                                        selectedOption === "productWise" && setCategoryId(e.value)
                                        setSelectedCategory(e)
                                        setValue('offer.category_id', e.value)
                                        clearErrors('offer.category_id')
                                    }}
                                    label={"Category"}
                                    className={errors?.offer?.category_id ? "error" : ""}
                                    required={true}
                                />
                                <CustomSelectBox
                                    options={discountTypeOpt}
                                    value={selectedDiscountType}
                                    onChange={(e) => {
                                        setValue('offer.offer_type', e.value)
                                        setSelectedDiscountType(e)
                                        clearErrors('offer.offer_type')
                                    }}
                                    label={"Offer Type"}
                                    required={true}
                                    className={errors?.offer?.offer_type ? "error" : ""}
                                />
                                <CustomDatePicker
                                    control={control}
                                    label={"End Date"}
                                    name={'offer.select_end_date'}
                                    rules={{ required: true }}
                                    className={errors?.offer?.select_end_date ? 'error' : ''}
                                    placeholder={"select end date"}
                                />

                            </div>
                            <div className='col-12 col-xl-6'>
                                {selectedOption === "productWise" && <CustomSelectBox
                                    options={productByCategoryOpt}
                                    isLoading={productByCategoryLoader}
                                    value={selectedPRoduct}
                                    onChange={(e) => {
                                        setValue('offer.product_id', e.value)
                                        setSelectedPRoduct(e)
                                        clearErrors('offer.product_id')
                                    }}
                                    label={"Product"}
                                    required={true}
                                    className={errors?.offer?.product_id ? "error" : ""}
                                />}
                                <InputBox
                                    control={control}
                                    label={"Offer Amount"}
                                    type={'number'}
                                    name={'offer.offer_amount'}
                                    rules={{ required: true }}
                                    className={errors?.offer?.offer_amount ? 'error' : ''}
                                />

                                {selectedOption === "categoryWise" && <FileUpload
                                    control={control}
                                    name={'offer.offer_image_file'}
                                    label={"Offer Image"}
                                    rules={{ required: previewImage ? false : true }}
                                    className={errors?.offer?.offer_image_file ? 'upload-error' : ''}
                                    handleFileChange={handleFileChange}
                                    previewImage={previewImage}
                                    accept={'image/*'}
                                />}
                                <div className="form-group" >
                                    <div>
                                        <input
                                            type='checkbox'
                                            placeholder='February'
                                            {...register('offer.status')}
                                            className=''
                                            id='status'
                                        />
                                        <label className='ml-2' htmlFor='status'>Active</label>
                                    </div>

                                </div>
                                <div className='float-right'>
                                    <button type="button" className="btn btn-primary" onClick={handleSubmit(onSubmit)}>Save changes</button>
                                    <button type="button" className="btn btn-secondary ml-2" onClick={() => navigate("/offer/offer-list")}>Cansel</button>
                                </div>
                            </div>
                        </FormProvider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OfferAddEdit