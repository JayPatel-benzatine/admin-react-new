import { createColumnHelper } from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Breadcrumb, CustomTable, DebounceInputBox, Loader } from '../../../components'
import { dateFormate } from '../../../utils/dateFormate'
import { Edit, Trash2 } from 'react-feather'
import DiscountType from '../../../Enum/DiscountType'
import swal from 'sweetalert'
import { deleteOfferACtion, getOfferListAction } from '../../../store/action/OfferRedux'
import { DummyProductImage } from '../../../assets'

function OfferList() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const offerData = useSelector((state) => state.offer)
    const { OfferList, loading, offerFlag } = offerData

    useEffect(() => {
        dispatch(getOfferListAction())
        return () => { }
    }, [offerFlag])

    const onDeleteOffer = (id) => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this Offer?",
            icon: "warning",
            buttons: true
        }).then(willDelete => {
            if (willDelete) {
                dispatch(deleteOfferACtion(id))
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
        columnHelper.accessor('offer_amount', {
            header: () => 'Offer amount',
            cell: info => <div className='text-capitalize'>{info.row.original.offer_type === DiscountType.PERCENT ? `${info.getValue()}%` : info.getValue() || '-'}</div>,
            enableSorting: true,
        }),
        columnHelper.accessor('offer_type', {
            cell: info => <i>{info.getValue() || '-'}</i>,
            header: () => <span>Offer type</span>,
            enableSorting: true,
        }),

        columnHelper.accessor('category_name', {
            header: () => 'Category',
            cell: info => <div className='text-capitalize'>{info.getValue() || '-'}</div>,
            enableSorting: true,
        }),
        columnHelper.accessor('product_name', {
            header: () => <span>Product Name</span>,
            cell: info => <div className='text-capitalize'>{info.getValue() || '-'}</div>,
            enableSorting: true,
        }),
        columnHelper.accessor('offer_image', {
            header: () => 'Offer Image',
            cell: info => <div className='product-img'>
                {info.getValue() ? <img src={info.row?.original?.offer_image} alt='productImage' /> : '-'}
            </div> || "-",
            enableSorting: false,
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: info => <div className={`badge ${info.getValue() === '1' ? 'badge-success' : 'badge-danger'} `}>{info.getValue() === '1' ? 'Active' : 'DeActive'}</div>,
            enableSorting: true,
        }),
        columnHelper.accessor('end_date', {
            header: () => <span>End Date</span>,
            cell: info => <div className='text-capitalize'>{info.getValue() ? dateFormate(info.getValue()) : '-'}</div>,
            enableSorting: true,
        }),
        columnHelper.display({
            header: () => <span>Action</span>,
            id: 'action',
            cell: (info) => <div className='action'>
                <div title="View" className="tooltip-container" >
                    <Edit onClick={() => navigate(`/offer/${info.row.original.id}/offer-edit`)} />
                </div>
                <div title="Delete" className="tooltip-container" >
                    <Trash2 style={{ color: 'red' }} onClick={() => onDeleteOffer(info.row.original.id)} />
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
            <Breadcrumb name={'offer'} menuItem={[{ name: 'offer' }, { name: 'list' }]} />
            <div className="col-12 col-md-12 col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h3>Offer List</h3>
                    </div>
                    <div className='row p-2'>
                        <div className='col-lg-3 col-12'>
                            <DebounceInputBox
                                showIcon={true}
                                icon={<i className="fas fa-search"></i>}
                                placeholder={"search"}
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
                            data={OfferList || []}
                            staticTable={true}
                            totalCount={OfferList?.length || 0}
                            globalFilter={globalFilter}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OfferList