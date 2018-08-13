import React from 'react'
import style from './videoList.css';
import { Link } from 'react-router-dom';
import Cardinfo from '../cardInfo/cardInfo';

const VideoTemplate = (props) =>{
    return props.data.map((item,i)=>{
        return(<Link to={`/videos/${item.id}`} key={item.id}>
            <div className={style.videoitem_wrapper}>
                    <div className={style.left}
                        style={{
                            background:`url(/images/videos/${item.image})`
                        }}
                    >
                    </div>
                    <div className={style.right}>
                            <Cardinfo teams={props.teams} team={item.id} date={item.date}></Cardinfo>
                        <h2>{item.title}</h2>
                    </div>
            </div>
        </Link>)
    })
}

export default VideoTemplate;