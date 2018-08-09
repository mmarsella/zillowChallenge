// Container of all phase 1 components --> email, phone, home address checker
import  React, { Component } from "react";
import  style from './welcome.css';
import  PhoneEmailForm from './PhoneEmailForm'
import  HomeAddress from './HomeAddress'


function ViewChooser(props) {
  console.log('CHOOSING', props, props[props.view])
  if (props[props.view]) {
    console.log('RETURNIGN THE VIEW', props[props.view])
    return props[props.view];
  }
  return null;
}

export default class Welcome extends Component {
  constructor(props){
    super(props);
    this.toggleView = this.toggleView.bind(this); 
    // initial state w/o signed in
    this.state = {view:'homeAddress'} // phoneEmailForm
  }


  // changes view from child components
  toggleView(view){
    this.setState({ view })
  }

  render(){
    return(
      <div className={style.mainWelcome}>
        <ViewChooser
          view={this.state.view}
          phoneEmailForm={
            <PhoneEmailForm
              toggleView={this.toggleView}
            />
          }

          homeAddress={
            <HomeAddress
              toggleView={this.toggleView}
            />
          }


        />
      </div>
    )
  }
}