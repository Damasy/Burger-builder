import React, { Component } from "react";
import CheckoutSummary from "./../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      // ['salad', '1']
      if(param[0] === 'price') {
        this.setState({totalPrice: +param[1]});
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients });
  }

  onCheckoutCancelled = () => {
    this.props.history.goBack();
  }

  onCheckoutContinued = () => {
    this.props.history.push('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.onCheckoutCancelled}
          checkoutContinued={this.onCheckoutContinued} />
          <Route path={this.props.match.path  + '/contact-data'} 
          render={() => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice}/>} />
      </div>
    );
  }
}

export default Checkout;