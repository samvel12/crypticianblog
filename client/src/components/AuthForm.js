import React, {Component} from 'react';

export default class AuthForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            matchPassword: "",
            profileImageUrl: ""
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    setDefaultState = () => {
        this.setState({
            username: "",
            password: "",
            matchPassword: "",
            profileImageUrl: ""
        }, function(){
            if(this.props.signUp){
                document.getElementById('password').value = "";
                document.getElementById('matchPassword').value = "";
            } else {
                document.getElementById('password').value = "";
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const authType = this.props.signUp? "signup" : "signin";
        const err = this.checkErrors();
        if(err){
            this.props.onAuth(authType, this.state)
                .then(() => {
                    this.setDefaultState();
                    this.props.history.push("/");
                })
                .catch(() => {
                    return;
                })            
        } else {
            this.setDefaultState();
        }
    }

    checkErrors = () => {
        const {username, password, matchPassword} = this.state;
        if(this.props.signUp){
            if(password === matchPassword && username !== "" && password !== ""){
                return true;
            } else if(username === ""){
                this.props.addError("Please fill in the username field")
                return false;
            } else if(password === "" || matchPassword === ""){
                this.props.addError("Please fill in the password fields")
                return false;
            } else if(password !== matchPassword){
                this.props.addError("Passwords do not match")
                return false;
            }
        } else {
            if(username !== "" && password !== ""){
                return true;
            } else if(username === ""){
                this.props.addError("Please fill in the username field")
                return false;
            } else if(password === ""){
                this.props.addError("Please fill in the password field")
                return false;
            }
        }
    }

    render(){
        let {username, profileImageUrl} = this.state;
        let {signUp, buttonText, heading, errors, history, removeError} = this.props;

        history.listen(() => {
            removeError()
        });
        
        return (
            <div className="authForm">
                <form onSubmit={this.handleSubmit}>
                    <h1>{heading}</h1>
                    {errors.message && <div className="error">{errors.message}</div>}
                    <label htmlFor="username"></label>
                    <input 
                        className="input"
                        id="username"
                        name="username"
                        placeholder="Username"
                        onChange={this.handleChange}
                        value={username}
                        type="text"
                    />
                    <label htmlFor="password"></label>
                    <input 
                        className="input"
                        id="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                        type="password"
                    />
                    {signUp && (
                        <div>
                            <label htmlFor="matchPassword"></label>
                            <input 
                                className="input"
                                id="matchPassword"
                                name="matchPassword"
                                placeholder="Repeat Password"
                                onChange={this.handleChange}
                                type="password"
                            />
                            <label htmlFor="image-url"></label>
                            <input 
                                className="input"
                                id="image-url"
                                name="profileImageUrl"
                                placeholder="Profile image"
                                onChange={this.handleChange}
                                type={profileImageUrl}
                            />
                        </div>
                    )}
                    <button type="submit" className="submit">{buttonText}</button>
                </form>
            </div>
        )
    }
}