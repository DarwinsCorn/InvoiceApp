import React from "react";
import classes from '../css/addVendor.module.css';

export default function AddVendorForm({set,add}) {

    function formHandler(evt) {
        evt.preventDefault();
        const form = evt.target;
        
        add(form);
        set();
    }

    return(
        <div className={classes.container}>
            <h1>Enter vendor information</h1>
            <form onSubmit={formHandler}>
                <label>
                    Vendor Name:
                    <input type="text" name="name" id="name" /><br />
                </label>
                Address:
                   <label htmlFor="street">Street:</label> <input type="text" name="street" id="street" /><br />
                    <label htmlFor="city">City:</label><input type="text" name="city" id="city" /><br />
                    <label htmlFor="state">State:</label><input type="text" name="state" id="state" /><br />
                    <label htmlFor="zip">Zip:</label><input type="text" name="zip" id="zip" /><br />
                
                <label>Email:
                    <input type="email" name="email" id="email" /><br />
                </label>
                <label>Phone:
                    <input type="number" name="phone" id="phone" /><br />
                </label>
                <button>ADD VENDOR</button>
                <button onClick={set}>Cancel</button>
            </form>
        </div>
    )
}