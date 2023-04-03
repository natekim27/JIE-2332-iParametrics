import React, { useEffect } from 'react';
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { useNavigate, useParams } from "react-router-dom";
import './CommunityCompareTable.css';

const CommunityCompareTable = ({
    columns,
    data,
    input
}) => {
    const { sno } = useParams();
    const navigate = useNavigate();
    const formatTrProps = (state = {}) => {
        return {
                onClick: () => {
                navigate(`/communityCompareDetails/${sno}/${state.values.serial_number}`, { replace: true });
            },
            style: {
                cursor: 'pointer'
            },
        };
      };
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setGlobalFilter,
      } = useTable({
        columns,
        data
      },
      useGlobalFilter,
      useSortBy);
    useEffect(() => {
        setGlobalFilter(input);
    }, [input]);
    return(
        <div>
            <table className='table table-striped' {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => {
                            const cl = column.isSorted
                            ? (column.isSortedDesc
                              ? "down"
                              : "up")
                              : "default";
                        return (<th className={cl} {...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render("Header")}
                        </th>);
                        })}
                    </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps(formatTrProps(row))}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                        })}
                        </tr>
                    );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default CommunityCompareTable;