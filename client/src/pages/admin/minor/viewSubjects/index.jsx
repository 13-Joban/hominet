import React, { useEffect, useState } from 'react';
import { useTable, useFilters, usePagination } from 'react-table';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import locofy from '/public/images/gndec-fotor-bg-remover-20230410223713.png';
import { getAllSubjects, adminLogout } from '../../../../api';

const ViewSubjects = () => {
  const [subjectsData, setSubjectsData] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectsResponse = await dispatch(getAllSubjects());
        // console.log('subjectsResponse', subjectsResponse);
        if (Array.isArray(subjectsResponse.payload)) {
          setSubjectsData(subjectsResponse.payload);
        } else {
          console.error('Invalid data format received from the API.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(() => [
    {
      Header: 'Name',
      accessor: 'subjectName',
    },
    {
      Header: 'Code',
      accessor: 'subjectCode',
    },
    {
      Header: 'Type',
      accessor: 'subjectType',
    },
    {
      Header: 'Edit Subject',
      accessor: 'editSubject', // Use a unique accessor for the custom column
      Cell: ({ row }) => (
        <Link href={`/admin/minor/viewSubjects/${row.original.subjectCode}`}>
          <button className="px-4 py-2 bg-blue-500 text-white text-center rounded-lg">
            Edit Subject
          </button>
        </Link>
      ),
    },
  ], []);
  

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
      data: subjectsData,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  const handleLogout = async () => {
    try {
      // Dispatch the adminLogout action
      await dispatch(adminLogout());
      router.push('/admin')

      // Optionally, you can redirect the user to the login page or perform other actions
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

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
          <a href="/admin/minor" className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white">
            Dashboard
          </a>
          <a
            href="/admin/minor/studentrecord"
            className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white mt-1"
          >
            Student Record
          </a>
        </div>
        <div className="mt-auto px-4 py-2 border-t border-gray-700 hover:bg-gray-700 text-white block cursor-pointer" onClick={handleLogout}>
        Logout
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full max-w-4xl mx-auto p-8">
      <div className='mb-4 '>
          <p className='text-red font-medium text-2xl'>Minor Degree Classroom Subjects List</p>
        </div>


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

        <div className="flex justify-between items-center mt-4">
          <div>
            Page{' '}
            <strong>
              {pageIndex + 1} of {Math.ceil(rows.length / pageSize)}
            </strong>
          </div>
          <div>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className={`px-4 py-2 mr-2 ${canPreviousPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'} rounded-lg`}
            >
              Previous
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className={`px-4 py-2 ${canNextPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'} rounded-lg`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSubjects;
