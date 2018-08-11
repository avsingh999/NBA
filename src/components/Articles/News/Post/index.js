import React, { Component }from 'react';

import axios from 'axios';
import { URL } from '../../../../config';
import style from '../../article.css';
import Header from './header';
import Body from './body';
import { firebaseDB, firebaseTeams, firebaselooper } from '../../../../firebase';

class NewArticle extends Component {
    state ={
        article:[],
        team:[]
    }
    
    componentWillMount(){
        console.log("OOOOOOOOOOOOOOOOOOOOOOOO")
        console.log(this.props)
        firebaseDB.ref(`articles/${this.props.match.params.id}`).once('value')
        .then((snapshot)=>{
            let article = snapshot.val();
            // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^")
            // console.log(snapshot.val())
            firebaseTeams.orderByChild("id").equalTo(article.team).once('value')
            .then((snapshot)=>{
                const team  = firebaselooper(snapshot);
                this.setState({
                    article,
                    team
                })
            })
        })
        // axios.get(`${URL}/articles?id=${this.props.match.params.id}`)
        // .then(response => {
        //     let article = response.data[0];
        //     axios.get(`${URL}/teams?id=${article.team}`)
        //     .then( response => {
        //         this.setState({
        //             article,
        //             team:response.data
        //         })
        //     })
        // })
    }


    render(){

        const article = this.state.article;
        const team = this.state.team;
        return(
            <div className={style.articleWrapper}>
                <Header
                    teamData={team[0]}
                    date = {article.date}
                    author = {article.author}

                />
                <div className={style.articleBody}>
                    <h1>{article.title}</h1>
                    <div className={style.articleImage}
                        style={{
                            background:`url('/images/articles/${article.image}')`
                        }}
                    >
                    
                    </div>
                    <div className={style.articleText}>
                        {article.body}
                    </div>
                </div>
                {/* <Body/> */}
            </div>
        )
    }
}

export default NewArticle;

