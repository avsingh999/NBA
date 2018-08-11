import React, { Component } from 'react';
import Slider_Template from './Slider_Template'
import { firebase, firebaselooper, firebaseArticles } from '../../../firebase';


class NewsSlider extends Component {

    state = {
        news:[]
    }

    
    componentWillMount() {
        // console.log("come in")
        firebaseArticles.limitToFirst(3).once('value')
        .then((snapshot)=>{
            const news = firebaselooper(snapshot);

            const asyncFunction = (item, i, cb) => {
                firebase.storage().ref('images')
                .child(item.image).getDownloadURL()
                .then(url =>{
                    news[i].image=url;
                    cb();
                })
            }

            let rquests = news.map((item, i)=>{
                return new Promise((resolve) => {
                    asyncFunction(item, i, resolve)
                })
            })

            Promise.all(rquests).then(()=>{
                this.setState({
                    news
                })
            })
        })
    }
    
    render(){
        return(
            <div><Slider_Template data={this.state.news} type={this.props.type}/></div>
        )
    }
}

export default NewsSlider;