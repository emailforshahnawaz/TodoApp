import React from "react";
export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={userid:"",password:""}
        this.setuserid=this.setuserid.bind(this);
        this.setpassword=this.setpassword.bind(this);
        this.login=this.login.bind(this);
        this.signup=this.signup.bind(this);

    }
    setuserid(e){
        this.setState({userid:e.target.value})
    }
    setpassword(e){
        this.setState({password:e.target.value})
    }
    login(){
        this.props.logincb(this.state.userid,this.state.password);
    }
    signup(){
        this.props.signupcb(this.state.userid,this.state.password);
    }
    render(){
        console.log(this.props.error);
        return (
            <div style={{margin:"auto","margin-top":"50px","align-items":"center",display:"flex",width:"400px","border-radius":"200px",
            "flex-direction":"column",height:"250px","background-color":"lightblue",justifyContent:"space-around"}}>
            <input type="text" onChange={this.setuserid} placeholder="username" value={this.state.userid}></input>
            <input type="password" onChange={this.setpassword} placeholder="password"></input>
            <button onClick={this.login}>Login</button>
            <button onClick={this.signup}>Signup</button>
            <span>{this.props.error}</span>
            </div>
        )
    }
}