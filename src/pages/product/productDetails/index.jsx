import React, { useEffect } from 'react'
import ProductSilder from './ProductSilder'
import '../product.css'
import ProductDetails from './ProductDetails'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getByIdProductDetails } from '../../../store/action/ProductRedux'
import { Breadcrumb, Loader } from '../../../components'

function ProductDetail() {
    const params = useParams()
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.product.loading)
    useEffect(() => {
        if (params && params?.id) {
            dispatch(getByIdProductDetails(params.id))
        }
        return () => { }
    }, [params])

    return (
        <div>
            {loading && <Loader />}
            <Breadcrumb name={'product'} menuItem={[{ name: 'product' }, { name: 'detail' }]} />
            <div className="card">
                <div className="row product-page-main card-body">
                    <div className="col-xl-4 ">
                        <ProductSilder />
                    </div>
                    <div className="col-xl-8">
                        <ProductDetails />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail