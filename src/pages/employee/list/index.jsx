import React, { useEffect, useState } from "react"
import { Breadcrumb, CustomTable, DebounceInputBox, Loader } from "../../../components"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useDataHook } from "../../../Hooks"
import { deleteVendorsACtion, resetUserDetails, resetVendorFlag } from "../../../store/action/Vendors"
import { createColumnHelper } from "@tanstack/react-table"
import { Edit, Trash2 } from "react-feather"
import UserTypeCont from "../../../Enum/UserType"
import swal from "sweetalert"

function EmployeeList() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userData, setTypeHandler, loadin: dataLoading } = useDataHook()
    const vendorsData = useSelector((state) => state.vendors)
    const { vendorFlag, loading } = vendorsData
    const [globalFilter, setGlobalFilter] = useState("")

    useEffect(() => {
        setTypeHandler(UserTypeCont.EMPLOYEE)
        dispatch(resetUserDetails())
        return () => {}
    }, [])

    useEffect(() => {
        if (vendorFlag) {
            setTypeHandler(UserTypeCont.EMPLOYEE)
            dispatch(resetVendorFlag())
            dispatch(resetUserDetails())
        }
        return () => {}
    }, [vendorFlag])

    const onDeleteOffer = (id) => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this employee?",
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
                                    `/employee/${info.row.original.id}/employee-edit`
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
    

    const onChangeSearchInput = (e) => {
        setGlobalFilter(e)
    }
    return (
        <div>
            {(dataLoading || loading) && <Loader />}
            <Breadcrumb
                name={"Employee"}
                menuItem={[{ name: "Employee" }, { name: "list" }]}
            />
            <div className="col-12 col-md-12 col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h3>Employee List</h3>
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

export default EmployeeList
