import React from 'react'
import './addProducts.css'
import { Link } from 'react-router-dom'
import { useState } from "react";
// Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from 'react-toastify'
// Icon
import { BiLeftArrowCircle} from 'react-icons/bi'
// Loader
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
// Database
import {db,storage} from '../../firebase'
import productMarking from '../../assets/images/productMarking.png'

// Loading Bar css
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius:10px;
  background: rgba(0, 0, 0, 0.9);
  padding:2rem;
  padding-bottom:4rem;
  padding-left:5rem;
  
`;

function Index(props) {
    // Loading Bar State
    let [loading, setLoading] = useState(false);
    let color  = "#FFFFFF"

    const [values, setValues] = useState({ sizes: ['']});

    let category = props.match.params.type;
    const categoryCapitalized = category.charAt(0).toUpperCase() + category.slice(1);
    

    // Create Sizes Input
    function createInputs() {
      return values.sizes.map((el, i) =>
        <div className="form-group" key={i}>
          <input className="mr-1" type="text" value={el||''} onChange={handleChange.bind(i)} required/>
          <button className="bg-dark text-white"onClick={removeClick.bind(i)} >Remove Product Size</button>
        </div>
      );
    }

    function handleChange(event) {
        let vals = [...values.sizes];
        vals[this] = event.target.value;
        setValues({ sizes: vals });
    }
    const addClick = () => {
        setValues({ sizes: [...values.sizes, '']})
    }
    const removeClick = () => {
        let vals = [...values.sizes];
        vals.splice(this,1);
        setValues({ sizes: vals });
    }
    
    // Upload Product
    let uploadProduct = (productName, productType, productDescription, productPrice,productImage,e)=>{
        const uploadTask = storage.ref(`images/${productImage.name}`).put(productImage);
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error)
            },
            ()=>{
                storage
                .ref("images")
                .child(productImage.name)
                .getDownloadURL()
                .then(url=>{
                    db.ref(`products/${props.match.params.type}`).push(
                        {
                          "title":productName.value,
                          "type":productType.value,
                          "basePrice":productPrice.value,
                          "description":productDescription.value,
                          "sizes":values.sizes,
                          "imgSrc":url
                        },function(error) {
                            setLoading(false)
                            setValues({ sizes: [] });
                            e.target.reset();
                            if (error)
                              {
                              let notify = () => toast.error(error);
                              notify();
                              }
                            else{
                            let notify = () => toast.dark("Product Successfuly Added");
                            notify();
                            }
                          }
                      )
                })
            }
        )
    }

    // Form Handler
    let formHandler = async (e) =>{
        e.preventDefault();
        if(e.target.productimg.files[0]){
            var pImg = e.target.productimg.files[0]
        }
        let {productName,productType,productDescription,productPrice} = e.target;
        setLoading(true);
        await uploadProduct(productName,productType,productDescription,productPrice,pImg,e);
    }

  
    return (
        <div className="addProducts p-2 pl-4 ">
            <Link to='/' className="backArrow "><BiLeftArrowCircle/></Link>
            <h2>{categoryCapitalized} Details</h2>
            <div className="addProductsContainer">
                <form onSubmit={formHandler} 
                     className="pr-3 pb-2 form_shadow"
                     style={{maxWidth: "30rem"}}>
                    <div className="form-group">
                        <label htmlFor="productName">Product Name</label>
                        <input  type="text" className="form-control" 
                        id="productName" placeholder="Product Name"
                        required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productType">Product Sub Category</label>
                        <input type="text" className="form-control" id="productType" 
                        placeholder="Ex Men's Casual FootWear " 
                        required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="productPrice">Product Price</label>
                        <input type="number" className="form-control"
                        id="productPrice" placeholder="3000" 
                        required/>
                    </div>
                    <div className="form-group">
                        {createInputs()}
                        <button className="bg-dark text-white" onClick={addClick} >Add Product Sizes</button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="productDescription">Product Description</label>
                        <textarea type="number" 
                        className="form-control" 
                        rows="5"
                        id="productDescription"  required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="productImage">Import Product Image</label>
                        <input type="file" className="form-control-file " 
                        id="productimg" required/>
                    </div>
                    <button type="submit" className="btn btn-primary bg-dark text-white" required>Submit</button>
                </form>
                <HashLoader color={color} loading={loading} css={override} size={60}  />
                <div className="productMarkingImg">
                    <img alt="Product Marking Img" src={productMarking}/>
                </div>
            </div>
            <ToastContainer 
            transition={Slide}/>
        </div> 
    )
}

export default Index
