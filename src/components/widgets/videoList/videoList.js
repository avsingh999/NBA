import React, { Component } from 'react';

// import { CSSTransition, TransitionGroup } from 'react-transition-group';

// import { Link } from 'react-router-dom';
import axios  from 'axios';
import { URL } from '../../../config';
import Button from '../Button/button.js';
// import CardInfo from '../cardInfo/cardInfo';
import style from './videoList.css' ;    
import VideoTemplate from './VideoTemplate';

class VideoList extends Component {

    state= {
        teams:[],
        videos:[],
        start:this.props.start,
        end:this.props.amount+this.props.start,
        amount:this.props.amount
    }
    renderTitle = () =>{
        return this.props.title ? <h3><strong>NBA</strong> Videos</h3>:null
    }

    componentWillMount(){
        this.request(this.state.start, this.state.end);
    }

    request = (start, end) => {
        if(this.state.teams.length<1){
            axios.get(`${URL}/teams`)
            .then(response => {
                this.setState({
                    teams:response.data
                })
            })
        }
        axios.get(`${URL}/videos?_start${start}&_end=${end}`)
        .then(response => {
            this.setState({
                videos:[...this.state.videos,...response.data],
                start,
                end
            })
        })
    }
    renderVideos = ()  =>{
        let template = null;
        switch (this.props.type) {
            case 'card':
                template = (
                    <VideoTemplate data = {this.state.videos} teams={this.state.teams}/>
                )
                
                break;
        
            default:
                template=null;
        }
        return template;
    }

    loadMore = () => {
        let end = this.state.end+this.state.amount;
        this.request(this.state.end, end);
    }
    renderButton = () =>{
        return this.props.loadmore? <Button type='loadmore' loadMore={() => this.loadMore()} cta="load more video" />:<Button type='linkTo' cta="more video" linkTo ='/videos'/>
    }
    render(){
        return(
            <div className={style.VideoList_wrapper}>
                {this.renderTitle()}
                {this.renderVideos()}
                {this.renderButton()}
            </div>
        )
    }

}

export default VideoList;             


         