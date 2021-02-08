import React from 'react'
import './orders.css'
import { db } from '../../firebase'
import { useState } from 'react'
import { FiDelete } from 'react-icons/fi'
import { Link } from 'react-router-dom'

// Import Icon
import { BiLeftArrowCircle} from 'react-icons/bi'
// Import lodash
import _ from 'lodash'
// Initial Bar Loader
import { css } from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";
// Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from 'react-toastify'

// Loading Bar css
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  width:25%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function Index() {
    let [ordersArr,setOrdersArr] = useState(false)

    let removeItem=(id)=>{
        db.ref(`orders/${id}/`).remove(function(error) {
            if (error)
              {
                let notify = () => toast.error(error);
                notify();
              }
            else{
                let notify = () => toast.dark("Product Successfuly Deleted");
                notify();
            }
          })
    }

    // Getting Orders from DB
    let getOrders = async()=>{
        db.ref('orders').on('value',snapshot=>{
        
        if(snapshot.val()!=null){
            let dataObj = snapshot.val()
            let check = _.isEqual(dataObj,ordersArr)
            if(!check){
                setOrdersArr(dataObj)
            }
        }
        else{
            setOrdersArr(false)
        }
        
    })
    }
    getOrders();
    
    // Orders JSX
    let actualOrders =Object.keys(ordersArr).map((id)=>{
        return (
            <tr key={id}> 
                <td>{ordersArr[id]["First Name"] +" "+ ordersArr[id]["Last Name"] }</td>
                <td>{ordersArr[id]["City"]}</td>
                <td>{"Rs " +ordersArr[id]["Total Price"]}</td>
                <td><Link to={{
                    pathname:`/orders/details/${id}`,
                    state:ordersArr[id]
                }} ><button className="ordersBtn">View</button></Link></td>
                <td ><FiDelete className="text-danger removeBtn" onClick={()=>removeItem(id)} /></td>
            </tr>
        )
    })

    if(!ordersArr){
    return (
        <div>
              <BarLoader loading={true} css={override}/>
        </div>
    )}
    else{
        return (
                <div className="orders p-2">
                     <Link to='/' className="backArrow"><BiLeftArrowCircle/></Link>
                    <h2 className="text-center my-2">Customer Orders</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">City</th>
                                <th scope="col">Order Total</th>
                                <th scope="col"></th>
                                <th></th>
                            </tr>
                           
                        </thead>
                        <tbody>
                            {actualOrders}
                        </tbody>
                    </table>
                    <ToastContainer 
                      transition={Slide}/>
                </div>)
    }
}

export default Index
