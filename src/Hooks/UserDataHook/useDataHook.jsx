import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserList } from "../../store/action/CommonRedux"

const useDataHook = () => {
    const [userData, setUserData] = useState([])
    const [userDatOpt, setUserDatOpt] = useState([])
    const [type, setType] = useState("")
    const dispatch = useDispatch()
    const CommonRedux = useSelector((state) => state.common)
    const { loading, userList } = CommonRedux

    useEffect(() => {
        if (userList) {
            setUserData(userList)
            let arr = []
            userData.map((item) =>
                arr.push({ label: item.name, value: item.id })
            )
            setUserDatOpt(arr)
        }
        return () => {}
    }, [userList])

    // useEffect(() => {
    //     if (type) {
    //         dispatch(getUserList(type))
    //     }
    //     return () => {}
    // }, [type])

    const setTypeHandler = (newType) => {
        // Perform any logic or validation if needed
        // setType(newType)
        dispatch(getUserList(newType))
    }

    return { userData, setTypeHandler, loading, userDatOpt }
}

export default useDataHook
