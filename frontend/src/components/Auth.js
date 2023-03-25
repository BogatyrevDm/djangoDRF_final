import React from "react";

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {'login':'','password':''}
    }

    handleChange(event){
        console.log('login ' + event.target.value)
        console.log('password  ' + event.target.password)
        this.setState({
            [event.target.name]:event.target.value
        })
        console.log('login state ' + this.state.value)
        console.log('password state ' + this.state.password)
    }
    
    handleSubmit(event){
        console.log(this.state.login + ' ' + this.state.password)
        this.props.get_token(this.state.login, this.state.password)
        event.preventDefault()
    }

    render() {
        return (
        <form onSubmit={(event)=> this.handleSubmit(event)}>
            <input type="text" name="login" placeholder="login"
                defaultValue={this.state.login} onChange={(event)=>this.handleChange(event)} />
            <input type="password" name="password" placeholder="password"
                defaultValue={this.state.password} onChange={(event)=>this.handleChange(event)} />
            <input type="submit" value="Login" />
        </form>
        );
        }
}

export default LoginForm