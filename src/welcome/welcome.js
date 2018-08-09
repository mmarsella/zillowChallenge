import  React, { Component } from "react";
import  style from './welcome.css';
import  PhoneEmailForm from './PhoneEmailForm'
import  HomeAddress from './HomeAddress'
import  ZillowResults from './ZillowResults'
import  classnames from 'classnames';

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
    this.getHomeAddress = this.getHomeAddress.bind(this);
    this.getZestimate = this.getZestimate.bind(this);
    // initial state w/o signed in
    this.state = {
      view:'homeAddress', // phoneEmailForm
      user: {
        phone: null,
        email: null,
        address: null,
        zestimate: null,
        expectedRent: null
      }
    } 
  }

  // changes view from child components
  toggleView(view){
    this.setState({ view })
  }

  getHomeAddress(address){
    console.log("GOT HOME ADDRESS!", address, this.state)
    if(address){
      let user = {...this.state.user}
      user.address = address;
      this.setState({user})
    }

    this.getZestimate();
  }

  getZestimate(){
    // ideally would make a call like this:
    // http://www.zillow.com/webservice/GetSearchResults.htm?detailsHere...
    // However - streetLayer doesn't return full addresses - which will always result in an error
    // on the zillow API.  So I'm going to push fake data here.
    const max = 999999999;
    const min = 100000000;
    const zestimate = Math.floor(Math.random() * (max - min + 1)) + min;
    let user = {...this.state.user}
    user.zestimate = zestimate;
    this.setState({user})
  }

  render(){
    return(
      <div className={classnames({
        [style.mainWelcome]: this.state.view === "phoneEmailForm",
        [style.homeAddressMode]: this.state.view === "homeAddress" ||
                                 this.state.view === "zillowResults" 
      })} 
      >
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
              homeAddress={this.getHomeAddress}
            />
          }

          zillowResults={
           <ZillowResults
             toggleView={this.toggleView}
             user={this.state.user}
           /> 
          }
        />
      </div>
    )
  }
}