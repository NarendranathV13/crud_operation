import './App.css';
import AdminPage from './pages/AdminPage';
import React, { useState } from 'react';
import { ContextApi } from './components/contextApi/ContextApi';

function App() {
  const [refresh, setRefresh] = useState("1");
  return (
    <div className="App">
      <ContextApi.Provider value={{ refresh, setRefresh }}>
        <h1>User Table</h1>
        <AdminPage />
      </ContextApi.Provider>
    </div>
  );
}

export default App;
