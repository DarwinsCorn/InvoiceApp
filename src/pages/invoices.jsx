import React from "react";
import { Link } from "react-router-dom";
import classes from '../css/invoices.module.css';
import {data as invData} from '../data/invoiceData';
import {data as vendData} from '../data/vendorData';

export default function Invoices() {

    const date = new Intl.DateTimeFormat('en-us',{ dateStyle: "long"});
    const currency = new Intl.NumberFormat('en-us',{ style:'currency',currency:'USD'})

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
                    <h2 className={classes.normalFont}>{date.format(new Date(inv.date))}</h2>
                </div>
                <div>
                    <h2>{findVend(inv.vendorId).name}</h2>
                    <h2 className={classes.normalFont}>{findVend(inv.vendorId).email}</h2>
                </div>
                <div className={classes.rightAlign}>
                    <h2>{currency.format(inv.amt)}</h2>
                </div>
            </div>
        </Link>
    ));

    return(
        <div className={classes.center}>
            <div className={classes.blockMenu}>
                <div className={classes.cardMenu}>
                    <h1>Vendors</h1>
                    <h1>{numVend()}</h1>
                </div>
                <div className={classes.cardMenu}>
                    <h1>Invoices</h1>
                    <h1>{invData.length}</h1>
                    <h1>{currency.format(allTotalInv())}</h1>
                </div>
            </div>
            <div className={classes.cardInvoices}>
                {invoices}
            </div>
        </div>
    )
}