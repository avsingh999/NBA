import React from 'react';
import style from '../videoList.css';
import VideoTemplate from '../VideoTemplate';

const VideoRelated = (props) => {
    return(
        <div className={style.relatedWrapper}>
            <VideoTemplate
                data={props.data}
                teams={props.teams}
            />
        </div>
    )
}

export default VideoRelated;