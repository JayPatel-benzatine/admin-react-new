import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCityByStateIdList, getCountryList, getStateList } from '../../store/action/CommonRedux'

function useLocationHook() {
    const [countryOpt, setCountryOpt] = useState([])
    const [statueOpt, setStatueOpt] = useState([])
    const [cityOpt, setCityOpt] = useState([])
    const CommonRedux = useSelector((state) => state.common)
    const { loading, countryList, stateList, cityList } = CommonRedux
    const dispatch = useDispatch()

    useEffect(() => {
        let opt = []
        countryList && countryList.length > 0 && countryList.map((item) => {
            opt.push({ label: item?.name, value: item?.id.toString() })
        })
        setCountryOpt(opt)
        return () => { }
    }, [countryList])

    useEffect(() => {
        let opt = []
        stateList && stateList.length > 0 && stateList.map((item) => {
            opt.push({ label: item?.name, value: item?.id.toString() })
        })
        setStatueOpt(opt)
        return () => { }
    }, [stateList])

    useEffect(() => {
        let opt = []
        cityList && cityList.length > 0 && cityList.map((item) => {
            opt.push({ label: item?.name, value: item?.id.toString() })
        })
        setCityOpt(opt)
        return () => { }
    }, [cityList])

    const getCountry = () => {
        dispatch(getCountryList())
    }

    const getState = (cId) => {
        dispatch(getStateList(cId))
    }

    const getCityList = (sId) => {
        dispatch(getCityByStateIdList(sId))
    }

    return { getCountry, getState, getCityList, countryOpt, statueOpt, cityOpt, loading }
}

export default useLocationHook