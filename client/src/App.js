import React,{ Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//Import Components
import Navbar from "./components/skeleton/Navbar";
import Landing from "./components/skeleton/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/skeleton/Alert";
import './App.css';

//Import Redux
import {Provider} from 'react-redux';
import store from './store';
import setAuthToken from "./utils/setAuthToken";
import {loadUser} from "./actions/auth";

// Check if token is already present
if(localStorage.token){
    setAuthToken(localStorage.token);
}

const App = () => {

    useEffect(() => {
       store.dispatch(loadUser())
    }, []);

    return (
    <Provider store={store}>
        <Router>
            <Fragment>
                <Navbar/>
                <Route exact path="/" component={Landing}/>
                <section className="container">
                    <Alert />
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                    </Switch>
                </section>
                <div className="footer">
                    <p>This is a project in construction as an attempt to learn MERN Stack</p>
                    <p>&copy; Created by <a href="https://varunkumarkadambala.github.io" target="_blank" rel="noopener noreferrer">Varun Kumar Kadambala </a></p>
                </div>
                {/*<footer>*/}
                {/*    <p>*/}
                {/*        **This is a project in construction as an attempt to learn MERN Stack*/}
                {/*    </p>*/}
                {/*    <p>*/}
                {/*        &copy; Created for*/}
                {/*        <a href="https://varunkumarkadambala.github.io" >Varun Kumar Kadambala </a>*/}
                {/*    </p>*/}
                {/*</footer>*/}
            </Fragment>
        </Router>
    </Provider>
)};

export default App;
