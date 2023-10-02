import React from 'react';
import { useTable, usePagination } from 'react-table';
import FormModal from '../modal/FormModal';

const ReactTable = ({ data }) => {
  const handleDelete = (id) => {
    // Implement your delete logic here, using the id parameter
    console.log(`Delete clicked for user with ID ${id}`);
    // Add your delete logic here
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'User ID',
        accessor: 'id',
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
    usePagination
  );

  return (
    <>
      <FormModal />
      <div className="container mt-5">
        <table className="table" {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
