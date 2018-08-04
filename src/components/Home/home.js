import React from 'react';
import NewsSlider from '../widgets/NewsSlider/slider';
import NewsList from '../widgets/NewsList/NewsList';
import VideoList from '../widgets/videoList/videoList';
const home = () =>{
    return(
        <div><NewsSlider
            type="fetaured"
            start={0}
            amount={4}
        />
        
        <NewsList
            type="card"
            loadmore={true}
            start={3}
            amount={3}
        />
        <VideoList
            type="card"
            title={true}
            loadmore={true}
            start={3}
            amount={3}
        />
        
        </div>
    )
}

export default home;