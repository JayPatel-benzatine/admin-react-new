import React, { useEffect, useState } from 'react'
import { Breadcrumb, CustomDatePicker, CustomSelectBox, InputBox, Loader } from '../../../components'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import moment from 'moment';
import DiscountType from '../../../Enum/DiscountType';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createCouponAction, getCouponsDetailsById, resetCouponsDetailsData, updateCouponAction } from '../../../store/action/CouponsRedux';

function CouponsAddEdit() {
    const methods = useForm()
    const params = useParams()
    const couponsReducer = useSelector((state) => state.coupons)
    const userReducer = useSelector((state) => state.auth)
    const { couponFlag, loading, couponsDetails } = couponsReducer
    const { control, formState: { errors }, register, handleSubmit, setValue, clearErrors, setError, reset, unregister } = methods
    const selectedStartDateWatch = useWatch({ control, name: 'coupon.select_start_date' });
    const selectedEndDateWatch = useWatch({ control, name: 'coupon.select_end_date' });
    const coupanCodeWatch = useWatch({ control, name: 'coupon.coupan_code' });
    const discountTypeOpt = [
        { label: DiscountType.FIXED, value: DiscountType.FIXED },
        { label: DiscountType.PERCENT, value: DiscountType.PERCENT }
    ]
    const [selectedDiscountType, setSelectedDiscountType] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    register('coupon.discount_type', { required: true })

    useEffect(() => {
        if (params && params?.id) {
            dispatch(getCouponsDetailsById(params.id))
        } else {
            reset()
            dispatch(resetCouponsDetailsData())
        }
        return () => { }
    }, [params])

    useEffect(() => {
        if (couponsDetails) {
            setValue('coupon', couponsDetails)
            setValue('coupon.select_start_date', new Date(couponsDetails?.start_date))
            setValue('coupon.select_end_date', new Date(couponsDetails?.end_date))
            setValue('coupon.isfreeshipping', couponsDetails?.isfreeshipping === '1' ? true : false)
            setValue('coupon.status', couponsDetails?.status === '1' ? true : false)
            setSelectedDiscountType({ label: couponsDetails?.discount_type, value: couponsDetails?.discount_type })
        } else {
            reset()
            unregister()
        }
        return () => { }
    }, [couponsDetails])


    useEffect(() => {
        if (coupanCodeWatch) {
            setValue('coupon.coupan_code', coupanCodeWatch.toUpperCase())
        }
        return () => { }
    }, [coupanCodeWatch])


    useEffect(() => {
        if (couponFlag) {
            navigate('/coupons/list')
        }
        return () => { }
    }, [couponFlag])


    useEffect(() => {
        if (!params.id) {
            setValue('coupon.isfreeshipping', true)
            setValue('coupon.status', true)
        }

        return () => { }
    }, [params])

    useEffect(() => {
        if (userReducer && userReducer?.user && userReducer?.user?.id) {
            setValue('coupon.vender_id', userReducer?.user?.id)
        }
        return () => { }
    }, [userReducer])


    useEffect(() => {
        if (selectedStartDateWatch) {
            setValue('coupon.start_date', moment(selectedStartDateWatch).format('YYYY-MM-DD'))
        }
        if (selectedEndDateWatch) {
            setValue('coupon.end_date', moment(selectedEndDateWatch).format('YYYY-MM-DD'))
        }
        if (selectedStartDateWatch && selectedEndDateWatch) {
            if (selectedStartDateWatch < selectedEndDateWatch) {
                clearErrors("coupon.select_end_date")
            } else {
                setValue('coupon.select_end_date', null)
                setError('coupon.select_end_date')
            }
        }
        return () => { }
    }, [selectedStartDateWatch, selectedEndDateWatch])

    const onSubmit = (data) => {
        console.log("data", data)
        data = {
            ...data.coupon,
            isfreeshipping: data.coupon.isfreeshipping ? "1" : "0",
            status: data.coupon.status ? "1" : "0",
        }
        if (params?.id) {
            dispatch(updateCouponAction(data))
        } else {

            dispatch(createCouponAction(data))
        }
    }
    return (
        <div>
            {loading && <Loader />}
            <Breadcrumb name={'coupons'} menuItem={[{ name: 'coupons' }, { name: params?.id ? 'Update' : 'Create' }]} />
            <div className="col-12 col-md-12 col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h3>Coupons {params?.id ? 'Update' : 'Create'}</h3>
                    </div>
                    <div className=" row card-body">
                        <FormProvider {...methods}>
                            <div className='col-12 col-xl-6'>
                                <InputBox
                                    control={control}
                                    label={"Coupon Title"}
                                    type={'text'}
                                    name={'coupon.coupan_title'}
                                    rules={{ required: true }}
                                    className={errors?.coupon?.coupan_title ? 'error' : ''}
                                />
                                <CustomDatePicker
                                    control={control}
                                    label={"Start Date"}
                                    name={'coupon.select_start_date'}
                                    rules={{ required: true }}
                                    className={errors?.coupon?.select_start_date ? 'error' : ''}
                                    placeholder={"select start date"}
                                />
                                <CustomSelectBox
                                    options={discountTypeOpt}
                                    value={selectedDiscountType}
                                    onChange={(e) => {
                                        setValue('coupon.discount_type', e.value)
                                        setSelectedDiscountType(e)
                                        clearErrors('coupon.discount_type')
                                    }}
                                    label={"Discount Type"}
                                    className={errors?.coupon?.discount_type ? "error" : ""}
                                />
                                <InputBox
                                    control={control}
                                    label={"Minimum Spend"}
                                    type={'number'}
                                    name={'coupon.minimum_spend'}
                                    rules={{ required: true }}
                                    className={errors?.coupon?.minimum_spend ? 'error' : ''}
                                />
                                <InputBox
                                    control={control}
                                    label={"Quantity"}
                                    type={'number'}
                                    name={'coupon.quantity'}
                                    rules={{ required: true }}
                                    className={errors?.coupon?.quantity ? 'error' : ''}
                                />
                            </div>
                            <div className='col-12 col-xl-6'>
                                <InputBox
                                    control={control}
                                    label={"Coupon Code"}
                                    type={'text'}
                                    name={'coupon.coupan_code'}
                                    rules={{ required: true }}
                                    className={errors?.coupon?.coupan_code ? 'error' : ''}
                                />
                                <CustomDatePicker
                                    control={control}
                                    label={"End Date"}
                                    name={'coupon.select_end_date'}
                                    rules={{ required: true }}
                                    className={errors?.coupon?.select_end_date ? 'error' : ''}
                                    placeholder={"select start date"}
                                    minDate={selectedStartDateWatch}
                                />
                                <InputBox
                                    control={control}
                                    label={"Discount "}
                                    type={'number'}
                                    name={'coupon.discount_amount'}
                                    rules={{ required: true }}
                                    className={errors?.coupon?.discount_amount ? 'error' : ''}
                                />
                                <InputBox
                                    control={control}
                                    label={"Maximum Spend"}
                                    type={'number'}
                                    name={'coupon.maximum_spend'}
                                    rules={{ required: true }}
                                    className={errors?.coupon?.maximum_spend ? 'error' : ''}
                                />
                                <div className="form-group" style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                                    <div>
                                        <input
                                            type='checkbox'
                                            placeholder='February'
                                            {...register('coupon.status')}
                                            className=''
                                            id='status'
                                        />
                                        <label className='ml-2' htmlFor='status'>Enable the Coupon</label>
                                    </div>
                                    <div>
                                        <input
                                            type='checkbox'
                                            placeholder='February'
                                            {...register('coupon.isfreeshipping')}
                                            className=''
                                            id='isOnSale'
                                        />
                                        <label className='ml-2' htmlFor='isOnSale'>Allow Free Shipping</label>
                                    </div>
                                </div>
                                <div className='float-right'>
                                    <button type="button" className="btn btn-primary" onClick={handleSubmit(onSubmit)}>Save changes</button>
                                    <button type="button" className="btn btn-secondary ml-2" onClick={() => navigate("/coupons/list")}>Cansel</button>
                                </div>
                            </div>
                        </FormProvider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CouponsAddEdit