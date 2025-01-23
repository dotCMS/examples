import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateContentType from './components/CreateContentType';
import CreateContent from './components/CreateContent';
import Navigation from './components/Navigation';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F8F9FC]">
        <Navigation />
        <main className="container mx-auto px-4 py-6 max-w-7xl">
          <Routes>
            <Route path="/" element={<CreateContentType />} />
            <Route path="/create-content/:contentTypeId" element={<CreateContent />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;