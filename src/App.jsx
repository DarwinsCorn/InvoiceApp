import React, {useState} from "react";
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from './components/layout';
import Entry from './pages/entry';
import Vendors from './pages/vendor';
import Invoices from './pages/invoices';
import InvoiceDetail from './pages/invoiceDetail';
import {data as dataInv} from './data/invoiceData';
import {data as dataVend} from './data/vendorData';
import { setLocalStorageDB, getLocalStorageDB } from './utils/db';
import './css/index.css'
import './css/App.css';

function dataLoader() {
    let refreshed = false;
  
    if(!sessionStorage.getItem('session')){
      const sessionId = Math.random().toString();  
      sessionStorage.setItem('session',sessionId);
    }
    else refreshed = true;
  
    if(!refreshed) {
        setLocalStorageDB(dataInv)
        setLocalStorageDB(dataVend, false)
    }
    
    return null;
}

export default function App() {

    const [data, setData] = useState(getLocalStorageDB());
    
    return(
        <> 
            <RouterProvider router={
                createBrowserRouter(
                    [
                      {
                        path: '/',
                        element: <Layout />,
                        loader: dataLoader,
                        children: [
                          {
                            index: true,
                            element: <Entry />,
                          },
                          {
                            path: 'vendors',
                            element: <Vendors data={data} setData={setData}/>,
                          },
                          {
                            path: 'invoices',
                            element: <Invoices data={data} setData={setData}/>,
                          },
                          {
                            path: 'invoices/:id',
                            element: <InvoiceDetail data={data}/>,
                          }
                        ]
                      }
                    ]
                  )
            } />            
        </>
    )
}