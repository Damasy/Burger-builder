import React, { Component } from 'react';
import Order from './../../components/Order/Order';
import axios from './../../axios-orders';
import WithErrorHandler from './../../hoc/WithErrorHandler/WithErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: false
  }

  componentDidMount() {
    this.setState({loading: true})
    axios.get('/orders.json')
    .then(res => {
      const fetchedOrders = [];
        for(let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          })
        }
        this.setState({
          loading: false,
          orders: fetchedOrders
        });
        
      })
  }
  
  render() {
    // let orders = 
    return (
      <div>
        {this.state.orders.map(order => {
          return <Order 
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}/>
        })}
      </div>
    );
  }
}

export default (Orders);