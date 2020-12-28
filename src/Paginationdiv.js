import React from 'react';
export default class Paginationdiv extends React.Component{
    constructor(props){
        super(props);
        this.pgbtnclick=this.pgbtnclick.bind(this);
    }
    pgbtnclick(event){
       // console.log(event.target.innerHTML);
       this.props.gotoo(Number(event.target.innerHTML));
    }
    render(){

        return (
            <div onClick={this.pgbtnclick} style={{height:"20px",width:"20px",border:"1px solid black"}}>{this.props.item}</div>
        )
    }
}