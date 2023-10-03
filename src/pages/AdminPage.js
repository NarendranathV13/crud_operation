import React, { useState, useEffect, useContext } from 'react';
import ReactTable from '../components/dataView/ReactTable';
import { GetAxiosData } from '../api/ApiMethods';
import { ContextApi } from '../components/contextApi/ContextApi';
const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const { refresh, setRefresh } = useContext(ContextApi);
  const fetchData = async (sortParam) => {
    try {
      const response = await GetAxiosData('/students', {
        sort_by: sortParam.columnId, // Set the sorting parameter dynamically
        sort_dir: sortParam.isSortedDesc ? 'desc' : 'asc' // Set the sorting direction
      });
      setUsers(response.data.result);
      console.log(refresh)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData({ columnId: 'id', isSortedDesc: true }); // Initial load with default sorting
  }, [refresh]);

  const handleSort = (column) => {
    fetchData({ columnId: column.id, isSortedDesc: column.isSortedDesc });
  };

  return <ReactTable data={users} handleSort={handleSort} />;
};

export default AdminPage;
