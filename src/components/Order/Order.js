import React from 'react';
import classes from './Order.module.css';

const Order = (props) => {
  const ingredients = [];
  for(let igName in props.ingredients) {
    ingredients.push({
      name: igName,
      amount: props.ingredients[igName]
    })
  }

  const ingredientsOutput = ingredients.map(ig => {
  return <span key={ig.name} className={classes.Ingredient}>{ig.name} ({ig.amount})</span>
  })
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
  );
}

export default Order;