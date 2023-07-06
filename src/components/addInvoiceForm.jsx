import React from "react";
import classes from '../css/addVendorForm.module.css';

export default function AddInvoiceForm({add, set}) {

    function formHandler(evt) {
        evt.preventDefault();
        const form = evt.target;
        
        add(form);
        set();
    }

    return(
        <div className={classes.container}>
            <form onSubmit={formHandler}>
                <div className={classes.center}>
                    <input required className={classes.inputForm} placeholder="Amount" type="number" name="amount" id="amount"  />
                    <input required className={classes.inputForm} placeholder="Date" type="date" name="date" id="date" />
                    <input required className={classes.inputForm} placeholder="Vendor" type="text" name="vendor" id="vendor" />
                    <input required className={classes.inputForm} placeholder="Item" type="text" name="item" id="item" />
                    
                    <button className={classes.submitBtn}>ADD INVOICE</button>
                </div>
            </form>
        </div>
    )
}