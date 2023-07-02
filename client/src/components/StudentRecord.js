import React from 'react';
import { useTable, useFilters, usePagination } from 'react-table';
import Image from 'next/image';
import locofy from '../../public/images/gndec-fotor-bg-remover-20230410223713.png';

const StudentRecord = ({ data }) => {
    const columns = React.useMemo(
        () => [
          {
            Header: 'CRN',
            accessor: 'crn',
          },
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Branch',
            accessor: 'branch',
          },
          {
            Header: 'Semester',
            accessor: 'semester',
          }
          // Add more columns as needed
        ],
        []
      );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: 10 }, // Set initial page size and index
      },
      useFilters,
      usePagination
    );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-800">
        <div className="px-4 py-5 border-b border-gray-700">
          <div className="flex items-center justify-center">
            <Image src={locofy} alt="Logo" width={48} height={48} />
            <span className="ml-2 text-white font-medium text-lg">My Dashboard</span>
          </div>
        </div>
        <div className="mt-2">
          <a href="/admindash" className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white">
            Dashboard
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full max-w-4xl mx-auto p-8">
        {/* Search filter */}
        {/* <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div> */}

        <div className='mb-4 '>
            <p className='text-red font-medium  text-2xl'>Minor Degree  Session Jan-June 2023 </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table {...getTableProps()} className="w-full">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100">
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} className="p-2 text-left">
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} className="p-2 border-t border-gray-200">
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <div>
            Page{' '}
            <strong>
              {pageIndex + 1} of {Math.ceil(rows.length / pageSize)}
            </strong>
          </div>
          <div>
            {/* <button
              onClick={() => setGlobalFilter('')}
              className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-lg"
            >
              Reset Search
            </button> */}
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className={`px-4 py-2 mr-2 ${
                canPreviousPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'
              } rounded-lg`}
            >
              Previous
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className={`px-4 py-2 ${
                canNextPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'
              } rounded-lg`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRecord;
