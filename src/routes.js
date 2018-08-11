import React,{ Component } from 'react';
import {  Switch } from 'react-router-dom';
import Home from './components/Home/home';
import Layout from './components/hoc/Layout/layout';
import NewsArticle from './components/Articles/News/Post/index';
import VideoArticle from './components/Articles/Videos/Video/index';
import NewsMain from './components/Articles/News/Main/index.js';
import VideoMain from './components/Articles/Videos/Main/index';
import SignIn from './components/SignIn/signin';
import Dashboard from './components/Dashboard/dashboard';
import PrivateRoutes from './components/AuthRoutes/privateRoutes';
import PublicRoute from "./components/AuthRoutes/public";

const Routes = (props) => {
        // console.log(props)
        return(
            <Layout user={props.user}>
                <Switch>
                <PublicRoute {...props} restricted={false}  path="/" exact component={Home}/>
                    <PublicRoute {...props} restricted={false}  path='/news' exact component={NewsMain}/>
                    <PublicRoute {...props} restricted={false}  path="/videos" exact component={VideoMain}/>
                    <PublicRoute {...props} restricted={false} path='/articles/:id' exact component={NewsArticle}/>
                    <PublicRoute {...props} restricted={false} path="/videos/:id" exact component={VideoArticle}/>
                    <PublicRoute {...props} restricted={true} path="/sign-in" exact component={SignIn}/>
                    <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard}/>
                </Switch>
            </Layout>         
        )
    
}

export default Routes;