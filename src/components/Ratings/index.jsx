import React from 'react'
import './rating.css'

function Rating({ value }) {
    const stars = Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={`fa fa-star${index < value ? ' checked' : ''}`}></span>
    ));

    return <div>{stars}</div>;
}

export default Rating