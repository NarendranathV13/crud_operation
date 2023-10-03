import React, { useState, useContext } from 'react';
import { useTable, usePagination,useSortBy } from 'react-table';
import FormModal from '../modal/FormModal';
import Swal from 'sweetalert2';
import { DeleteAxiosData } from '../../api/ApiMethods';
import { ContextApi } from '../contextApi/ContextApi';
import EditForm from '../form/EdiForm';
const ReactTable = ({ data, handleSort }) => {
  const { refresh, setRefresh } = useContext(ContextApi);
  const [editShow, setEditShow] = useState(false);
  const [editData, setEditData] = useState(null);
  //delete the ID 
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await DeleteAxiosData(`/students/${id}`);
          Swal.fire('Deleted!', 'The user has been deleted.', 'success');
          setRefresh("3")
        } catch (error) {
          setRefresh("1")
          console.error(`Error deleting user with ID ${id}:`, error);
          Swal.fire('Error', 'An error occurred while deleting the user.', 'error');
        }
      }
    });
  };

  const handleEdit = (rowData) => {
    setEditData(rowData);
    setEditShow(true);
  }
  const columns = React.useMemo(
    () => [
      {
        Header: 'User ID',
        accessor: 'id',
      },
      {
        Header: 'User name',
        accessor: 'user_name',
      },
      {
        Header: 'Role',
        accessor: 'role',
      },
      {
        Header: 'Full Name',
        accessor: d => `${d.first_name} ${d.last_name}`,
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Date of Birth',
        accessor: 'dob',
      },
      {
        Header: 'Gender',
        accessor: 'gender',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Course Name',
        accessor: 'coursename',
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div>
            <i
              className="fa-solid fa-user-pen me-2 mx-2"
              style={{ color: "#ffa50a", cursor: 'pointer' }}
              onClick={() => handleEdit(row.original)}
            ></i>
            <i
              className="fa-solid fa-trash me-2 mx-2"
              style={{ color: "#b22a2a", cursor: 'pointer' }}
              onClick={() => handleDelete(row.original.id)}
            ></i>
          </div>
        ),
      },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useSortBy,
    usePagination
    
  );

  return (
    <>
      <FormModal />
      <div className=' container'>
        {editShow && (
          <div className='col-lg-12'>
            <EditForm editData={editData} />
          </div>
        )}
      </div>
   
      <div className="container mt-5">
        <table className="table" {...getTableProps()}>
        <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th
              {...column.getHeaderProps(column.getSortByToggleProps())}
              onClick={() => handleSort(column)}
              className={column.isSorted ? (column.isSortedDesc ? 'desc' : 'asc') : ''}
            >
              {column.render('Header')}
              {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
            </th>
          ))}
        </tr>
      ))}
    </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </button>
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {page.length}
            </strong>{' '}
          </span>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>
          <span>
            | Go to page:{' '}
            <input
              type="number"
              value={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                setPageSize(pageSize);
                gotoPage(page);
              }}
              style={{ width: '50px' }}
            />
          </span>{' '}
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default ReactTable;
