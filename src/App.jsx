import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Entry from './pages/entry';
import Vendors from './pages/vendor';
import Invoices from './pages/invoices';
import InvoiceDetail from './pages/invoiceDetail';
import './css/App.css';

export default function App() {

  return (
    <>      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
              <Route index element={<Entry />} />
              <Route path='vendors' element={<Vendors />} />
              <Route path='invoices' element={<Invoices />} />
              <Route path='invoices/:id' element={<InvoiceDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

