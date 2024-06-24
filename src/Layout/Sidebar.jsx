import React, { Fragment, useEffect, useRef, useState } from "react"
import { Logo } from "../assets"
import { Link, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toggleSlider } from "../store/action/ThemeRedux"
import { useMediaQuery } from "react-responsive"
import { useOutsideClick } from "../Hooks"
import { menuList } from "./menuList"

function Sidebar() {
    const sliderRef = useRef(null)
    const dispatch = useDispatch()
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" })

    useOutsideClick(sliderRef, () => {
        isTabletOrMobile && dispatch(toggleSlider(false))
    })

    return (
        <div className="main-sidebar sidebar-style-2" ref={sliderRef}>
            <aside id="sidebar-wrapper">
                <div className="sidebar-brand">
                    <Link to={"/"}>
                        {" "}
                        <img
                            alt="logo"
                            src={Logo}
                            className="header-logo"
                        />{" "}
                        <span className="logo-name">Goozzy</span>
                    </Link>
                </div>
                <ul className="sidebar-menu">
                    {menuList &&
                        menuList.length > 0 &&
                        menuList.map((item, index) => {
                            return (
                                <Fragment key={index}>
                                    <MenuLists items={item} />
                                </Fragment>
                            )
                        })}
                </ul>
            </aside>
        </div>
    )
}

export default Sidebar

const MenuLists = (props) => {
    const { items } = props
    const { name, icon, isChildren, item, path, activeName } = items
    const miniSilder = useSelector((state) => state.theme.miniSilder)
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const { pathname } = location
    const splitLocation = pathname.split("/")
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" })
    useEffect(() => {
        setIsOpen(false)
        return () => {}
    }, [miniSilder])

    return (
        <li
            className={`dropdown ${
                splitLocation[1].toLowerCase() === activeName.toLowerCase() ||
                splitLocation[splitLocation.length - 1].toLowerCase() ===
                    activeName.toLowerCase()
                    ? "active"
                    : ""
            }`}
        >
            {isChildren ? (
                <Fragment>
                    <div
                        className={`menu-toggle nav-link has-dropdown ${
                            isOpen ? "toggled" : ""
                        }`}
                        onClick={() =>
                            (isTabletOrMobile || !miniSilder) &&
                            setIsOpen(!isOpen)
                        }
                    >
                        {icon}
                        <span>{name}</span>
                    </div>
                    <ul
                        className="dropdown-menu border-0"
                        style={{ display: isOpen ? "block" : "none" }}
                    >
                        {item.map((el, index) => {
                            return (
                                <Fragment key={index}>
                                    <MenuLists items={el} />
                                </Fragment>
                            )
                        })}
                    </ul>
                </Fragment>
            ) : (
                <Link to={path} className="nav-link" title={name}>
                    {icon}
                    <span>{name}</span>
                </Link>
            )}
        </li>
    )
}
