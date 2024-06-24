import React from 'react'

function DashboardCard(props) {
    const { name, amount, image, tag } = props
    return (
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div className="card">
                <div className="card-statistic-4">
                    <div className="align-items-center justify-content-between">
                        <div className="row ">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                                <div className="card-content">
                                    <h5 className="font-15">{name}</h5>
                                    <h2 className="mb-3 font-18">{amount} {tag && <small className='font-12 font-weight-600'>This Month</small>}</h2>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                                <div className="banner-img">
                                    <div className="banner-img">
                                        <img src={image} alt="bannerImage" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardCard