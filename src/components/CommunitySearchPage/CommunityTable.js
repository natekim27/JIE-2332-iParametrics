import React, { useEffect, useState } from 'react';
import { useGlobalFilter, useTable } from "react-table";
import CwcsData from '../../cwcs.json';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

const CommunityTable = ({
    columns,
    data,
    input
}) => {
    const navigate = useNavigate();
    const formatTrProps = (state = {}) => {
        return {
                onClick: () => {
                navigate(`/communityDetails/${state.values.REGION}`, { replace: true });
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
      useGlobalFilter);
    useEffect(() => {
        setGlobalFilter(input);
    }, [input]);
    return(
        <div>
            <table className='table table-striped' {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                        ))}
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

export default CommunityTable;
