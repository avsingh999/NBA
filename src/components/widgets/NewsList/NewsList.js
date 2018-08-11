import React, { Component } from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Link } from 'react-router-dom';
import style from './NewsList.css';
import Button from '../Button/button.js';
import CardInfo from '../cardInfo/cardInfo';
import { firebaseArticles, firebaselooper, firebaseTeams } from '../../../firebase';

class NewsList extends Component {

    state = {
        teams:[],
        item:[],
        start:this.props.start,
        end:this.props.start+this.props.amount,
        amount:this.props.amount
    }
    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    componentWillMount() {
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

        firebaseArticles.orderByChild("id").startAt(start).endAt(end).once("value")
        .then((snapshot)=>{
            const articles = firebaselooper(snapshot);
            this.setState({
                            item:[...this.state.item,...articles],
                            start,
                            end
                        })
        })
        .catch(e => {
            console.log(e)
        })

    }

    loadmore = () => {
        let end = this.state.end+this.state.amount;
        this.request(this.state.end+1, end);
    }
    renderNews = (type) => {
        let template = null;

        switch (type) {
            case ("card"):
               template = this.state.item.map((items,i) => (
                   <CSSTransition
                   
                        classNames={{
                            enter:style.NewsList_wrapper,
                            enterActive:style.NewsList_wrapper_enter
                        }}
                        timeout={500}
                        key={i}
                   >
                    <div>
                       <div className={style.NewsList_Item}>
                            <Link to={`/articles/${items.id}`}>
                            <CardInfo teams={this.state.teams} team={items.team} date={items.date}/>
                                <h2>{i}{items.title}</h2>

                            </Link>

                       </div>
                   </div>
                   </CSSTransition>
                   
               ))
                break;
            case 'main':
                template = this.state.item.map((items,i) => (
                    <CSSTransition
                    
                        classNames={{
                            enter:style.NewsList_wrapper,
                            enterActive:style.NewsList_wrapper_enter
                        }}
                        timeout={500}
                        key={i}
                    >
                    <div>
                        <div className={style.NewsList_Item}>
                            <Link to={`/articles/${items.id}`}>
                            <div className={style.flex_Wrapper}>
                                <div className={style.left}
                                style={{
                                    background:`url('/images/articles/${items.image}')`
                                }}
                                >
                                    <div></div>
                                 </div> 

                                 <div className={style.right}>
                                    <CardInfo teams={this.state.teams} team={items.team} date={items.date}/>
                                    <h2>{i}{items.title}</h2>

                                 </div>
                            </div>
                            

                            </Link>

                        </div>
                    </div>
                    </CSSTransition>
                    
                ))
                break;
            default:
            template=null;
                // break;
        }
        // console.log(template);
        return template;
    }

    render(){
        return(
            <div>
            <TransitionGroup
                component="div"
                className="list"
            >
                { this.renderNews(this.props.type) }
            </TransitionGroup>
            <Button
                type="loadmore"
                loadMore={()=>this.loadmore()}
                cta="load more news"
            />

            </div>
        )
    }
}

export default NewsList;