import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import '../product.css'
import { useSelector } from 'react-redux';

function ProductSilder() {
    const productData = useSelector((state) => state.product.productData)
    const [productImage, setProductImage] = useState([])
    useEffect(() => {
        let arr = []
        if (productData && productData?.productImages && productData?.productImages.length > 0) {
            productData?.productImages.map((item) => (
                arr.push(item.name)
            ))
            setProductImage(arr)
        }
        return () => { }
    }, [productData])

    const settings = {
        customPaging: function (i) {
            if (productImage && productImage.length > 0) {
                return (
                    <img src={productImage[i]} alt='product-img-slider' />
                )
            } else {
                return null
            }
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb product-slider",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScrol: 1,
        arrows: false

    };
    return (
        <div style={{ height: "700px" }}>
            <Slider  {...settings}>
                {productImage && productImage.length > 0 &&
                    productImage.map((item, index) => {
                        return (
                            <div className='product-img-slider' key={index}>
                                <img src={item} alt='product-img-slider' width={'100%'} height={"100%"} style={{ objectFit: "contain" }} />
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
    )
}

export default ProductSilder