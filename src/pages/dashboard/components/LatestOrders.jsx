import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function LatestOrders() {
    const DashboardData = useSelector((state) => state.dashboard?.dashboardStatics)
    const navigate = useNavigate()
    return (
        <div className="card" >
            <div className="card-header">
                <h4>Latest Orders</h4>
            </div>
            <div className="card-body pt-0">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Order Total</th>
                                <th>Payment Method</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                DashboardData && DashboardData?.lastOrder && DashboardData?.lastOrder?.length > 0 &&
                                DashboardData?.lastOrder.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='text-center'>{item?.order_code}</td>
                                            <td className='text-center'>₹ {item?.total_price} </td>
                                            <td className='text-center'>{item?.pyment_mode}</td>
                                            <td className='text-center'>
                                                <div className="badge badge-warning font-16">{item?.order_status}</div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <button type="button" onClick={() => navigate("/sales/orders")} className="btn btn-primary btn-lg btn-block font-15" >
                        View All Orders
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LatestOrders