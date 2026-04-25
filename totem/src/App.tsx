import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TotemView from './components/TotemView';
import StaffView from './components/StaffView';
import CustomerDisplay from './components/CustomerDisplay';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/totem" element={<TotemView />} />
        <Route path="/staff" element={<StaffView />} />
        <Route path="/display" element={<CustomerDisplay />} />
        <Route path="/" element={<Navigate to="/totem" replace />} />
      </Routes>
    </Router>
  );
}
export default App;
