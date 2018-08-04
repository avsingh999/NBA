import React from 'react';

import VideoList from '../../../widgets/videoList/videoList';

const MainVideo = () => {
    return(
        <VideoList
        type="card"
        title={true}
        loadmore={true}
        start={3}
        amount={3}
    />
    )
}

export default MainVideo;