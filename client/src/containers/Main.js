import React from 'react';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {addError, removeError} from '../store/actions/errors';
import {authUser} from '../store/actions/auth';
import Wall from './Wall';
import Article from './Article';
import AuthForm from '../components/AuthForm';
import Account from './Account';
import AccountViewAll from './AccountViewAll';
import ArticleForm from './ArticleForm';
import ArticleEditForm from './ArticleEditForm';
import withAuth from '../hocs/withAuth';

const Main = props => {
    let {authUser, addError, removeError, errors} = props;
    return (
        <div className="container">
            <Switch>
                <Route exact path="/" component={Wall}></Route>

                <Route exact path="/create" component={withAuth(ArticleForm)}></Route>

                <Route exact path="/update/:article_id" component={withAuth(ArticleEditForm)}></Route>

                <Route exact path="/account/:user_id" render={props => (      
                    <Account {...props}></Account>
                )}></Route>

                <Route exact path="/account/:user_id/articles" render={props => (
                    <AccountViewAll {...props} type="articles"></AccountViewAll>
                )}></Route>

                <Route exact path="/account/:user_id/comments" render={props => (
                    <AccountViewAll {...props} type="comments"></AccountViewAll>
                )}></Route>
                
                <Route exact path="/articles/:article_id" render={props => (
                    <Article {...props}></Article>
                )}></Route>

                <Route exact path="/signin" render={props => {
                    return (
                        <AuthForm
                            addError={addError}
                            removeError={removeError}
                            errors={errors}
                            onAuth={authUser}
                            buttonText="Log in"
                            heading="Welcome back."
                            {...props}
                        ></AuthForm>
                    )
                }}></Route>

                <Route exact path="/signup" render={props => {
                    return (
                        <AuthForm
                            addError={addError}
                            removeError={removeError}
                            errors={errors}
                            signUp
                            onAuth={authUser}
                            buttonText="Sign me up!"
                            heading="Join our readers"
                            {...props}
                        ></AuthForm>
                    )
                }}></Route>
                
                <Route path="/" render={() => (<Redirect to="/"/>)}></Route>
            </Switch>
        </div>
    )
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser,
        errors: state.errors
    }
}

export default withRouter(connect(mapStateToProps, {authUser, addError, removeError})(Main));