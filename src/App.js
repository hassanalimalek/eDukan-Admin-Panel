import React from 'react'
import { BrowserRouter,Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Products from './components/products'
import Orders from './components/orders'
import Landing from './components/landing'
import AddProduct from './components/addProducts'
import MainLogin from './components/mainLogin'
import ViewProduct from './components/viewProducts'
import EditProduct from './components/editProduct'
import Navbar from './components/navbar'
import OrderDetails from './components/orderDetails'
import Footer from './components/footer'
import { auth } from './firebase'



function App(props) {
  
  let [user,setUser] = useState(false);


  auth.onAuthStateChanged((user)=>{
    if(user){setUser(user)}
    else{setUser(null)}
  })
 
  return (
    <div>
       <BrowserRouter>
          <Navbar/>
          {user === null || user === false ? 
          <MainLogin/>: 
          <div>
          <Route exact path="/">
            <Landing/>
          </Route>
          <Route  exact path="/products/addProducts" render={(props)=>
                     <Products  {...props}/>
          } />
          </div>}
          <Route exact path="/orders" render={(props)=>
                     <Orders {...props}/>
           } />
            <Route  exact path="/products/viewProducts" render={(props)=>
                     <Products  {...props}/>
          } />
           <Route  exact path="/products/viewProducts/:type" render={(props)=>
                     <ViewProduct  {...props}/>
          } />
          <Route  exact path="/products/editProducts/:id" render={(props)=>
                     <EditProduct  {...props}/>
          } />
          <Route  exact path="/products/addProducts/:type" render={(props)=>
                     <AddProduct {...props}/>
          } />
          <Route  exact path="/orders/details/:orderId" render={(props)=>
                     <OrderDetails {...props}/>
          } />
          <Footer/>
       </BrowserRouter>
    </div>
  )
}

export default App

