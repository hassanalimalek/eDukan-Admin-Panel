import React from 'react'
import './mainLogin.css'
import { auth } from '../../firebase'
// Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from 'react-toastify'
 
function index() {

    let loginSubmit=(e)=>{
        e.preventDefault();
        let [username,password] = [e.target.username.value,e.target.password.value]
        auth.signInWithEmailAndPassword(username,password).then((u)=>{
        }).catch((err)=>{
            console.log(err)
            let msg = "Error";
            if (err.code === "auth/user-not-found"){
                msg = "Wrong Username or Password"
            }
            else if (err.code === "auth/invalid-email"){
                msg = "Invalid Email Format"
            }
            let notify = () => toast.error(msg,{
                position: "top-right",
                autoClose: 1500,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                });
            notify();
        })
    }

    return (
        <div>
            <ToastContainer 
            transition={Slide}/>
              <div className={`login-form `}>
                    <form  onSubmit={(e)=>loginSubmit(e)}>
                        <div className="avatar">
                            <span className="avatar_Txt"><span>e</span>Dukan Admin</span>
                        </div>
                        <h4 className="modal-title">Login to Your Account</h4>
                        <div className="form-group">
                            <input id="username" type="text" className="form-control"
                            placeholder="UserName" required/>
                        </div>
                        <div className="mb-4">
                            <input id="password" type="password" className="form-control"
                            placeholder="Password"
                            required/>
                        </div>
                        <input type="submit" className="btn btn-primary btn-block" value="Login"/>
                    </form>
           </div>
        </div>
    )
}

export default index
