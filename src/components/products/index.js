import React from 'react'
import './products.css'
import { Link } from 'react-router-dom'
import { BiLeftArrowCircle} from 'react-icons/bi'

function Index(props) {

    let path = props.location.pathname
    if(path === "/products/addProducts"){
        return (
            <div className="p-3 ">
                <h2>Add Products</h2>
                <Link to='/' className="backArrow m-2"><BiLeftArrowCircle/></Link>
                <ul className="product_list list-group list-group-flush">
                    <Link to="/products/addProducts/shoes"className="list-group-item">Shoes</Link>
                    <Link to="/products/addProducts/watches" className="list-group-item">Watches</Link>
                    <Link to="/products/addProducts/jersey"className="list-group-item">Jersey</Link>
                </ul>
            </div>
        )
    }
    else if (path === "/products/viewProducts"){
        return(
            <div className="p-3 ">
                <h2>View and Edit Products</h2>
                <Link to='/' className="backArrow m-2"><BiLeftArrowCircle/></Link>
                <ul className="product_list list-group list-group-flush">
                    <Link to="viewProducts/shoes"className="list-group-item">Shoes</Link>
                    <Link to="viewProducts/watches" className="list-group-item">Watches</Link>
                    <Link to="viewProducts/jersey"className="list-group-item">Jersey</Link>
                </ul>
            </div>
        )
    }
}

export default Index
