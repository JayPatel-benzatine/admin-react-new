import React from 'react'
import { Home } from 'react-feather'
import './breadcrumb.css'
import { Link } from 'react-router-dom'

function Breadcrumb(props) {
    const { name, menuItem } = props
    return (
        <div className="row mb-2 breadcrumb-wrap">
            <div className="col-lg-6 col-md-12">
                <div className="page-header-left">
                    <h3 className='text-capitalize'>{name} </h3>
                    <small>Goozzy Admin panel</small>
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <ol className="breadcrumb pull-right breadcrumb-list">
                    <li className="breadcrumb-item">
                        <Link to={'/'} >
                            <Home icon="home" />
                        </Link>
                    </li>
                    {
                        menuItem && menuItem.length > 0 && menuItem.map((item, index, ar) => {
                            return (
                                <li className={`breadcrumb-item text-capitalize ${index === ar.length - 1 ? 'active' : ''}`} key={index}>{item.name}</li>
                            )
                        })
                    }
                </ol>
            </div>
        </div>
    )
}

export default Breadcrumb