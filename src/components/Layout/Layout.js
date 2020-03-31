import React from 'react';
import Aux from './../../hoc/Auxiliary';
import classes from './Layout.module.css';

const Layout = (props) => (
  <Aux>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={classes.content}>
      {props.children}
    </main>
  </Aux>
);

export default Layout;