import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main'; // Includes Sidebar
import List from './List'; // Your dashboard component
import Status from './Status'; // Your status/list component
import Important from './Important'; // Another page, like "Important"
import Settings from './Settings'; // Settings page
import Help from './Help'; // Help page

function App() {
  return (
    <Router>
      <div className="App">
        {/* Main component acts as a layout wrapper with the Sidebar */}
        <Main>
          <Routes>
            <Route path="/" element={<List />} /> {/* Default route */}
            <Route path="/status" element={<Status />} />
            <Route path="/important" element={<Important />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </Main>
      </div>
    </Router>
  );
}

export default App;
