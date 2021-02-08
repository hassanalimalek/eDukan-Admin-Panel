import React from 'react'
import cx from 'classnames'
import footerStyle from './footer.module.scss'



function Index() {
    var date = new Date();
    return (
        <footer className={cx(footerStyle.footer)}>
            <div className={cx(footerStyle.footer_container)}>
                <div className={cx(footerStyle.txt)}>
                eDukan {date.getFullYear()}  &copy;  All Rights Reserved
                </div>
            </div>
        </footer>
    )
}

export default Index
