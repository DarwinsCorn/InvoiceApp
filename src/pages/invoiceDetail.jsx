import React from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";
import classes from '../css/invdetail.module.css';
import InvoiceDetailAlt from "./invoiceDetailAlt";
import { currency } from "../utils/formats";

export default function InvoiceDetail({data}) {
    const {id} = useParams();
    const matchedMedia = useMediaQuery("(width < 950px)");
   

    const vendData = data.filter(data => data.type === "vendor");
    const invData = data.filter(data => data.type === "invoice");
    
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
            <div className={classes.stripCenter}>                
                {item.qty}
            </div>
            <div className={classes.stripCenter}>                
                {currency.format(item.priceUnit)}
            </div>
            <div className={classes.stripCenter}>                
                {currency.format(item.qty * item.priceUnit)}
            </div>
        </div>
    ));
   
    
    return(matchedMedia ? <InvoiceDetailAlt invDetails={invDetails} vendDetails={vendDetails} subtotal={subtotal} total={total} taxed={taxed} /> :
        <div className={classes.center}>
            <div className={classes.invoice}>                
                <section className={classes.banner}>
                    <div className={classes.mediaSize}>
                        <p className={`${classes.font22}`}>{vendDetails.name}</p>
                        <p className={`${classes.xlargeFont70} ${classes.boldFont} ${classes.invWord}`}>INVOICE</p>

                    </div>
                    <div className={classes.mediaSize}>
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
                            <div className={classes.stripCenter}>
                                <h3 className={classes.lightHeaders}>Qty</h3>
                            </div>
                            <div className={classes.stripCenter}>
                                <h3 className={classes.lightHeaders}>Price/Unit</h3>
                            </div>
                            <div className={classes.stripCenter}>
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