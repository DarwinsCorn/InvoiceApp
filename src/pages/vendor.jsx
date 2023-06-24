import React from "react";
import {Link} from 'react-router-dom';
import {data} from '../data/vendorData';
import classes from '../css/vendors.module.css';

export default function Vendors() {

    const vendors = data.map( vendor => (
        <Link>
            <div key={vendor.id} className={classes.strip}>
                <div>
                    <h2 >{vendor.name}</h2>
                </div>
                <div>
                    <h2 className={classes.normalFont18}>{vendor.email}</h2>
                </div>
                <div>
                    <h2>{vendor.address.city}, {vendor.address.state}</h2>
                </div>
            </div>
        </Link>
    ));

    return(
        <div className={classes.center}>
            <div className={classes.cardVendors}>{vendors}</div>
        </div>
    )
}