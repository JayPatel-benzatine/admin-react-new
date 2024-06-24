import React, { useEffect } from "react"
import Sidebar from "./Sidebar"
import { Outlet, useNavigate } from "react-router-dom"
import "./layout.css"
import TopBar from "./TopBar"
import { useSelector } from "react-redux"

function Layout() {
    const userData = useSelector((state) => state.auth.user)
    const navigate = useNavigate()
    // useEffect(() => {
    //     if (!userData && !userData?.token) {
    //         navigate("/auth/login")
    //     }

    //     return () => {}
    // }, [userData])

    return (
        <div id="app">
            <div className="main-wrapper main-wrapper-1">
                <TopBar />
                <Sidebar />
                <div className="main-content" style={{ minHeight: "100vh" }}>
                    <section className="section">
                        <Outlet />
                    </section>
                </div>
                <footer className="main-footer">
                    <div className="footer-left">
                        {/* <a href="templateshub.net">Templateshub</a> */}
                        <span>
                            Copyright 2024 © Goozzy All rights reserved.
                        </span>
                    </div>
                    <div className="footer-right"></div>
                </footer>
            </div>
        </div>
    )
}

export default Layout
