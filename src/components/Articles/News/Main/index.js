import React from 'react';
import NewsList from '../../../widgets/NewsList/NewsList';
import NewsSlider from '../../../widgets/NewsSlider/slider';

const NewsMain = () => (
    <div>
        <NewsSlider
            type="fetaured"
            start={0}
            amount={4}
        />
        <NewsList
            type="main"
            loadmore={true}
            start={3}
            amount={3}
        />
    </div>
)

export default NewsMain;