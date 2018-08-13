import React, { Component }from 'react';
import style from '../../article.css';
import Header from './header';
import VideoRelated from '../../../widgets/videoList/VideoRelated/VideoRelatred'
import { firebaseDB, firebaseTeams, firebaselooper, firebaseVideos } from '../../../../firebase';

class VideoArticle extends Component {
    state ={
        article:[],
        team:[],
        teams:[],
        related:[]
    }
    
    componentWillMount(){
        firebaseDB.ref(`videos/${this.props.match.params.id}`).once('value')
        .then((snapshot)=>{
            let article = snapshot.val();
            firebaseTeams.orderByChild("id").equalTo(article.team).once('value')
            .then((snapshot)=>{
                const team  = firebaselooper(snapshot);
                this.setState({
                    article,
                    team
                })
            })
        })
    }
    getRelated = () => {
        firebaseTeams.once('value')
        .then((snapshot)=>{
            let teams = firebaselooper(snapshot)
            firebaseVideos.orderByChild("team").equalTo(this.state.article.team).limitToFirst(5).once('value')
            .then((snapshot)=>{
                let related = firebaselooper(snapshot);
                this.setState({
                    teams,
                    related
                })
            })
        })
        }


    render(){
        const article = this.state.article;
        const team = this.state.team;
        return(
            <div>
                <Header
                    teamData={team[0]}
                 />
                <div className={style.videoWrapper}>
                    <h1>{article.title}</h1>
                    <iframe
                        title="videoplayer"
                        width="100%"
                        height="300px"
                        src={`https://youtube.com/embed/${article.url}`}
                    >
                    </iframe>
                 </div>
                    <VideoRelated
                        data={this.state.related}
                        teams={this.state.teams}
                    />
            </div>
        )
    }
}

export default VideoArticle;

