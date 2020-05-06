import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {BrowserRouter, Route} from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Layout>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/" exact component={BurgerBuilder}/>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
