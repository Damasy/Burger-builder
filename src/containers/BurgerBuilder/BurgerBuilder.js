import React, {Component} from 'react';
import Aux from './../../hoc/Auxiliary';
import Burger from './../../components/Burger/Burger';
import BurgerControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}
class BurgerBuilder extends Component {
  
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }
  
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  }

  updatePurchasable (ingredients) {

    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key] 
      })
      .reduce((arr, el) => {
        return arr + el
      }, 0);

    this.setState({purchasable: sum > 0 ? true : false});
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchasable(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0) return;
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    if(oldPrice <= 0) return;
    const newPrice = oldPrice - priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchasable(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  purchaseContinueHandler = () => {
    this.setState({
      purchasing: true
    });
  }

  render() {
    const disableInfo = {
      ...this.state.ingredients
    };

    for(let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary 
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalPrice} />
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BurgerControls
          ingredientAdded = {this.addIngredientHandler}
          ingredientRemoved = {this.removeIngredientHandler}
          disabled={disableInfo}
          purchasable = {this.state.purchasable}
          price = {this.state.totalPrice}
          order = {this.purchaseHandler} />
      </Aux>
    );
  }
}

export default BurgerBuilder;