import React, {Component} from 'react';
import Aux from '../Auxiliary';
import classes from './Layout.module.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  sideDrawerCloseHandler = () => {
    this.setState({showSideDrawer: false});
  }

  toggleDrawerHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    })
  }

  render() {
    return (
      <Aux>
        <Toolbar toggleDrawer={this.toggleDrawerHandler}/>
        <SideDrawer opened={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} />
        <main className={classes.content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
};

export default Layout;