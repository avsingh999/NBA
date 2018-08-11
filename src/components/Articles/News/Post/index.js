import React, { Component }from 'react';

import axios from 'axios';
import { URL } from '../../../../config';
import style from '../../article.css';
import Header from './header';
import Body from './body';
import { firebase, firebaseDB, firebaseTeams, firebaselooper } from '../../../../firebase';

class NewArticle extends Component {
    state ={
        article:[],
        team:[],
        ImageURL:''
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
                this.getImageURL(article.image)
            })
        })
       
    }
    getImageURL = (filename) => {

        firebase.storage().ref('images')
        .child(filename).getDownloadURL()
        .then( url => {
            this.setState({
                ImageURL: url
            })
        })
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
                            background:`url('${this.state.ImageURL}')`
                        }}
                    >
                    
                    </div>
                    <div className={style.articleText}
                        dangerouslySetInnerHTML={{
                            __html:article.body
                        }}
                    >
                        {/* {article.body} */}
                    </div>
                </div>
                {/* <Body/> */}
            </div>
        )
    }
}

export default NewArticle;

