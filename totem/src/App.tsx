import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TotemView from './components/TotemView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/totem" element={<TotemView />} />
        <Route path="/" element={<Navigate to="/totem" replace />} />
      </Routes>
    </Router>
  );
}
export default App;
