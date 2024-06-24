import React, { useState } from 'react'
import { Breadcrumb, CustomTable, DebounceInputBox, Loader } from '../../../components'
import { Eye } from 'react-feather'
import { createColumnHelper } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getOrderListAction } from '../../../store/action/SalesRedux'
import { dateFormate } from '../../../utils/dateFormate'

function OrdersList() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const salesData = useSelector((state) => state.sales)
    const { orderList, loading } = salesData

    useEffect(() => {
        dispatch(getOrderListAction())
        return () => { }
    }, [])


    const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.display({
            header: () => <span>#</span>,
            id: '#',
            cell: info => <div>{info.row.index + 1}</div>,
        }),
        columnHelper.accessor('order_code', {
            header: () => 'Order Code',
            cell: info => <div className='text-capitalize'>{info.getValue() || '-'}</div>,
            enableSorting: true,
        }),
        columnHelper.accessor('pyment_mode', {
            cell: info => <i>{info.getValue() || '-'}</i>,
            header: () => <span>Pyment Mode</span>,
            enableSorting: true,
        }),

        columnHelper.accessor('order_status', {
            header: () => 'Order Status',
            cell: info => info.getValue() || '-',
            enableSorting: true,
        }),
        columnHelper.accessor('order_date', {
            header: () => <span>Order Date</span>,
            cell: info => <div className='text-capitalize'>{info.getValue() ? dateFormate(info.getValue()) : '-'}</div>,
            enableSorting: true,
        }),
        columnHelper.accessor('total_price', {
            header: 'Total Price',
            cell: info => <span>₹ {info.getValue()}</span>,
            enableSorting: true,
        }),
        columnHelper.display({
            header: () => <span>Action</span>,
            id: 'action',
            cell: (info) => <div className='action'>
                <div title="View" className="tooltip-container" >
                    <Eye onClick={() => {
                        navigate(`/sales/orders/${info.row.original.id}/details`)
                    }} />
                </div>
            </div>,
        }),
    ]
    const [globalFilter, setGlobalFilter] = useState('')

    const onChangeSearchInput = (e) => {
        setGlobalFilter(e)
    }
    return (
        <div>
            {loading && <Loader />}
            <Breadcrumb name={'Sales'} menuItem={[{ name: 'Sales' }, { name: 'orders' }]} />
            <div className="col-12 col-md-12 col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h3>Order List</h3>
                    </div>
                    <div className='row p-2'>
                        <div className='col-lg-3 col-12'>
                            <DebounceInputBox
                                showIcon={true}
                                icon={<i className="fas fa-search"></i>}
                                placeholder={"search by order"}
                                value={globalFilter}
                                onSearch={(e) => {
                                    onChangeSearchInput(e)
                                }}
                            />
                        </div>
                    </div>

                    <div className="card-body p-0">
                        <CustomTable
                            columns={columns}
                            data={orderList || []}
                            staticTable={true}
                            totalCount={orderList?.length || 0}
                            globalFilter={globalFilter}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrdersList