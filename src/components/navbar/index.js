import React from 'react'
import cx from 'classnames'
import styles from './navbar.module.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'
// Icons
import { IoExitOutline } from 'react-icons/io5'
import { auth } from '../../firebase'

function Index() {


    let logout= async ()=>{
        await auth.signOut();       
        setUserCheck(false);   
    }
    // User Login Check for Logout Button
    let [userCheck,setUserCheck] = useState(false)
    auth.onAuthStateChanged((user)=>{
        if (user!==null){setUserCheck(true)}
    })
   
    return (
        <>
        <nav className={cx(styles.nav)}>
            <div className={cx(styles.nav__container)}>
                <div>
                    <Link to="/"><h4 className={cx(styles.brand)}><span>e</span>Dukan</h4></Link>
                </div>
                <div className={cx(styles.nav__content)}>
                    {userCheck? <button onClick={()=>logout()}  className={cx("generic_btn",styles.login_btn)}>Logout  {<IoExitOutline className={styles.logoutIcon}/>}</button>:null} 
                </div>
            </div>
        </nav>
        </>
    )
}

export default Index
