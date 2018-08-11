import React, { Component } from 'react';
import Button from '../Button/button.js';
import style from './videoList.css' ;    
import VideoTemplate from './VideoTemplate';
import { firebaseArticles, firebaselooper, firebaseTeams, firebaseVideos } from '../../../firebase';

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
            firebaseTeams.once('value')
            .then((snapshot)=>{
                const teams = firebaselooper(snapshot);
                this.setState({
                    teams
                })
            })

        }

        firebaseVideos.orderByChild("id").startAt(start).endAt(end).once("value")
        .then((snapshot)=>{
            const videos = firebaselooper(snapshot);
            this.setState({
                videos:[...this.state.videos,...videos],
                            start,
                            end
                        })
        })
        .catch(e => {
            console.log(e)
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
        this.request(this.state.end+1, end);
    }
    renderButton = () =>{
        return this.props.loadmore? <Button type='loadmore' loadMore={() => this.loadMore()} cta="load more video" />:<Button type='linkTo' cta="more video" linkTo ='/videos'/>
    }
    render(){
        return(
            <div className={style.VideoList_wrapper}>
                {this.renderVideos()}
                {this.renderButton()}
            </div>
        )
    }

}

export default VideoList;             


         