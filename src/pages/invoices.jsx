import React from "react";
import { Link } from "react-router-dom";
import classes from '../css/invoices.module.css';
import {data as invData} from '../data/invoiceData';
import {data as vendData} from '../data/vendorData';

export default function Invoices() {

    function findVend(id) {
        return vendData.filter( vend => vend.id === id)[0];
    }

    function numVend() {
        const unique = new Set(invData.map(inv => inv.vendorId));
        
        return unique.size
    }

    function allTotalInv() {
        const amts = invData.map(inv => inv.amt);
        return amts.reduce((acc,cur) => acc + cur)
    }
    
    
    const invoices = invData.map(inv => (
        <Link key={inv.id} to={`${inv.id}`}>
            <div className={classes.strip}>
                <div>
                    <h2 className={classes.invcolor}>Invoice #{inv.id}</h2>
                    <h2>{inv.date}</h2>
                </div>
                <div>
                    <h2>{findVend(inv.vendorId).name}</h2>
                    <h2>{findVend(inv.vendorId).email}</h2>
                </div>
                <div>
                    <h2>USD ${inv.amt}</h2>
                </div>
            </div>
        </Link>
    ));

    return(
        <div className={classes.center}>
            <div className={classes.block}>
                <div className={classes.cardMenu}>
                    <h1>Vendors</h1>
                    <h1>{numVend()}</h1>
                </div>
                <div className={classes.cardMenu}>
                    <h1>Invoices</h1>
                    <h1>{invData.length}</h1>
                    <h1>Total: USD ${allTotalInv()}</h1>
                </div>
            </div>
            <div className={classes.cardInvoices}>
                {invoices}
            </div>
        </div>
    )
}