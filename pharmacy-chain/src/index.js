import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import { AUTH_USER } from './actions/types';

import PrivateRoute from './components/auth/private_route';
import Welcome from './components/welcome';
import Header from './components/common/header';
import Footer from './components/common/footer';
import Signout from './components/auth/signout';
import Signin from './components/auth/signin';
import Signup from './components/signup';
import Alliance from './components/alliance';
import PeerInfo from './components/peer_info';
import Stat from './components/stat';
import Query from './components/query';

const createStoreWithMiddleware = compose(
  applyMiddleware(reduxThunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If token exist, singin automatic
if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Header />
        <div className="content-wrapper">
          <Switch>
            <Route path="/signout" component={Signout} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup}/>
            <PrivateRoute path="/alliance" component={Alliance} />
            <PrivateRoute path="/peer" component={PeerInfo} />
            <PrivateRoute path="/query" component={Query} />
            <PrivateRoute path="/stat" component={Stat} />
            <PrivateRoute path="/" component={Welcome} />
          </Switch>
        </div>
        <Footer/>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.wrapper'));
