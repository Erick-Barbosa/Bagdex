import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PageRouter from './Components/PageRouter';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <PageRouter/>
      </div>
    </BrowserRouter>
  );
}