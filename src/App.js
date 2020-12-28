import Login from "./Login";
import TodoList from './TodoList';
import React from "react";
//import React,{useEffect,useState} from "react";

export default class App extends React.Component{
  constructor(){
    super();
  this.state={loggedin:false,error:""};
  
  this.loginhandler=this.loginhandler.bind(this);
  this.signuphandler=this.signuphandler.bind(this);
  }
  signuphandler(userid,password){
    fetch("http://localhost:9999/signup",{
      method:"post",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({username:userid,password:password})
    }).then(r=>{
      if(r.ok){
        this.setState({loggedin:true})
      }else{
        return {error:"some error occured!!"}
      } return {};
    }).then((r) =>{ if(r.hasOwnProperty('error')){
      this.setState({error:r.error})
    }
  }
    );
  }
  loginhandler(userid,password){

    fetch('http://localhost:9999/login',{
     "body":`{"username":"${userid}","password":"${password}"}`,
      // body: {
      //   "username":userid,"password":password
      // },
      method:"post",
      credentials:"include",
      headers:{
        "content-type":"application/json",
      }
    })
    //.then(r=>r.json())
    .then(r=>{
      if(r.ok){
        this.setState({loggedin:true})
      }
      else{
        return r.json();
        //console.log();
      }
    }).then(r=>{
      if(!(r.ok)){
        this.setState({error:r.error})
      }
    })
    .catch(e=>console.log(e));
  }
  componentDidMount(){
    fetch("http://localhost:9999/userinfo",{
      credentials:"include"
    }).then(r=>{
      if(r.ok){
        this.setState({loggedin:true})
      }
      else{
        this.setState({loggedin:false})
      }
    })   //-------
  }
  render(){
   return ( this.state.loggedin?<><TodoList /></>:
   <><Login logincb={this.loginhandler} signupcb={this.signuphandler} error={this.state.error} /></>);
  }
}