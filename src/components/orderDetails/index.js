
import React from 'react'
import './orderDetails.css'
import { Link } from 'react-router-dom'
// Import Icon
import { BiLeftArrowCircle} from 'react-icons/bi'

function Index(props) {
   
    let order = (props.location.state)

    let orderedProductsName = order["Orders"].map((order)=>{
        return (
             <li key={order.title}>{order.title}</li>
        )      
    })
    let orderedProductsQuantity = order["Orders"].map((order)=>{
        return (
             <li key={order.count}>{order.count}</li>
        )      
    })
    let orderedProductsSubPrice = order["Orders"].map((order)=>{
        return (
             <li key = {order.subPrice}>Rs {order.subPrice}</li>
        )      
    })
    let orderedProductsSize = order["Orders"].map((order)=>{ 
        if(order.selectedSize !==0) {
        return (
             <li key = {order.selectedSize}>{order.selectedSize}</li>
        )  
        }  else{return <li> Null</li>}
    })

    
    return (
        <div className="orderDetails">
             <Link to='/orders' className="backArrow"><BiLeftArrowCircle/></Link>
            <div className="orderDetailsContainer">
                <div className="detailsTxt">
                    <h3>Order Details</h3>
                    <li><h5>First Name: <span>{order["First Name"]}</span> </h5></li>
                    <li><h5>Last Name: <span>{order["Last Name"]}</span> </h5></li>
                    <li><h5>Address 1: <span>{order["Address 1"]}</span></h5></li>
                    <li><h5>Address 2: <span>{order["Address 2"]}</span></h5></li>
                    <li><h5>City: <span>{order["City"]}</span></h5></li>
                    <li><h5>Zip Code: <span>{order["Zip"]}</span></h5></li>
                    <li><h5>Province: <span>{order["Province"]}</span></h5></li>
                    <li><h5 className="ordersBtn totalBill">Total Bill: Rs {order["Total Price"]}</h5></li>
                </div>
            
                <table className="detailsTable">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Size</th>
                            <th>Product Quantity</th>
                            <th>Product Sub Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{orderedProductsName}</td>
                            <td>{orderedProductsSize}</td>
                            <td>{orderedProductsQuantity}</td>
                            <td>{orderedProductsSubPrice}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Index
