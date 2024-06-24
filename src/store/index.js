import { configureStore } from "@reduxjs/toolkit";
import ThemeSlice from "./action/ThemeRedux";
import AuthSlice from "./action/AuthRedux"
import DashboardSlice from "./action/DashboradRedux"
import CategorySlice from "./action/CategoryRedux"
import CommonSlice from './action/CommonRedux'
import ProductSlice from './action/ProductRedux'
import SalesSlice from './action/SalesRedux'
import CouponsSlice from './action/CouponsRedux'
import OfferSlice from "./action/OfferRedux"
import VendorsSlice from './action/Vendors'

const Store = configureStore({
    reducer: {
        theme: ThemeSlice,
        auth: AuthSlice,
        dashboard: DashboardSlice,
        category: CategorySlice,
        common: CommonSlice,
        product: ProductSlice,
        sales: SalesSlice,
        coupons: CouponsSlice,
        offer: OfferSlice,
        vendors: VendorsSlice,
    },
});

export default Store;
