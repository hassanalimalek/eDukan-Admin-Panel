import React from 'react'
import { db,storage } from '../../firebase'
import { useState } from 'react'
import { Link } from 'react-router-dom'
// Import Icon
import { BiLeftArrowCircle} from 'react-icons/bi'
// Loader
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
// Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from 'react-toastify'

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
    
    let color = ("#FFFFFF");
    let [loading, setLoading] = useState(false);

    let productId = props.match.params.id
    let category = props.location.state.category
    let product = props.location.state.product
    let [productTitle,setProductTitle]=useState(product.title)
    let [productType,setProductType]=useState(product.type)
    let [productDescription,setProductDescription]=useState(product.description)
    let [productPrice,setProductPrice]=useState(product.basePrice)
    let [productSizes,setProductSizes] = useState({ sizes: product.sizes})
    let productImgSrc=product.imgSrc
    var pImg = null;
        

    // Create Input Sizes
      function createInputs() {
        return productSizes.sizes.map((el, i) =>
          <div className="form-group" key={i}>
            <input className="mr-1" type="text" value={el||''} onChange={handleChange.bind(i)} required/>
            <button className="bg-dark text-white"onClick={removeClick.bind(i)} >Remove Product Size</button>
          </div>
        );
      }

      function handleChange(event) {
          let vals = [...productSizes.sizes];
          vals[this] = event.target.value;
          setProductSizes({ sizes: vals });
      }
      const addClick = () => {
          setProductSizes({ sizes: [...productSizes.sizes, '']})
      }
      const removeClick = () => {
          let vals = [...productSizes.sizes];
          vals.splice(this,1);
          setProductSizes({ sizes: vals });
      }


    //   Product Update
      let updateProduct =(imgUrl)=>{
         
            db.ref(`products/${category}/${productId}`).update(
                  { 
                    "title":productTitle,
                    "type":productType,
                    "basePrice":productPrice,
                    "description":productDescription,
                    "sizes":productSizes.sizes?productSizes.sizes:null,
                    "imgSrc":imgUrl ? imgUrl : productImgSrc
                  },function(error) {
                    setTimeout(()=>{
                        setLoading(false)
                    },1500)
                    if (error)
                    {
                        let notify = () => toast.error(error);
                        notify();
                    }
                    else{
                        let notify = () => toast.dark("Product Successfuly Updated");
                        notify();
                    }
                  }
              )
        }

    // Update Image
      var uploadImage = (productImage)=>{
        console.log("Product Image Called")
        console.log(productImage)
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
                    console.log(pImg)
                    updateProduct(url)
                })
            }
        )
        }



    let formHandler = (e)=>{
        e.preventDefault()
        setLoading(true);
        if(e.target.productImg.files[0]){
            var pImg = e.target.productImg.files[0];
            uploadImage(pImg)
        }
        else{      
            updateProduct()
        }
    }

    return (
        <div>
           <div className="editProducts mx-2 p-3 pl-1 ">
            <Link to={`/products/viewProducts/${category}`} className="backArrow "><BiLeftArrowCircle/></Link>
            <h2> Edit Product</h2>
                <div className="">
                <form   
                  onSubmit={formHandler}
                   className="p-2 pl-4 form_shadow row"
                   styles={{maxWidth:"70rem"}}  >
                    <div className="col-sm-6 ">
                        <div className="form-group">
                            <label htmlFor="productName">Product Name</label>
                            <input 
                            value={productTitle} 
                            onChange={(e)=>setProductTitle(e.target.value)}
                            type="text" className="form-control" 
                            id="productName" placeholder="Product Name"
                            required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="productType">Product Sub Category</label>
                            <input 
                            value={productType} 
                            onChange={(e)=>setProductType(e.target.value)}
                            type="text" className="form-control" id="productType" 
                            placeholder="Ex Men's Casual FootWear " 
                            required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productPrice">Product Price</label>
                            <input
                            value={productPrice} 
                            onChange={(e)=>setProductPrice(e.target.value)}
                            type="number" className="form-control"
                            id="productPrice" placeholder="3000" 
                            required/>
                        </div>
                        {productSizes.sizes ?
                        (<div className="form-group">
                        {createInputs()}
                        <button className="bg-dark text-white" onClick={addClick} >Add Product Sizes</button>
                    </div>):null}
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label htmlFor="productDescription">Product Description</label>
                            <textarea rows="4"  type="number" 
                            value={productDescription} 
                            onChange={(e)=>setProductDescription(e.target.value)}
                            className="form-control" id="productDescription"  required/>
                        </div>
                        <div className="form-group">
                            <label>Current Product Image</label><br/>
                            <img alt="productImg" className="editProductImg" src={productImgSrc}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productImage">Import New Product Image</label>
                            <input type="file" className="form-control-file " 
                            id="productImg" />
                        </div>
                        <button type="submit" className="btn btn-primary bg-dark text-white" required>Submit</button>
                     </div>
                </form>
                </div>
                <HashLoader color={color} loading={loading} css={override} size={60}  />
                <ToastContainer 
               transition={Slide}/>
           </div>
        </div>
    )
}

export default Index
