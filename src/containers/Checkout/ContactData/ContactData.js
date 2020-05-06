import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import Spinner from './../../../components/UI/Spinner/Spinner';
import classes from "./ContactData.module.css";
import axios from './../../../axios-orders';
import { withRouter } from "react-router";
class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    })
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Damasy',
        address: {
          street: 'street1 - cairo',
          zipCode: '44681',
          country: 'Egypt',
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(res => {
        this.setState({
          loading: false
        });

        this.props.history.push('/');

      })
      .catch(err => {
        this.setState({
          loading: false
        });
      });
  }

  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="Your name"></input>
        <input type="text" name="email" placeholder="Your email"></input>
        <input type="text" name="street" placeholder="Your street"></input>
        <input type="text" name="postal" placeholder="Your postal code"></input>
        <Button btnType="Success" clicked={(e) => this.orderHandler(e)}>Order</Button>
      </form>
    );
    if(this.state.loading) {
      form = <Spinner/>
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default withRouter(ContactData);