import { lazy } from "react"

const Login = lazy(() => import("./Auth/Login"))
const Dashboard = lazy(() => import("./dashboard"))
const Category = lazy(() => import("./category"))
const ProductList = lazy(() => import("./product/productList"))
const ProductDetail = lazy(() => import("./product/productDetails"))
const ProductAddEdit = lazy(() => import("./product/productAddEdit"))
const TransactionList = lazy(() => import("./Sales/transactions"))
const OrdersList = lazy(() => import("./Sales/orders"))
const OrderDetailsList = lazy(() => import("./Sales/orders/OrderDetailsList"))
const CouponsList = lazy(() => import("./coupons/List"))
const CouponsAddEdit = lazy(() => import("./coupons/create"))
const OfferList = lazy(() => import("./offer/List"))
const OffreAddEdit = lazy(() => import("./offer/create"))
const VendorsList = lazy(() => import("./vendors/list"))
const VendorsAddEdit = lazy(() => import("./vendors/create"))
const EmployeeList = lazy(() => import("./employee/list"))
const EmployeesAddEdit = lazy(() => import("./employee/create"))

export {
    Login,
    Dashboard,
    Category,
    ProductList,
    ProductDetail,
    ProductAddEdit,
    TransactionList,
    OrdersList,
    OrderDetailsList,
    CouponsList,
    CouponsAddEdit,
    OffreAddEdit,
    OfferList,
    VendorsList,
    VendorsAddEdit,
    EmployeeList,
    EmployeesAddEdit,
}
