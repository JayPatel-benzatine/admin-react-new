import React, { useEffect, useState } from 'react'
import '../product.css'
import { useSelector } from 'react-redux'
import { Rating } from '../../../components'

function ProductDetails() {
    const productData = useSelector((state) => state.product.productData)
    const [colors, setColors] = useState([])
    const [size, setSize] = useState([])
    const [pattern, setPattern] = useState([])
    useEffect(() => {
        if (productData) {
            productData?.colour && productData?.colour !== 'undefined' && setColors(JSON.parse(productData?.colour))
            productData?.size && productData.size !== 'undefined' && setSize(JSON.parse(productData?.size))
            productData?.pattern && productData?.pattern !== 'undefined' && setPattern(JSON.parse(productData?.pattern))
        }
        return () => { }
    }, [productData])


    return (
        <div className="product-page-details product-right mb-0">
            <div className='product-name-wrap' style={{}}>
                <h2>{productData?.name || "-"} </h2>
                <div style={{ marginLeft: "15px" }}>
                    <span className="badge badge-primary text-capitalize mr-2">{productData?.isonsale === '1' ? 'On sale' : ''}</span>
                    <span className="badge badge-secondary text-capitalize">{productData?.isfeatured === '1' ? 'Featured' : ''}</span>
                </div>
            </div>
            <div className='d-flex'>
                <span className='mr-2'> {productData?.totalrating} </span><Rating value={productData?.rating} />
            </div>

            <hr />
            <h6 className="product-title">product description</h6>
            <p className='product-description mt-2'>{productData?.short_description || "-"}</p>
            <div className="product-price digits mt-2">
                <h3>₹{productData?.price}</h3>
            </div>
            <ul className="color-variant mt-2">
                {
                    colors && colors?.map((item, index) => {
                        return (
                            <li style={{ backgroundColor: item.name, border: "1px solid #000" }} title={item.name} key={index}></li>
                        )
                    })
                }
            </ul>
            <hr />
            <h6 className="product-title size-text"> size</h6>
            <div className="size-box">
                <ul>
                    {
                        size && size.map((item, index) => {
                            return (
                                <li className="active" key={index}>
                                    <span className='text-uppercase'>{item.name}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="add-product-form">
                <h6 className="product-title">Product details</h6>
                <div className="product-facts-detail mt-2">
                    <div className="product-fixed-left-grid-inner">
                        <div className="product-fixed-left-grid-col " >
                            <span className="a-color-base">Material</span>
                        </div>
                        <div className="product-fixed-left-grid-col ml-3 w-100" >
                            <span className="a-color-base">{productData?.material}</span>
                        </div>
                    </div>
                    <div className="product-fixed-left-grid-inner">
                        <div className="product-fixed-left-grid-col " >
                            <span className="a-color-base">pattern</span>
                        </div>
                        <div className="product-fixed-left-grid-col ml-3 w-100" >
                            <span className="a-color-base">{(pattern && pattern.length > 0) ? pattern.map((item) => item.name).join(', ') : '-'}</span>
                        </div>
                    </div>
                    <div className="product-fixed-left-grid-inner">
                        <div className="product-fixed-left-grid-col " >
                            <span className="a-color-base">vender</span>
                        </div>
                        <div className="product-fixed-left-grid-col ml-3 w-100" >
                            <span className="a-color-base">{productData?.vendername}</span>
                        </div>
                    </div>
                    <div className="product-fixed-left-grid-inner">
                        <div className="product-fixed-left-grid-col " >
                            <span className="a-color-base">Country of Origin</span>
                        </div>
                        <div className="product-fixed-left-grid-col ml-3 w-100" >
                            <span className="a-color-base">{productData?.country_of_origin}</span>
                        </div>
                    </div>
                    <div className="product-fixed-left-grid-inner">
                        <div className="product-fixed-left-grid-col " >
                            <span className="a-color-base">category</span>
                        </div>
                        <div className="product-fixed-left-grid-col ml-3 w-100" >
                            <span className="a-color-base">{productData?.categories}</span>
                        </div>
                    </div>
                    <div className="product-fixed-left-grid-inner">
                        <div className="product-fixed-left-grid-col " >
                            <span className="a-color-base">quantity</span>
                        </div>
                        <div className="product-fixed-left-grid-col ml-3 w-100" >
                            <span className="a-color-base">{productData?.quantity || '-'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails