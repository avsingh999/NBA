import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import style from './sideNav.css';

const SideNavItems = () => {
    const Items = [
        {
            type: style.option,
            icon: 'home',
            text: 'Home',
            link: '/'
        },
        {
            type: style.option,
            icon: 'file-text-o',
            text: 'News',
            link: '/news'
        },
        {
            type: style.option,
            icon: 'play',
            text: 'Videos',
            link: '/videos'
        },
        {
            type: style.option,
            icon: 'sign-in',
            text: 'Sign in',
            link: '/sign-in'
        },
        {
            type: style.option,
            icon: 'sign-out',
            text: 'Sign out',
            link: '/sign-out'
        },
        {
            type: style.option,
            icon: 'user',
            text: 'About',
            link: '/about'
        }    
    ]

    const showItems = () =>{
        return Items.map((item,i)=>{
           return(
            <div key={i} className={item.type}>
            <Link to={item.link}>
                
                <FontAwesome name={item.icon}/>
                {item.text}
            </Link>
        </div>
           )
        })
    }


    return(
        <div>
            {showItems()}
            
        </div>
        
    )
}

export default SideNavItems ;