import React, { useState, useEffect, useContext } from 'react';
import ReactTable from '../components/dataView/ReactTable';
import { GetAxiosData } from '../api/ApiMethods';
import { ContextApi } from '../components/contextApi/ContextApi';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchLastName, setSearchLastName] = useState('');
  const [searchUsername, setSearchUsername] = useState('');
  const { refresh, setRefresh } = useContext(ContextApi);

  const fetchData = async (sortParam) => {
    try {
      const response = await GetAxiosData('/students', {
        sort_by: sortParam.columnId,
        sort_dir: sortParam.isSortedDesc ? 'desc' : 'asc',
        first_name: searchName, // passing the filtered data as params
        last_name: searchLastName, 
        user_name: searchUsername,
      });
      setUsers(response.data.result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData({ columnId: 'id', isSortedDesc: true });
  }, [refresh, searchName, searchLastName, searchUsername]); // Added search parameters as dependencies

  const handleSort = (column) => {
    fetchData({ columnId: column.id, isSortedDesc: column.isSortedDesc });
  };

  return (
    <>
      <div className='container my-3'>
        <h3 className=' text-center text-warning'>Search by field</h3>
        <div className='row'>
          <div className='col-lg-4'>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <div className='col-lg-4'>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              value={searchLastName}
              onChange={(e) => setSearchLastName(e.target.value)}
            />
          </div>
          <div className='col-lg-4'>
            <input
              type="text"
              className="form-control"
              placeholder="User Name"
              value={searchUsername}
              onChange={(e) => setSearchUsername(e.target.value)}
            />
          </div>
        </div>
      </div>
      <ReactTable data={users} handleSort={handleSort} />
    </>
  );
};

export default AdminPage;
