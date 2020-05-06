import React, { Component } from 'react';
import Aux from './../../hoc/Auxiliary';
import WithErrorHandler from './../../hoc/WithErrorHandler/WithErrorHandler';
import Burger from './../../components/Burger/Burger';
import BurgerControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import axios from "./../../axios-orders";
import Spinner from "./../../components/UI/Spinner/Spinner";

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
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('ingredients.json')
      .then(res => {
        this.setState({
          ingredients: res.data
        })
      }).catch( err => {
        this.setState({
          error: true
        })
      });
  }

  updatePurchasable(ingredients) {

    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key]
      })
      .reduce((arr, el) => {
        return arr + el
      }, 0);

    this.setState({ purchasable: sum > 0 ? true : false });
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
    if (oldCount <= 0) return;
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    if (oldPrice <= 0) return;
    const newPrice = oldPrice - priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchasable(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  }

  purchaseContinueHandler = () => {
    const queryParams = [];
    for(let i in this.state.ingredients) {
      let encodedParam = encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]);
      queryParams.push(encodedParam);
    }
    queryParams.push('price=' + this.state.totalPrice.toFixed(2));

    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    })
  }

  render() {
    const disableInfo = {
      ...this.state.ingredients
    };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded</p> : <Spinner />;
    
    if (this.state.ingredients) {
      burger =
        (
          <Aux>
            <Burger ingredients={this.state.ingredients} />
            <BurgerControls
              ingredientAdded={this.addIngredientHandler}
              ingredientRemoved={this.removeIngredientHandler}
              disabled={disableInfo}
              purchasable={this.state.purchasable}
              price={this.state.totalPrice}
              order={this.purchaseHandler} />
          </Aux>
        );

      orderSummary =
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalPrice} />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, axios);