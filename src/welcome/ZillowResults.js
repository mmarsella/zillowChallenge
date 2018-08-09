import  React, { Component } from "react";
import  style from './ZillowResults.css';
import  classnames from 'classnames';

export default class ZillowResults extends Component {
  constructor(props){
    super(props);
    // this.toggleView = this.toggleView.bind(this); 
    // initial state w/o signed in
    this.state = {view:'homeAddress'} // phoneEmailForm
  }

  render(){
    return(
      <div>

        <h3> RESULTS </h3> 
        <span>Address: {this.props.user.address}</span>
        <span>Zestimate: {this.props.user.zestimate}</span>
      </div>
    )
  }
}