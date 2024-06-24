import React, { useEffect, useState } from 'react'
import { Breadcrumb, CustomModal, CustomTable, DebounceInputBox, Loader } from '../../../components';
import { createColumnHelper } from '@tanstack/react-table';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProductList } from '../../../store/action/ProductRedux';
import "../product.css"
import { Edit2, Trash2, Eye } from 'react-feather';
import ProductImageModal from '../components/ProductImageModal';
import { DummyProductImage } from '../../../assets';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function ProductList() {
  const dispatch = useDispatch()
  const productData = useSelector((state) => state.product)
  const { productList, loading, productFlag } = productData
  const [product, setProduct] = useState([])
  const [paginationObj, setPaginationObj] = useState({ pageIndex: 0, pageSize: 10 })
  const [openProductImageModal, setOpenProductImageModal] = useState(false)
  const [productImageArr, setProductImageArr] = useState([])
  const [openProductViewModal, setOpenProductViewModal] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const navigate = useNavigate()
  const [sortingObj, setSortingObj] = useState({})

  useEffect(() => {
    if (productList) {
      if (productList?.data.length > 0) {
        setProduct(productList?.data)
      } else {
        setProduct([])
      }
      setPaginationObj({ pageIndex: (Number(productList?.page) - 1), pageSize: Number(productList?.limit) })
    }
    return () => { }
  }, [productList])

  useEffect(() => {
    if (productFlag) {
      dispatch(getProductList({ limit: paginationObj.pageSize, page: paginationObj.pageIndex + 1 }))
    }
    return () => { }
  }, [productFlag])


  useEffect(() => {
    dispatch(getProductList({ limit: 10, page: 1 }))
    return () => { }
  }, [])

  const onDeleteProduct = (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this product?",
      icon: "warning",
      buttons: true
    }).then(willDelete => {
      if (willDelete) {
        dispatch(deleteProduct(id))
      }
    });
  }

  const columnHelper = createColumnHelper()
  const columns = [
    columnHelper.display({
      header: () => <span>#</span>,
      id: '#',
      cell: info => <div>{info.row.index + 1 + (paginationObj.pageSize * (paginationObj.pageIndex))}</div>,
    }),
    columnHelper.accessor('name', {
      header: () => 'Name',
      cell: info => <div className='text-capitalize'>{info.getValue() || '-'}</div>,
      enableSorting: true,
    }),
    columnHelper.accessor('price', {
      cell: info => <i>{info.getValue() || '-'}</i>,
      header: () => <span>Price</span>,
      enableSorting: true,
    }),
    columnHelper.display({
      header: () => <span>Image</span>,
      id: 'Image',
      cell: info => <div>{
        <div className='product-img-wrap' onClick={() => {
          setOpenProductImageModal(true)
          setProductImageArr(info.row?.original?.productImages)
        }}>
          <img src={info.row?.original?.productImages[0]?.name || DummyProductImage} alt='productImage' />
        </div> || "-"
      }</div>,
    }),
    columnHelper.accessor('quantity', {
      header: () => 'Quantity',
      cell: info => info.getValue() || '-',
      enableSorting: true,
    }),
    columnHelper.accessor('vendername', {
      header: () => <span>Vender Name</span>,
      cell: info => <div className='text-capitalize'>{info.getValue() || '-'}</div>,
      enableSorting: true,
    }),
    columnHelper.accessor('material', {
      header: 'Material',
      cell: info => info.getValue() || '-',
      enableSorting: true,
    }),
    columnHelper.accessor('isfeatured', {
      header: 'Featured',
      cell: info => info.getValue() === "1" ? <span className="badge badge-secondary text-capitalize">Featured</span> : "-",
      enableSorting: true,
    }),
    columnHelper.accessor('isonsale', {
      header: 'On Sale',
      cell: info => info.getValue() === "1" ? <span className="badge badge-primary text-capitalize mr-2">On Sale</span> : "-",
      enableSorting: true,
    }),
    columnHelper.accessor('country_of_origin', {
      header: 'Country',
      cell: info => info.getValue() || '-',
      enableSorting: true,
    }),
    columnHelper.display({
      header: () => <span>Action</span>,
      id: 'action',
      cell: (info) => <div className='action'>
        <div title="View" className="tooltip-container" >
          <Eye onClick={() => {
            navigate(`/product/${info.row.original.id}/detail`)
          }} />
        </div>
        <div title="Edit" className="tooltip-container" >
          <Edit2 onClick={() => {
            navigate(`/product/${info.row.original.id}/addedit`)
          }} />
        </div>
        <div title="Delete" className="tooltip-container">
          <Trash2 style={{ color: 'red' }} onClick={() => onDeleteProduct(info.row.original.id)} />
        </div>
      </div>,
    }),
  ]

  const onPageChange = (page, limit) => {
    dispatch(getProductList({ limit: limit, page: Number(page) + 1 }))
    setPaginationObj({ pageIndex: Number(page - 1) + 1, pageSize: limit })
  }

  const onSetFilterData = (sortData) => {
    if (sortData) {
      setSortingObj({ key: sortData.id, orderBy: sortData.desc ? 'desc' : 'asc' })
      dispatch(getProductList({ limit: paginationObj.pageSize, page: 1, key: sortData.id, orderBy: sortData.desc ? 'desc' : 'asc', search: searchValue || '' }))
    } else {
      setSortingObj(null)
      dispatch(getProductList({ limit: paginationObj.pageSize, page: 1, search: searchValue || '' }))
    }
  }

  const onChangeSearchInput = (e) => {
    setSearchValue(e)
    if (Object.keys(sortingObj).length !== 0) {
      const { key, orderBy } = sortingObj
      dispatch(getProductList({ limit: paginationObj.pageSize, page: 1, key, orderBy, search: e }))
    } else {
      dispatch(getProductList({ limit: paginationObj.pageSize, page: 1, search: e }))
    }
  }

  return (
    <div>
      {loading && <Loader />}
      <Breadcrumb name={'product'} menuItem={[{ name: 'product' }, { name: 'list' }]} />
      <div className="col-12 col-md-12 col-lg-12">
        <div className="card">
          <div className="card-header">
            <h3>Product List</h3>
          </div>
          <div className='row p-2'>
            <div className='col-lg-3 col-12'>
              <DebounceInputBox
                showIcon={true}
                icon={<i className="fas fa-search"></i>}
                placeholder={"search by product name"}
                value={searchValue}
                onSearch={(e) => {
                  onChangeSearchInput(e)

                }}
              />
            </div>
          </div>

          <div className="card-body p-0">
            <CustomTable
              columns={columns}
              data={product || []}
              isPagination={true}
              totalCount={productList?.totalProduct}
              paginationObj={paginationObj}
              onPageChange={onPageChange}
              onSetFilterData={onSetFilterData}
            />
          </div>
        </div>
      </div>
      {openProductImageModal && <CustomModal
        show={openProductImageModal}
        closeModal={() => {
          setOpenProductImageModal(false)
          setProductImageArr([])
        }}
        footerComponent={<div>
          <button type="button" className="btn btn-secondary" onClick={() => {
            setOpenProductImageModal(false)
            setProductImageArr([])
          }}>Close</button>
        </div>}
        title={'Images'}
        centered
      >
        <ProductImageModal productImage={productImageArr} />
      </CustomModal>}
      <CustomModal
        show={openProductViewModal}
        closeModal={() => {
          setOpenProductViewModal(false)
        }}
        footerComponent={<div>
          <button type="button" className="btn btn-secondary" onClick={() => {
            setOpenProductViewModal(false)
          }}>Close</button>
        </div>}
        title={'Product Details'}
        centered
        size='lg'
      >
        <div>PRo</div>
      </CustomModal>


    </div>
  )
}

export default ProductList