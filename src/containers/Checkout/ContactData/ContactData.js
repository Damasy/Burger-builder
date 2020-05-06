import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import classes from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  }

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        <form>
          <input type="text" name="name" placeholder="Your name"></input>
          <input type="text" name="email" placeholder="Your email"></input>
          <input type="text" name="street" placeholder="Your street"></input>
          <input type="text" name="postal" placeholder="Your postal code"></input>
          <Button btnType="Success">Order</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;