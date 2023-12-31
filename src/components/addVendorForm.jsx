import React from "react";
import classes from '../css/addVendorForm.module.css';

export default function AddVendorForm({set,add, data}) {

    const vendData = data.filter(data => data.type === "vendor");

    function vendorValidator(email) {
        return vendData.find(vend => vend.email === email);
    }

    function formHandler(evt) {
        evt.preventDefault();
        const form = evt.target;
        
        if(vendorValidator(form.email.value)) {
            alert( "This vendor already exists. Please enter valid information.")
            return
        };

        add(form);
        set();
    }

    return(
        <div className={classes.container}>
            <form onSubmit={formHandler}>
                <div className={classes.center}>
                    <input required className={classes.inputForm} placeholder="Vendor Name" type="text" name="name" id="name"  />
                    <input required className={classes.inputForm} placeholder="City" type="text" name="city" id="city" />
                    <input required className={classes.inputForm} placeholder="Street" type="text" name="street" id="street" />
                    <input required className={classes.inputForm} placeholder="State" type="text" name="state" id="state" />
                    <input required className={classes.inputForm} placeholder="Zip Code" type="text" name="zip" id="zip" />
                    <input required className={classes.inputForm} placeholder="Email" type="email" name="email" id="email" />
                    <input className={classes.inputForm} placeholder="Phone" type="tel" name="phone" id="phone"/>
                    
                    <button className={classes.submitBtn}>ADD VENDOR</button>
                </div>
            </form>
        </div>
    )
}