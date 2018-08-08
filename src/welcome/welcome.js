// Container of all phase 1 components --> email, phone, home address checker
import  React, { Component } from "react";
import  style from './welcome.css';
import  PhoneEmailForm from './PhoneEmailForm'


export default class Welcome extends Component {
  render() {
    return(
      <div className={style.mainWelcome}>
        <PhoneEmailForm/>
      </div>
    )
  }
}