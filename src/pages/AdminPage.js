import React, { useState, useEffect } from 'react';
import ReactTable from '../components/dataView/ReactTable';
import { GetAxiosData } from '../api/ApiMethods';

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAxiosData('/students');
        setUsers(response.data.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return <ReactTable data={users} />;
};

export default AdminPage;
