// Form for Home Address
import  React, { Component } from "react";
import  style from './HomeAddress.css';

export default class HomeAddress extends Component {
  constructor(props){
    super(props);

    this.state = {phone: '', email: ''};
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.handleChangePhone = this.handleChangePhone.bind(this); 
    this.handleBackClick = this.handleBackClick.bind(this);
  }


  handleSubmit(e) {
    console.log('HANDLE SUBMIT!', e);
    e.preventDefault();
    // this.props.toggleView('homeAddress')
  }

  handleBackClick(e) {
    this.setState({email: e.target.value});
    this.props.toggleView('phoneEmailForm')
  }

  handleChangePhone(e) {
    this.setState({phone: e.target.value});
    console.log('HANDLE Change!', e);
  }

  render() {
    return (
      <div>
        <div className={style.back} onClick={this.handleBackClick}>Back</div>
        HOME ADDRESS!!!
      </div>
    )
  }
}