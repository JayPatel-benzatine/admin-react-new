import React, { Fragment, useEffect, useState } from 'react'
import { Breadcrumb, CustomSelectBox, InputBox, Loader, MutipleFileUpload } from '../../../components'
import { FormProvider, useForm } from 'react-hook-form';
import { useCategoryHook, useDataHook, useVariantHook } from '../../../Hooks';
import { useDispatch, useSelector } from 'react-redux';
import { addProductAction, getByIdProductDetails, updateProductAction } from '../../../store/action/ProductRedux';
import { countries } from 'countries-list';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateImageProduct from './UpdateImageProduct';
import { toastError } from '../../../utils/toastify';

function ProductAddEdit() {
    const params = useParams()
    const productReducer = useSelector((state) => state.product)
    const { addProduct, loading: productLoading, productData } = productReducer
    const [files, setFiles] = useState([]);
    const methods = useForm()
    const { control, formState: { errors }, register, handleSubmit, clearErrors, setError, setValue, reset } = methods
    const { userData, setTypeHandler, loading } = useDataHook()
    const { loading: loadingVariant, colorOpt, sizeOpt, patternOpt } = useVariantHook()
    const { categoryList, loading: loadingCategory } = useCategoryHook()
    const [vendorOpt, setVendorOpt] = useState([])
    const [selectCategory, setSelectCategory] = useState(null)
    const [selectVender, setSelectVender] = useState(null)
    const [selectSize, setSelectSize] = useState(null)
    const [selectColor, setSelectColor] = useState(null)
    const [selectPatten, setSelectPatten] = useState(null)
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [imageArray, setImageArray] = useState([])
    const countryOptions = Object.keys(countries).map((code) => ({
        value: code,
        label: countries[code].name,
    }));
    const navigate = useNavigate()

    const dispatch = useDispatch()
    register('product.vender_id', { required: true })
    register('product.category_id', { required: true })
    register('product.size', { required: false })
    register('product.colour', { required: false })
    register('product.pattern', { required: false })
    register('product.images', { required: params.id ? false : true })
    register('product.country_of_origin', { required: true })

    useEffect(() => {
        if (params && params?.id) {
            dispatch(getByIdProductDetails(params.id))
        }
        return () => { }
    }, [params])

    useEffect(() => {
        if (productData && params.id) {
            setValue('product', productData)
            setValue('product.isfeatured', productData?.isfeatured === '1' ? true : false)
            setValue('product.isonsale', productData?.isonsale === '1' ? true : false)
            setSelectVender({ label: productData?.vendername, value: productData?.vender_id })
            setSelectCategory({ label: productData?.categories, value: productData?.category_id })
            setValue('product.quantity', productData?.quantity)
            let size = productData?.size && productData?.size !== "undefined" && JSON.parse(productData?.size)
            let color = productData?.colour && productData?.colour !== "undefined" && JSON.parse(productData?.colour)
            let pattern = productData?.pattern && productData?.pattern !== "undefined" && JSON.parse(productData?.pattern)
            if (size) {
                let sizeOpt = []
                size.length > 0 && size.map((item) => (
                    sizeOpt.push(item)
                ))
                setSelectSize(sizeOpt)
            }
            if (color) {
                let colorOpt = []
                color.length > 0 && color.map((item) => (
                    colorOpt.push(item)
                ))
                setSelectColor(colorOpt)
            }
            if (pattern) {
                let patternOpt = []
                pattern.length > 0 && pattern.map((item) => (
                    patternOpt.push(item)
                ))
                setSelectPatten(patternOpt)
            }
            setSelectedCountry({ label: productData?.country_of_origin, value: productData?.country_of_origin })
        } else {
            reset()
        }

        return () => {

        }
    }, [productData, params])


    useEffect(() => {
        if (addProduct && !productLoading) {
            navigate('/product/list')
        }
        return () => { }
    }, [addProduct])

    useEffect(() => {
        if (files && files.length !== 0) {
            clearErrors('product.images')
            setValue('product.images', "test")
        }
        return () => { }
    }, [files])

    useEffect(() => {
        setTypeHandler('VENDOR')
        return () => { }
    }, [])

    useEffect(() => {
        if (userData) {
            let arr = []
            userData.map((item) => (
                arr.push({ label: item.name, value: item.id })
            ))
            setVendorOpt(arr)
        }
        return () => { }
    }, [userData])

    const getColorCodeById = (id) => {
        const colorItem = colorOpt.find(item => item.id === id);
        return colorItem ? colorItem.color_code : null;
    };

    const formatOptionLabel = ({ label, value }) => (
        <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ backgroundColor: getColorCodeById(value), borderRadius: "50%", width: '20px', height: '20px', display: 'inline-block', border: "1px solid #000" }}></span>
            <span style={{ marginLeft: 10, color: 'gray', textTransform: "capitalize" }}>{label}</span>
        </div>
    );

    const onChangeCategory = (e) => {
        setSelectCategory(e)
        clearErrors('product.category_id')
        setValue('product.category_id', e.value)
    }

    function objectToFormData(obj, formData, parentKey = '') {
        formData = formData || new FormData();
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                const propName = parentKey ? `${parentKey}[${key}]` : key;
                const propValue = obj[key];
                if (Array.isArray(propValue) || (propValue instanceof Object && !(propValue instanceof File))) {
                    objectToFormData(propValue, formData, propName);
                } else {
                    formData.append(propName, propValue);
                }
            }
        }
        !params.id && files.map((item, i) => (
            formData.append(`image${i + 1}`, item)
        ))
        return formData;
    }

    const onSubmit = (data) => {
        if (params.id && imageArray && imageArray.length === 0) {
            toastError("Please upload one image!!!")
        } else {
            data = {
                ...data.product,
                istrusted: 1,
                isfeatured: data.product.isfeatured ? 1 : 0,
                isonsale: data.product.isonsale ? 1 : 0,
            }
            delete data.images;
            delete data?.productImages
            delete data?.categories
            delete data?.multipack
            let formDataObj = objectToFormData(data)
            if (params.id) {
                dispatch(updateProductAction({ id: params.id, formData: formDataObj }))
            } else {
                dispatch(addProductAction(formDataObj))
            }

            // function logFormData(formDataObj) {
            //     for (let pair of formDataObj.entries()) {
            //         console.log(pair[0] + ': ' + pair[1]);
            //     }
            // }

            // // Assuming you already have a FormData object named 'formData'
            // logFormData(formDataObj);
        }

    }

    const removeImage = (i) => {
        const newFiles = [...files];
        newFiles.splice(i, 1);
        setFiles(newFiles);
        if (newFiles.length === 0) {
            setError("product.images")
        } else {
            clearErrors('product.images')
        }
    }



    return (
        <Fragment>
            {productLoading && <Loader />}
            <Breadcrumb name={'product'} menuItem={[{ name: 'product' }, { name: `${params.id ? 'Update' : 'Add'}` }]} />
            <div className="card">
                <div className="card-header">
                    <h3>Product {params.id ? "Update" : "Add"}</h3>
                </div>
                <FormProvider {...methods}>
                    <div className="row product-page-main card-body">
                        <div className="col-xl-4 ">
                            {!params.id && <MutipleFileUpload
                                limit={5}
                                accept={{ 'image/*': [] }}
                                setFiles={setFiles}
                                files={files}
                                className={errors.product?.images ? 'error' : ''}
                                name={'product.images'}
                                removeImage={removeImage}
                            />}
                            {params.id &&

                                <div className='row'>
                                    {Array(5).fill(null).map((item, i) => {
                                        return (
                                            <div className='col-sm-6 col-12'>
                                                <UpdateImageProduct
                                                    name={`product.image${i + 1}`}
                                                    preImage={productData?.productImages[i]?.name}
                                                    imageId={productData?.productImages[i]?.id}
                                                    setImageArray={setImageArray}
                                                    imageArray={imageArray}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>

                            }
                        </div>
                        <div className="col-xl-8 ">
                            <div className='row'>
                                <div className='col-xl-6'>
                                    <CustomSelectBox
                                        options={vendorOpt}
                                        isLoading={loading}
                                        isSearchable
                                        value={selectVender}
                                        onChange={(e) => {
                                            setValue('product.vender_id', e.value)
                                            setSelectVender(e)
                                            clearErrors('product.vender_id')
                                        }}
                                        label={"Vendor"}
                                        className={errors?.product?.vender_id ? "error" : ""}
                                        required={true}
                                    />
                                    <InputBox
                                        control={control}
                                        label={"Name"}
                                        type={'text'}
                                        name={'product.name'}
                                        rules={{ required: true }}
                                        className={errors?.product?.name ? 'error' : ''}
                                    />
                                    <CustomSelectBox
                                        value={selectCategory}
                                        options={categoryList}
                                        isLoading={loadingCategory}
                                        isSearchable
                                        onChange={onChangeCategory}
                                        label={"Category"}
                                        className={errors?.product?.category_id ? "error" : ""}
                                        required={true}
                                    />
                                    <InputBox
                                        control={control}
                                        label={"Material "}
                                        type={'text'}
                                        name={'product.material'}
                                        rules={{ required: true }}
                                        className={errors?.product?.material ? 'error' : ''}
                                    />
                                    <InputBox
                                        control={control}
                                        label={"Price"}
                                        type={'number'}
                                        name={'product.price'}
                                        rules={{ required: true }}
                                        className={errors?.product?.price ? 'error' : ''}
                                    />
                                    <CustomSelectBox
                                        options={sizeOpt}
                                        isLoading={loadingVariant}
                                        isMulti={true}
                                        isSearchable
                                        value={selectSize}
                                        onChange={(e) => {
                                            setValue('product.size', JSON.stringify(e))
                                            setSelectSize(e)
                                            clearErrors('product.size')
                                        }}
                                        label={"Select Size"}
                                        className={errors?.product?.size ? "error" : ""}
                                    />
                                </div>
                                <div className='col-xl-6'>
                                    <CustomSelectBox
                                        options={colorOpt}
                                        isLoading={loadingVariant}
                                        isMulti={true}
                                        formatOptionLabel={formatOptionLabel}
                                        isSearchable
                                        value={selectColor}
                                        onChange={(e) => {
                                            setValue('product.colour', JSON.stringify(e))
                                            setSelectColor(e)
                                            clearErrors('product.colour')
                                        }}
                                        label={"Color"}
                                        className={errors?.product?.colour ? "error" : ""}
                                    />
                                    <CustomSelectBox
                                        options={patternOpt}
                                        isLoading={loadingVariant}
                                        isMulti={true}
                                        isSearchable
                                        value={selectPatten}
                                        onChange={(e) => {
                                            setValue('product.pattern', JSON.stringify(e))
                                            setSelectPatten(e)
                                            clearErrors('product.pattern')
                                        }}
                                        label={"Pattern"}
                                        className={errors?.product?.pattern ? "error" : ""}
                                    />
                                    <div className='row'>
                                        <div className='col-sm-6 col-12 '>
                                            <InputBox
                                                control={control}
                                                label={"No. of Compartments "}
                                                type={'number'}
                                                name={'product.no_of_comparments'}
                                                rules={{ required: true }}
                                                className={errors?.product?.no_of_comparments ? 'error' : ''}
                                            />
                                        </div>
                                        <div className='col-sm-6 col-12 '>
                                            <InputBox
                                                control={control}
                                                label={"Dispatched days"}
                                                type={'number'}
                                                name={'product.dispatched_days'}
                                                rules={{ required: true }}
                                                className={errors?.product?.dispatched_days ? 'error' : ''}
                                            />
                                        </div>
                                    </div>

                                    <InputBox
                                        control={control}
                                        label={"Quantity"}
                                        type={'number'}
                                        name={'product.quantity'}
                                        rules={{ required: true }}
                                        className={errors?.product?.quantity ? 'error' : ''}
                                    />

                                    <CustomSelectBox
                                        options={countryOptions}
                                        isSearchable
                                        value={selectedCountry}
                                        onChange={(e) => {
                                            setValue('product.country_of_origin', e.label)
                                            setSelectedCountry(e)
                                            clearErrors('product.country_of_origin')
                                        }}
                                        label={"Country of origin"}
                                        className={errors?.product?.country_of_origin ? "error" : ""}
                                        required={true}
                                    />
                                    <div className="form-group">
                                        <label className='d-flex mb-0'>Short Description <span className='text-danger font-16'>*</span></label>
                                        <textarea className={`form-control ${errors?.product?.short_description ? 'error' : ''}`} {...register('product.short_description', { required: true })}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                                <div>
                                    <input
                                        type='checkbox'
                                        placeholder='February'
                                        {...register('product.isfeatured')}
                                        className=''
                                        id='isfeatured'
                                    />
                                    <label className='ml-2' htmlFor='isfeatured'>Is Featured?</label>
                                </div>
                                <div>
                                    <input
                                        type='checkbox'
                                        placeholder='February'
                                        {...register('product.isonsale')}
                                        className=''
                                        id='isOnSale'
                                    />
                                    <label className='ml-2' htmlFor='isOnSale'>Is On Sale?</label>
                                </div>
                            </div>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit(onSubmit)} >Save changes</button>
                            <button type="button" className="btn btn-secondary ml-2" onClick={() => navigate('/product/list')} >Close</button>
                        </div>

                    </div>
                </FormProvider>

            </div>
        </Fragment>

    )
}

export default ProductAddEdit