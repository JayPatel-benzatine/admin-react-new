import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
    getFilteredRowModel,
} from "@tanstack/react-table"
import React, { useEffect, useState } from "react"
import "./table.css"

const CustomTable = ({
    columns,
    data,
    totalCount,
    isPagination,
    paginationObj,
    onPageChange,
    onSetFilterData,
    manualPagination = true,
    manualSorting = true,
    staticTable = false,
    globalFilter,
}) => {
    const [sorting, setSorting] = useState([])

    const table = useReactTable(
        staticTable
            ? {
                  columns,
                  data,
                  getCoreRowModel: getCoreRowModel(),
                  getPaginationRowModel: getPaginationRowModel(),
                  initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
                  state: {
                      sorting,
                      globalFilter,
                  },
                  // onGlobalFilterChange: onChangeGolobalFilter,
                  onSortingChange: setSorting,
                  getFilteredRowModel: getFilteredRowModel(),
                  getSortedRowModel: getSortedRowModel(),
              }
            : {
                  columns,
                  data,
                  getCoreRowModel: getCoreRowModel(),
                  getPaginationRowModel: isPagination
                      ? getPaginationRowModel()
                      : undefined,
                  initialState: { pagination: paginationObj },
                  pageCount: Math.ceil(totalCount / paginationObj.pageSize),
                  manualPagination: manualPagination,
                  manualSorting: manualSorting,
                  getSortedRowModel: getSortedRowModel(),
                  state: {
                      sorting,
                  },
                  onSortingChange: setSorting,
              }
    )

    const [pageNumbers, setPageNumbers] = useState([])
    const [sortingFlag, setSortingFlag] = useState(false)

    useEffect(() => {
        const pageNumberLocal = []
        let totalPageCount = totalCount
        const totalPages = Math.ceil(
            totalPageCount / table.getState().pagination.pageSize
        )
        table.setPageCount(totalPageCount)
        const pageNmber =
            table.getState().pagination?.pageIndex ||
            paginationObj?.pageIndex ||
            0
        paginationObj && table.setPagination(paginationObj)
        // Display the first two pages
        for (let i = 0; i < Math.min(totalPages, 2); i++) {
            pageNumberLocal.push(i)
        }

        // Display an ellipsis if there's a gap between the first and last pages
        if (pageNmber > 2) {
            pageNumberLocal.push("...")
        }

        // Display the last two pages
        for (
            let i = Math.max(pageNmber - 1, 1);
            i < Math.min(totalPages, pageNmber + 1);
            i++
        ) {
            pageNumberLocal.push(i)
        }

        // Display an ellipsis if there's a gap between the last pages
        if (totalPages - pageNmber > 2) {
            pageNumberLocal.push("...")
        }
        // Display the last two pages
        for (
            let i = Math.max(totalPages - 2, pageNmber + 1);
            i < totalPages;
            i++
        ) {
            pageNumberLocal.push(i)
        }

        const uniqueArray = pageNumberLocal.filter((item, index, array) =>
            item === "..." ? index : array.indexOf(item) === index
        )
        setPageNumbers(uniqueArray)

        return () => {}
    }, [
        isPagination,
        table.getState().pagination.pageIndex,
        table.getState().pagination.pageSize,
        totalCount,
    ])

    useEffect(() => {
        if (table.getState().sorting && sortingFlag) {
            setSortingFlag(false)
            onSetFilterData && onSetFilterData(table.getState().sorting[0])
        }
        return () => {}
    }, [table.getState(), sortingFlag])

    return (
        <div className="table-responsive">
            <table className="table table-md">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr
                            key={headerGroup.id}
                            onClick={() => {
                                setSortingFlag(true)
                            }}
                        >
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder ? null : (
                                        <div
                                            {...{
                                                className:
                                                    header.column.getCanSort()
                                                        ? "cursor-pointer select-none"
                                                        : "",
                                                onClick:
                                                    header.column.getToggleSortingHandler(),
                                            }}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {{
                                                asc: "🔼",
                                                desc: "🔽",
                                            }[header.column.getIsSorted()] ??
                                                null}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.length === 0 ? (
                        <tr>
                            <td
                                style={{ textAlign: "center" }}
                                colSpan={columns.length}
                            >
                                No records found.
                            </td>
                        </tr>
                    ) : (
                        table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="text-center">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {isPagination && (
                <div className="pagination-section ">
                    <div className="form-group row-selection ">
                        <label>Row per page</label>
                        <select
                            className="form-control"
                            value={table.getState().pagination.pageSize}
                            onChange={(e) => {
                                table.setPageSize(Number(e.target.value))
                                table.setPageIndex(0)
                                onPageChange(1, Number(e.target.value))
                            }}
                        >
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                    <nav className="d-inline-block">
                        <ul className="pagination mb-0">
                            <li
                                className="page-item"
                                onClick={() => {
                                    if (table.getCanPreviousPage()) {
                                        table.previousPage()
                                        onPageChange(
                                            table.getState().pagination
                                                .pageIndex - 1,
                                            table.getState().pagination.pageSize
                                        )
                                    }
                                }}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <a className="page-link" href="#" tabIndex="-1">
                                    <i className="fas fa-chevron-left"></i>
                                </a>
                            </li>
                            {pageNumbers.map((pageItem, index) => (
                                <React.Fragment key={index}>
                                    {pageItem === "..." ? (
                                        <li className="page-item">
                                            <span className="page-link">
                                                {" "}
                                                {pageItem}
                                            </span>
                                        </li>
                                    ) : (
                                        <li
                                            className={`page-item ${
                                                pageItem ===
                                                table.getState().pagination
                                                    .pageIndex
                                                    ? "active"
                                                    : ""
                                            }`}
                                            onClick={() => {
                                                table.setPageIndex(pageItem)
                                                onPageChange(
                                                    Number(pageItem),
                                                    table.getState().pagination
                                                        .pageSize
                                                )
                                            }}
                                        >
                                            <span className="page-link">
                                                {" "}
                                                {pageItem + 1}
                                            </span>
                                        </li>
                                    )}
                                </React.Fragment>
                            ))}
                            <li
                                className="page-item"
                                onClick={() => {
                                    if (table.getCanNextPage()) {
                                        table.nextPage()
                                        // table.setPageIndex(Number(table.getState().pagination.pageIndex) + 1)
                                        onPageChange(
                                            Number(
                                                table.getState().pagination
                                                    .pageIndex
                                            ) + 1,
                                            table.getState().pagination.pageSize
                                        )
                                    }
                                }}
                                disabled={!table.getCanNextPage()}
                            >
                                <a className="page-link" href="#">
                                    <i className="fas fa-chevron-right"></i>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
            {staticTable && (
                <div className="pagination-section ">
                    <div className="form-group row-selection ">
                        <label>Row per page</label>
                        <select
                            className="form-control"
                            value={table.getState().pagination.pageSize}
                            onChange={(e) => {
                                table.setPageSize(Number(e.target.value))
                                table.setPageIndex(0)
                            }}
                        >
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                    <nav className="d-inline-block">
                        <ul className="pagination mb-0">
                            <li
                                className="page-item"
                                onClick={() => {
                                    if (table.getCanPreviousPage()) {
                                        table.previousPage()
                                    }
                                }}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <a className="page-link" href="#" tabIndex="-1">
                                    <i className="fas fa-chevron-left"></i>
                                </a>
                            </li>
                            {pageNumbers.map((pageItem, index) => (
                                <React.Fragment key={index}>
                                    {pageItem === "..." ? (
                                        <li className="page-item">
                                            <span className="page-link">
                                                {" "}
                                                {pageItem}
                                            </span>
                                        </li>
                                    ) : (
                                        <li
                                            className={`page-item ${
                                                pageItem ===
                                                table.getState().pagination
                                                    .pageIndex
                                                    ? "active"
                                                    : ""
                                            }`}
                                            onClick={() => {
                                                table.setPageIndex(pageItem)
                                            }}
                                        >
                                            <span className="page-link">
                                                {" "}
                                                {pageItem + 1}
                                            </span>
                                        </li>
                                    )}
                                </React.Fragment>
                            ))}
                            <li
                                className="page-item"
                                onClick={() => {
                                    if (table.getCanNextPage()) {
                                        table.nextPage()
                                    }
                                }}
                                disabled={!table.getCanNextPage()}
                            >
                                <a className="page-link" href="#">
                                    <i className="fas fa-chevron-right"></i>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    )
}

export default CustomTable
