import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllProductByCategory } from "../../store/action/CommonRedux"

const useGetProductByCategoryHook = () => {
    const [productByCategoryData, setProductByCategoryData] = useState([])
    const [productByCategoryOpt, setProductByCategoryOpt] = useState([])
    const [categoryId, setCategoryId] = useState("")
    const dispatch = useDispatch()
    const CommonRedux = useSelector((state) => state.common)
    const { loading, allProductByCategoryList } = CommonRedux

    useEffect(() => {
        if (allProductByCategoryList) {
            setProductByCategoryData(allProductByCategoryList)
            let opt = []
            allProductByCategoryList.length > 0 &&
                allProductByCategoryList.map((item) =>
                    opt.push({ label: item?.name, value: item?.id })
                )
            setProductByCategoryOpt(opt)
        }
        return () => {}
    }, [allProductByCategoryList])

    useEffect(() => {
        if (categoryId) {
            dispatch(getAllProductByCategory(categoryId))
        }
        return () => {}
    }, [categoryId])

    return {
        productByCategoryOpt,
        productByCategoryData,
        setCategoryId,
        loading,
    }
}

export default useGetProductByCategoryHook
