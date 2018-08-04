import React from "react";
import { Link } from 'react-router-dom';

import style from '../Button/button.css';

const Button = (props) => {
    let template = null;
    switch (props.type) {
        case 'loadmore':
            template = (
                <div className={style.blue_button}
                    onClick={props.loadMore}
                >
                {props.cta}
                </div>

            )
                
            
            break;
        case 'linkTo':
            template = (

                <Link to={props.linkTo}
                className={style.blue_button}
                
                >
                {props.cta}
                </Link>
            )
            break;
        default:
            template = null;
    }
    return template
}

export default Button;