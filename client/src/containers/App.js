import React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '../store';
import {BrowserRouter as Router} from 'react-router-dom';
import {setAuthorizationToken, setCurrentUser} from '../store/actions/auth';
import jwtDecode from 'jwt-decode';
import Navbar from './Navbar';
import Main from './Main';
import Footer from '../components/Footer';
import '../css/App.css'

const store = configureStore();

if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  // prevent someone from manually tampering with the key of jwtToken in localStorage
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (error) {
    store.dispatch(setCurrentUser({}));
  }
}

const App = () => (
  <Provider store={store} className="App">
    <Router>
      <div>
        <Navbar></Navbar>
        <Main></Main>
        <Footer></Footer>
      </div>
    </Router>
  </Provider>
)

export default App;
