import { Routes, Route, Navigate } from "react-router-dom"
import {
    Category,
    CouponsAddEdit,
    CouponsList,
    Dashboard,
    EmployeeList,
    EmployeesAddEdit,
    Login,
    OfferList,
    OffreAddEdit,
    OrderDetailsList,
    OrdersList,
    ProductAddEdit,
    ProductDetail,
    ProductList,
    TransactionList,
    VendorsAddEdit,
    VendorsList,
} from "../pages"
import PageNotFound from "../pages/error/404"
import Layout from "../Layout"

const Router = () => {
    return (
        <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="category/list" element={<Category />} />
                <Route path="product/list" element={<ProductList />} />
                <Route path="product/:id/detail" element={<ProductDetail />} />
                <Route path="product/addedit" element={<ProductAddEdit />} />
                <Route
                    path="product/:id/addedit"
                    element={<ProductAddEdit />}
                />
                <Route path="sales/orders" element={<OrdersList />} />
                <Route
                    path="sales/orders/:id/details"
                    element={<OrderDetailsList />}
                />
                <Route
                    path="sales/transactions"
                    element={<TransactionList />}
                />
                <Route path="coupons/list" element={<CouponsList />} />
                <Route path="coupons/create" element={<CouponsAddEdit />} />
                <Route path="coupons/:id/edit" element={<CouponsAddEdit />} />
                <Route path="offer/offer-list" element={<OfferList />} />
                <Route path="offer/offer-create" element={<OffreAddEdit />} />
                <Route path="offer/:id/offer-edit" element={<OffreAddEdit />} />
                <Route path="vendors/vendors-list" element={<VendorsList />} />
                <Route
                    path="vendors/vendors-create"
                    element={<VendorsAddEdit />}
                />
                <Route
                    path="vendors/:id/vendors-edit"
                    element={<VendorsAddEdit />}
                />
                <Route
                    path="employee/employee-list"
                    element={<EmployeeList />}
                />
                <Route
                    path="employee/employee-create"
                    element={<EmployeesAddEdit />}
                />
                <Route
                    path="employee/:id/employee-edit"
                    element={<EmployeesAddEdit />}
                />
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}

export default Router
