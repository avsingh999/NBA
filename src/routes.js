import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home/home';
import Layout from './components/hoc/Layout/layout';
import NewsArticle from './components/Articles/News/Post/index';
import VideoArticle from './components/Articles/Videos/Video/index';
import NewsMain from './components/Articles/News/Main/index.js';
import VideoMain from './components/Articles/Videos/Main/index';
import Test from './components/Articles/News/test';
class Routes extends Component{
    render(){
        return(
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path='/news' exact component={NewsMain}/>
                    <Route path="/videos" exact component={VideoMain}/>
                     <Route path='/articles/:id' exact component={NewsArticle}/>
                    <Route path="/videos/:id" exact component={VideoArticle}/>
<Route path="/chill" exact component ={Test}/>
                </Switch>
            </Layout>         
        )
    }
}

export default Routes;