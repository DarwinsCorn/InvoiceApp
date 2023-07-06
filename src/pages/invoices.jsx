import React, {useState} from "react";
import { Link, useSearchParams} from "react-router-dom";
import Search from "../components/search";
import { getLocalStorageDB, setLocalStorageDB } from "../utils/db";
import AddInvoiceModal from "../components/addInvoiceModal";
import classes from '../css/invoices.module.css';

export default function Invoices({data, setData}) {
    
    const [search, setSearch] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const [addInvoiceToggle, setAddInvoiceToggle] = useState(false);

    const dataInv = data.filter(data => data.type === "invoice");
    const dataVend = data.filter(data => data.type === "vendor");
    
    let result;
    if (searchParams.get("vendor")) {
        result = dataInv.filter(inv =>
            searchParams.get("vendor").toLowerCase() == findVend(inv.vendorId).name.toLowerCase());
    } else {
        result = dataInv.filter(inv => inv.id == search ||               
            findVend(inv.vendorId).name.toLowerCase().includes(search.toLowerCase()));
    }

    const date = new Intl.DateTimeFormat('en-us',{ dateStyle: "long"});
    const currency = new Intl.NumberFormat('en-us',{ style:'currency',currency:'USD'})

    function findVend(id) {
        return dataVend.filter( vend => vend.id === id)[0];
    }

    function totalNumVend() {
        const unique = new Set(result.map(inv => inv.vendorId));
        
        return unique.size
    }

    function allTotalInv() {
        const amts = result.map(inv => inv.amt);
        return amts.length ? amts.reduce((acc,cur) => acc + cur) : 0;
    }

    function searchHandle(evt) {
        setSearchParams({})
        setSearch(evt.target.value);
    }

    function invoiceDeletion(id) {
        let db = getLocalStorageDB().slice(0);
        
        const index = db.findIndex(inv => inv.id === id);
        if (index !== -1) db.splice(index,1);

        setLocalStorageDB(db);
        setData(db)
    }

    function invoiceAddition(form) {
        console.log("adding an invoice", form.item)
    }

    function openCloseAddInvoiceModal() {
        setAddInvoiceToggle(prev => !prev);
    }
  
    const invoices = result.map(inv => (
        <Link key={inv.id} to={`${inv.id}`} >
            <div className={classes.strip}>
                <div className={classes.stripInvoiceFields}>
                    <div>
                        <h2 className={classes.invcolor}>Invoice #{inv.id}</h2>
                        <h2 className={classes.normalFont18}>{date.format(new Date(inv.date))}</h2>
                    </div>
                    <div>
                        <h2>{findVend(inv.vendorId).name}</h2>
                        <h2 className={classes.normalFont18}>{findVend(inv.vendorId).email}</h2>
                    </div>
                    <div className={classes.rightAlign}>
                        <h2>{currency.format(inv.amt)}</h2>
                    </div>
                </div>
                <div className={`${classes.center} ${classes.align}`}>
                    <input onClick={(e) => {e.preventDefault();invoiceDeletion(inv.id);}} type="button" value="Delete" />
                </div>
            </div>
        </Link>
    ));

    
    return(
        <div className={classes.center}>
            <div className={classes.blockMenu}>
                <div className={classes.cardMenu}>
                    <p className={`${classes.largeFont30} ${classes.bold} ${classes.cardMenuHeaders}`}>Vendors</p>
                    <p className={`${classes.largeFont30} ${classes.bold} ${classes.cardMenuHeaders}`}>{totalNumVend()}</p>
                </div>
                <div className={classes.cardMenu}>
                    <p className={`${classes.largeFont30} ${classes.bold} ${classes.cardMenuHeaders}`}>Invoices</p>
                    <p className={`${classes.largeFont30} ${classes.bold} ${classes.cardMenuItems}`}>{result.length}</p>
                    <p className={`${classes.largeFont30} ${classes.bold} ${classes.cardMenuItems}`}>{currency.format(allTotalInv())}</p>
                </div>
            </div>
            <input id="addInvoice" name="add" onClick={openCloseAddInvoiceModal} type="button" value="+" />
            <Search handler={searchHandle} placeholder={"Search an invoice number, or vendor name..."}/>            
            <div className={classes.cardInvoices}>
                {invoices}
            </div>
            {addInvoiceToggle && <AddInvoiceModal openClose={openCloseAddInvoiceModal} add={invoiceAddition} data={data}/>}
        </div>
    )
}