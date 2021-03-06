import React from 'react'
import styles from './footer.css'
import { Link } from "react-router-dom";
import  { CURRENT_YEAR } from '../../config';

const footer = () => {
    return(
        <div className={styles.footer}>
            <Link to="/" className={styles.logo}>
                <img alt="nba logo" src="/images/nba_logo.png"/>
            </Link>
            <div className={styles.right}>
                @{CURRENT_YEAR} copyright

            </div>
        </div>
    )
}

export default footer;