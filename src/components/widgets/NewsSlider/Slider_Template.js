import React from "react";
import Slick from 'react-slick';
import style from './Slider.css'
import { Link } from 'react-router-dom';

const SliderTemplate = (props) => {

    let template = null;
    const setting = {
        infinite:true,
        arrows:false,
        speed: 2000,
        SlidesToShow:1,
        SlideToScroll:1,
        dots:false
    }

    switch (props.type) {
        case ('fetaured'):
            template = props.data.map((items,i) => {
                return(<div key={items.id}>

                    <div className={style.fetaured_item}>
                        <div className={style.fetaured_image}
                            style={{
                                background:`url(${items.image})`
                            }}
                        >
                       
                        </div>
                        <Link to={`/articles/${items.id}`}>
                        <div className={style.fetaured_caption}>
                            {items.title}
                        </div>
                        </Link>

                    </div>
                </div>)
            })
            break;
    
        default:
            break;
    }
    return(
        <Slick {...setting}>
            {template}
         </Slick>
    )
}

export default SliderTemplate;