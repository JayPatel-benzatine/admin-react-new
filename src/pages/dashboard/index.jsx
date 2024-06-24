import React, { useEffect } from 'react'
import DashboardCard from './components/DashboardCard'
import { BannerImage1, BannerImage2, BannerImage3, BannerImage4 } from '../../assets'
import { useDispatch, useSelector } from 'react-redux'
import { getDashboardStatics } from '../../store/action/DashboradRedux'
import { Breadcrumb, Loader } from '../../components'
import BarChart from './components/BarChart'
import LatestOrders from './components/LatestOrders'
function Dashboard() {
    const dispatch = useDispatch()
    const DashboardData = useSelector((state) => state.dashboard)
    const { loading, dashboardStatics } = DashboardData

    useEffect(() => {
        dispatch(getDashboardStatics())
        return () => { }
    }, [dispatch])

    return (
        <div>
            {loading && <Loader />}
            <Breadcrumb name={'Dashboard'} menuItem={[{ name: 'Dashboard' }]} />
            <div className="row ">
                <DashboardCard name={"Earnings"} amount={dashboardStatics?.totalEarn} tag={true} image={BannerImage1} />
                <DashboardCard name={"Products"} amount={dashboardStatics?.productCount} tag={false} image={BannerImage2} />
                <DashboardCard name={"Orders"} amount={dashboardStatics?.orderCount} tag={true} image={BannerImage3} />
                <DashboardCard name={"Vendors"} amount={dashboardStatics?.venderCount} tag={false} image={BannerImage4} />
            </div>
            <div className="row">
                <div className="col-md-6 col-lg-12 col-xl-6">
                    <div className="card">
                        <div className="card-header">
                            <h4>Last 7 Days Orders</h4>
                        </div>
                        <div className="card-body">
                            <BarChart />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-12 col-xl-6">
                    <LatestOrders />
                </div>
            </div>
        </div>
    )
}

export default Dashboard