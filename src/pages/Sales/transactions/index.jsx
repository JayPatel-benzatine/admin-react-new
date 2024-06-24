import React, { useState } from 'react'
import { Breadcrumb, CustomTable, DebounceInputBox, Loader } from '../../../components'
import { createColumnHelper } from '@tanstack/react-table'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTransactionsListAction } from '../../../store/action/SalesRedux'
import { dateFormate } from '../../../utils/dateFormate'

function TransactionList() {
    const dispatch = useDispatch()
    const salesData = useSelector((state) => state.sales)
    const { transactionsList, loading } = salesData

    useEffect(() => {
        dispatch(getTransactionsListAction())
        return () => { }
    }, [])


    const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.display({
            header: () => <span>#</span>,
            id: '#',
            cell: info => <div>{info.row.index + 1}</div>,
        }),
        columnHelper.accessor('order_id', {
            header: () => 'Order Id',
            cell: info => <div className='text-capitalize'>{info.getValue() || '-'}</div>,
            enableSorting: true,
        }),
        columnHelper.accessor('transaction_id', {
            cell: info => <i>{info.getValue() || '-'}</i>,
            header: () => <span>Transaction Id</span>,
            enableSorting: true,
        }),

        columnHelper.accessor('payment_amount', {
            header: 'Payment Amount',
            cell: info => <span>₹ {info.getValue()}</span>,
            enableSorting: true,
        }),
        columnHelper.accessor('payment_response', {
            cell: info => <i>{info.getValue() || '-'}</i>,
            header: () => <span>Payment Response</span>,
            enableSorting: true,
        }),
        columnHelper.accessor('created_at', {
            header: () => <span>Payment Date</span>,
            cell: info => <div className='text-capitalize'>{info.getValue() ? dateFormate(info.getValue()) : '-'}</div>,
            enableSorting: true,
        }),
    ]
    const [globalFilter, setGlobalFilter] = useState('')

    const onChangeSearchInput = (e) => {
        setGlobalFilter(e)
    }
    return (
        <div>
            {loading && <Loader />}
            <Breadcrumb name={'Sales'} menuItem={[{ name: 'Sales' }, { name: 'Transaction' }]} />
            <div className="col-12 col-md-12 col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h3>Transaction List</h3>
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
                            data={transactionsList || []}
                            staticTable={true}
                            globalFilter={globalFilter}
                            totalCount={transactionsList?.length || 0}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionList