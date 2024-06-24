import React, { useRef, useState } from "react"
import { AlignJustify, Bell } from "react-feather"
import { MoonIcon, SunIcon, UserImage } from "../assets"
import { useDispatch, useSelector } from "react-redux"
import { toggleSlider, toggleTheme } from "../store/action/ThemeRedux"
import { useOutsideClick } from "../Hooks"
import { Link, useNavigate } from "react-router-dom"
import { logoutAction } from "../store/action/AuthRedux"

function TopBar() {
    const dispatch = useDispatch()
    const miniSilder = useSelector((state) => state.theme.miniSilder)
    const darkTheme = useSelector((state) => state.theme.darkTheme)
    const userData = useSelector((state) => state.auth.user)
    const [profileManu, setProfileManu] = useState(false)
    const [notificationMenu, setNotificationMenu] = useState(false)
    const notificationRef = useRef()
    const profileRef = useRef()
    const navigate = useNavigate()

    useOutsideClick(notificationRef, () => {
        setNotificationMenu(false)
    })

    useOutsideClick(profileRef, () => {
        setProfileManu(false)
    })

    const toggel = () => {
        dispatch(toggleTheme(!darkTheme))
    }

    const onLogout = () => {
        dispatch(logoutAction())
        navigate("/auth/login")
    }

    return (
        <nav className="navbar navbar-expand-lg main-navbar sticky">
            <div className="form-inline mr-auto">
                <ul className="navbar-nav mr-3">
                    <li
                        onClick={() => {
                            dispatch(toggleSlider(!miniSilder))
                        }}
                    >
                        <Link
                            href="#"
                            data-toggle="sidebar"
                            className="nav-link nav-link-lg
									collapse-btn"
                        >
                            {" "}
                            <AlignJustify />{" "}
                        </Link>
                    </li>
                    <li>
                        <form className="form-inline mr-auto">
                            <div className="search-element">
                                <input
                                    className="form-control"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    data-width="200"
                                />
                                <button className="btn" type="submit">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </form>
                    </li>
                </ul>
            </div>
            <ul className="navbar-nav navbar-right align-items-center">
                <li>
                    <div className="custom-switch-theme">
                        <label className="toggle m-0" htmlFor="switch">
                            <input
                                id="switch"
                                className="input"
                                type="checkbox"
                                checked={darkTheme}
                                onChange={() => {}}
                            />
                            <div className="icon icon--moon" onClick={toggel}>
                                <MoonIcon />
                            </div>
                            <div className="icon icon--sun" onClick={toggel}>
                                <SunIcon />
                            </div>
                        </label>
                    </div>
                </li>
                <li
                    className={`dropdown dropdown-list-toggle ${
                        notificationMenu ? "show" : ""
                    }`}
                    ref={notificationRef}
                >
                    <span
                        data-toggle="dropdown"
                        className="nav-link notification-toggle nav-link-lg"
                        onClick={() => setNotificationMenu(!notificationMenu)}
                    >
                        <Bell className="feather feather-bell bell" />
                    </span>
                    <div
                        className={`dropdown-menu dropdown-list dropdown-menu-right pullDown ${
                            notificationMenu ? "show" : ""
                        }`}
                    >
                        <div className="dropdown-header">
                            Notifications
                            <div className="float-right">
                                <Link href="#">Mark All As Read</Link>
                            </div>
                        </div>
                        <div className="dropdown-list-content dropdown-list-icons">
                            <Link
                                href="#"
                                className="dropdown-item dropdown-item-unread"
                            >
                                {" "}
                                <span className="dropdown-item-icon bg-primary text-white">
                                    {" "}
                                    <i
                                        className="fas
												fa-code"
                                    ></i>
                                </span>{" "}
                                <span className="dropdown-item-desc">
                                    {" "}
                                    Template update is available now!{" "}
                                    <span className="time">2 Min Ago</span>
                                </span>
                            </Link>{" "}
                            <Link href="#" className="dropdown-item">
                                {" "}
                                <span className="dropdown-item-icon bg-info text-white">
                                    {" "}
                                    <i
                                        className="far
												fa-user"
                                    ></i>
                                </span>{" "}
                                <span className="dropdown-item-desc">
                                    {" "}
                                    <b>You</b> and <b>Dedik Sugiharto</b> are
                                    now friends{" "}
                                    <span className="time">10 Hours Ago</span>
                                </span>
                            </Link>{" "}
                            <Link href="#" className="dropdown-item">
                                {" "}
                                <span className="dropdown-item-icon bg-success text-white">
                                    {" "}
                                    <i
                                        className="fas
												fa-check"
                                    ></i>
                                </span>{" "}
                                <span className="dropdown-item-desc">
                                    {" "}
                                    <b>Kusnaedi</b> has moved task{" "}
                                    <b>Fix bug header</b> to <b>Done</b>{" "}
                                    <span className="time">12 Hours Ago</span>
                                </span>
                            </Link>{" "}
                            <Link href="#" className="dropdown-item">
                                {" "}
                                <span className="dropdown-item-icon bg-danger text-white">
                                    {" "}
                                    <i className="fas fa-exclamation-triangle"></i>
                                </span>{" "}
                                <span className="dropdown-item-desc">
                                    {" "}
                                    Low disk space. Let's clean it!{" "}
                                    <span className="time">17 Hours Ago</span>
                                </span>
                            </Link>{" "}
                            <Link href="#" className="dropdown-item">
                                {" "}
                                <span className="dropdown-item-icon bg-info text-white">
                                    {" "}
                                    <i
                                        className="fas
												fa-bell"
                                    ></i>
                                </span>{" "}
                                <span className="dropdown-item-desc">
                                    {" "}
                                    Welcome to Otika template!{" "}
                                    <span className="time">Yesterday</span>
                                </span>
                            </Link>
                        </div>
                        <div className="dropdown-footer text-center">
                            <Link href="#">
                                View All{" "}
                                <i className="fas fa-chevron-right"></i>
                            </Link>
                        </div>
                    </div>
                </li>
                <li
                    className={`dropdown ${profileManu ? "show" : ""}`}
                    ref={profileRef}
                >
                    <span
                        data-toggle="dropdown"
                        onClick={() => setProfileManu(!profileManu)}
                        className="nav-link dropdown-toggle nav-link-lg nav-link-user"
                    >
                        <img
                            alt="user"
                            src={
                                userData?.profile_image
                                    ? userData?.profile_image
                                    : UserImage
                            }
                            className="user-img-radious-style"
                        />
                        <span className="d-sm-none d-lg-inline-block"></span>
                    </span>
                    {profileManu && (
                        <div
                            className={`dropdown-menu dropdown-menu-right pullDown ${
                                profileManu ? "show" : ""
                            }`}
                        >
                            <div className="dropdown-title">
                                Hello{" "}
                                {`${userData?.name} ${
                                    userData?.last_name
                                        ? userData?.last_name
                                        : ""
                                }`}
                            </div>
                            <Link
                                Link
                                href="profile.html"
                                className="dropdown-item has-icon"
                            >
                                {" "}
                                <i
                                    className="far
										fa-user"
                                ></i>{" "}
                                Profile
                            </Link>
                            <Link
                                href="timeline.html"
                                className="dropdown-item has-icon"
                            >
                                {" "}
                                <i className="fas fa-bolt"></i>
                                Activities
                            </Link>
                            <Link href="#" className="dropdown-item has-icon">
                                {" "}
                                <i className="fas fa-cog"></i>
                                Settings
                            </Link>
                            <div className="dropdown-divider"></div>
                            <Link
                                to={"#"}
                                className="dropdown-item has-icon text-danger"
                                onClick={onLogout}
                            >
                                {" "}
                                <i className="fas fa-sign-out-alt"></i>
                                Logout
                            </Link>
                        </div>
                    )}
                </li>
            </ul>
        </nav>
    )
}

export default TopBar
