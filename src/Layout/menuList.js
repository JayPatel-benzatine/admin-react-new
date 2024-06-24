import {
    Monitor,
    List,
    Box,
    DollarSign,
    Tag,
    Percent,
    Users,
    User,
} from "react-feather"

export const menuList = [
    {
        name: "Dashboard",
        icon: <Monitor className="feather feather-monitor" />,
        path: "/",
        activeName: "dashboard",
        isChildren: false,
    },
    {
        name: "Categories",
        icon: <List className="feather feather-list" />,
        isChildren: true,
        activeName: "category",
        item: [
            {
                name: "Category",
                path: "/category/list",
                isChildren: false,
                activeName: "list",
            },
        ],
    },
    {
        name: "Product",
        icon: <Box className="feather feather-box" />,
        isChildren: true,
        activeName: "product",
        item: [
            {
                name: "List",
                path: "/product/list",
                isChildren: false,
                activeName: "list",
            },
            {
                name: "Add",
                path: "/product/addedit",
                activeName: "addedit",
                isChildren: false,
            },
        ],
    },
    {
        name: "Sales",
        icon: <DollarSign className="feather feather-fa-dollar" />,
        isChildren: true,
        activeName: "sales",
        item: [
            {
                name: "Orders",
                path: "/sales/orders",
                isChildren: false,
                activeName: "orders",
            },
            {
                name: "Transactions",
                path: "/sales/transactions",
                activeName: "transactions",
                isChildren: false,
            },
        ],
    },
    {
        name: "Coupons",
        icon: <Tag className="feather feather-fa-tag" />,
        isChildren: true,
        activeName: "coupons",
        item: [
            {
                name: "List",
                path: "/coupons/list",
                isChildren: false,
                activeName: "list",
            },
            {
                name: "Create",
                path: "/coupons/create",
                activeName: "create",
                isChildren: false,
            },
        ],
    },
    {
        name: "offer",
        icon: <Percent className="feather feather-percent" />,
        isChildren: true,
        activeName: "offer",
        item: [
            {
                name: "List",
                path: "/offer/offer-list",
                isChildren: false,
                activeName: "offer-list",
            },
            {
                name: "Create",
                path: "/offer/offer-create",
                activeName: "offer-create",
                isChildren: false,
            },
        ],
    },
    {
        name: "Vendors",
        icon: <Users className="feather feather-users" />,
        isChildren: true,
        activeName: "vendors",
        item: [
            {
                name: "List",
                path: "/vendors/vendors-list",
                isChildren: false,
                activeName: "vendors-list",
            },
            {
                name: "Create",
                path: "/vendors/vendors-create",
                activeName: "vendors-create",
                isChildren: false,
            },
        ],
    },
    {
        name: "Employees",
        icon: <User className="feather feather-user" />,
        isChildren: true,
        activeName: "employee",
        item: [
            {
                name: "List",
                path: "/employee/employee-list",
                isChildren: false,
                activeName: "employee-list",
            },
            {
                name: "Create",
                path: "/employee/employee-create",
                activeName: "employee-create",
                isChildren: false,
            },
        ],
    },
]
