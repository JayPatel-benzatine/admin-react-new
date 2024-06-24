import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getVariantList } from "../../store/action/CommonRedux"
import VariantConst from "../../Enum/VariantConst"

const useVariantHook = () => {
    const [variantList, setVariantList] = useState([])
    const [colorOpt, setColorOpt] = useState([{ label: "", value: "" }])
    const [sizeOpt, setSizeOpt] = useState([{ label: "", value: "" }])
    const [patternOpt, setPatternOpt] = useState([{ label: "", value: "" }])
    const dispatch = useDispatch()
    const CommonRedux = useSelector((state) => state.common)
    const { loading, variantList: data } = CommonRedux

    useEffect(() => {
        if (data) {
            setVariantList(data)
            let sizeArr = []
            let colorArr = []
            let patternArr = []
            data.length > 0 &&
                data.map((item) => {
                    if (item?.type === VariantConst.COLOR) {
                        colorArr.push({
                            label: item?.name,
                            value: item?.id,
                            ...item,
                        })
                    }
                    if (item?.type === VariantConst.PATTERN) {
                        patternArr.push({
                            label: item?.name,
                            value: item?.id,
                            ...item,
                        })
                    }
                    if (item?.type === VariantConst.SIZE) {
                        sizeArr.push({
                            label: item?.name,
                            value: item?.id,
                            ...item,
                        })
                    }
                })
            setColorOpt(colorArr)
            setSizeOpt(sizeArr)
            setPatternOpt(patternArr)
        }
        return () => {}
    }, [data])

    useEffect(() => {
        dispatch(getVariantList())
        return () => {}
    }, [])

    return { variantList, loading, colorOpt, sizeOpt, patternOpt }
}

export default useVariantHook
