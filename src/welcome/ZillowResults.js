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
        ZILLOW RESULTS: {this.props.user.address}
      </div>
    )
  }
}