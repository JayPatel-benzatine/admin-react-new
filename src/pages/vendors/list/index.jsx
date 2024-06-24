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
import { Edit, Trash2 } from "react-feather"
import swal from "sweetalert"
import { useDataHook } from "../../../Hooks"
import {
    deleteVendorsACtion,
    resetUserDetails,
    resetVendorFlag,
} from "../../../store/action/Vendors"
import UserTypeCont from "../../../Enum/UserType"

function VendorsList() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userData, setTypeHandler, loadin: dataLoading } = useDataHook()
    const vendorsData = useSelector((state) => state.vendors)
    const { vendorFlag, loading } = vendorsData

    useEffect(() => {
        setTypeHandler(UserTypeCont.VENDOR)
        dispatch(resetUserDetails())
        return () => {}
    }, [])

    useEffect(() => {
        if (vendorFlag) {
            setTypeHandler(UserTypeCont.VENDOR)
            dispatch(resetVendorFlag())
        }
        return () => {}
    }, [vendorFlag])

    const onDeleteOffer = (id) => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this vendor?",
            icon: "warning",
            buttons: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(deleteVendorsACtion(id))
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
        columnHelper.accessor("name", {
            header: () => "Name",
            cell: (info) => (
                <div className="text-capitalize">{info.getValue() || "-"}</div>
            ),
            enableSorting: true,
        }),
        columnHelper.accessor("email", {
            cell: (info) => <i>{info.getValue() || "-"}</i>,
            header: () => <span>Email</span>,
            enableSorting: true,
        }),

        columnHelper.accessor("phone", {
            header: () => "Phone",
            cell: (info) => (
                <div className="text-capitalize">{info.getValue() || "-"}</div>
            ),
            enableSorting: true,
        }),
        columnHelper.accessor("city_name", {
            header: () => <span>City</span>,
            cell: (info) => (
                <div className="text-capitalize">{info.getValue() || "-"}</div>
            ),
            enableSorting: true,
        }),
        columnHelper.accessor("occupation", {
            header: () => "Occupation",
            cell: (info) => <div> {info.getValue() || "-"}</div> || "-",
            enableSorting: false,
        }),
        columnHelper.accessor("status", {
            header: () => "Status",
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
            enableSorting: false,
        }),
        columnHelper.display({
            header: () => <span>Action</span>,
            id: "action",
            cell: (info) => (
                <div className="action">
                    <div title="View" className="tooltip-container">
                        <Edit
                            onClick={() =>
                                navigate(
                                    `/vendors/${info.row.original.id}/vendors-edit`
                                )
                            }
                        />
                    </div>
                    <div title="Delete" className="tooltip-container">
                        <Trash2
                            style={{ color: "red" }}
                            onClick={() => onDeleteOffer(info.row.original.id)}
                        />
                    </div>
                </div>
            ),
        }),
    ]
    const [globalFilter, setGlobalFilter] = useState("")

    const onChangeSearchInput = (e) => {
        setGlobalFilter(e)
    }
    return (
        <div>
            {(dataLoading || loading) && <Loader />}
            <Breadcrumb
                name={"Vendors"}
                menuItem={[{ name: "Vendors" }, { name: "list" }]}
            />
            <div className="col-12 col-md-12 col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h3>Vendors List</h3>
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
                            data={userData || []}
                            staticTable={true}
                            totalCount={userData?.length || 0}
                            globalFilter={globalFilter}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VendorsList
