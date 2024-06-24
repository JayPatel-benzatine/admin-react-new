import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCategory } from "../../store/action/CommonRedux"

const useCategoryHook = () => {
    const [categoryList, setCategoryList] = useState([
        {
            label: "",
            options: [{ value: "", label: "" }],
        },
    ])
    const dispatch = useDispatch()
    const CommonRedux = useSelector((state) => state.common)
    const { loading, allCategory } = CommonRedux

    useEffect(() => {
        if (allCategory) {
            setCategoryList(allCategory)
            let arr = []
            allCategory.map((item) => {
                let opt = []
                item.subcat.map((i) => {
                    opt.push({ value: i.id, label: i.name })
                })
                arr.push({ label: item.name, options: opt })
            })
            setCategoryList(arr)
        }
        return () => {}
    }, [allCategory])

    useEffect(() => {
        dispatch(getAllCategory())
        return () => {}
    }, [])

    return { categoryList, loading }
}

export default useCategoryHook
