import React, { useState } from 'react'
import { Breadcrumb, CustomTable, DebounceInputBox, Loader } from '../../../components'
import { createColumnHelper } from '@tanstack/react-table'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getOrderDetailsListByIdAction, updateOrderItemStatusAction } from '../../../store/action/SalesRedux'
import { useNavigate, useParams } from 'react-router-dom'
import ProductStatus from '../../../Enum/ProductStatus'
import { Dropdown } from 'react-bootstrap'
import swal from 'sweetalert'


function OrderDetailsList() {
    const dispatch = useDispatch()
    const salesData = useSelector((state) => state.sales)
    const { orderProductsList, loading, updateOrderStatus } = salesData
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (params.id) {
            dispatch(getOrderDetailsListByIdAction(params.id))
        }
        return () => { }
    }, [params.id, updateOrderStatus])

    const onChangePaymentStatus = (id, text) => {
        swal({
            title: "Please Confirm..",
            text: "Do you really want to change the status?",
            icon: "warning",
            buttons: true
        }).then(confirm => {
            if (confirm) {
                dispatch(updateOrderItemStatusAction({ id: id, product_status: text }))
            }
        });
    }

    const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.display({
            header: () => <span>#</span>,
            id: '#',
            cell: info => <div>{info.row.index + 1}</div>,
        }),
        columnHelper.accessor('name', {
            header: () => 'Product Name',
            cell: info => <div className='text-capitalize'>{info.getValue() || '-'}</div>,
            enableSorting: true,
        }),
        columnHelper.accessor('image', {
            header: () => 'Product Image',
            cell: info => <div className='text-capitalize product-img'><img src={info.getValue()} /></div>,
            enableSorting: false,
        }),
        columnHelper.accessor('pyment_mode', {
            cell: info => <i>{info.getValue() || '-'}</i>,
            header: () => <span>Pyment Mode</span>,
            enableSorting: true,
        }),

        columnHelper.accessor('price', {
            header: () => 'Price',
            cell: info => <span>₹ {info.getValue()}</span>,
            enableSorting: true,
        }),
        columnHelper.accessor('product_status', {
            header: () => <span>Product Status</span>,
            cell: info => <div className='text-capitalize'>
                <Dropdown drop=''>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {info.getValue()}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#"
                            onClick={() => onChangePaymentStatus(info.row.original.id, ProductStatus.Pending)}
                        >
                            {ProductStatus.Pending}
                        </Dropdown.Item>
                        <Dropdown.Item href="#"
                            onClick={() => onChangePaymentStatus(info.row.original.id, ProductStatus.Processing)}
                        >
                            {ProductStatus.Processing}
                        </Dropdown.Item>
                        <Dropdown.Item href="#"
                            onClick={() => onChangePaymentStatus(info.row.original.id, ProductStatus.Confirmed)}
                        >
                            {ProductStatus.Confirmed}
                        </Dropdown.Item>
                        <Dropdown.Item href="#"
                            onClick={() => onChangePaymentStatus(info.row.original.id, ProductStatus.Shipped)}
                        >
                            {ProductStatus.Shipped}
                        </Dropdown.Item>
                        <Dropdown.Item href="#"
                            onClick={() => onChangePaymentStatus(info.row.original.id, ProductStatus.Delivered)}
                        >
                            {ProductStatus.Delivered}
                        </Dropdown.Item>
                        <Dropdown.Item href="#"
                            onClick={() => onChangePaymentStatus(info.row.original.id, ProductStatus.Cancelled)}
                        >
                            {ProductStatus.Cancelled}
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>,
            enableSorting: true,
        }),
        columnHelper.accessor('quantity', {
            header: 'Quantity',
            cell: info => <span> {info.getValue() || "-"}</span>,
            enableSorting: true,
        }),
        columnHelper.accessor('size', {
            header: 'Size',
            cell: info => <span> {info.getValue() || "-"}</span>,
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
            <Breadcrumb name={'Sales'} menuItem={[{ name: 'Sales' }, { name: 'orders-Product-details' }]} />
            <div className="col-12 col-md-12 col-lg-12">
                <div className="card">
                    <div className="card-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <h3>Order Product Details</h3>
                        <button type="button" className="btn btn-primary float-right" onClick={() => navigate("/sales/orders")}>Back</button>
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
                            data={orderProductsList || []}
                            staticTable={true}
                            totalCount={orderProductsList?.length || 0}
                            globalFilter={globalFilter}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetailsList