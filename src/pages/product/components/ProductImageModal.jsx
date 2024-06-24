import React from 'react'
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

function ProductImageModal(props) {
    const { productImage } = props
    return (
        <div>
            <Swiper
                pagination={{
                    type: 'progressbar',

                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
            >
                {
                    productImage && productImage.length > 0 &&
                    productImage.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>{<img src={item.name} alt='product-images' style={{ height: '500px', width: "100%",  }} />}</SwiperSlide>
                        )
                    })
                }


            </Swiper>
        </div>
    )
}

export default ProductImageModal