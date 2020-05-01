import React, { Component } from 'react';
import classes from './Modal.module.css';
import Backdrop from './../Backdrop/Backdrop';
import Aux from './../../../hoc/Auxiliary';
import { render } from '@testing-library/react';

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  componentWillUpdate() {
    console.log('[Modal] Will update');
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} close={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}>
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;