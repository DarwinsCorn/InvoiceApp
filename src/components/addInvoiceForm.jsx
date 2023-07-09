import React from "react";
import classes from '../css/addVendorForm.module.css';
import AddItemForm from "./addItemForm";

export default function AddInvoiceForm({add, set, data}) {

    const dataVend = data.filter(data => data.type === "vendor"); 

    const options = dataVend.map(vendor => (
        <option key={vendor.id} value={vendor.id} >{vendor.name}</option>
    ));

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
                    {/* <input 
                        required 
                        className={classes.inputForm} 
                        placeholder="Amount (calculated value)" 
                        type="number" 
                        name="amount" 
                        id="amount"  
                    /> */}
                    <input 
                        required 
                        className={classes.inputForm} 
                        placeholder="Date" 
                        type="date" 
                        name="date" 
                        id="date" 
                    />                    
                    <select required className={classes.inputForm} name="vendor" id="vendor">
                        <option disabled selected value={""} >Vendor</option>
                        {options}
                    </select>
                    <AddItemForm />
                    <button className={classes.submitBtn}>ADD INVOICE</button>
                </div>
            </form>
        </div>
    )
}