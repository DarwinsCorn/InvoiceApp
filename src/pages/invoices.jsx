import React, {useState} from "react";
import { Link, useSearchParams} from "react-router-dom";
import Search from "../components/search";
import AddInvoiceModal from "../components/addInvoiceModal";
import { currency, date } from "../utils/formats";
import classes from '../css/invoices.module.css';

export default function Invoices({data, setData}) {
    
    const [search, setSearch] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const [addInvoiceToggle, setAddInvoiceToggle] = useState(false);

    const dataInv = data.filter(data => data.type === "invoice");
    const dataVend = data.filter(data => data.type === "vendor");
    
    let result;
    if (searchParams.get("vendorId")) {
        result = dataInv.filter(inv =>
            searchParams.get("vendorId") == inv.vendorId);
    } else {
        result = dataInv.filter(inv => inv.id == search ||               
            findVend(inv.vendorId).name.toLowerCase().includes(search.toLowerCase()));
    }

    function findVend(id) {
        return dataVend.filter( vend => vend.id === id)[0];
    }

    function totalNumVend() {
        const unique = new Set(result.map(inv => inv.vendorId));
        
        return unique.size
    }

    function invTotal(inv) {
        return inv.items.map(item => item.priceUnit * item.qty * 1.13).reduce((acc,cur) => acc + cur);
    }

    function allTotalInv() {
        const amts = result.map(inv => invTotal(inv));
        return amts.length ? amts.reduce((acc,cur) => acc + cur) : 0;
    }

    function searchHandle(evt) {
        setSearchParams({})
        setSearch(evt.target.value);
    }

    function invoiceDeletion(id) {
        let db = data.slice(0);
        
        const index = db.findIndex(inv => inv.id === id);
        if (index !== -1) db.splice(index,1);

        setData(db)
    }

    function invoiceAddition(form) {
        const quantities = [];
        const units = [];
        const descriptions = [];
       

        if(form.qty.length) {
            for(let i=0; i < form.qty.length; i++)  {
                quantities.push(form.qty[i].value);
                units.push(form.priceUnit[i].value);
                descriptions.push(form.descrp[i].value);
            }
        } else{
            quantities.push(form.qty.value);
            units.push(form.priceUnit.value);
            descriptions.push(form.descrp.value);
        }

        const items = quantities.map((qty,ix) => {return {
                    qty: Number(qty),
                    priceUnit: Number(units[ix]),
                    descrp: descriptions[ix],
                }
            }
        )

        const db = data.slice(0);
        db.push({
            id: dataInv.length + 1001,
            type: "invoice",
            date: form.date.value,
            vendorId: Number(form.vendor.value),
            items: items,
        });
        
        setData(db);
    }

    function openCloseAddInvoiceModal() {
        setAddInvoiceToggle(prev => !prev);
    }
  
    const invoices = result.map(inv => (
        <Link key={inv.id} to={`${inv.id}`} >
            <div className={classes.strip}>
                <div className={classes.stripInvoiceFields}>
                    <div className={classes.whenMedia}>
                        <h2 className={classes.invcolor}>Invoice #{inv.id}</h2>
                        <h2 className={classes.normalFont18}>{date.format(new Date(inv.date))}</h2>
                    </div>
                    <div>
                        <h2>{findVend(inv.vendorId).name}</h2>
                        <h2 className={classes.normalFont18}>{findVend(inv.vendorId).email}</h2>
                    </div>
                    <div className={classes.rightAlign}>
                        <h2>{currency.format(invTotal(inv))}</h2>
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
                    <p className={`${classes.largeFont30} ${classes.bold} ${classes.cardMenuItems} ${classes.alignmentFromLeft}`}>{currency.format(allTotalInv())}</p>
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