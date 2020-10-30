import React from 'react';
import Logo from '../../Logo/Logo';
import NavegationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';

const sideDrawer = () => {
    return (  
        <div className={classes.SideDrawer}>
           <div className={classes.Logo}>
              <Logo />
           </div>
           <nav>
               <NavegationItems/>
           </nav>
        </div>
    );
}
 
export default sideDrawer;