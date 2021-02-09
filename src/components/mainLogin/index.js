import React from 'react'
import { useEffect } from 'react'
import './mainLogin.css'
import { auth,db } from '../../firebase'
// Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from 'react-toastify'

 
function Index() {

    useEffect(()=>{
        auth.signOut();
    })

    let loginSubmit=(e)=>{
        e.preventDefault();
  
        let [username,password] = [e.target.username.value,e.target.password.value]

        let errNotify = (msg)=>{
            let notify = () => toast.error(msg,{
                position: "top-right",
                autoClose: 1500,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                });
            notify();
        }

        let login = async()=>{
            db.ref('userRoles').on('value',snapshot=>{
            console.log("Get Orders ")
            if(snapshot.val()!=null){
                let result = snapshot.val()
                let checkEmail = Object.values(result)[0].email
                let role =  Object.values(result)[0].role
                if (username === checkEmail && role === "admin"){
                    auth.signInWithEmailAndPassword(username,password).then((u)=>{
                    }).catch((err)=>{
                        let msg = "Error";
                        if (err.code === "auth/user-not-found" || err.code==="auth/wrong-password"){
                            msg = "Wrong Username or Password"
                        }
                        else if (err.code === "auth/invalid-email"){
                            msg = "Invalid Email Format"
                        }
                        errNotify(msg)
                    })
                 }
                 else{
                     errNotify("Wrong Username or Password")
                 }
            }
          })
        }
        login();

     
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

export default Index
