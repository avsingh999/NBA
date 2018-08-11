import React from 'react';
import SideNav from 'react-simple-sidenav';
import SideNavItems  from './sideNav_item';

const SideNavigation = (props) =>{

    return(
        <div>
            <SideNav
            showNav={props.showNav}
            onHideNav={props.onHideNav}
             navStyle={{
                background:'#fff',
                width:'50%'
            }}
            >
                <SideNavItems {...props}/>
            </SideNav>
        </div>        
    )
}


export default SideNavigation;