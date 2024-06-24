import "./style.css"
import "./components.css"
import { BrowserRouter } from "react-router-dom"
import Router from "./router"
import { Suspense, useEffect } from "react"
import { Loader } from "./components"
import { useDispatch, useSelector } from "react-redux"
import { useMediaQuery } from "react-responsive"
import "bootstrap/dist/css/bootstrap.min.css"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import { goozzyUser } from "./constant/const"
import { setLoginUserData } from "./store/action/AuthRedux"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"
import axiosInstance from "./utils/axiosConfig"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function App() {
    const miniSilder = useSelector((state) => state.theme.miniSilder)
    const darkTheme = useSelector((state) => state.theme.darkTheme)
    const userData = useSelector((state) => state.auth.user)

    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" })
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 1025px)",
    })
    const dispatch = useDispatch()
    useEffect(() => {
        let user = localStorage.getItem(goozzyUser)
        if (user) {
            dispatch(setLoginUserData(JSON.parse(user)))
        }

        return () => {}
    }, [])

    useEffect(() => {
        // global header for Authorization
        axiosInstance.interceptors.request.use(
            async (config) => {
                try {
                    const token = userData?.token
                    if (token) {
                        config.headers["Authorization"] = `Bearer ${token}`
                    }

                    return config
                } catch (error) {
                    console.error("Error setting Authorization header:", error)
                    return Promise.reject(error)
                }
            },
            (error) => {
                console.error("Request interceptor error:", error)
                return Promise.reject(error)
            }
        )

        return () => {}
    }, [userData])

    return (
        <BrowserRouter>
            <Suspense fallback={<Loader />}>
                <div
                    className={`${
                        darkTheme
                            ? "dark dark-sidebar theme-black "
                            : "light light-sidebar theme-white"
                    }  ${
                        isDesktopOrLaptop
                            ? miniSilder
                                ? "sidebar-mini"
                                : ""
                            : isTabletOrMobile
                            ? miniSilder
                                ? "sidebar-show"
                                : "sidebar-gone"
                            : ""
                    } `}
                >
                    <ToastContainer />
                    <Router />
                </div>
            </Suspense>
        </BrowserRouter>
    )
}

export default App
