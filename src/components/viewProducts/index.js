import React from 'react'
import { db } from '../../firebase'
import { useState } from 'react'
import { Link } from 'react-router-dom'
// Import lodash
import _ from 'lodash'
// Import Icon
import { BiLeftArrowCircle} from 'react-icons/bi'
// Loader
import { css } from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";


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


function Index(props) {
   
    let category = props.match.params.type;
    const categoryCapitalized = category.charAt(0).toUpperCase() + category.slice(1);

    let [productsArr,setProductsArr] = useState(false)

    let getProducts = async()=>{
        db.ref(`products/${category}`).on('value',snapshot=>{
            if(snapshot.val()!=null){
                let dataObj = snapshot.val()
                let check = _.isEqual(dataObj,productsArr)
                if(!check){
                    setProductsArr(dataObj)
                }
            }})}

    getProducts();
            
    // Products JSX
    let actualProducts = Object.keys(productsArr).map((id,index)=>{
        return (
            <tr key = {id}>
                    <td>{productsArr[id].title}</td>
                    <td>{productsArr[id].type}</td>
                    <td>{productsArr[id].basePrice}</td>
                    <td><Link to={{
                    pathname:`/products/editProducts/${id}`,
                    state:{product:productsArr[id],category:category}
                    }}><button className="ordersBtn">Edit</button></Link></td>
            </tr>
        )
    })
        
    if(!productsArr){
        return (
            <div>
                    <BarLoader loading={true} css={override}/>
            </div>
        )}
    else{
        return(
            <div className="addProducts ml-2" style={{fontSize:"1.1rem"}}>
                <Link to='/' className="backArrow "><BiLeftArrowCircle/></Link>
                <h2>{categoryCapitalized} Details</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Sub Type</th>
                            <th scope="col">Unit Price</th>
                            <th scope="col"></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {actualProducts}
                    </tbody>
                </table>
            </div>
            )
        }
    }


export default Index
