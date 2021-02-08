import React from 'react'
import './landing.css'
import { Link } from 'react-router-dom'
import { FcShop } from 'react-icons/fc'
import { FaMoneyBillAlt,FaRegEdit } from 'react-icons/fa'


function index() {
    return (
        <div className="container mb-4 landing">
            <div className="row">
            <div className="col-sm-6">
                    <div className="card mb-4">
                        <div className="header card-header bg-dark text-white font-weight-bold ">
                            <h5>View & Edit Products</h5>
                            <FaRegEdit className="card_icon"/>
                        </div>
                        <div className="card-body p-4">
                            <p className="card-text mb-4">
                                View and Edit the products in your store
                            </p>
                            <Link className="card-link p-2 px-3 text-white bg-dark rounded" to="/products/viewProducts">Go</Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card mb-4">
                           <div className="header card-header bg-dark text-white font-weight-bold ">
                               <h5>Add Product</h5>
                               <FcShop className="card_icon"/>
                           </div>
                           <div className="card-body p-4">
                                <p className="card-text mb-4">
                                    Add additional products to the categories on the web store.
                                </p>
                                <Link to="/products/addProducts" className="card-link p-2 px-3 text-white bg-dark rounded" >Go</Link>
                            </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card mb-4">
                            <div className="header card-header bg-dark text-white font-weight-bold ">
                               <h5>View Orders</h5>
                               <FaMoneyBillAlt className="card_icon"/>
                           </div>
                           <div className="card-body p-4">
                                <p className="card-text mb-4">
                                    View the order's placed by the customer
                                </p>
                                <Link className="card-link p-2 px-3 text-white bg-dark rounded" to="/orders">Go</Link>
                            </div>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default index
