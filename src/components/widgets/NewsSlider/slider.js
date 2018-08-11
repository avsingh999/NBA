import React, { Component } from 'react';
import Slider_Template from './Slider_Template'
import { firebase,firebaselooper,firebaseArticles } from '../../../firebase';

class NewsSlider extends Component {

    state = {
        news:[]
    }

    
    componentWillMount() {
        console.log("come in")
        firebaseArticles.limitToFirst(3).once('value')
        .then((snapshot)=>{
            const news = firebaselooper(snapshot);
            console.log(news);
            this.setState({
                news
            })
        })
    }
    
    render(){
        // console.log(this.state.news)
        return(
            <div><Slider_Template data={this.state.news} type={this.props.type}/></div>
        )
    }
}

export default NewsSlider;