import React from 'react'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {
    const navigate = useNavigate()
    return (
        <section className="section">
            <div className="container mt-5">
                <div className="page-error">
                    <div className="page-inner">
                        <h1>404</h1>
                        <div className="page-description">
                            The page you were looking for could not be found.
                        </div>
                        <div className="page-search">
                            <div className="mt-3" style={{ cursor: "pointer" }}>
                                <span onClick={() => navigate(-1)} style={{ color: '#6777ef' }}>Back to Home</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PageNotFound 