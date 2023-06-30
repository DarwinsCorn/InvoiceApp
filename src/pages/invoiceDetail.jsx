import React from "react";
import { useParams } from "react-router-dom";
import classes from '../css/invdetail.module.css';
import {data as vendData} from '../data/vendorData';
import {data as invData} from '../data/invoiceData';

export default function InvoiceDetail() {
    const {id} = useParams();
    const currency = new Intl.NumberFormat('en-us', {style:'currency',currency:'USD'});
    
    function findDetails(id, dataArr) {        
        return dataArr.filter(member => member.id == id)[0];
    }
    const invDetails = findDetails(id,invData);
    const vendDetails = findDetails(invDetails.vendorId, vendData);
    const subtotal = invDetails.items.map(item => item.priceUnit * item.qty).reduce((acc,cur) => acc + cur);
    const taxed = subtotal * 0.13;
    const total = subtotal + taxed;

    const items = invDetails.items.map((item,ix) => (
        <div key={ix} className={classes.strip}>
            <div className={classes.stripDesc}>{item.descrp}</div>
            <div className={classes.stripQty}>                
                {item.qty}
            </div>
            <div className={classes.stripUnit}>                
                {currency.format(item.priceUnit)}
            </div>
            <div className={classes.stripTotal}>                
                {currency.format(item.qty * item.priceUnit)}
            </div>
        </div>
    ));
    
    return(
        <div className={classes.center}>
            <div className={classes.invoice}>                
                <section className={classes.banner}>
                    <div>
                        <p className={`${classes.font22}`}>{vendDetails.name}</p>
                        <p className={`${classes.xlargeFont70} ${classes.boldFont} ${classes.invWord}`}>INVOICE</p>

                    </div>
                    <div>
                        <p className={classes.thinFont18}>{vendDetails.phone}</p>
                        <p className={classes.thinFont18}>{vendDetails.email}</p>
                    </div>
                    <div>
                        <p className={classes.thinFont18}>{vendDetails.address.street}</p>
                        <p className={classes.thinFont18}>{vendDetails.address.city}, {vendDetails.address.state}</p>
                        <p className={classes.thinFont18}>{vendDetails.address.zip}</p>
                    </div>
                </section>
                <section className={classes.bannerAndItems}>
                    <section className={classes.subBanner}>
                        <div >
                            <div>
                                <p className={`${classes.lightHeaders} ${classes.thinFont18} ${classes.boldFont}`}>Billed to</p>
                            </div>
                            <div>
                                <p className={classes.thinFont18}>Customer info</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <h1 className={`${classes.lightHeaders} ${classes.thinFont18} ${classes.boldFont}`}>Invoice number</h1>
                                <p className={`${classes.thinFont18}`}>{invDetails.id}</p>
                            </div>
                            <div>
                                <p className={`${classes.lightHeaders} ${classes.thinFont18} ${classes.boldFont}`}>Date of Issue</p>
                                <p className={`${classes.thinFont18}`}>{invDetails.date}</p>
                            </div>
                        </div>
                        <div className={classes.invTotal}>
                            <p className={`${classes.thinFont18} ${classes.boldFont}`}>Invoice Total</p>
                            <p className={`${classes.lightHeaders} ${classes.largeFont40} ${classes.boldFont} ${classes.invNum}`}>{currency.format(total)}</p>
                        </div>
                    </section>
                    <section className={`${classes.items} `}>
                        <div className={`${classes.strip} ${classes.itemHeadings}`}>
                            <div ><h3 className={classes.lightHeaders}>Description</h3></div>
                            <div className={classes.stripQty}>
                                <h3 className={classes.lightHeaders}>Qty</h3>
                            </div>
                            <div className={classes.stripUnit}>
                                <h3 className={classes.lightHeaders}>Price/Unit</h3>
                            </div>
                            <div className={classes.stripTotal}>
                                <h3 className={classes.lightHeaders}>Amount</h3>
                            </div>
                        </div>
                        {items}
                    </section>
                    <section className={`${classes.balances}`}>
                        <div >
                            <p className={classes.lightHeaders}>Subtotal</p>
                            <p className={classes.lightHeaders}>Tax (13%)</p>
                            <p className={`${classes.lightHeaders} ${classes.hide}`}>Total</p>
                            <p className={classes.lightHeaders}>Amount Due (USD)</p>
                        </div>
                        <div >
                            <p>{currency.format(subtotal)}</p>
                            <p>{currency.format(taxed)}</p>
                            <p className={classes.hide}>{currency.format(total)}</p>
                            <p>{currency.format(total)}</p>
                        </div>
                    </section>
                </section>
            </div>
        </div>
    )
}