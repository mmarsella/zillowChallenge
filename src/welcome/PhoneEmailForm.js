// Form for phone and email fields
import  React, { Component } from "react";
import  style from './PhoneEmailForm.css';

export default class PhoneEmailForm extends Component {
  constructor(props){
    super(props);

    this.state = {phone: '', email: ''};
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.handleChangePhone = this.handleChangePhone.bind(this); 
    this.handleChangeEmail = this.handleChangeEmail.bind(this); 
  }


  handleSubmit(e) {
    console.log('HANDLE SUBMIT!', e);
    e.preventDefault();
    this.props.toggleView('homeAddress')
  }

  handleChangeEmail(e) {
    this.setState({email: e.target.value});
    console.log('HANDLE Change!', e);
  }

  handleChangePhone(e) {
    this.setState({phone: e.target.value});
    console.log('HANDLE Change!', e);
  }

  render() {
    return (
      <div>
        <h3 className={style.getStarted}>Lets get started!</h3> 
        <span className={style.text}>Please enter your email and phone number</span>
        <form className={style.PhoneEmailForm} onSubmit={this.handleSubmit}>
            <div>
              <input className={style.phoneEmailInput} type="text" placeholder="Email" value={this.state.email} onChange={this.handleChangeEmail} />
              <input className={style.phoneEmailInput} type="text" placeholder="Phone" value={this.state.phone} onChange={this.handleChangePhone} />
            </div>
            <input className={style.submitBtn} type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}