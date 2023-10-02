import React, { useState, useEffect, useContext } from 'react';
import ReactTable from '../components/dataView/ReactTable';
import { GetAxiosData } from '../api/ApiMethods';
import { ContextApi } from '../components/contextApi/ContextApi';
const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const { refresh, setRefresh } = useContext(ContextApi);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAxiosData('/students');
        setUsers(response.data.result);
        console.log(refresh)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [refresh]);

  return <ReactTable data={users}/>;
};

export default AdminPage;
