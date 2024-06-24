import { createColumnHelper } from "@tanstack/react-table"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
    Breadcrumb,
    CustomTable,
    DebounceInputBox,
    Loader,
} from "../../../components"
import { dateFormate } from "../../../utils/dateFormate"
import {
    deleteCouponACtion,
    getCouponsList,
} from "../../../store/action/CouponsRedux"
import { Edit, Trash2 } from "react-feather"
import DiscountType from "../../../Enum/DiscountType"
import swal from "sweetalert"

function CouponsList() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const couponsData = useSelector((state) => state.coupons)
    const { couponsList, loading, couponFlag } = couponsData

    useEffect(() => {
        dispatch(getCouponsList())
        return () => {}
    }, [couponFlag])

    const onDeleteCoupon = (id) => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this Coupon?",
            icon: "warning",
            buttons: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(deleteCouponACtion(id))
            }
        })
    }

    const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.display({
            header: () => <span>#</span>,
            id: "#",
            cell: (info) => <div>{info.row.index + 1}</div>,
        }),
        columnHelper.accessor("coupan_title", {
            header: () => "Coupan Title",
            cell: (info) => (
                <div className="text-capitalize">{info.getValue() || "-"}</div>
            ),
            enableSorting: true,
        }),
        columnHelper.accessor("coupan_code", {
            cell: (info) => <i>{info.getValue() || "-"}</i>,
            header: () => <span>Coupan Code</span>,
            enableSorting: true,
        }),

        columnHelper.accessor("discount_amount", {
            header: () => "Discount",
            cell: (info) => (
                <div className="text-capitalize">
                    {info.row.original.discount_type === DiscountType.PERCENT
                        ? `${info.getValue()}%`
                        : info.getValue() || "-"}
                </div>
            ),
            enableSorting: true,
        }),
        columnHelper.accessor("discount_type", {
            header: () => <span>Discount Type</span>,
            cell: (info) => (
                <div className="text-capitalize">{info.getValue() || "-"}</div>
            ),
            enableSorting: true,
        }),
        columnHelper.accessor("status", {
            header: "Status",
            cell: (info) => (
                <div
                    className={`badge ${
                        info.getValue() === "1"
                            ? "badge-success"
                            : "badge-danger"
                    } `}
                >
                    {info.getValue() === "1" ? "Active" : "DeActive"}
                </div>
            ),
            enableSorting: true,
        }),
        columnHelper.accessor("isfreeshipping", {
            header: "Shipping",
            cell: (info) => (
                <div
                    className={`badge ${
                        info.getValue() === "1"
                            ? "badge-success"
                            : "badge-danger"
                    } `}
                >
                    {info.getValue() === "1" ? "Free" : "Paid"}
                </div>
            ),
            enableSorting: true,
        }),
    ]
    const [globalFilter, setGlobalFilter] = useState("")

    const onChangeSearchInput = (e) => {
        setGlobalFilter(e)
    }
    return (
        <div>
            {loading && <Loader />}
            <Breadcrumb
                name={"coupons"}
                menuItem={[{ name: "coupons" }, { name: "list" }]}
            />
            <div className="col-12 col-md-12 col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h3>Coupons List</h3>
                    </div>
                    <div className="row p-2">
                        <div className="col-lg-3 col-12">
                            <DebounceInputBox
                                showIcon={true}
                                icon={<i className="fas fa-search"></i>}
                                placeholder={"search"}
                                value={globalFilter}
                                onSearch={(e) => {
                                    onChangeSearchInput(e)
                                }}
                            />
                        </div>
                    </div>

                    <div className="card-body p-0">
                        <CustomTable
                            columns={columns}
                            data={couponsList || []}
                            staticTable={true}
                            totalCount={couponsList?.length || 0}
                            globalFilter={globalFilter}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CouponsList
